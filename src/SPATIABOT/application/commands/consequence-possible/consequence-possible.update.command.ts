import {ConsequencePossibleInterface} from "../../../domain/interfaces/consequence-possible.interface";

export class ConsequencePossibleUpdateCommand {

    consequencePossible: ConsequencePossibleInterface;
    auteurId: string;

    constructor(consequencePossible: ConsequencePossibleInterface, auteurId: string) {
        this.consequencePossible = consequencePossible;
        this.auteurId = auteurId;
    }
}
