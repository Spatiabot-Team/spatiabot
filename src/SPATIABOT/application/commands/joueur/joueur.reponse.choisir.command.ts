export class JoueurReponseChoisirCommand {

    joueurId: string;
    reponseLibelle: string;
    args ?: string[]


    constructor(joueurId: string, reponseLibelle: string, args: string[] = []) {
        this.joueurId = joueurId;
        this.reponseLibelle = reponseLibelle;
        this.args = args;
    }
}
