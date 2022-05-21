import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {StatInterface} from "../../../domain/interfaces/stat.interface";
import {UniteEntity} from "./unite.entity";
import {JoueurEntity} from "./joueur.entity";
import {PartieEntity} from "./partie.entity";
import {MondeEntity} from "./monde.entity";

@Entity('stat')
export class StatEntity implements StatInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    quantite?: number;

    @Column({nullable: true, default: null})
    texte?: string;

    @ManyToOne(type => UniteEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true
    })
    @JoinColumn([{name: 'uniteId', referencedColumnName: 'id'}])
    unite?: UniteEntity;

    @ManyToOne(type => JoueurEntity, joueur => joueur.stats, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    joueur?: JoueurEntity;

    @ManyToOne(type => PartieEntity, partie => partie.statsMonde, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true
    })
    partie?: JoueurEntity;

    @Index()
    @Column({nullable:true})
    partieId ?: string;

    @ManyToOne(type => MondeEntity, monde => monde.stats, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true
    })
    monde?: JoueurEntity;

    @Index()
    @Column({nullable:true})
    mondeId ?: string;
}
