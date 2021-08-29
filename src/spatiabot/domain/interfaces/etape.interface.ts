import {ScenarioItf} from "./scenario.interface";
import {ReponseItf} from "./reponse.interface";
import {EffetItf} from "./effet.interface";
import {ConsequencePossibleItf} from "./consequence-possible.interface";

export interface EtapeItf {

    id?: string;
    titre?: string;
    texte?: string;
    order?: number;
    finScenario?: boolean;
    scenario?: ScenarioItf;
    reponses?: ReponseItf[];
    effets?: EffetItf[];
    consequencePossibleOrigines?: ConsequencePossibleItf[];
}
