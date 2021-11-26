import {MondeInterface} from "../../../../domain/interfaces/monde.interface";

export class MondeCreateCommand {

    monde: MondeInterface;

    constructor(monde: MondeInterface, auteurId : string) {
        this.monde = monde;
        this.monde.auteurIds = [auteurId];
    }
}
