import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";
import {OneToMany} from "typeorm";
import {Effet} from "./effet.entity";
import {Stat} from "./stat.entity";

export interface UniteRequest {
    /**
     * Indicatif rapide de l'unité (exemple : "pv")
     */
    code?: string;

    /**
     * Libelle de l'unité (exemple : "points de vie")
     */
    libelle?: string;

    /**
     * Donne le détail de l'unité, son utilité
     * (exemple : "l'unité point de vie impacte le nombre de point de vie d'un joueur,
     * un nombre négatif retirera de la vie au joueur contrairement à un nombre positif qui en ajoutera")
     */
    description?: string;
};

/**
 * Définit l'unité d'un effet
 * cela peut être par exemple :
 *  - les pirates présents dans l'espace
 *  - les pirates présents sur la planète Gamède
 *  - les pvs d'un joueur
 *  - les pvs de tous les joueurs
 *  - ...
 */
@Entity()
export class Unite {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    /**
     * Indicatif rapide de l'unité (exemple : "pv")
     */
    @Column({ nullable: false, unique: true })
    code?: string;

    /**
     * Libelle de l'unité (exemple : "points de vie")
     */
    @Column()
    libelle?: string;

    /**
     * Donne le détail de l'unité, son utilité
     * (exemple : "l'unité point de vie impacte le nombre de point de vie d'un joueur,
     * un nombre négatif retirera de la vie au joueur contrairement à un nombre positif qui en ajoutera")
     */
    @Column({nullable: true, default: null})
    description?: string;

    @OneToMany(type => Effet, effet => effet.unite,{
        cascade: true
    })
    effets?: Effet

    @OneToMany(type => Stat, stat => stat.unite,{
        cascade: true
    })
    stats?: Stat[]
}
