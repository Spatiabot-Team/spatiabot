/**
 * Permet d'aller chercher tous les auteurs d'un monde
 */
export class MondeGetAuteursdQuery {
    mondeId : string

    constructor(mondeId: string) {
        this.mondeId = mondeId;
    }
}
