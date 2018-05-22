//Modules
var colors = require('colors'),
    Discord = require("discord.js"),
    discordClient = new Discord.Client(),
    Routes = require('./discord/routes/default.route'),
    JeuService = require('./core/services/jeu.service');


//Configuration
JeuService.config = require('./config/config');
JeuService.worldStat = require('./data/monde.json');
    

//Message de bienvenue
console.log('(\\__/)  '.green);
console.log('(•ㅅ•)   Bonjour, je suis Spatiabot. Bienvenue dans ce monde intergalactique !'.green);
console.log('/ 　 づ   '.green);


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
    var channel = discordClient.channels.find("id", JeuService.config.channelID);
    if (channel == undefined) {
        console.error("Erreur : salon " + JeuService.config.channelID + " introuvable");
        return false;
    }

    //Routes : on pourrait très bien charger un fichier de route en fonction du prefixe
    Routes.listen(channel, msg);
});


//Tout est parametre on peut se connecter au discord
discordClient.login(JeuService.config.secretKey);