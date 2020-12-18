import {User} from "./user.entity";
import {Etape} from "./etape.entity";
import {Scenario} from "./scenario.entity";
import {Effet} from "./effet.entity";
import {Reponse} from "./reponse.entity";
import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EtapeEtatEnum} from "../enums/etape-etat.enum";
import {Partie} from "./partie.entity";
import {ScenarioEffectue} from "./scenario-effectue.entity";

@Entity()
export class Joueur {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(type => User, user => user.joueurs, {
        cascade: true,
        eager: true
    })
    user?: User;

    @ManyToOne(type => Etape, {
        cascade: true,
        eager: true
    })
    etapeEnCours?: Etape;

    @Column({nullable: true, default: null})
    etapeEnCoursEtat?: string;

    @Column({nullable: true, default: null})
    etapeDateAffichage?: Date;

    @ManyToOne(type => Partie, partie => partie.joueurs, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    partie?: Partie;

    @OneToMany(type => ScenarioEffectue, scenarioEffectue => scenarioEffectue.joueur, {eager: true})
    scenarioEffectues?: ScenarioEffectue[];

    // @OneToMany(type => Stat, stat => stat.joueur, {
    //     cascade: true,
    //     eager: true
    // })
    // stats?: Stat[];

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
    appliquerEffet(effet: Effet) {

        // const stat = this.stats.find(s => s.unite.code === effet.unite.code);
        // if (stat) {
        //     stat.quantite += effet.quantite;
        // }
        // return stat;
    }

    findReponse(params: any): Reponse {
        return this.etapeEnCours.reponses.find(r => r.libelle == params.libelle);
    }

    changerEtape(etape: Etape, dateAffichage: Date) {
        this.etapeEnCours = etape;
        this.etapeEnCoursEtat = EtapeEtatEnum.A_AFFICHER;
        this.etapeDateAffichage = dateAffichage;
        return this;
    }

}
