import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";
import {ManyToOne} from "typeorm";
import {Unite} from "./unite.entity";
import {Joueur} from "./joueur.entity";
import {Monde} from "./monde.entity";

/**
 * Définit un des effets produit par une conséquence
 */
@Entity()
export class Stat {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    quantite?: number;

    @Column({nullable: true, default: null })
    texte?: string;

    @ManyToOne(type => Unite, unite => unite.stats, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    unite?: Unite;

    @ManyToOne(type => Joueur, joueur => joueur.stats,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    joueur?: Joueur;

    @ManyToOne(type => Monde, monde => monde.stats,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    monde?: Monde;

}
