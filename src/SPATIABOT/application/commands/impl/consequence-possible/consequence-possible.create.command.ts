import {ConsequencePossibleInterface} from "../../../../domain/interfaces/consequence-possible.interface";

export class ConsequencePossibleCreateCommand {

    Consequencepossible: ConsequencePossibleInterface;

    constructor(Consequencepossible: ConsequencePossibleInterface) {
        this.Consequencepossible = Consequencepossible;
    }
}
