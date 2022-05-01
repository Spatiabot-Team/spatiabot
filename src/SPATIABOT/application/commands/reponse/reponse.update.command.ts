import {ReponseInterface} from "../../../domain/interfaces/reponse.interface";

export class ReponseUpdateCommand {

    reponse: ReponseInterface;
    auteurId: string;

    constructor(reponse: ReponseInterface, auteurId: string) {
        this.reponse = reponse;
        this.auteurId = auteurId;
    }
}
