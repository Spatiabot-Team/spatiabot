import axios from "axios";

export const byId = id => (i: any) => i.id == id;
export const withoutId = id => (i: any) => i.id != id;


export const byAttribute = attr => (a, b) => (a.order === b.order) ? 0 : (a.order < b.order) ? -1 : 1;

export const arrayToObject = (arr, keyField = "id") =>
    Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})));
/**
 * Create an object with a field in key and a suboject field in value
 * For example the reponses of etapes become from an array of etapes :
 *
 * {
 *     **idEtape** : Reponse[],
 *     **otherIdEtape** : Reponse[]
 * }
 *
 * @param arr
 * @param subObjectKey
 * @param keyField
 */
export const arrayToSubObject = (arr, subObjectKey, keyField = "id") =>
    Object.assign({}, ...arr.map(item => ({[item[keyField]]: item[subObjectKey]})));


export const axiosGet = async (url, commit, storeAction) => {
    return await axios.get(url)
        .then(({data}) => commit(storeAction, data))
        .catch(console.error);
}
