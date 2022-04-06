import {DiscordGuildInterface} from "../interfaces/discord-guild.interface";

export class DiscordGuild implements DiscordGuildInterface {

    id?: string;
    discordGuildId: string;
    name: string;
    prefix: string;
    icon?: string;
}
