import {PartieInterface} from "../../../../domain/interfaces/partie.interface";
import {UserInterface} from "../../../../../USER/domain/interfaces/user.interface";

export class JoueurCreateCommand {

    partie: PartieInterface;
    user: UserInterface;

    constructor(partie: PartieInterface, user: UserInterface) {
        this.partie = partie;
        this.user = user;
    }
}
