import {Unite} from "./unite.entity";
import {Etape} from "./etape.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TypeEffetEnum} from "../enums/type-effet.enum";

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

    @Column({nullable: true, default: TypeEffetEnum.JOUEUR})
    type?: string;

    @ManyToOne(type => Unite, unite => unite.effets, {
        eager: true
    })
    unite?: Unite;

    @ManyToOne(type => Etape, etape => etape.effets,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    etape?: Etape;

}
