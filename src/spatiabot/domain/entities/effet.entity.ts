import {EffetItf} from "../interfaces/effet.interface";
import {EtapeItf} from "../interfaces/etape.interface";
import {UniteItf} from "../interfaces/unite.interface";

export class EffetEntity implements EffetItf {
    etape: EtapeItf;
    id: string;
    quantite: number;
    texte: string;
    type: string;
    unite: UniteItf;

}
