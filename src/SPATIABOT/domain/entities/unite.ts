import {UniteInterface} from "../interfaces/unite.interface";
import {EffetInterface} from "../interfaces/effet.interface";

export class Unite implements UniteInterface {
    id?: string;
    code?: string;
    libelle?: string;
    description?: string;
    mondeId?: string;
}
