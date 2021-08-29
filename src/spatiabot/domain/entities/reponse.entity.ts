import {ConsequencePossibleItf} from "../interfaces/consequence-possible.interface";
import {ReponseItf} from "../interfaces/reponse.interface";

export class ReponseEntity implements ReponseItf {

    id?: string;
    titre?: string;
    texte?: string;
    libelle?: string;
    consequencePossibles?: ConsequencePossibleItf[];
}
