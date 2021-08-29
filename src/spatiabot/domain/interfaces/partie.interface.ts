import {JoueurItf} from "./joueur.interface";
import {StatItf} from "./stat.interface";
import {MondeItf} from "./monde.interface";

export interface PartieItf {

    id?: string;
    created?: Date;
    actif?: boolean;
    stats?: StatItf[];
    monde?: MondeItf;
    /** id of the discordGuild **/
    discordGuild?: string;
    joueurs?: JoueurItf[];

}
