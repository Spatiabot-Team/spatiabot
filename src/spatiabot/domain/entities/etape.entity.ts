import {EtapeItf} from "../interfaces/etape.interface";
import {ConsequencePossibleItf} from "../interfaces/consequence-possible.interface";
import {EffetItf} from "../interfaces/effet.interface";
import {ReponseItf} from "../interfaces/reponse.interface";
import {ScenarioItf} from "../interfaces/scenario.interface";

export class EtapeEntity implements EtapeItf {
    consequencePossibleOrigines: ConsequencePossibleItf[];
    effets: EffetItf[];
    finScenario: boolean;
    id: string;
    order: number;
    reponses: ReponseItf[];
    scenario: ScenarioItf;
    texte: string;
    titre: string;
}
