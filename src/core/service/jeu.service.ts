import {getCustomRepository, In, Not} from "typeorm";
import {PartieRepository} from "../repository/partie.repository";
import {Partie} from "../entity/partie.entity";
import colors = require('colors');
import {JoueurRepository} from "../repository/joueur.repository";
import {UserRepository} from "../repository/user.repository";
import {Joueur} from "../entity/joueur.entity";
import {DejaDecolleException} from "../exception/deja-decolle.exception";
import {ScenarioRepository} from "../repository/scenario.repository";
import {CONFIG_ENV} from "../../../config/config";
import {Etape} from "../entity/etape.entity";
import {Reponse} from "../entity/reponse.entity";
import {ToolService} from "./tool.service";
import {Initialisation} from "../entity/initialisation.entity";
import {InitialisationRepository} from "../repository/initialisation.repository";
import {ConsequencePossible} from "../entity/consequence-possible.entity";
import {EtapeRepository} from "../repository/etape.repository";
import {Fixture} from "../fixture";

let partie: Partie = null;

/**
 * Chaque fonction doit effectuer une et une seule action métier
 * Par exemple, ajoutJoueur ne doit pas en plus indiquer l'étape du joueur, ceci est fait dans une autre action
 * Cela évite la redonance de code et permet de mieux tester, y voir plus clair et faire davantage de choses sans
 * avoir d'effet de bord
 */
export const JeuService = {

    /**
     * Cherche la partie en cours, ou en démarre une si aucune existe
     */
    async start(): Promise<Partie> {
        const partieRepository = await getCustomRepository(PartieRepository);
        partie = await partieRepository.getCurrent();
        if (!partie) {

            const initialisationRepository = await getCustomRepository(InitialisationRepository);
            let initialisation = await initialisationRepository.getCurrent();
            if(!initialisation){
                await Fixture.load();
                initialisation = await initialisationRepository.getCurrent();
            }

            partie = partieRepository.create({});
            partie.monde = Object.assign({}, initialisation.monde, {id: undefined});
            partie = await partieRepository.save(partie);
            console.log(colors.yellow("La partie " + partie.id + " a été crée !"));
        }
        console.log(colors.yellow("La partie " + partie.id + " commence !"));
        return partie;
    },

    /**
     * Ajoute un joueur à la partie s'il n'y est pas déjà et le retourne
     * @param userDiscord
     */
    async ajoutJoueur(userDiscord): Promise<Joueur> {

        let joueur = partie.findJoueur(userDiscord);

        if (joueur) {
            // Le joueur est déjà dans la partie donc on retourne une exception
            throw new DejaDecolleException(joueur);
        }

        // On crée d'abord le user s'il n'existe pas encore
        const userRepository = await getCustomRepository(UserRepository);
        let user = await userRepository.findOne({where: {discordId: userDiscord.id}});

        if (!user) {
            user = await userRepository.save(userRepository.create({
                discordId: userDiscord.id,
                name: userDiscord.username
            }));
        }

        // On crée un joueur pour ce user et on l'ajoute à la partie
        const joueurRepository = await getCustomRepository(JoueurRepository);
        const initialisationRepository = await getCustomRepository(InitialisationRepository);
        const initialisation = await initialisationRepository.getCurrent();

        joueur = joueurRepository.create({user, partie,stats : initialisation.joueur.stats});
        joueur = await joueurRepository.save(joueur);
        partie.joueurs.push(joueur);

        return joueur;
    },

    /**
     *
     * @param joueur
     */
    async determinerProchainScenario(joueur: Joueur): Promise<Etape> {

        // Si le joueur n'a pas de scénario en cours ou que l'étape en cours est la fin du scenario, on change de scénario
        if (!joueur.hasScenarioEnCours()) {

            // On doit lui trouver un scénario qu'il n'a pas encore fait !
            const scenarioRepository = await getCustomRepository(ScenarioRepository);
            const scenarios = await scenarioRepository.find({where: {id: Not(In(joueur.getScenariosEffectues()))}});

            if (scenarios.length > 0) {
                const etape = scenarios[Math.round(Math.random() * (scenarios.length-1))].getPremiereEtape();
                joueur.scenariosEffectues.push(etape.scenario)
                joueur.etapeEnCours = etape;
                joueur.etapeDateAffichage = this.calcNextDateAffichageEtape();
                joueur.etapeEnCoursEtat = CONFIG_ENV.etatEtape.aAfficher;
                const joueurRepository = await getCustomRepository(JoueurRepository);
                joueurRepository.save(joueur);
            }
        }
        return joueur.etapeEnCours;
    },

    /**
     * Applique tous les effets de l'étape en cours d'un joueur
     * Les effets peuvent concerner le joueur et le monde (peut être amener à évoluer pour affecter d'autres choses)
     * @param joueur
     */
    appliquerEffetsEtapeEncCours(joueur: Joueur) {

        const dictEffet = {
            [CONFIG_ENV.typeEffet.joueur]: e => joueur.appliquerEffet(e),
            [CONFIG_ENV.typeEffet.monde]: e => partie.monde.appliquerEffet(e)
        }

        joueur.etapeEnCours.effets.forEach(e => dictEffet[e.type](e));
    },

    /**
     * Cette méthode détermine la prochaine étape d'un joueur en fonction de la réponse qu'il a donnée
     */
    async appliquerConsequence(reponse: Reponse, joueur: Joueur): Promise<ConsequencePossible> {

        if(joueur.etapeEnCoursEtat != CONFIG_ENV.etatEtape.attenteReponse) return;

        // Déterminer une l'étape suivante aléatoirement
        const consequence = ToolService.randomItemByPoids(reponse.consequencePossibles);

        // Prochaine étape
        const etapeRepository = await getCustomRepository(EtapeRepository);
        const etapeSuivante = await etapeRepository.findOne(consequence.etapeSuivanteId);


        // L'enregistrer dans le joueur
        await joueur.changerEtape(etapeSuivante, this.calcNextDateAffichageEtape());
        const joueurRepository = await getCustomRepository(JoueurRepository);
        joueur = await joueurRepository.save(joueur);

        // Retourner cette étape
        return consequence;
    },

    /**
     *
     * @param userDiscord
     */
    findJoueur(userDiscord) {
        return partie.findJoueur(userDiscord);
    },

    /**
     *
     * @param userDiscord
     */
    isDansLaPartie(userDiscord) {
        return partie.isDansLaPartie(userDiscord);
    },

    /**
     *
     */
    calcNextDateAffichageEtape() {
        return new Date(
            Date.now()
            +
            (
                Math.random()
                *
                (
                    CONFIG_ENV.maxMinutesWaitingEvent - CONFIG_ENV.minMinutesWaitingEvent
                )
                + CONFIG_ENV.minMinutesWaitingEvent
            )
            * 60 * 1000
        );
    }
}
