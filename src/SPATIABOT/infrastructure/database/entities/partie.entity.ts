import {Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PartieInterface} from "../../../domain/interfaces/partie.interface";
import {MondeEntity} from "./monde.entity";

@Entity('partie')
export class PartieEntity implements PartieInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Index()
    @Column()
    discordGuildUuid?: string;

    @CreateDateColumn({type: 'date'})
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
}
