import {EtapeInterface} from "./etape.interface";

export interface ScenarioInterface {

    id?: string;
    titre?: string;
    slug?: string;
    auteurIds?: string[];
    auteurs?: any[];

    mondeId?: string;
    monde?: any;

    actif?: boolean;
    etapes?: EtapeInterface[];
}
