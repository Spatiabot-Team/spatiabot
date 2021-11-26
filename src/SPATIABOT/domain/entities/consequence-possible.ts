import {ConsequencePossibleInterface} from "../interfaces/consequence-possible.interface";
import {EtapeInterface} from "../interfaces/etape.interface";
import {ReponseInterface} from "../interfaces/reponse.interface";

export class ConsequencePossible implements ConsequencePossibleInterface {
    etapeSuivante: EtapeInterface;
    id: string;
    poids: number;
    reponse: ReponseInterface;

}
