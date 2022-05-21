/**
 * Permet de trouver un monde qui correspond à au moins une des attributs du monde passé en paramètre
 * (si l'attribut est null il ne sera pas pris en compte)
 */
import {MondeInterface} from "../../../domain/interfaces/monde.interface";

export class MondeFindQuery {

    /**
     * {id, code}
     */
    monde: { id?: string, code?: string, slug?: string,slugOrId? : string };

    constructor(monde: MondeInterface) {

        let m: any = {};

        if (monde.id && monde.id.length > 0) {
            m.id = monde.id;
        }

        if (monde.code && monde.code.length > 0) {
            m.code = monde.code;
        }

        if (monde.slug && monde.slug.length > 0) {
            m.slug = monde.slug;
        }

        this.monde = m;
    }
}
