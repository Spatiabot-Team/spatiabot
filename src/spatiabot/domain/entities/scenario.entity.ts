import {ScenarioItf} from "../interfaces/scenario.interface";
import {EtapeItf} from "../interfaces/etape.interface";

export class ScenarioEntity implements ScenarioItf {
    actif: boolean;
    etapes: EtapeItf[];
    id: string;
    premiereEtape: string | null;
    titre: string;
}
