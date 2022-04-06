import {StatInterface} from "../../../../domain/interfaces/stat.interface";

export class StatCreateCommand {

    stat: StatInterface;

    constructor(stat: StatInterface) {
        this.stat = stat;
    }
}
