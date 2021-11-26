import {ConsequencePossibleInterface} from "../interfaces/consequence-possible.interface";
import {ReponseInterface} from "../interfaces/reponse.interface";

export class Reponse implements ReponseInterface {

    id?: string;
    titre?: string;
    texte?: string;
    libelle?: string;
    consequencePossibles?: ConsequencePossibleInterface[];
}
