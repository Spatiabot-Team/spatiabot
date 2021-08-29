import {EtapeItf} from "./etape.interface";
import {ReponseItf} from "./reponse.interface";

export interface ConsequencePossibleItf {

    id?: string;
    poids?: number;
    etapeSuivante?: EtapeItf;
    reponse?: ReponseItf;

}
