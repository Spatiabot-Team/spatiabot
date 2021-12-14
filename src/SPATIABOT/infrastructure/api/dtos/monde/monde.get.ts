/**
 * Format qui sera retourné lors de l'appel d'un monde
 */
export class MondeGet {
    id : string;
    nom : string;
    scenarios : {
        id : string;
        titre : string;
    }[]

}
