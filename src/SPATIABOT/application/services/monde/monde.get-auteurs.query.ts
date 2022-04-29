/**
 * Permet d'aller chercher tous les auteurs d'un monde
 */
export class MondeGetAuteursQuery {
    mondeId : string

    constructor(mondeId: string) {
        this.mondeId = mondeId;
    }
}
