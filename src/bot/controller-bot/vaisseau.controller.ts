import {DiscordService} from "../service/discord.service";
import {Injectable} from "@nestjs/common";
import {DejaDecolleException} from "../exception/deja-decolle.exception";
import {EmbedService} from "../service/embed.service";
import color from "colorts";
import {Partie} from "../../database/entity/partie.entity";
import {PartieService} from "../../database/service/partie.service";
import {InjectRepository} from "@nestjs/typeorm";
import {EtapeRepository} from "../../database/repository/etape.repository";

@Injectable()
export class VaisseauController {

    constructor(
        private discordService: DiscordService,
        private embedService: EmbedService,
        private partieService: PartieService,
        @InjectRepository(EtapeRepository) private readonly etapeRepository: EtapeRepository
    ) {
    }

    async decollage(message: any, partie: Partie) {

        try {

            // Ajout de l'auteur dans la partie (retourne le joueur s'il est déjà dedans)
            const joueur = await this.partieService.ajouterJoueur(partie, message.author);

            //     // this.jeuService.determinerProchainScenario(joueur);
            message.channel.send({
                embed: this.embedService.embedMessage({
                    title: "Décollage !",
                    description: `Un décollage vient d'avoir lieu, celui de **${joueur.user.socialDiscord.username}** !
                        Parti explorer les fins fond de l'univers, va-t'il/elle aller au bout de son périple ?`
                })
            });
        } catch (e) {

            if (e instanceof DejaDecolleException) {
                message.channel.send({embed: this.embedService.embedMessage({description: e.message})});
                return;
            }

            message.author.send({
                embed: this.embedService.embedMessage({
                    description: "Pardon " + message.author.username + ", le décollage rencontre un contre temps dû à un " +
                        "séisme spatio-temporel qui vient d'avoir lieu dans le cosmos, " +
                        "peux-tu indiquer aux maîtres du jeu qu'il faut colmater la brêche ?"
                })
            });
            console.log(color("Erreur technique lors du décollage de " + message.author + e.message).red.toString());
        }
    }

    async reponse(message: any, partie: Partie) {

        const joueur = partie.joueurs.find(j => j.user.socialDiscord.discordId === message.author.id);
        if (!joueur) {
            message.author.send("Psst... il faut d'abord rejoindre la partie avec '!decollage' ;)");
            return;
        }

        if (!joueur.isAttenteReponse()) {
            message.author.send("Pas de réponse attendue...");
            return;
        }

        if (!message.args[1]) {
            message.author.send("Mmmm... il manque la réponse dans la réponse...");
            return;
        }

        const reponse = joueur.findReponse({libelle: message.args[1]});
        if (!reponse) {
            message.author.send("Cette réponse n'a pas été trouvée, es-tu sûr d'avoir bien écrit ?");
            return;
        }

        // Appliquer consequence va choisir la conséquence en fonction de proba et donc assigner l'étape suivante
        const consequence = this.partieService.determinerConsequence(reponse, joueur);
        // Les effets de l'étape suivante seront appliqués quand on lui affichera

        message.author.send("Reponse enregistrée !");
    }
}
