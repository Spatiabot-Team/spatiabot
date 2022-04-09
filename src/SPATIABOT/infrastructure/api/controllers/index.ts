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
import {ConsequencePossibleDeleteController} from "./consequence-possible/consequence-possible.delete.controller";
import {ConsequencePossibleGetByIdController} from "./consequence-possible/consequence-possible.get-by-id.controller";
import {ConsequencePossibleGetController} from "./consequence-possible/consequence-possible.get.controller";
import {ConsequencePossiblePostController} from "./consequence-possible/consequence-possible.post.controller";
import {ScenarioDeleteController} from "./scenario/scenario.delete.controller";
import {ScenarioAddAuteurController} from "./scenario/scenario.add-auteur.controller";
import {ScenarioPutController} from "./scenario/scenario.put.controller";
import {ReponseGetController} from "./reponse/reponse.get.controller";
import {ReponseDeleteController} from "./reponse/reponse.delete.controller";
import {ReponseGetByIdController} from "./reponse/reponse.get-by-id.controller";
import {EtapePutController} from "./etape/etape.put.controller";
import {EtapeGetController} from "./etape/etape.get.controller";
import {EtapeGetByIdController} from "./etape/etape.get-by-id.controller";
import {EffetGetController} from "./effet/effet.get.controller";
import {EffetDeleteController} from "./effet/effet.delete.controller";
import {EffetGetByIdController} from "./effet/effet.get-by-id.controller";
import {EffetPostController} from "./effet/effet.post.controller";
import {ReponsePostController} from "./reponse/reponse.post.controller";
import {EffetPutController} from "./effet/effet.put.controller";
import {ConsequencePossiblePutController} from "./consequence-possible/consequence-possible.put.controller";
import {ReponsePutController} from "./reponse/reponse.put.controller";
import {MondeScenariosGetController} from "./monde/monde.scenarios.get.controller";
import {ScenarioGetBySlugController} from "./scenario/scenario.get-by-slug.controller";
import {PartieFindController} from "./partie/partie.find.controller";
import {PartiePostController} from "./partie/partie.post.controller";
import {MondeStatsPostController} from "./monde/monde.stats.post.controller";
import {MondeStatsDeleteController} from "./monde/monde.stats.delete.controller";
import {MondeStatsPutController} from "./monde/monde.stats.put.controller";
import {SystemeInitDbController} from "./systeme/systeme.init-db.controller";
import {AuteurFindByIdsController} from "./auteur/auteur.find-by-ids.controller";

export const Controllers = [

    // Partie
    PartieFindController,
    PartiePostController,

    // Monde
    MondeByConnectedUserController,
    MondeScenariosGetController,
    MondeGetByIdController, // Ce controller doit absolument être après les autres get car /:id prendrait le nom des autres
    MondePostController,
    MondePutController,
    MondeDeleteController,
    MondeDeleteAuteurController,
    MondeAddAuteurController,
    MondeStatsPostController,
    MondeStatsDeleteController,
    MondeStatsPutController,

    // Auteur
    AuteurFindController,
    AuteurFindByIdsController,

    // Unite
    UnitePostController,
    UnitePutController,
    UniteDeleteController,

    // Scenario
    ScenarioGetController,
    ScenarioGetBySlugController,
    ScenarioGetByIdController,
    ScenarioPostController,
    ScenarioDeleteController,
    ScenarioPutController,
    ScenarioAddAuteurController,

    // Etape
    EtapePostController,
    EtapePutController,
    EtapeDeleteController,
    EtapeGetController,
    EtapeGetByIdController,

    //Effet
    EffetDeleteController,
    EffetPostController,
    EffetPutController,
    EffetGetController,
    EffetGetByIdController,

    // Reponse
    ReponsePostController,
    ReponsePutController,
    ReponseDeleteController,
    ReponseGetController,
    ReponseGetByIdController,

    // ConséquencePossible
    ConsequencePossibleDeleteController,
    ConsequencePossiblePostController,
    ConsequencePossiblePutController,
    ConsequencePossibleGetController,
    ConsequencePossibleGetByIdController,

    // Système
    SystemeInitDbController
];
