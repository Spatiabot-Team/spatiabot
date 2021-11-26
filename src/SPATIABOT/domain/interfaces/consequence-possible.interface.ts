import {EtapeInterface} from "./etape.interface";
import {ReponseInterface} from "./reponse.interface";

export interface ConsequencePossibleInterface {

    id?: string;
    poids?: number;
    etapeSuivante?: EtapeInterface;
    reponse?: ReponseInterface;

}
