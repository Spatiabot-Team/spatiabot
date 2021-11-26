/**
 * Permet d'ajouter un joueur à une partie
 * @throws DejaDecolleException
 */
import {Joueur} from "../../../../domain/entities/joueur";
import {Partie} from "../../../../domain/entities/partie";

export class ActionDecollageCommand {

    /**
     * Partie dans laquelle on veut ajouter un joueur
     */

    partie: Partie;

    /**
     * Nouveau joueur à ajouter à la partie
     */
    newJoueur: Joueur;

    /**
     *
     * @param partie partie en cours
     * @param newJoueur informations pour créer un nouveau jouer à ajouter à la partie
     */
    constructor(partie: Partie, newJoueur: Joueur) {
        this.partie = partie;
        this.newJoueur = newJoueur;
    }
}
