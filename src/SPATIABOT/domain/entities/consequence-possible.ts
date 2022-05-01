import {ConsequencePossibleInterface} from "../interfaces/consequence-possible.interface";
import {ReponseInterface} from "../interfaces/reponse.interface";

export class ConsequencePossible implements ConsequencePossibleInterface {
    etapeSuivanteId: string;
    id: string;
    poids: number;
    reponse: ReponseInterface;

}
