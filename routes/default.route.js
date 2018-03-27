//Controllers
VaisseauController = require('./../controllers/vaisseau.controller');
BotController = require('./../controllers/bot.controller');

/**
 * 
 * @param {*} discordClient 
 */
module.exports.listen = function (channel, msg) {

    var vaisseauController = new VaisseauController(channel);
    var botController = new BotController(channel);

    //Routes

    switch (msg.content) {
        case 'decollage':
            vaisseauController.decollage(msg);
            break;
        case 'test':
            botController.IWork(msg);
            break;
        default:
            botController.notFound(msg);
            break;
    }
};