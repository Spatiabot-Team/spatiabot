import {DiscordGuildInterface} from "./discord-guild.interface";

export class DiscordGuildUserInterface {

    id?: string;
    permissions?: string;
    isOwner?: boolean;
    socialDiscordId?:string;
    discordGuild?: DiscordGuildInterface;

}
