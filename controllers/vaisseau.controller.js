/**
 * 
 */
module.exports = function (channel) {

        /**
         * 
         * @param String message 
         */
        this.decollage = function (msg) {
            channel.send(" Un decollage vient d'avoir lieu, celui de " + msg.author.username + " ! Parti explorer les fins fond de l'univers, va t'il aller au bout de son periple ?");
        };

}
