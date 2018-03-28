//Imports
Joueur = require('../models/joueur');

var JeuService = module.exports = {

    /**
     * Liste des joueurs
     */
    joueurs: Array(),

    minMinutesWaitingEvent : 0,
    maxMinutesWaitingEvent : 0,


    /**
     * User user
     */
    decollage : function(user){

        //On essaie d'obtenir le joueur
        joueur = JeuService.getJoueur(user.id);

        //Si on ne le trouve pas c'est que c'est un nouveau joueur
        if(false == joueur){

            //Création du joueur
            joueur = new Joueur(user.id,user.username,user.avatar,100);

            //Indication du prochaint evènement
            minutes = Math.floor(Math.random() * JeuService.maxMinutesWaitingEvent + JeuService.minMinutesWaitingEvent);
            joueur.setNextEvent(Date.now() + minutes * 60 * 1000);

            //Ajout du joueur a la liste
            JeuService.joueurs.push(joueur);
        }
        
        //on retourne le joueur
        return joueur;

    },

    /**
     * Retourne le joueur avec l'id passe en parametre
     * Retourne false si le joueur n'est pas trouve
     */
    getJoueur : function(id){
        res = false;
        if(JeuService.joueurs.length > 0){
            for(i in JeuService.joueurs){
                if(JeuService.joueurs[i].id == id){
                    res = JeuService.joueurs[i];
                }
            }
        }
        return res;
    },

    /**
     * Des qu'un message arrive cet evenement ce declenche
     * On peut en profiter pour parcourir tous les joueurs par exemple
     */
    onEventMessage : function(channel,msg){

        //On détermine si c'est un joueur
        joueur = JeuService.getJoueur(msg.author.id);
        if (false != joueur && joueur.hasNextEventReady()){
            //On lui annonce que l'aventure commence @todo lancer le scenar !
            joueur.isWaitingEvent = false;
            channel.send("Et la," + joueur.username + " l'aventure commencera")
		}	
    }

}