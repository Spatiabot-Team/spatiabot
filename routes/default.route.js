//Imports
VaisseauController = require('./../controllers/vaisseau.controller');
BotController = require('./../controllers/bot.controller');

/**
 * 
 * @param {*} discordClient 
 */
module.exports.listen = function (channel, msg) {

    if (msg.content.startsWith(JeuService.config.prefix))  
    {        
        // Si le message contient notre prefixe

        //On retire le prefixe pour ne pas avoir à le vérifier partout
        msg.content = msg.content.replace(new RegExp("^" + JeuService.config.prefix), '');

        //On convertit les arguments en tableaux
        msg.args = msg.content.slice(JeuService.config.prefix.length).trim().split(/ +/g);

            //Routes
        switch (msg.content) {
            case 'decollage':
                VaisseauController.decollage(channel,msg);
                break;
            case 'test':
                BotController.IWork(channel,msg);
                break;
            case 'embed':
                BotController.embed(channel,msg);
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