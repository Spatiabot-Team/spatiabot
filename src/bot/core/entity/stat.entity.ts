import {Unite} from "./unite.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Monde} from "./monde.entity";
import {Partie} from "./partie.entity";

/**
 * Définit un des effets produit par une conséquence
 */
@Entity()
export class Stat {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    @ApiProperty()
    quantite?: number;

    @Column({nullable: true, default: null })
    @ApiProperty()
    texte?: string;

    @ManyToOne(type => Unite, unite => unite.stats, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @ApiProperty()
    unite?: Unite;

    // @ManyToOne(type => Joueur, joueur => joueur.stats,{
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE'
    // })
    // joueur?: Joueur;

    @ManyToOne(type => Monde, monde => monde.statDefaults,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    monde?: Monde;

    @ManyToOne(type => Partie, partie => partie.stats,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    partie?: Partie;

}
