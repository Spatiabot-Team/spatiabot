import {RandomPoidsInterface} from "../interfaces/random-poids.interface";
import {ConsequencePossible} from "../entity/consequence-possible.entity";

export const ToolService = {

    /**
     * Retire toutes les clefs recursivement qui ont une valeur à undefined
     * @param obj
     */
    clearUndefined: (obj: any) => {
        for (let item in obj) {
            if (typeof item === 'object') {
                ToolService.clearUndefined(item);
            } else if (typeof obj[item] === 'object') {
                ToolService.clearUndefined(obj[item]);
            } else if (obj[item] === undefined) {
                delete obj[item];
            }
        }
        return obj;
    },

    /**
     * On totalise les poids items du tableau
     * On détermine un nombre entre 0 et ce poids
     * On additionne au fur et à mesure les poids des conséquences poddibles jusqu'à ce que cela dépasse ce nombre
     * Dès que l'une d'elle dépasse alors c'est celle ci qui a lieu
     *
     * Exemple  {libelle:poids}  [ {a:3},{b:5},{c:2}]
     * poidsTotal = 10
     * nombre aléatoire entre 0 et 10 : 4.5
     * poidsCummule = a = 3 : ne dépasse pas 4.5 donc on continue
     * poidsCummule = a + b  : dépasse 4.5 donc on s'arrête, c'est b qui est choisi !
     *
     * @param tab <T>[]
     * @return T
     */
    randomItemByPoids: <T extends RandomPoidsInterface>(tab: T[]):T => {
        const poidsTotal = tab.reduce((acc, curr) => acc += curr.poids, 0);
        const nombreAlea = Math.random() * poidsTotal;
        let poidsCummul = 0;
        let res = null;
        for(const item of tab){
            poidsCummul += item.poids;
            if (poidsCummul > nombreAlea && res === null) {
                res = item;
            }
        }
        return res;
    },
};
