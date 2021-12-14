export class PartieFindQuery {
    discordGuildUuid: string;
    mondeId: string;

    constructor(discordGuildUuid: string,mondeId : string) {
        this.discordGuildUuid = discordGuildUuid;
        this.mondeId = mondeId;
    }
}
