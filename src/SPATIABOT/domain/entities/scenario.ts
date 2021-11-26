import {ScenarioInterface} from "../interfaces/scenario.interface";
import {EtapeInterface} from "../interfaces/etape.interface";
import {AuteurInterface} from "../interfaces/aueur.interface";

export class Scenario implements ScenarioInterface {
    actif: boolean;
    etapes: EtapeInterface[];
    id: string;
    premiereEtape: string | null;
    titre: string;
    mondeId : string;
    auteurIds?: string[];
    auteurs?: AuteurInterface[];

    hasAuteur(auteurId) {
        return this.auteurIds && this.auteurIds.includes(auteurId);
    }
}
