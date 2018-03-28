//Modules
var colors = require('colors'),
    Discord = require("discord.js"),
    discordClient = new Discord.Client(),
    Routes = require('./routes/default.route'),
    JeuService = require('./services/jeu.service');


//Configuration
const config = require('./config/config');
JeuService.minMinutesWaitingEvent = config.minMinutesWaitingEvent;
JeuService.maxMinutesWaitingEvent = config.maxMinutesWaitingEvent;
 
    

//Message de bienvenue
console.log('(\\__/)  '.green);
console.log('(•ㅅ•)   Bonjour, je suis Spatiabot. Bienvenue dans ce monde intergalactique !'.green);
console.log('/ 　 づ   '.green);


//Connexion
discordClient.on('ready', () => {
    console.log(("Logged in as " + discordClient.user.tag + "!").blue);
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
    var channel = discordClient.channels.find("id", config.channelID);
    if (channel == undefined) {
        console.log("Erreur : salon " + channelId + "introuvable");
        return false;
    }

    if (msg.content.startsWith(config.prefix)) {

        //On retire le prefix pour ne pas avoir à le vérifier partout
        msg.content = msg.content.replace(new RegExp("^" + config.prefix), '');

        //On convertit les arguments en tableaux
        msg.args = msg.content.slice(config.prefix.length).trim().split(/ +/g);

        //Routes : on pourrait très bien charger un fichier de route en fonction du prefix
        Routes.listen(channel, msg);
    }

    JeuService.onEventMessage(channel,msg);

});


//Tout est parametre on peut se connecter au discord
discordClient.login(config.secretKey);