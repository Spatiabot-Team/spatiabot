import {ConsequencePossibleItf} from "./consequence-possible.interface";

export interface ReponseItf {

    id?: string;
    titre?: string;
    texte?: string;
    libelle?: string;
    consequencePossibles?: ConsequencePossibleItf[];
}
