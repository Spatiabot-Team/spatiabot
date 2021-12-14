import {ActionDecollageHandler} from "./action/action.decollage.handler";
import {ConsequencePossibleCreateHandler} from "./consequence-possible/consequence-possible.create.handler";
import {ConsequencePossibleDeleteHandler} from "./consequence-possible/consequence-possible.delete.handler";
import {ConsequencePossibleUpdateHandler} from "./consequence-possible/consequence-possible.update.handler";
import {EffetCreateHandler} from "./effet/effet.create.handler";
import {EffetDeleteHandler} from "./effet/effet.delete.handler";
import {EffetUpdateHandler} from "./effet/effet.update.handler";
import {EtapeCreateHandler} from "./etape/etape.create.handler";
import {EtapeDeleteHandler} from "./etape/etape.delete.handler";
import {EtapeUpdateHandler} from "./etape/etape.update.handler";
import {MondeAddAuteurHandler} from "./monde/monde.add-auteur.handler";
import {MondeCreateHandler} from "./monde/monde.create.handler";
import {MondeDeleteAuteurHandler} from "./monde/monde.delete-auteur.handler";
import {MondeDeleteHandler} from "./monde/monde.delete.handler";
import {MondeUpdateHandler} from "./monde/monde.update.handler";
import {ReponseCreateHandler} from "./reponse/reponse.create.handler";
import {ReponseDeleteHandler} from "./reponse/reponse.delete.handler";
import {ReponseUpdateHandler} from "./reponse/reponse.update.handler";
import {ScenarioAddAuteurHandler} from "./scenario/scenario.add-auteur.handler";
import {ScenarioCreateHandler} from "./scenario/scenario.create.handler";
import {ScenarioDeleteHandler} from "./scenario/scenario.delete.handler";
import {ScenarioUpdateHandler} from "./scenario/scenario.update.handler";
import {UniteCreateHandler} from "./unite/unite.create.handler";
import {UniteDeleteHandler} from "./unite/unite.delete.handler";
import {UniteUpdateHandler} from "./unite/unite.update.handler";

export const CommandHandlers = [
    // Action
    ActionDecollageHandler,

    // Consequence-possible
    ConsequencePossibleCreateHandler,
    ConsequencePossibleDeleteHandler,
    ConsequencePossibleUpdateHandler,

    // Effet
    EffetCreateHandler,
    EffetDeleteHandler,
    EffetUpdateHandler,

    // Etape
    EtapeCreateHandler,
    EtapeDeleteHandler,
    EtapeUpdateHandler,

    // Monde
    MondeAddAuteurHandler,
    MondeCreateHandler,
    MondeDeleteAuteurHandler,
    MondeDeleteHandler,
    MondeUpdateHandler,

    // Reponse
    ReponseCreateHandler,
    ReponseDeleteHandler,
    ReponseUpdateHandler,

    // Scenario
    ScenarioAddAuteurHandler,
    ScenarioCreateHandler,
    ScenarioDeleteHandler,
    ScenarioUpdateHandler,

    // Unite
    UniteCreateHandler,
    UniteDeleteHandler,
    UniteUpdateHandler,
];