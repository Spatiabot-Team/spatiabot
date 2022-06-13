import {UniteInterface} from "../interfaces/unite.interface";
import {PorteeEnum} from "../enums/portee.enum";

export class Unite implements UniteInterface {
    id?: string;
    code?: string;
    libelle?: string;
    description?: string;
    mondeId?: string;
    portee?: PorteeEnum;
}
