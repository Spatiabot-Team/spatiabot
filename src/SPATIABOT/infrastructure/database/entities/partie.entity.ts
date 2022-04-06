import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {PartieInterface} from "../../../domain/interfaces/partie.interface";
import {MondeEntity} from "./monde.entity";
import {StatEntity} from "./stat.entity";
import {JoueurEntity} from "./joueur.entity";

@Entity('partie')
export class PartieEntity implements PartieInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Index()
    @Column()
    discordGuildUuid?: string;

    @CreateDateColumn({type: 'timestamptz'})
    created?: Date;

    @Column({default: true})
    actif?: boolean;

    @ManyToOne(type => MondeEntity, monde => monde.parties, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: "mondeId"})
    monde?: MondeEntity;

    @Index()
    @Column()
    mondeId?: string;

    @OneToMany(type => StatEntity,stat => stat.partie, {
        cascade: true,
        eager : true
    })
    statsMonde?: StatEntity[];

    @OneToMany(type => JoueurEntity,joueur => joueur.partie, {
        cascade: true,
        eager : true
    })
    joueurs?: JoueurEntity[];
}
