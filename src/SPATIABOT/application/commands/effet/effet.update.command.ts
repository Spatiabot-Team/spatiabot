import {EffetInterface} from "../../../domain/interfaces/effet.interface";

export class EffetUpdateCommand {

    effet: EffetInterface;
    auteurId: string;

    constructor(effet: EffetInterface, auteurId: string) {
        this.effet = effet;
        this.auteurId = auteurId;
    }
}
