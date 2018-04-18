//Imports
Joueur = require('../models/joueur');
Message = require('../models/message');

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
        msg = new Message();

        if(false == joueur){
            // Nouveau joueur            

            joueur = new Joueur(user.id,user.username,user.avatar,JeuService.config.pv);

            //Indication du prochain evenement
            minutes = Math.random() * (JeuService.config.maxMinutesWaitingEvent - JeuService.config.minMinutesWaitingEvent)
                                                + JeuService.config.minMinutesWaitingEvent;
            joueur.setDefaultNextEvent();
            joueur.isWaitingEvent = true;

            //Ajout du joueur a la liste
            JeuService.joueurs.push(joueur);
            
            msg.text = "Un décollage vient d'avoir lieu, celui de " + joueur.username + " ! Parti explorer les fins fond de l'univers, va t'il aller au bout de son periple ?"
        }
        else 
        {
            // Joueur existant
            msg.text = "Oh, mais tu as déjà décollé, "+ joueur.username + " !";
        }
        return msg;
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
                // Nouveau scenario pour le joueur
                joueur.isWaitingEvent = false;

                // Determiner le nouveau scenario du joueur
                return JeuService.getHistoireJoueur(joueur);
        }	
    },

    /**
     * Met a jour le numéro d'etape du joueur selon sa reponse
     */
    reponse : function(user, reponseId){

        var message = "Aucune réponse attendue..."
        //On détermine si c'est un joueur
        joueur = JeuService.getJoueur(user.id);

        if (joueur != false && joueur.isWaitingEvent == false)
        {
            // Le joueur avait bien une reponse en attente
            message = "Reponse incorrecte..."
            var fileScenarios = JeuService.getScenarios();
            if (fileScenarios == false)
                return;

            fileScenarios.scenario[joueur.currentScenario].etape[joueur.currentStep].reponse.some(function(reponse)
            {
                if (reponse.id == reponseId)
                {
                    // Il s'agit de la reponse du joueur
                    
                    /* Determiner un nombre aleatoire entre 0 et 1. Si ce nombre et inferieur ou egal
                     * A la somme des probas accumule jusque ici, l'evenement est choisi 
                     */
                    var random = Math.random();
                    var sommeProba = 0;
                    reponse.suivant.some(function(suivant)
                    {
                        sommeProba += suivant.proba;
                        if(random < sommeProba)
                        {
                            // C'est cet evenement qu'aura le joueur
                            joueur.currentStep = suivant.numEtape;
                            joueur.setDefaultNextEvent();
                            joueur.isWaitingEvent = true;
                            message = "Reponse enregistrée !"
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    });
                    return true;
                }
                else
                {
                    // Continuer de parourir les autres reponses
                    return false;
                }
            });          
        }
        return message;
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
     * Retourne les donnees du scenario
     */
    getScenarios(joueur){
        // Lire la liste des scenarios
        try 
        {
            var scenarios = require('../data/scenario1.json');
        }
        catch(error)
        {
            console.error("Erreur lors de la lecture du fichier de scenario : " + error);            
            return false;
        }
        return scenarios;
    },

    /**
     * Retourne le texte du scenario du joueur.
     * Si aucun scenario n'est associe au joueur, un nouveau lui est attribue.
     */
    getHistoireJoueur : function(joueur){

        var fileScenarios = JeuService.getScenarios();
        if (fileScenarios == false)
            return;

        if (joueur.currentScenario == -1)
        {
            // Determiner un nouveau scenario pour le joueur
            joueur.currentScenario = 0; // TODO : parcourir fichier et déterminer aléatoirement le scenario à lire
            joueur.currentStep = 0; // On commence par la premiere etape
        }

        // Afficher le texte associe à l'etape et au scenario du joueur
        var fileStep = fileScenarios.scenario[joueur.currentScenario].etape[joueur.currentStep];
        var message = fileStep.text + "\n \n";

        if (fileStep.reponse == undefined)
        {
            // Aucune reponse attendue (fin du scenario). 
            joueur.setDefaultNextEvent();
            joueur.currentScenario = -1;
            joueur.isWaitingEvent = true;
        }
        else 
        {
            // Afficher les réponses
            fileScenarios.scenario[joueur.currentScenario].etape[joueur.currentStep].reponse.forEach(function(reponse)
            {
                message += reponse.text + " (" + JeuService.config.prefix + "reponse " + reponse.id + ")\n";
            });
        }
        return message;
    },	
}