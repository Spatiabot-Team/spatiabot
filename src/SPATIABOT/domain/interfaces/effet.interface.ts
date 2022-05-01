import {UniteInterface} from "./unite.interface";
import {EtapeInterface} from "./etape.interface";

export interface EffetInterface {

    id?: string;
    quantite?: number;
    texte?: string;
    type?: string;
    unite?: UniteInterface;
    etape?: EtapeInterface;

}
