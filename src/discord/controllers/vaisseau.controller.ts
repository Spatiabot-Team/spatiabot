import {JeuService} from "../../core/service/jeu.service";
import colors = require('colors');
import {DejaDecolleException} from "../../core/exception/deja-decolle.exception";
import {EmbedService} from "../../core/service/embed.service";

export const VaisseauController = {

    /**
     * !decollage
     * @param channel
     * @param msg
     */
    decollage: async (channel, msg) => {
        try {
            const joueur = await JeuService.ajoutJoueur(msg.author);
            JeuService.determinerProchainScenario(joueur);
            channel.send({
                embed: EmbedService.embedMessage({
                    title: "Décollage !",
                    description: "Un décollage vient d'avoir lieu, celui de **" + joueur.user.name + "** ! " +
                        "Parti explorer les fins fond de l'univers, va-t'il/elle aller au bout de son périple ?"
                })
            });
        } catch (e) {

            if (e instanceof DejaDecolleException) {
                channel.send({embed: EmbedService.embedMessage({description: e.message})});
                return;
            }

            msg.author.send({
                embed: EmbedService.embedMessage({
                    description: "Pardon " + msg.author.username + ", le décollage rencontre un contre temps dû à un " +
                        "séisme spatio-temporel qui vient d'avoir lieu dans le cosmos, " +
                        "peux-tu indiquer aux maîtres du jeu qu'il faut colmater la brêche ?"
                })
            });
            console.log(colors.red("Erreur technique lors du décollage de " + msg.author + e.message));
        }
    },

    /**
     * !reponse libelle
     * On reçoit la réponse d'un joueur
     * @param channel
     * @param msg
     */
    reponse: async (channel, msg) => {

        if (!msg.args[1]) return false;

        const libelle = msg.args[1];

        const joueur = JeuService.findJoueur(msg.author);
        if (!joueur || !joueur.isAttenteReponse()) {
            msg.author.send("Pas de réponse attendue...");
            return;
        }

        const reponse = joueur.findReponse({libelle});
        if (!reponse) {
            msg.author.send("Cette réponse n'a pas été trouvée, es-tu sûr d'avoir bien écrit ?");
            return;
        }

        const consequence = JeuService.appliquerConsequence(reponse, joueur);

        msg.author.send("Reponse enregistrée !");

    },

}
