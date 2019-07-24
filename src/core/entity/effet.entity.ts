import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";
import {ManyToOne} from "typeorm";
import {Unite} from "./unite.entity";
import {Etape} from "./etape.entity";
import {CONFIG_ENV} from "../../../config/config";

/**
 * Définit un des effets produit par une conséquence
 */
@Entity()
export class Effet {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    quantite?: number;

    @Column({nullable: true, default: null})
    texte?: string;

    @Column({nullable: true, default: CONFIG_ENV.typeEffet.joueur})
    type?: string;

    @ManyToOne(type => Unite, unite => unite.effets, {
        eager: true
    })
    unite?: Unite;

    @ManyToOne(type => Etape, etape => etape.effets, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    etapeOrigine?: Etape;

}
