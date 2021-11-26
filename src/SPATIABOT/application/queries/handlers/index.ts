import {MondeFindHandler} from "./monde/monde.find.handler";
import {MondeGetByIdHandler} from "./monde/monde.get-by-id.handler";
import {MondeGetByAuteurIdHandler} from "./monde/monde.get-by-auteur-id.handler";
import {ScenarioGetHandler} from "./scenario/scenario.get.handler";
import {PartieGetByDiscordGuildHandler} from "./partie/partie.get-by-discord-guild.handler";
import {ScenarioGetByIdHandler} from "./scenario/scenario.get-by-id.handler";
import {AuteurFindHandler} from "./auteur/auteur.find.handler";
import {UniteGetByIdHandler} from "./unite/unite.get-by-id.handler";
import {EtapeGetQuery} from "../impl/etape/etape.get.query";
import {EtapeGetByIdQuery} from "../impl/etape/etape.get-by-id.query";
import {ScenarioLightByMoneIdHandler} from "./scenario/scenario.light-by-monde-id.handler";


export const QueryHandlers = [

    // Monde
    MondeFindHandler,
    MondeGetByIdHandler,
    MondeGetByAuteurIdHandler,

    // Auteur
    AuteurFindHandler,

    // Unite
    UniteGetByIdHandler,

    // Scenario
    ScenarioGetHandler,
    ScenarioGetByIdHandler,
    ScenarioLightByMoneIdHandler,

    // Etape
    EtapeGetQuery,
    EtapeGetByIdQuery,

    // Partie
    PartieGetByDiscordGuildHandler
];
