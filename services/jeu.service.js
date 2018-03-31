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
        msg = "";

        if(false == joueur){
            // Nouveau joueur            

            joueur = new Joueur(user.id,user.username,user.avatar,JeuService.config.pv);

            //Indication du prochain evenement
            minutes = Math.random() * (JeuService.config.maxMinutesWaitingEvent - JeuService.config.minMinutesWaitingEvent)
                                                + JeuService.config.minMinutesWaitingEvent;
            joueur.setNextEvent(Date.now() + minutes * 60 * 1000);
            joueur.isWaitingEvent = true;

            //Ajout du joueur a la liste
            JeuService.joueurs.push(joueur);
            
            msg = "Un décollage vient d'avoir lieu, celui de " + joueur.username + " ! Parti explorer les fins fond de l'univers, va t'il aller au bout de son periple ?"
        }
        else 
        {
            // Joueur existant
            msg = "Oh, mais tu as déjà décollé, "+ joueur.username + " !";
        }
        return msg;
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
    onEventMessage : function(user){

        //On détermine si c'est un joueur
        joueur = JeuService.getJoueur(user.id);

        if (false != joueur && joueur.hasNextEventReady())
        {
            if (joueur.currentScenario == -1)
            {
                // Nouveau scenario pour le joueur
                joueur.isWaitingEvent = false;

                // Determiner le nouveau scenario du joueur
                return JeuService.getScenario(joueur);
            }
        }	
    },

    getScenario : function(joueur){

        // Lire la liste des scenarios
        try 
        {
            var scenarios = require('../data/scenario1.json');
        }
        catch(error)
        {
            console.error("Erreur lors de la lecture du fichier de scenario : " + error);            
            return;
        }

        if (joueur.currentScenario == -1)
        {
            // Determiner un nouveau scenario pour le joueur
            joueur.currentScenario = 0; // TODO : parcourir fichier et déterminer aléatoirement
            joueur.currentStep = 0;
        }

        // Afficher le texte associe à l'etape et au scenario du joueur
        return scenarios.scenario[joueur.currentScenario].etape[joueur.currentStep].text;        
    },	
}