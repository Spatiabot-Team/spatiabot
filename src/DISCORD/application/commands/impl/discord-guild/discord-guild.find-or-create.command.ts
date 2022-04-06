import {DiscordGuildInterface} from "../../../../domain/interfaces/discord-guild.interface";

export class DiscordGuildFindOrCreateCommand {

    discordGuild: DiscordGuildInterface;

    constructor(discordGuild: DiscordGuildInterface) {
        this.discordGuild = discordGuild;
    }
}
