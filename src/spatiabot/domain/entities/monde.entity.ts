import {StatItf} from "../interfaces/stat.interface";
import {UniteItf} from "../interfaces/unite.interface";
import {ScenarioItf} from "../interfaces/scenario.interface";
import {PartieItf} from "../interfaces/partie.interface";
import {MondeItf} from "../interfaces/monde.interface";

export class MondeEntity implements MondeItf {

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


    // appliquerEffet(effet: Effet) {
    //
    //     // @ts-ignore
    //     const stat = this.stats.find(s => s.unite.code === effet.unite.code);
    //     if (stat) {
    //         // @ts-ignore
    //         stat.quantite += effet.quantite;
    //     }
    //     return stat;
    // }
}
