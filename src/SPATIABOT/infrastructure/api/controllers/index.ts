import {AuteurFindByIdsController} from "./auteur/auteur.find-by-ids.controller";
import {AuteurFindController} from "./auteur/auteur.find.controller";
import {ConsequencePossibleDeleteController} from "./consequence-possible/consequence-possible.delete.controller";
import {ConsequencePossibleGetByIdController} from "./consequence-possible/consequence-possible.get-by-id.controller";
import {ConsequencePossibleGetController} from "./consequence-possible/consequence-possible.get.controller";
import {ConsequencePossiblePostController} from "./consequence-possible/consequence-possible.post.controller";
import {ConsequencePossiblePutController} from "./consequence-possible/consequence-possible.put.controller";
import {EffetDeleteController} from "./effet/effet.delete.controller";
import {EffetGetByIdController} from "./effet/effet.get-by-id.controller";
import {EffetGetController} from "./effet/effet.get.controller";
import {EffetPostController} from "./effet/effet.post.controller";
import {EffetPutController} from "./effet/effet.put.controller";
import {EtapeDeleteController} from "./etape/etape.delete.controller";
import {EtapeGetByIdController} from "./etape/etape.get-by-id.controller";
import {EtapeGetController} from "./etape/etape.get.controller";
import {EtapePostController} from "./etape/etape.post.controller";
import {EtapePutController} from "./etape/etape.put.controller";
import {JoueurDeleteController} from "./joueur/joueur.delete.controller";
import {JoueurGetByIdController} from "./joueur/joueur.get-by-id.controller";
import {MessagePostController} from "./message/message.post.controller";
import {MondeAddAuteurController} from "./monde/monde.add-auteur.controller";
import {MondeByConnectedUserController} from "./monde/monde.by-connected-user.controller";
import {MondeDeleteAuteurController} from "./monde/monde.delete-auteur.controller";
import {MondeDeleteController} from "./monde/monde.delete.controller";
import {MondeGetByIdController} from "./monde/monde.get-by-id.controller";
import {MondePartiesGetController} from "./monde/monde.parties.get.controller";
import {MondePostController} from "./monde/monde.post.controller";
import {MondePutController} from "./monde/monde.put.controller";
import {MondeScenariosGetController} from "./monde/monde.scenarios.get.controller";
import {MondeScenariosPostController} from "./monde/monde.scenarios.post.controller";
import {MondeStatsDeleteController} from "./monde/monde.stats.delete.controller";
import {MondeStatsPostController} from "./monde/monde.stats.post.controller";
import {MondeStatsPutController} from "./monde/monde.stats.put.controller";
import {PartieController} from "./partie/partie.controller";
import {PartieFindController} from "./partie/partie.find.controller";
import {PartiePostController} from "./partie/partie.post.controller";
import {ReponseDeleteController} from "./reponse/reponse.delete.controller";
import {ReponseGetByIdController} from "./reponse/reponse.get-by-id.controller";
import {ReponseGetController} from "./reponse/reponse.get.controller";
import {ReponsePostController} from "./reponse/reponse.post.controller";
import {ReponsePutController} from "./reponse/reponse.put.controller";
import {ScenarioAddAuteurController} from "./scenario/scenario.add-auteur.controller";
import {ScenarioDeleteController} from "./scenario/scenario.delete.controller";
import {ScenarioGetByIdController} from "./scenario/scenario.get-by-id.controller";
import {ScenarioGetBySlugController} from "./scenario/scenario.get-by-slug.controller";
import {ScenarioGetController} from "./scenario/scenario.get.controller";
import {ScenarioPostWithDependanciesController} from "./scenario/scenario.post-with-dependancies.controller";
import {ScenarioPostController} from "./scenario/scenario.post.controller";
import {ScenarioPutController} from "./scenario/scenario.put.controller";
import {SystemeInitDbController} from "./systeme/systeme.init-db.controller";
import {UniteDeleteController} from "./unite/unite.delete.controller";
import {UnitePostController} from "./unite/unite.post.controller";
import {UnitePutController} from "./unite/unite.put.controller";

export const Controllers = [
    // Auteur
    AuteurFindByIdsController,
    AuteurFindController,

    // Consequence-possible
    ConsequencePossibleDeleteController,
    ConsequencePossibleGetByIdController,
    ConsequencePossibleGetController,
    ConsequencePossiblePostController,
    ConsequencePossiblePutController,

    // Effet
    EffetDeleteController,
    EffetGetByIdController,
    EffetGetController,
    EffetPostController,
    EffetPutController,

    // Etape
    EtapeDeleteController,
    EtapeGetByIdController,
    EtapeGetController,
    EtapePostController,
    EtapePutController,

    // Joueur
    JoueurDeleteController,
    JoueurGetByIdController,

    // Message
    MessagePostController,

    // Monde
    MondeAddAuteurController,
    MondeByConnectedUserController,
    MondeDeleteAuteurController,
    MondeDeleteController,
    MondeGetByIdController,
    MondePartiesGetController,
    MondePostController,
    MondePutController,
    MondeScenariosGetController,
    MondeScenariosPostController,
    MondeStatsDeleteController,
    MondeStatsPostController,
    MondeStatsPutController,

    // Partie
    PartieController,
    PartieFindController,
    PartiePostController,

    // Reponse
    ReponseDeleteController,
    ReponseGetByIdController,
    ReponseGetController,
    ReponsePostController,
    ReponsePutController,

    // Scenario
    ScenarioAddAuteurController,
    ScenarioDeleteController,
    ScenarioGetByIdController,
    ScenarioGetBySlugController,
    ScenarioGetController,
    ScenarioPostWithDependanciesController,
    ScenarioPostController,
    ScenarioPutController,

    // Systeme
    SystemeInitDbController,

    // Unite
    UniteDeleteController,
    UnitePostController,
    UnitePutController,
];