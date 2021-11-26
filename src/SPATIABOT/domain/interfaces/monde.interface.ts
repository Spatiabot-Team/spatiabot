import {ScenarioInterface} from "./scenario.interface";

export interface MondeInterface {

    id?: string;
    nom?: string;
    code?: string;
    description?: string;
    /** Ids User of the authors **/
    auteurIds?: string[];
    scenarios?: ScenarioInterface[];
    // statDefaults?: StatInterface[];
    // unites?: UniteInterface[];
    // scenarios?: ScenarioInterface[];
    // parties?: PartieInterface[];

}
