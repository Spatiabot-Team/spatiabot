import {EtapeEtatEnum} from "../enums/etape-etat.enum";
import {JoueurItf} from "../interfaces/joueur.interface";
import {EtapeItf} from "../interfaces/etape.interface";
import {PartieItf} from "../interfaces/partie.interface";
import {StatItf} from "../interfaces/stat.interface";
import {EffetItf} from "../interfaces/effet.interface";
import {ReponseItf} from "../interfaces/reponse.interface";

export class JoueurEntity implements JoueurItf {

    id?: string;
    /** idUser **/
    user?: string;
    etapeEnCours?: EtapeItf;
    etapeEnCoursEtat?: EtapeEtatEnum;
    etapeDateAffichage?: Date;
    partie?: PartieItf;
    /** id des scenarios déjà effectués **/
    scenarioEffectues?: string[];
    stats?: StatItf[];

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
    appliquerEffet(effet: EffetItf) {

        // const stat = this.stats.find(s => s.unite.code === effet.unite.code);
        // if (stat) {
        //     stat.quantite += effet.quantite;
        // }
        // return stat;
    }

    findReponse(params: any): ReponseItf {
        return this.etapeEnCours.reponses.find(r => r.libelle == params.libelle);
    }

    changerEtape(etape: EtapeItf, dateAffichage: Date) {
        this.etapeEnCours = etape;
        this.etapeEnCoursEtat = EtapeEtatEnum.A_AFFICHER;
        this.etapeDateAffichage = dateAffichage;
        return this;
    }

}
