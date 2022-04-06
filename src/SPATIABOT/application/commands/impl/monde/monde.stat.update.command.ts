import {StatInterface} from "../../../../domain/interfaces/stat.interface";

export class MondeStatUpdateCommand {

    mondeId: string;
    statId: string;
    userId: string;
    stat: StatInterface;

    constructor(mondeId: string, statId : string, stat: StatInterface, userId: string) {
        this.mondeId = mondeId;
        this.statId = statId;
        this.stat = stat;
        this.userId = userId;
    }
}
