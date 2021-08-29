import {UniteItf} from "../interfaces/unite.interface";
import {EffetItf} from "../interfaces/effet.interface";

export class UniteEntity implements UniteItf {
    id?: string;
    code?: string;
    libelle?: string;
    description?: string;
    effets?: EffetItf
}
