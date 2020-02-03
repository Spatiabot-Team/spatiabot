import {Model} from '@vuex-orm/core';
import Etape from "./Etape";
import ConsequencePossible from "./ConsequencePossible";

export default class Reponse extends Model {

    static entity = 'reponses';
    static primaryKey = "id";

    static apiConfig = {baseURL: `/api/${Reponse.entity}`};

    static fields() {
        return {
            id: this.attr(null),
            titre : this.string(null),
            texte : this.string(null),
            libelle:  this.attr(null),
            consequencePossibles:  this.hasMany(ConsequencePossible,"reponseId"),
            etapeId : this.attr(null)
        }
    }

    static remove(id) {
        // @ts-ignore
        Reponse.api().delete(`/${id}`, {delete: id});
    }

    static postConsequencePossibles(idReponse, consequencePossibles) {

        const consequencePossiblesFiltered = consequencePossibles.map(cp => ({
            poids: cp.poids,
            etapeSuivante : cp.etapeSuivante
        }));

        // @ts-ignore
        Reponse.api().post(`/${idReponse}/consequence-possibles`, {
            id: idReponse,
            consequencePossibles : consequencePossiblesFiltered
        });
    }
}
