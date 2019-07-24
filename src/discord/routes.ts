import {CONFIG_ENV} from "../../config/config";
import {VaisseauController} from "./controllers/vaisseau.controller";
import {BotController} from "./controllers/bot.controller";

export const RouteSpatiabot = {

    go(channel, msg){

        if (msg.content.startsWith(CONFIG_ENV.discordPrefix))
        {
            // Si le message contient notre prefixe

            //On retire le prefixe pour ne pas avoir à le vérifier partout
            msg.content = msg.content.replace(CONFIG_ENV.discordPrefix, "");

            //On convertit les arguments en tableaux
            msg.args = msg.content.trim().split(/ +/g);

            //Routes : l'argument 0 contient la clef de la route
            const routes = {
                'decollage' : VaisseauController.decollage,
                'reponse': VaisseauController.reponse,
                'r': VaisseauController.reponse
            }

            if(routes[msg.args[0]]){
                routes[msg.args[0]](channel,msg);;
            }else{
                BotController.notFound(channel,msg);
                // 404 !routeNotFound
            }
        }
        else
        {
            // Si le message ne contient PAS notre prefixe
            BotController.onEventMessage(channel,msg);
        }

    }

}
