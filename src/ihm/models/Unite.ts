import {Model} from '@vuex-orm/core';

export default class Unite extends Model {

    static entity = 'unites';
    static primaryKey = "id";

    static apiConfig = {baseURL: `/api/${Unite.entity}`};

    static fields() {
        return {
            id: this.attr(null),
            code: this.attr(null),
            libelle: this.attr(null),
            description: this.attr(null),
        }
    };
}
