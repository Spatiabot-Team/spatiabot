//Controllers
VaisseauController = require('./../controllers/vaisseau.controller');
BotController = require('./../controllers/bot.controller');

//Models
Counter = require('./../models/counter');

/**
 * 
 * @param {*} discordClient 
 */
module.exports.listen = function (channel, msg) {
    Counter.add();
    console.log(Counter.count);
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
};