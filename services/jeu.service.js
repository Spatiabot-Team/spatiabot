//Imports
Joueur = require('../models/joueur');

var JeuService = module.exports = {

    /**
     * Liste des joueurs
     */
    joueurs: Array(),

    /**
     * 
     */
    config : {},

    /**
     * User user
     */
    decollage : function(user){

        //On essaie d'obtenir le joueur
        joueur = JeuService.getJoueur(user.id);

        //Si on ne le trouve pas c'est que c'est un nouveau joueur
        if(false == joueur){

            //Création du joueur
            joueur = new Joueur(user.id,user.username,user.avatar,JeuService.config.pv);

            //Indication du prochain evenement
            minutes = Math.floor(Math.random() * (JeuService.config.maxMinutesWaitingEvent - JeuService.config.minMinutesWaitingEvent)
                                                + JeuService.config.minMinutesWaitingEvent);
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
        for(i in JeuService.joueurs){
            if(JeuService.joueurs[i].id == id){
                res = JeuService.joueurs[i];
                break;
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

            if (joueur.currentScenario == -1)
            {
                channel.send("Et la," + joueur.username + " l'aventure commencera")
            }
            else 
            {
                 // Lire le scenario joueur.currentScenario
            }
		}	
    }

}