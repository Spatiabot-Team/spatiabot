import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioService} from "./scenario.service";
import {ToolService} from "./tool.service";
import {DiscordUserService} from "../../../users/discord/discord-user.service";
import {UsersService} from "../../../users/local/users.service";
import {UserRepository} from "../../../users/core/repository/user.repository";
import {JoueurRepository} from "../repository/joueur.repository";
import {PartieRepository} from "../repository/partie.repository";
import {ScenarioRepository} from "../repository/scenario.repository";
import {EtapeRepository} from "../repository/etape.repository";
import {ScenarioEffectueRepository} from "../repository/scenario-effectue.repository";
import {DejaDecolleException} from "../../exception/deja-decolle.exception";
import {Partie} from "../entity/partie.entity";
import {Joueur} from "../entity/joueur.entity";
import {EtapeEtatEnum} from "../enums/etape-etat.enum";
import {Reponse} from "../entity/reponse.entity";
import {ConsequencePossible} from "../entity/consequence-possible.entity";
import {DiscordService} from "../../../discord/core/service/discord.service";
import {EmbedEtapeService} from "./embed-etape.service";


@Injectable()
export class PartieService {

    /**
     * Beaucoup de paramètres dans ce constructeur, ça montre que cette classe fait trop de choses
     * @todo voir si on peut déplacer / externaliser des choses
     * @param discordUserService
     * @param discordService
     * @param usersService
     * @param userRepository
     * @param joueurRepository
     * @param partieRepository
     * @param scenarioRepository
     * @param etapeRepository
     * @param scenarioEffectueRepository
     */
    constructor(
        private discordUserService: DiscordUserService,
        private discordService: DiscordService,
        private usersService: UsersService,
        private embedEtapeService: EmbedEtapeService,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(JoueurRepository) private readonly joueurRepository: JoueurRepository,
        @InjectRepository(PartieRepository) public readonly partieRepository: PartieRepository,
        @InjectRepository(ScenarioRepository) private readonly scenarioRepository: ScenarioRepository,
        @InjectRepository(EtapeRepository) private readonly etapeRepository: EtapeRepository,
        @InjectRepository(ScenarioEffectueRepository) private readonly scenarioEffectueRepository: ScenarioEffectueRepository,
    ) {
    }

    async ajouterJoueur(partieParam: Partie, profile): Promise<Joueur> {

        // On va crcher la dernière version de la partie en base (j'ai voulu passer par joueurRepository mais bugs rencontrés :/ )
        const partie = await this.partieRepository.findOne(partieParam.id);
        const joueur = partie.joueurs.find(j => j.user.socialDiscord.discordId === profile.id);

        if (joueur !== undefined) {
            throw new DejaDecolleException(joueur);
        }

        //Joueur non trouvé donc on le crée
        const socialDiscord = await this.discordUserService.createOrUpdateSocialDiscord(profile);
        const user = await this.usersService.findByDiscordOrCreate(socialDiscord);

        // On verra plus tard pour mettre les stats par défaut
        return await this.joueurRepository.save({user, partie});
    }


    async fixNext(message, partie: Partie) {
        for (const joueur of partie.joueurs) {
            if (!joueur.hasScenarioEnCours()) {
                await this.fixNextScenario(partie, joueur);
            }

            if (joueur.isAfficherEtape() && joueur.user.socialDiscord.discordId === message.author.id) {
                try{

                    if(joueur.etapeEnCoursEtat !== EtapeEtatEnum.ATTENTE_NOUVEAU_SCENARIO){
                        await this.discordService.sendMessages(message.author, this.embedEtapeService.embedEtape(joueur.etapeEnCours));
                        this.appliquerEffetsEtapeEncCours(joueur); //@todo
                    }

                    if (joueur.etapeEnCours.finScenario) {
                        await this.joueurRepository.update(joueur.id, {
                            etapeEnCoursEtat: EtapeEtatEnum.ATTENTE_NOUVEAU_SCENARIO
                        });
                        await this.fixNextScenario(partie, joueur);
                    } else {
                        await this.joueurRepository.update(joueur.id, {
                            etapeEnCoursEtat: EtapeEtatEnum.ATTENTE_REPONSE
                        });
                    }
                }catch(e){
                    console.error(e);
                }
            }
        }

        return;
    }

    private async fixNextScenario(partie: Partie, joueur: Joueur) {
        // On doit lui trouver un scénario qu'il n'a pas encore fait
        try {

            // @todo Le top serait de trouver comment faire tout ce try en 1 seule requête sql
            // (en gros trouver comment retourner un seul tuple de manière random)
            const scenarios = await this.scenarioRepository.findNotPLaiedByJoueur(joueur, partie);

            if (scenarios.length > 0) {
                const scenario = scenarios[Math.round(Math.random() * (scenarios.length - 1))];
                const etape = ScenarioService.getPremiereEtape(scenario);
                await this.joueurRepository.changerEtape(joueur, etape, this.etapeRepository.nextDateAffichage())
                await this.scenarioEffectueRepository.save(this.scenarioEffectueRepository.create({
                    partie, scenario, joueur
                }));
            }
        } catch (e) {
            console.log("Error : ", e);
        }
    }

    /**
     * Applique tous les effets de l'étape en cours d'un joueur
     * Les effets peuvent concerner le joueur et le monde (peut être amener à évoluer pour affecter d'autres choses)
     * @param joueur
     */
    appliquerEffetsEtapeEncCours(joueur: Joueur) {

        //@todo A redv pour vérifier et prendre en compte le type de stat
        //
        // const dictEffet = {
        //     [TypeEffetEnum.JOUEUR]: e => joueur.appliquerEffet(e),
        //     [TypeEffetEnum.MONDE]: e => this.partie.monde.appliquerEffet(e)
        // }
        //
        // joueur.etapeEnCours.effets.forEach(e => dictEffet[e.type](e));
    }

    /**
     * Cette méthode détermine la prochaine étape d'un joueur en fonction de la réponse qu'il a donnée
     */
    async determinerConsequence(reponse: Reponse, joueur: Joueur): Promise<ConsequencePossible> {

        if (joueur.etapeEnCoursEtat != EtapeEtatEnum.ATTENTE_REPONSE) return;

        // Déterminer une l'étape suivante aléatoirement
        const consequence = ToolService.randomItemByPoids(reponse.consequencePossibles);

        // Prochaine étape
        const etapeSuivante = await this.etapeRepository.findOne(consequence.etapeSuivanteId);

        // L'enregistrer dans le joueur
        await this.joueurRepository.changerEtape(
            joueur,
            etapeSuivante,
            this.etapeRepository.nextDateAffichage()
        );

        // Retourner cette étape
        return consequence;
    }

    async findCurrentOfDiscordGuild(discordGuildId: string/*, mondeId: string*/): Promise<Partie | null> {
        return await this.partieRepository.findCurrentOfDiscordGuild(discordGuildId/*, mondeId*/);
    }
}
