import {ConsequencePossibleInterface} from "./consequence-possible.interface";

export interface ReponseInterface {

    id?: string;
    titre?: string;
    texte?: string;
    libelle?: string;
    consequencePossibles?: ConsequencePossibleInterface[];
}
