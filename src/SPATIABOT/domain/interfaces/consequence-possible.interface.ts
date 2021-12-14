import {ReponseInterface} from "./reponse.interface";

export interface ConsequencePossibleInterface {

    id?: string;
    poids?: number;
    etapeSuivanteId?: string;
    reponse?: ReponseInterface;

}
