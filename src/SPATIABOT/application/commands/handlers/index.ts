import {ActionDecollageHandler} from "./action/action.decollage.handler";
import {MondeDeleteHandler} from "./monde/monde.delete.handler";
import {MondeCreateHandler} from "./monde/monde.create.handler";
import {MondeUpdateHandler} from "./monde/monde.update.handler";
import {ScenarioCreateHandler} from "./scenario/scenario.create.handler";
import {ScenarioDeleteHandler} from "./scenario/scenario.delete.handler";
import {MondeDeleteAuteurHandler} from "./monde/monde.delete-auteur.handler";
import {MondeAddAuteurHandler} from "./monde/monde.add-auteur.handler";
import {UniteCreateHandler} from "./unite/unite.create.handler";
import {UniteDeleteHandler} from "./unite/unite.delete.handler";
import {UniteUpdateHandler} from "./unite/unite.update.handler";
import {EtapeCreateHandler} from "./etape/etape.create.handler";
import {EtapeDeleteHandler} from "./etape/etape.delete.handler";

export const CommandHandlers = [

    ActionDecollageHandler,

    // Monde
    MondeCreateHandler,
    MondeUpdateHandler,
    MondeDeleteHandler,
    MondeDeleteAuteurHandler,
    MondeAddAuteurHandler,

    // Unite
    UniteCreateHandler,
    UniteUpdateHandler,
    UniteDeleteHandler,

    // Scenario
    ScenarioCreateHandler,
    ScenarioDeleteHandler,

    // Etape
    EtapeCreateHandler,
    EtapeDeleteHandler
];
