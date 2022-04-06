import {DiscordGuildInterface} from "../../../../domain/interfaces/discord-guild.interface";

export class DiscordGuildCreateCommand {

    discordGuild: DiscordGuildInterface;

    constructor(discordGuild: DiscordGuildInterface) {
        this.discordGuild = discordGuild;
    }
}
