import {ConsequencePossibleItf} from "../interfaces/consequence-possible.interface";
import {EtapeItf} from "../interfaces/etape.interface";
import {ReponseItf} from "../interfaces/reponse.interface";

export class ConsequencePossibleEntity implements ConsequencePossibleItf {
    etapeSuivante: EtapeItf;
    id: string;
    poids: number;
    reponse: ReponseItf;

}
