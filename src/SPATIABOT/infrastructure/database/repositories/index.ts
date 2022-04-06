import {PartieRepository} from "./partie.repository";
import {ScenarioRepository} from "./scenario.repository";
import {MondeRepository} from "./monde.repository";
import {UniteRepository} from "./unite.repository";
import {EtapeRepository} from "./etape.repository";
import {ConsequencePossibleRepository} from "./consequence-possible.repository";
import {EffetRepository} from "./effet.repository";
import {ReponseRepository} from "./reponse.repository";
import {JoueurRepository} from "./joueur.repository";
import {StatRepository} from "./stat.repository";

export const repositoriesSpatiabot = [
    PartieRepository,
    ScenarioRepository,
    MondeRepository,
    EtapeRepository,
    UniteRepository,
    ReponseRepository,
    ConsequencePossibleRepository,
    EffetRepository,
    JoueurRepository,
    StatRepository,
]
