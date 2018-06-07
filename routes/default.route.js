//Imports
VaisseauController = require('./../controllers/vaisseau.controller');
BotController = require('./../controllers/bot.controller');

/**
 * 
 * @param {*} discordClient 
 */
module.exports.listen = function (channel, msg) {

    if (msg.content.startsWith(JeuService.configDiscord.prefix))  
    {        
        // Si le message contient notre prefixe

        //On retire le prefixe pour ne pas avoir à le vérifier partout
        msg.content = msg.content.slice(JeuService.configDiscord.prefix.length)

        //On convertit les arguments en tableaux
        msg.args = msg.content.trim().split(/ +/g);

            //Routes
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