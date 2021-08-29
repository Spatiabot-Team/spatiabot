import {StatItf} from "./stat.interface";
import {UniteItf} from "./unite.interface";
import {ScenarioItf} from "./scenario.interface";
import {PartieItf} from "./partie.interface";

export interface MondeItf {

    id?: string;
    code?: string;
    titre?: string;
    texte?: string;
    /** Ids User of the authors **/
    auteurs?: string[];
    statDefaults?: StatItf[];
    unites?: UniteItf[];
    scenarios?: ScenarioItf[];
    parties?: PartieItf[];

}
