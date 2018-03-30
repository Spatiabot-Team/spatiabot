//Import
JeuService = require('./../services/jeu.service');

/**
 * Decollage du vaisseau !
 * 
 * @param Object channel 
 * @param Object msg 
 */
module.exports.decollage = function (channel, msg) {
    joueur = JeuService.decollage(msg.author);
    // Todo : deplacer le message dans le service ?
    channel.send(" Un decollage vient d'avoir lieu, celui de " + joueur.username + " ! Parti explorer les fins fond de l'univers, va t'il aller au bout de son periple ?");
};
