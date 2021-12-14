import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";

export class EtapeUpdateCommand {

    etape: EtapeInterface;
    auteurId: string;

    constructor(etape: EtapeInterface, auteurId: string) {
        this.etape = etape;
        this.auteurId = auteurId;
    }
}
