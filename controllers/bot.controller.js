/**
 * S'assurer que le bot repond bien
 * 
 * @param Object channel 
 * @param Object msg 
 */
module.exports.IWork = function(channel,msg){
    channel.send("Oui " + msg.author.username + " je fonctionne super bien !");
};

/**
 * Action 404 : commande non trouvée
 * @toto : Faire une analyse de la chaine pour essayer de deviner la commande que voulais lancer la personne
 *         et donc repondre par exemple : "vouliez vous dire !test"
 * 
 * @param Object channel 
 * @param Object msg 
 */
module.exports.notFound = function(channel,msg){
    channel.send("Euh...je n'ai pas très bien compris :thinking: ");
};