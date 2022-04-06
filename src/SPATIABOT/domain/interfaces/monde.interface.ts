import {ScenarioInterface} from "./scenario.interface";
import {UniteInterface} from "./unite.interface";
import {StatInterface} from "./stat.interface";

export interface MondeInterface {

    id?: string;
    nom?: string;
    code?: string;
    slug?: string;
    description?: string;
    /** Ids User of the authors **/
    auteurIds?: string[];
    scenarios?: ScenarioInterface[];
    stats?: StatInterface[];
    unites?: UniteInterface[];
    // scenarios?: ScenarioInterface[];
    // parties?: PartieInterface[];

}
