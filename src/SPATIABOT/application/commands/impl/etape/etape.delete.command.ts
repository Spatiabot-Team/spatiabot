export class EtapeDeleteCommand {

    etapeId: string;
    auteurId: string;

    constructor(etapeId: string, auteurId: string) {
        this.etapeId = etapeId;
        this.auteurId = auteurId;
    }
}
