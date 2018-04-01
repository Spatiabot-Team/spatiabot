//Import
JeuService = require('./../services/jeu.service');

/**
 * Decollage du vaisseau !
 * 
 * @param Object channel 
 * @param Object msg 
 */
module.exports.decollage = function (channel, msg) {
    var message = JeuService.decollage(msg.author);
    if (message != undefined)
        channel.send(message);
};

/**
 * Traitement de la reponse du joueur
 * 
 * @param Object channel 
 * @param Object msg 
 */
module.exports.reponse = function (channel, msg) {
    var message = JeuService.reponse(msg.author, msg.args[1]);
    if (message != undefined)
        channel.send(message);
};

/**
 * Affichage du scenario
 * 
 * @param Object channel 
 * @param Object msg 
 */
module.exports.scenarios = function (channel, msg) {
    var message = JeuService.onEventMessage(msg.author);
    if (message != undefined)
        channel.send(message);
};