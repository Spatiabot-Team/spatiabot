import {UniteItf} from "./unite.interface";
import {EtapeItf} from "./etape.interface";

export interface EffetItf {

    id?: string;
    quantite?: number;
    texte?: string;
    type?: string;
    unite?: UniteItf;
    etape?: EtapeItf;

}
