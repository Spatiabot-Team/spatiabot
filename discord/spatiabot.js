var colors = require('colors'),
    Discord = require("discord.js"),
    discordClient = new Discord.Client(),
    Routes = require('./routes/default.route');

module.exports = class Spatiabot {

    constructor(app) {
        this.app = app;
    };

    start (){
        //Message de bienvenue
        console.log(('\n(\\__/)  ').green);
        console.log('(•ㅅ•)   Bonjour, je suis Spatiabot. Bienvenue dans ce monde intergalactique !'.green);
        console.log('/ 　 づ   \n'.green);


        //Connexion
        discordClient.on('ready', () => {
            console.log(("Spatiabot est connecté avec le tag " + discordClient.user.tag + "!").blue);
        });

        /**
         * Ecoute de l'evenement message
         * "Des que quelqu'un ecrit un message"
         * Nous allons voir si le message ecrit commence par notre prefix,
         * Si oui, on en deduit que notre bot est appele
         * Nous traitons donc la demande
         */
        discordClient.on('message', msg => {

            //Connexion au channel
            var channel = discordClient.channels.find("id", this.app.get('discordConfig').channelID);
            if (channel == undefined) {
                console.error("Erreur : salon " + this.app.get('discordConfig').channelID + " introuvable");
                return false;
            }

            //Routes : on pourrait très bien charger un fichier de route en fonction du prefixe
            Routes.listen(channel, msg, this.app.get('discordConfig').prefix);
        });


        //Tout est parametre on peut se connecter au discord
        discordClient.login(this.app.get('discordConfig').token);
    };
}