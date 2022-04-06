import {MondeHasNotThisAuteurException} from "../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeIsAuteurQuery} from "./monde.is-auteur.query";


/**
 * Vérifie que l'utilisateur passé en query est bien auteur du monde passé en query
 */
export class MondeIsAuteurValidation {

    constructor() {
    }

    async execute(query: MondeIsAuteurQuery): Promise<boolean> {

        if (!query.monde.hasAuteur(query.userId)) {
            throw new MondeHasNotThisAuteurException();
        }

        return true;
    }
}
