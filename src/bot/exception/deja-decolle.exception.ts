import {Joueur} from "../../database/entity/joueur.entity";

export class DejaDecolleException {

    message:string;

    constructor(joueur:Joueur){
        this.message = "Oh, mais tu as déjà décollé, **" + joueur.user.socialDiscord.username + "** !";
    }

}
