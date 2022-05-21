import {EtapeEtatEnum} from "../enums/etape-etat.enum";
import {JoueurInterface} from "../interfaces/joueur.interface";
import {EtapeInterface} from "../interfaces/etape.interface";
import {PartieInterface} from "../interfaces/partie.interface";
import {StatInterface} from "../interfaces/stat.interface";
import {EffetInterface} from "../interfaces/effet.interface";

export class Joueur implements JoueurInterface {

    id?: string;
    /** idUser from module User **/
    userId?: string;
    etapeEnCours?: EtapeInterface;
    etapeEnCoursEtat?: EtapeEtatEnum;
    etapeDateAffichage?: Date;
    partie?: PartieInterface;
    /** id des scenarios déjà effectués **/
    scenarioEffectues?: string[];
    stats?: StatInterface[];

    constructor(joueur: JoueurInterface) {
        Object.assign(this, joueur);
    }

    /**
     * Retourne true si l'étape est en état "A_AFFICHER" et que l'on a dépassé la date minimum d'affichage de l'étape en cours
     */
    isAfficherEtape(): boolean {
        return this.etapeEnCoursEtat == EtapeEtatEnum.A_AFFICHER && new Date() > this.etapeDateAffichage;
    }

    /**
     * Retourne true si le joueur a un scenario en cours
     * Autrement dit : s'il a une étape en cours et que celle ci n'est pas la fin d'un scénario
     */
    hasScenarioEnCours(): boolean {
        return this.etapeEnCours !== undefined && this.etapeEnCours !== null;
    }

    /**
     * Retourne true si l'étape a été affichée au joueur et que ce n'est pas la fin d'un scénario
     */
    isAttenteReponse(): boolean {
        return this.etapeEnCoursEtat == EtapeEtatEnum.ATTENTE_REPONSE && !this.etapeEnCours.finScenario;
    }

    /**
     * Applique au joueur l'effet passé en paramètre
     * @param effet
     */
    appliquerEffet(effet: EffetInterface) {

        // const stat = this.stats.find(s => s.unite.code === effet.unite.code);
        // if (stat) {
        //     stat.quantite += effet.quantite;
        // }
        // return stat;
    }

    // findReponse(params: any): ReponseInterface {
    //     return this.etapeEnCours.reponses.find(r => r.libelle == params.libelle);
    // }
    //
    // changerEtape(etape: EtapeInterface, dateAffichage: Date) {
    //     this.etapeEnCours = etape;
    //     this.etapeEnCoursEtat = EtapeEtatEnum.A_AFFICHER;
    //     this.etapeDateAffichage = dateAffichage;
    //     return this;
    // }

}
