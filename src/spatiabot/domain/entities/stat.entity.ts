import {PartieItf} from "../interfaces/partie.interface";
import {MondeItf} from "../interfaces/monde.interface";
import {UniteItf} from "../interfaces/unite.interface";

export class StatEntity {

    id?: string;
    quantite?: number;
    texte?: string;
    unite?: UniteItf;
    monde?: MondeItf;
    partie?: PartieItf;

}
