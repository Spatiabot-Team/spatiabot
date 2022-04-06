export class MondeAddAuteurCommand {

    mondeId: string;
    /** Auteur qui demande la suppression */
    auteurId: string;
    /** Auteur à retirer du monde */
    auteurToAddId: string;

    constructor(mondeId: string, auteurToAddId : string, auteurId: string) {
        this.mondeId = mondeId;
        this.auteurId = auteurId;
        this.auteurToAddId = auteurToAddId;
    }
}
