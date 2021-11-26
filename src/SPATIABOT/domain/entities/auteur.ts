import {AuteurInterface} from "../interfaces/aueur.interface";
import {UserInterface} from "../../../USER/domain/interfaces/user.interface";

export class Auteur implements AuteurInterface {
    userId?: string;
    username?: string;
    avatar?: string;

    constructor(auteur: AuteurInterface) {
        Object.assign(this, auteur);
    }

    static assignUser(user: UserInterface) : Auteur {
        const {username, avatar, id: userId, ...rest} = user;
        return new Auteur({
            username,
            avatar,
            userId
        });
    }
}
