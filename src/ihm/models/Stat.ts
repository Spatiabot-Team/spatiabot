import {Model} from '@vuex-orm/core';
import Etape from "./Etape";

export default class Stat extends Model {

    static entity = 'stats';
    static primaryKey = "id";

    static apiConfig = {baseURL: `/api/${Stat.entity}`};

    static fields() {
        return {
            id: this.attr(null),
            quantite : this.string(null),
            texte : this.string(null),
            unite:  this.attr(null),
        }
    }
}
