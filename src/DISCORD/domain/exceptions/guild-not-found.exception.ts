export class GuildNotFoundException extends Error{

    constructor(discordGuildId:string) {
        super(`GUILD_NOT_FOUND ${discordGuildId}`);
    }
}
