export class MondeDeleteAuteurCommand {

    mondeId: string;
    /** Auteur qui demande la suppression */
    auteurId: string;
    /** Auteur à retirer du monde */
    auteurToRemoveId: string;

    constructor(mondeId: string, auteurToRemoveId : string, auteurId: string) {
        this.mondeId = mondeId;
        this.auteurId = auteurId;
        this.auteurToRemoveId = auteurToRemoveId;
    }
}
