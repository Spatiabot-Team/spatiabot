import {MondeByConnectedUserController} from "./monde/monde.by-connected-user.controller";
import {MondeGetByIdController} from "./monde/monde.get-by-id.controller";
import {MondePostController} from "./monde/monde.post.controller";
import {MondeDeleteController} from "./monde/monde.delete.controller";
import {MondePutController} from "./monde/monde.put.controller";
import {ScenarioGetController} from "./scenario/scenario.get.controller";
import {ScenarioPostController} from "./scenario/scenario.post.controller";
import {MondeDeleteAuteurController} from "./monde/monde.delete-auteur.controller";
import {AuteurFindController} from "./auteur/auteur.find.controller";
import {MondeAddAuteurController} from "./monde/monde.add-auteur.controller";
import {UnitePostController} from "./unite/unite.post.controller";
import {UniteDeleteController} from "./unite/unite.delete.controller";
import {UnitePutController} from "./unite/unite.put.controller";
import {ScenarioGetByIdController} from "./scenario/scenario.get-by-id.controller";
import {EtapePostController} from "./etape/etape.post.controller";
import {EtapeDeleteController} from "./etape/etape.delete.controller";

export const Controllers = [

    // Monde
    MondeByConnectedUserController,
    MondeGetByIdController, // Ce controller doit absolument être après les autres get car /:id prendrait le nom des autres
    MondePostController,
    MondePutController,
    MondeDeleteController,
    MondeDeleteAuteurController,
    MondeAddAuteurController,

    //Auteur
    AuteurFindController,

    // Unite
    UnitePostController,
    UnitePutController,
    UniteDeleteController,

    // Scenario
    ScenarioGetController,
    ScenarioGetByIdController,
    ScenarioPostController,

    // Etape
    EtapePostController,
    EtapeDeleteController
];
