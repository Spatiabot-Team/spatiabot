import {AuteurFindHandler} from "./auteur/auteur.find.handler";
import {ConsequencePossibleGetByIdHandler} from "./consequence-possible/consequence-possible.get-by-id.handler";
import {ConsequencePossibleGetHandler} from "./consequence-possible/consequence-possible.get.handler";
import {EffetGetByIdHandler} from "./effet/effet.get-by-id.handler";
import {EffetGetHandler} from "./effet/effet.get.handler";
import {EtapeGetByIdHandler} from "./etape/etape.get-by-id.handler";
import {EtapeGetHandler} from "./etape/etape.get.handler";
import {MondeFindHandler} from "./monde/monde.find.handler";
import {MondeGetByAuteurIdHandler} from "./monde/monde.get-by-auteur-id.handler";
import {MondeGetByIdHandler} from "./monde/monde.get-by-id.handler";
import {PartieGetByDiscordGuildHandler} from "./partie/partie.get-by-discord-guild.handler";
import {ReponseGetByIdHandler} from "./reponse/reponse.get-by-id.handler";
import {ReponseGetHandler} from "./reponse/reponse.get.handler";
import {ScenarioFindHandler} from "./scenario/scenario.find.handler";
import {ScenarioGetByIdHandler} from "./scenario/scenario.get-by-id.handler";
import {ScenarioGetHandler} from "./scenario/scenario.get.handler";
import {ScenarioLightByMondeIdHandler} from "./scenario/scenario.light-by-monde-id.handler";
import {UniteGetByIdHandler} from "./unite/unite.get-by-id.handler";
import {VerifyAuteurScenarioHandler} from "./verify/verify-auteur-scenario.handler";
import {PartieFindHandler} from "./partie/partie.find.handler";

export const QueryHandlers = [
    // Auteur
    AuteurFindHandler,

    // Consequence-possible
    ConsequencePossibleGetByIdHandler,
    ConsequencePossibleGetHandler,

    // Effet
    EffetGetByIdHandler,
    EffetGetHandler,

    // Etape
    EtapeGetByIdHandler,
    EtapeGetHandler,

    // Monde
    MondeFindHandler,
    MondeGetByAuteurIdHandler,
    MondeGetByIdHandler,

    // Partie
    PartieGetByDiscordGuildHandler,
    PartieFindHandler,

    // Reponse
    ReponseGetByIdHandler,
    ReponseGetHandler,

    // Scenario
    ScenarioFindHandler,
    ScenarioGetByIdHandler,
    ScenarioGetHandler,
    ScenarioLightByMondeIdHandler,

    // Unite
    UniteGetByIdHandler,

    // Verify
    VerifyAuteurScenarioHandler,
];
