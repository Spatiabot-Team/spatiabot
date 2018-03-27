/**
 * 
 */
module.exports = function(channel) {

        /**
         * 
         * @param String message 
         */
        this.IWork = function(msg){
            channel.send("Oui " + msg.author.username + " je fonctionne super bien !");
        };

        /**
         * 
         * @param String message 
         */
        this.notFound = function(msg){
            channel.send("Euh...je n'ai pas très bien compris :thinking: ");
            //@toto : Faire une analyse de la chaine pour essayer de deviner la commande que voulais lancer la personne
            //et donc repondre par exemple : "vouliez vous dire !test"

        };
}