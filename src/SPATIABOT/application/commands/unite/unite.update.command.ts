import {UniteInterface} from "../../../domain/interfaces/unite.interface";

export class UniteUpdateCommand {

    unite: UniteInterface;
    auteurId: string;

    constructor(unite: UniteInterface, auteurId: string) {
        this.unite = unite;
        this.auteurId = auteurId;
    }
}
