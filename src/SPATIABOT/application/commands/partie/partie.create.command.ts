import {PartieInterface} from "../../../domain/interfaces/partie.interface";

export class PartieCreateCommand {

    partie: PartieInterface;

    constructor(partie: PartieInterface) {
        this.partie = partie;
    }
}
