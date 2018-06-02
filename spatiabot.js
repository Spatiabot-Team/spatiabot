//Modules
var colors = require('colors'),
    Discord = require("discord.js"),
    discordClient = new Discord.Client(),
    Routes = require('./routes/default.route'),
    JeuService = require('./services/jeu.service');

try{
    var aws = require('aws-sdk');
}    
catch (error) {
    console.log("Mode local");
}

//Configuration du jeu
JeuService.config = require('./config/config');


// Configuration Discord
if (aws != undefined)
{
    // hebergement heroku
    JeuService.configDiscord = process.env;
}
else
{
    // Hébergement local    
    JeuService.configDiscord = require('./config/configDiscord');
}
JeuService.worldStat = require('./data/monde.json');
    

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
    var channel = discordClient.channels.find("id", JeuService.configDiscord.channelID);
    if (channel == undefined) {
        console.error("Erreur : salon " + JeuService.configDiscord.channelID + " introuvable");
        return false;
    }

    //Routes : on pourrait très bien charger un fichier de route en fonction du prefixe
    Routes.listen(channel, msg);
});


//Tout est parametre on peut se connecter au discord
discordClient.login(JeuService.configDiscord.secretKey);