import {CONFIG_ENV} from "../../config/config";
import colors = require('colors');
import    Discord = require("discord.js");
import {JeuService} from "../core/service/jeu.service";
import {VaisseauController} from "./controllers/vaisseau.controller";
import {RouteSpatiabot} from "./routes";

export const Spatiabot = () => {

    const discordClient = new Discord.Client();

    /**
     * Message de bienvenue :D
     */
    const showWelcomeMessage = () => {
        console.log(colors.rainbow('\n(\\__/)  '));
        console.log(colors.rainbow('(•ㅅ•)   Bonjour, je suis Spatiabot. Bienvenue dans ce monde intergalactique !'));
        console.log(colors.rainbow('/ 　 づ   \n'));
    };

    const connection = () => {
        console.log(colors.blue("Connexion du spatiabot au serveur discord en cours..."))
        discordClient.on('ready', () => {
            console.log(colors.blue("Spatiabot est connecté avec le tag " + discordClient.user.tag + "!"));
        });
    };

    /**
     * Ecoute de l'evenement message
     * "Des que quelqu'un ecrit un message"
     * Nous allons voir si le message ecrit commence par notre prefix,
     * Si oui, on en deduit que notre bot est appele
     * Nous traitons donc la demande
     */
    const listenMessage = () => {
        discordClient.on('message', msg => {

            //Connexion au channel
            const channel = discordClient.channels.find(ch => ch.id == CONFIG_ENV.discordChannelID);
            if (channel == undefined) {
                console.error("Erreur : salon " + CONFIG_ENV.discordChannelID + " introuvable");
                return false;
            }

            RouteSpatiabot.go(channel,msg);
        });
    };

    /**
     *
     */
    const login = () => {
        discordClient.login(CONFIG_ENV.discordToken);
    };

    return {
        start: () => {
            showWelcomeMessage();
            connection();
            login();
            listenMessage();
            JeuService.start();
        }
    }
}



