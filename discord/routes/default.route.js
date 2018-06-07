//Imports
VaisseauController = require('./../controllers/vaisseau.controller');
BotController = require('./../controllers/bot.controller');

/**
 * 
 * @param {*} discordClient 
 */
module.exports.listen = function (channel, msg, prefix) {

    if (msg.content.startsWith(prefix))  
    {        
        // Si le message contient notre prefixe

        //On retire le prefixe pour ne pas avoir à le vérifier partout
        msg.content = msg.content.replace(prefix, "");

        //On convertit les arguments en tableaux
        msg.args = msg.content.trim().split(/ +/g);

        //Routes : l'argument 0 contient la clef de la route
        switch (msg.args[0]) {
            case 'decollage':
                VaisseauController.decollage(channel,msg);
                break;
            case 'reponse':
                VaisseauController.reponse(channel,msg);
                break;
            case 'test':
                BotController.IWork(channel,msg);
                break;
            case 'embed':
                BotController.embed(channel,msg);
                break;
            case 'embedme':
                BotController.embedme(channel,msg);
                break;
            default:
                BotController.notFound(channel,msg);
                break;
        }
    }
    else 
    {
        // Si le message ne contient PAS notre prefixe

        // Affichage eventuel du scenario
        VaisseauController.scenarios(channel,msg);
    }
};