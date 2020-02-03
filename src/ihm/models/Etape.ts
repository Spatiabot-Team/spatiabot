import {Model} from '@vuex-orm/core';
import Reponse from "./Reponse";
import Effet from "./Effet";

export default class Etape extends Model {

    static entity = 'etapes';
    static primaryKey = "id";

    static apiConfig = {baseURL: `/api/${Etape.entity}`};

    static fields() {
        return {
            id: this.attr(null),
            titre: this.attr(null),
            texte: this.attr(null),
            order: this.attr(null),
            finScenario: this.attr(null),
            reponses: this.hasMany(Reponse, "etapeId"),
            effets: this.hasMany(Effet, "etapeId"),
            consequencePossibleOrigines: this.attr(null),
            scenarioId: this.attr(null),
        }
    };

    static remove(id) {
        // @ts-ignore
        Etape.api().delete(`/${id}`, {delete: id});
    }

    static postEffets(idEtape, effets) {

        const effetsFiltered = effets.map(e => ({
            quantite: e.quantite,
            texte: e.texte,
            unite: {
                id: e.unite.id
            }
        }));

        // @ts-ignore
        Etape.api().post(`/${idEtape}/effets`, {
            id: idEtape,
            effets : effetsFiltered
        });
    }

    static postReponses(idEtape, reponses) {

        const reponsesFiltered = reponses.map(reponse => ({
            titre : reponse.titre,
            texte : reponse.texte,
            libelle : reponse.libelle
        }));

        // @ts-ignore
        Etape.api().post(`/${idEtape}/reponses`, {
            id: idEtape,
            reponses : reponsesFiltered
        });
    }
}
