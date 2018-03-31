//Import
JeuService = require('./../services/jeu.service');

/**
 * Decollage du vaisseau !
 * 
 * @param Object channel 
 * @param Object msg 
 */
module.exports.decollage = function (channel, msg) {
    msg = JeuService.decollage(msg.author);
    // Todo : deplacer le message dans le service ?
    channel.send(msg);
};
