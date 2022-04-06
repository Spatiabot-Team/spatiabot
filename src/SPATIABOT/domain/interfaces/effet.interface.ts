import {UniteInterface} from "./unite.interface";
import {EtapeInterface} from "./etape.interface";
import {ConsequencePossibleInterface} from "./consequence-possible.interface";

export interface EffetInterface {

    id?: string;
    quantite?: number;
    texte?: string;
    type?: string;
    unite?: UniteInterface;
    etape?: EtapeInterface;

}
