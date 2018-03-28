//Imports
VaisseauController = require('./../controllers/vaisseau.controller');
BotController = require('./../controllers/bot.controller');

/**
 * 
 * @param {*} discordClient 
 */
module.exports.listen = function (channel, msg) {

    //Routes
    switch (msg.content) {
        case 'decollage':
            VaisseauController.decollage(channel,msg);
            break;
        case 'test':
            BotController.IWork(channel,msg);
            break;
        default:
            BotController.notFound(channel,msg);
            break;
    }
};