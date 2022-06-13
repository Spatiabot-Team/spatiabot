import {Column} from "typeorm";
import {PorteeEnum} from "../enums/portee.enum";

/**
 * Définit l'unité d'un effet
 * cela peut être par exemple :
 *  - les pirates présents dans l'espace
 *  - les pirates présents sur la planète Gamède
 *  - les pvs d'un joueur
 *  - les pvs de tous les joueurs
 *  - ...
 */
export interface UniteInterface {

    id?: string;

    /**
     * Indicatif rapide de l'unité (exemple : "pv")
     */
    code?: string;

    /**
     * Libelle de l'unité (exemple : "points de vie")
     */
    libelle?: string;

    /**
     * Donne le détail de l'unité, son utilité
     * (exemple : "l'unité point de vie impacte le nombre de point de vie d'un joueur,
     * un nombre négatif retirera de la vie au joueur contrairement à un nombre positif qui en ajoutera")
     */
    description?: string;

    portee?: PorteeEnum;

    /**
     * Id du monde auquel est rattaché l'unité
     */
    mondeId?: string;

    monde?: any;
}
