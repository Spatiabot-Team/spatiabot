import {DiscordGuildInterface} from "../../../domain/interfaces/discord-guild.interface";

export class CreateDiscordGuildFromDiscordCommand {
    discordGuild: DiscordGuildInterface;

    constructor(discordGuild: any) {
        this.discordGuild = discordGuild;
    }
}
