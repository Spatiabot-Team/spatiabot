import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MondeEntity} from "./monde.entity";
import {UniteInterface} from "../../../domain/interfaces/unite.interface";

@Entity('unite')
export class UniteEntity implements UniteInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    code: string;

    @Column()
    libelle: string;

    @Column()
    description: string;

    @ManyToOne(type => MondeEntity, monde => monde.unites, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: "mondeId"})
    monde?: MondeEntity;
}
