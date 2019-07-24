//Imports
VaisseauController = require('./../controllers/vaisseau.controller');
BotController = require('./../controllers/bot.controller');

/**
 * 
 * @param {*} discordClient 
 */
module.exports.listen = function (channel, msg, prefix) {

    if (msg.content.startsWith(prefix))  
    {        
        // Si le message contient notre prefixe

        //On retire le prefixe pour ne pas avoir à le vérifier partout
        msg.content = msg.content.replace(prefix, "");

        //On convertit les arguments en tableaux
        msg.args = msg.content.trim().split(/ +/g);

        //Routes : l'argument 0 contient la clef de la route
        let routes = {
            'decollage' : VaisseauController.decollage,
            'reponse': VaisseauController.reponse,
            'test': BotController.IWork,
            'embed': BotController.embed,
            'embedme' : BotController.embedme,
            'test' : BotController.test
        }

        if(routes[msg.args[0]]){
            routes[msg.args[0]](channel,msg);;
        }else{
            BotController.notFound(channel,msg);
        }
        
    }
    else 
    {
        // Si le message ne contient PAS notre prefixe

        // Affichage eventuel du scenario
        VaisseauController.scenarios(channel,msg);
    }
};


const newStacked = (base = {}) => {
    let state = [];

    return {
        ...base,
        push: e => (state.push(e), state),
        clear : () => state = [],
        pop: () => state[0],
    }
}


let s = newStack(myObj);
