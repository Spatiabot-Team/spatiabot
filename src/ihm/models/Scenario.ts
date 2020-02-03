import {Model} from '@vuex-orm/core';
import Etape from "./Etape";

export default class Scenario extends Model {

    static entity = 'scenarios';
    static primaryKey = "id";

    static apiConfig = {baseURL: `/api/${Scenario.entity}`};

    static fields() {
        return {
            id: this.attr(null),
            titre: this.string(null),
            actif: this.boolean(null),
            premiereEtape: this.attr(null),
            etapes: this.hasMany(Etape, 'scenarioId')
        }
    }

    static makeRelations(query) {
        return query.with('etapes')
            .with('etapes.reponses')
            .with('etapes.reponses.consequencePossibles')
            .with('etapes.reponses.consequencePossibles.etapeSuivante')
            .with('etapes.effets')
            .with('etapes.effets.unite');
    }

    static findDeep(id) {
        return this.makeRelations(Scenario.query())
            .where('id', id)
            .first();
    }

    static fetchAllDeep() {
        return this.makeRelations(Scenario.query())
            .all();
    }

    static edit(id, fields) {
        // @ts-ignore
        return Scenario.api().put(`/${id}`, {id, ...fields});
    }
}
