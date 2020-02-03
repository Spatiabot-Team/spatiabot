import {Model} from '@vuex-orm/core';

export default class Monde extends Model {

    static entity = 'mondes';
    static primaryKey = "id";

    static apiConfig = {baseURL: `/api/${Monde.entity}`};

    static fields() {
        return {
            id: this.attr(null),
            initialisation: this.attr(null),
            stats: this.attr(null),
            partie: this.attr(null),
        }
    };
}
