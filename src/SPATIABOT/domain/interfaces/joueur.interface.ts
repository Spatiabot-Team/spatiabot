import {EtapeInterface} from "./etape.interface";
import {StatInterface} from "./stat.interface";
import {PartieInterface} from "./partie.interface";
import {EtapeEtatEnum} from "../enums/etape-etat.enum";
import {UserInterface} from "../../../USER/domain/interfaces/user.interface";

export interface JoueurInterface {

    id?: string;
    /** idUser **/
    userId?: string;
    etapeEnCours?: EtapeInterface;
    etapeEnCoursEtat?: EtapeEtatEnum;
    etapeDateAffichage?: Date;
    partie?: PartieInterface;
    user?: UserInterface;
    /** id des scenarios déjà effectués **/
    scenarioEffectues?: string[];
    stats?: StatInterface[];
}
