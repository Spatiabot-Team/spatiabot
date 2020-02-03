import {Model} from '@vuex-orm/core';
import Etape from "./Etape";

export default class ConsequencePossible extends Model {

    static entity = 'consequence-possibles';
    static primaryKey = "id";

    static apiConfig = {baseURL: `/api/${ConsequencePossible.entity}`};

    static fields() {
        return {
            id: this.attr(null),
            poids: this.number(null),
            etapeSuivante : this.belongsTo(Etape,"etapeSuivanteId"),
            etapeSuivanteId : this.attr(null),
            reponseId : this.attr(null)
        }
    }

    static remove(id) {
        // @ts-ignore
        ConsequencePossible.api().delete(`/${id}`, {delete: id});
    }
}
