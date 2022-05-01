import {PartieInterface} from "../interfaces/partie.interface";
import {MondeInterface} from "../interfaces/monde.interface";
import {UniteInterface} from "../interfaces/unite.interface";

export class Stat {

    id?: string;
    quantite?: number;
    texte?: string;
    unite?: UniteInterface;
    monde?: MondeInterface;
    partie?: PartieInterface;

}
