export class DejaDecolleException {

    message:string;

    constructor(joueur){
        this.message = "Oh, mais tu as déjà décollé, **" + joueur.user.name + "** !";
    }

}
