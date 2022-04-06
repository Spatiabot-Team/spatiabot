import {StatInterface} from "../interfaces/stat.interface";
import {UniteInterface} from "../interfaces/unite.interface";
import {ScenarioInterface} from "../interfaces/scenario.interface";
import {PartieInterface} from "../interfaces/partie.interface";
import {MondeInterface} from "../interfaces/monde.interface";
import {AuteurInterface} from "../interfaces/aueur.interface";

export class Monde implements MondeInterface {

    id?: string;
    code?: string;
    nom?: string;
    description?: string;
    /** Ids User of the authors **/
    auteurIds?: string[];
    auteurs?: AuteurInterface[];
    stats?: StatInterface[];
    unites?: UniteInterface[];
    scenarios?: ScenarioInterface[];
    parties?: PartieInterface[];

    constructor(monde: MondeInterface) {
        Object.assign(this, monde);
    }

    hasAuteur(auteurId) {
        return this.auteurIds && this.auteurIds.includes(auteurId);
    }

    addAuteurId(auteurId){
        this.auteurIds.push(auteurId);
    }

    removeAuteurId(auteurId) {
        if(this.auteurIds.length === 0) return null;

        const indexOfAuteur = this.auteurIds.indexOf(auteurId);
        if (indexOfAuteur === -1) return null;

        this.auteurIds.splice(indexOfAuteur, 1);

        return this.auteurIds;
    }

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
