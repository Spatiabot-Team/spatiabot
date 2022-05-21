import {EffetInterface} from "../../../domain/interfaces/effet.interface";

export class EffetCreateCommand {

    Effet: EffetInterface;

    constructor(Effet: EffetInterface) {
        this.Effet = Effet;
    }
}
