import {ReponseInterface} from "../../../domain/interfaces/reponse.interface";

export class ReponseCreateCommand {

    reponse: ReponseInterface;

    constructor(reponse: ReponseInterface) {
        this.reponse = reponse;
    }
}
