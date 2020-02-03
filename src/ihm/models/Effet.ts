import {Model} from '@vuex-orm/core';
import Unite from "./Unite";

export default class Effet extends Model {

    static entity = 'effets';
    static primaryKey = "id";

    static apiConfig = {baseURL: `/api/${Effet.entity}`};

    static fields() {
        return {
            id: this.attr(null),
            quantite: this.attr(null),
            texte: this.attr(null),
            type: this.attr(null),
            uniteId: this.attr(null),
            unite: this.belongsTo(Unite, "uniteId"),
            etapeId: this.attr(null),
        }
    };

    static edit(id, effet) {
        const effetFiltered = {
            id,
            quantite: effet.quantite,
            texte: effet.texte,
            unite: {id: effet.unite.id}
        };

        // @ts-ignore
        Effet.api().put(`${id}`, effetFiltered)
    };

    static remove(id) {
        // @ts-ignore
        Effet.api().delete(`/${id}`, {delete: id});
    };
}
