import {JoueurInterface} from "./joueur.interface";
import {StatInterface} from "./stat.interface";
import {MondeInterface} from "./monde.interface";
import {ConsequencePossibleInterface} from "./consequence-possible.interface";

export interface PartieInterface {

    id?: string;
    created?: Date;
    actif?: boolean;
    stats?: StatInterface[];
    monde?: MondeInterface;
    mondeId?: string;
    /** id of the discordGuild **/
    discordGuildUuid?: string;
    joueurs?: JoueurInterface[];

}
