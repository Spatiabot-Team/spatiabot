import {ReponseInterface} from "./reponse.interface";
import {RandomPoidsInterface} from "./random-poids.interface";

export interface ConsequencePossibleInterface extends RandomPoidsInterface{

    id?: string;
    poids?: number;
    etapeSuivanteId?: string;
    reponse?: ReponseInterface;

}
