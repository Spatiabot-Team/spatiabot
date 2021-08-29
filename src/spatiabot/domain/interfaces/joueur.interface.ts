import {EtapeItf} from "./etape.interface";
import {StatItf} from "./stat.interface";
import {PartieItf} from "./partie.interface";
import {EtapeEtatEnum} from "../enums/etape-etat.enum";

export interface JoueurItf {

    id?: string;
    /** idUser **/
    user?: string;
    etapeEnCours?: EtapeItf;
    etapeEnCoursEtat?: EtapeEtatEnum;
    etapeDateAffichage?: Date;
    partie?: PartieItf;
    /** id des scenarios déjà effectués **/
    scenarioEffectues?: string[];
    stats?: StatItf[];
}
