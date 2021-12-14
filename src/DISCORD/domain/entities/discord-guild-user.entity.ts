import {DiscordGuildUserInterface} from "../interfaces/discord-guild-user.interface";
import {DiscordGuildInterface} from "../interfaces/discord-guild.interface";

export class DiscordGuildUser implements DiscordGuildUserInterface {

    id?: string;
    permissions?: string;
    isOwner?: boolean;
    socialDiscordId?:string;
    discordGuild?: DiscordGuildInterface;
}
