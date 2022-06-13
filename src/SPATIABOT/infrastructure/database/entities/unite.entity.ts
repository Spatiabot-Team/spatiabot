import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MondeEntity} from "./monde.entity";
import {UniteInterface} from "../../../domain/interfaces/unite.interface";
import {PorteeEnum} from "../../../domain/enums/portee.enum";

@Entity('unite')
export class UniteEntity implements UniteInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Index()
    @Column()
    code: string;

    @Column()
    libelle: string;

    @Column({nullable:true})
    description: string;

    @Column({nullable: true, default: PorteeEnum.JOUEUR})
    portee?: PorteeEnum;

    @ManyToOne(type => MondeEntity, monde => monde.unites, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: "mondeId"})
    monde?: MondeEntity;

    @Index()
    @Column()
    mondeId: string;
}
