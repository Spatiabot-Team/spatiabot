import {JeuService} from "../../core/service/jeu.service";
import {EmbedService} from "../../core/service/embed.service";
import {CONFIG_ENV} from "../../../config/config";
import {getCustomRepository} from "typeorm";
import {JoueurRepository} from "../../core/repository/joueur.repository";

export const BotController = {

    /**
     * Il y a un nouveau message sur le discord
     * On regarde si ce message vient d'un joueur de la partie
     * @param channel
     * @param msg
     */
    onEventMessage: async(channel, msg) => {
        const joueur = JeuService.findJoueur(msg.author)

        if(joueur){
            if(!joueur.hasScenarioEnCours()){
                JeuService.determinerProchainScenario(joueur);
            }

            if(joueur.isAfficherEtape()){
                msg.author.send({ embed: EmbedService.embedEtape(joueur.etapeEnCours)});
                JeuService.appliquerEffetsEtapeEncCours(joueur);
                joueur.etapeEnCoursEtat = CONFIG_ENV.etatEtape.attenteReponse;
                const joueurRepository = await getCustomRepository(JoueurRepository);
                joueurRepository.save(joueur);
            }

        }

    },

    /**
     * Quand un message commence par le préfixe du spatiabot mais qu'il ne correspond à aucune route
     * @param channel
     * @param msg
     */
    notFound: async (channel, msg) => {
        channel.send({
            embed: EmbedService.embedMessage({
                description: "Euh...je n'ai pas très bien compris :thinking: "
            })
        });

    },
}
