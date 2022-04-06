export class PartieFindQuery {
    discordGuildUuid: string;
    mondeId: string;

    constructor(mondeId : string,discordGuildUuid: string) {
        this.mondeId = mondeId;
        this.discordGuildUuid = discordGuildUuid;
    }
}
