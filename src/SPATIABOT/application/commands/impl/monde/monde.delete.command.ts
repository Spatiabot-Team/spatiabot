export class MondeDeleteCommand {

    mondeId: string;
    auteurId: string;

    constructor(mondeId: string, auteurId: string) {
        this.mondeId = mondeId;
        this.auteurId = auteurId;
    }
}
