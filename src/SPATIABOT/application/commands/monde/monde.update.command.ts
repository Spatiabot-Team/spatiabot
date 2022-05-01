import {MondeInterface} from "../../../domain/interfaces/monde.interface";

export class MondeUpdateCommand {

    monde: MondeInterface;
    auteurId: string;

    constructor(monde: MondeInterface, auteurId: string) {
        this.monde = monde;
        this.auteurId = auteurId;
    }
}
