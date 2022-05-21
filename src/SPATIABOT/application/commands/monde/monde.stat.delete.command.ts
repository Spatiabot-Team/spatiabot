export class MondeStatDeleteCommand {

    mondeId: string;
    userId: string;
    statId: string;

    constructor(mondeId: string, statId: string, userId: string) {
        this.mondeId = mondeId;
        this.statId = statId;
        this.userId = userId;
    }
}
