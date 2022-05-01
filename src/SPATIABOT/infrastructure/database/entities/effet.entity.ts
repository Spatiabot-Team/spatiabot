import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {EffetInterface} from "../../../domain/interfaces/effet.interface";
import {TypeEffetEnum} from "../../../domain/enums/type-effet.enum";
import {UniteEntity} from "./unite.entity";
import {EtapeEntity} from "./etape.entity";

@Entity('effet')
export class EffetEntity implements EffetInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    quantite?: number;

    @Column({nullable: true, default: null})
    texte?: string;

    @Column({nullable: true, default: TypeEffetEnum.JOUEUR})
    type?: string;

    @ManyToOne(type => UniteEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true
    })
    @JoinColumn([{name: 'uniteId', referencedColumnName: 'id'}])
    unite?: UniteEntity;

    @ManyToOne(type => EtapeEntity, etape => etape.effets, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    etape?: EtapeEntity;
}
