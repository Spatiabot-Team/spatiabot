import {DiscordGuildUserInterface} from "../../../../domain/interfaces/discord-guild-user.interface";

export class DiscordGuildUserCreateCommand {

    discordGuildUser: DiscordGuildUserInterface;

    constructor(discordGuildUser: DiscordGuildUserInterface) {
        this.discordGuildUser = discordGuildUser;
    }
}
