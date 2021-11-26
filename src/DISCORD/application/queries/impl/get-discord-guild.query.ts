export class GetDiscordGuildQuery {
    discordGuildId: string;

    constructor(params: { discordGuildId?: string | null }) {
        this.discordGuildId = params.discordGuildId;
    }
}
