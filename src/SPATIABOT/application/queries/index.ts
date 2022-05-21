import {AuteurFindByIdsHandler} from "./auteur/auteur.find-by-ids.handler";
import {AuteurFindHandler} from "./auteur/auteur.find.handler";
import {ConsequencePossibleGetByIdHandler} from "./consequence-possible/consequence-possible.get-by-id.handler";
import {ConsequencePossibleGetHandler} from "./consequence-possible/consequence-possible.get.handler";
import {EffetGetByIdHandler} from "./effet/effet.get-by-id.handler";
import {EffetGetHandler} from "./effet/effet.get.handler";
import {EtapeGetByIdHandler} from "./etape/etape.get-by-id.handler";
import {EtapeGetHandler} from "./etape/etape.get.handler";
import {EtapeNextDateHandler} from "./etape/etape.next-date.handler";
import {JoueurEtapeFindAllAAfficherHandler} from "./joueur/joueur.etape.find-all-a-afficher.handler";
import {JoueurFindAllEnAttenteScenarioHandler} from "./joueur/joueur.find-all-en-attente-scenario.handler";
import {JoueurGetByIdHandler} from "./joueur/joueur.get-by-id.handler";
import {JoueurUserFindBySocialDiscordIdHandler} from "./joueur/joueur.user.find-by-social-discord-id.handler";
import {MondeFindHandler} from "./monde/monde.find.handler";
import {MondeGetByAuteurIdHandler} from "./monde/monde.get-by-auteur-id.handler";
import {MondeGetByIdHandler} from "./monde/monde.get-by-id.handler";
import {PartieFindHandler} from "./partie/partie.find.handler";
import {PartieGetByDiscordGuildHandler} from "./partie/partie.get-by-discord-guild.handler";
import {ReponseGetByIdHandler} from "./reponse/reponse.get-by-id.handler";
import {ReponseGetHandler} from "./reponse/reponse.get.handler";
import {ScenarioFindHandler} from "./scenario/scenario.find.handler";
import {ScenarioGetByIdHandler} from "./scenario/scenario.get-by-id.handler";
import {ScenarioGetHandler} from "./scenario/scenario.get.handler";
import {ScenarioLightByMondeIdHandler} from "./scenario/scenario.light-by-monde-id.handler";
import {UniteGetByIdHandler} from "./unite/unite.get-by-id.handler";

export const QueryHandlers = [
    // Auteur
    AuteurFindByIdsHandler,
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
    EtapeNextDateHandler,

    // Joueur
    JoueurEtapeFindAllAAfficherHandler,
    JoueurFindAllEnAttenteScenarioHandler,
    JoueurGetByIdHandler,
    JoueurUserFindBySocialDiscordIdHandler,

    // Monde
    MondeFindHandler,
    MondeGetByAuteurIdHandler,
    MondeGetByIdHandler,

    // Partie
    PartieFindHandler,
    PartieGetByDiscordGuildHandler,

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
];
