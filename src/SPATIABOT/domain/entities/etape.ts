import {EtapeInterface} from "../interfaces/etape.interface";
import {ConsequencePossibleInterface} from "../interfaces/consequence-possible.interface";
import {EffetInterface} from "../interfaces/effet.interface";
import {ReponseInterface} from "../interfaces/reponse.interface";

export class Etape implements EtapeInterface {
    id: string;
    titre: string;
    texte: string;
    consequencePossibleOrigines?: ConsequencePossibleInterface[];
    effets?: EffetInterface[];
    finScenario: boolean = false;
    order: number;
    reponses: ReponseInterface[];
    scenarioId: string;
}
