//Modules
var colors = require('colors'),
    Discord = require("discord.js"),
    discordClient = new Discord.Client(),
<<<<<<< 1878ed51ab5b1281faae085541b645def3a80b83
    Routes = require('./routes/default.route'),
    JeuService = require('./services/jeu.service'),
    aws = require('aws-sdk');
=======
    Routes = require('./discord/routes/default.route'),
    JeuService = require('./core/services/jeu.service');
>>>>>>> L'application contient maintenant une partie api et une partie discord

//Configuration du jeu
JeuService.config = require('./config/config');


// Configuration Discord
try 
{
    // Hébergement local    
    JeuService.configDiscord = require('./config/discord.config'); // Si inexistant, alors on est sur heroku...
    console.log ("Hebergement local")
}
catch (error)
{
    // Hébergement Heroku (dans le cas où on ne trouve pas le fichier configDiscord)
    console.log ("Hebergement Heroku")
    JeuService.configDiscord = process.env;
}
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
    var channel = discordClient.channels.find("id", JeuService.configDiscord.channelID);
    if (channel == undefined) {
        console.error("Erreur : salon " + JeuService.configDiscord.channelID + " introuvable");
        return false;
    }

    //Routes : on pourrait très bien charger un fichier de route en fonction du prefixe
    Routes.listen(channel, msg);
});


//Tout est parametre on peut se connecter au discord
try 
{
    discordClient.login(JeuService.configDiscord.token);
} 
catch (error)
{
    console.log ("Erreur de connexion ! Message : " + error);
}