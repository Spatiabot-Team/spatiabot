import {EffetInterface} from "../interfaces/effet.interface";
import {EtapeInterface} from "../interfaces/etape.interface";
import {UniteInterface} from "../interfaces/unite.interface";

export class Effet implements EffetInterface {
    etape: EtapeInterface;
    id: string;
    quantite: number;
    texte: string;
    unite: UniteInterface;

}
