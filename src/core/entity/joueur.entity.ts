import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {Partie} from "./partie.entity";
import {User} from "./user.entity";
import {Etape} from "./etape.entity";
import {Scenario} from "./scenario.entity";
import {Initialisation} from "./initialisation.entity";
import {CONFIG_ENV} from "../../../config/config";
import {Stat} from "./stat.entity";
import {Effet} from "./effet.entity";
import {Reponse} from "./reponse.entity";

@Entity()
export class Joueur {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(type => User, user => user.joueurs, {
        cascade: true,
        eager: true
    })
    user?: User;

    @ManyToOne(type => Etape,{
        cascade: true,
        eager: true
    })
    etapeEnCours?: Etape;

    @Column({nullable: true, default: null})
    etapeEnCoursEtat?: string;

    @Column({nullable: true, default: null})
    etapeDateAffichage: Date;

    @ManyToMany(type => Scenario,{
        eager: true
    })
    @JoinTable()
    scenariosEffectues?: Scenario[]

    @ManyToOne(type => Partie, partie => partie.joueurs, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    partie?: Partie;


    @OneToMany(type => Stat, stat => stat.joueur, {
        cascade: true,
        eager: true
    })
    stats?: Stat[];

    @OneToOne(type => Initialisation, initialisation => initialisation.joueur, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    initialisation?: Initialisation;

    /**
     * Retourne true si l'étape est en état "A_AFFICHER" et que l'on a dépassé la date minimum d'affichage de l'étape en cours
     */
    isAfficherEtape(): Boolean {
        return this.etapeEnCoursEtat == CONFIG_ENV.etatEtape.aAfficher && new Date() > this.etapeDateAffichage;
    }

    /**
     * Retourne true si le joueur a un scenario en cours
     * Autrement dit : s'il a une étape en cours et que celle ci n'est pas la fin d'un scénario
     */
    hasScenarioEnCours(): Boolean {
        return this.etapeEnCours !== undefined && this.etapeEnCours !== null && !this.etapeEnCours.finScenario;
    }

    /**
     * Retourne true si l'étape a été affichée au joueur et que ce n'est pas la fin d'un scénario
     */
    isAttenteReponse(): Boolean {
        return this.etapeEnCoursEtat == CONFIG_ENV.etatEtape.attenteReponse && !this.etapeEnCours.finScenario;
    }

    /**
     * Applique au joueur l'effet passé en paramètre
     * @param effet
     */
    appliquerEffet(effet: Effet) {

        const stat = this.stats.find(s => s.unite.code === effet.unite.code);
        if (stat) {
            stat.quantite += effet.quantite;
        }
        return stat;
    }

    findReponse(params): Reponse {
        return this.etapeEnCours.reponses.find(r => r.libelle == params.libelle);
    }

    changerEtape(etape: Etape, dateAffichage : Date){
        this.etapeEnCours = etape;
        this.etapeEnCoursEtat = CONFIG_ENV.etatEtape.aAfficher;
        this.etapeDateAffichage = dateAffichage;
        return this;
    }

    getScenariosEffectues(){
        return this.scenariosEffectues || [];
    }

}
