import {ReponseInterface} from "./reponse.interface";
import {EffetInterface} from "./effet.interface";
import {ConsequencePossibleInterface} from "./consequence-possible.interface";
import {ScenarioInterface} from "./scenario.interface";

export interface EtapeInterface {

    id?: string;
    titre?: string;
    texte?: string;
    order?: number;
    premiereEtape?: boolean;
    finScenario?: boolean;

    // Parents
    scenarioId?: string;
    scenario?: ScenarioInterface;

    // Childrens
    reponses?: ReponseInterface[];
    effets?: EffetInterface[];
    consequencePossibleOrigines?: ConsequencePossibleInterface[];
}
