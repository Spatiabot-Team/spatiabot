import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ConsequencePossibleInterface} from "../../../domain/interfaces/consequence-possible.interface";
import {MondeEntity} from "./monde.entity";
import {ReponseEntity} from "./reponse.entity";
import {EtapeEntity} from "./etape.entity";

@Entity('consequence-possible')
export class ConsequencePossibleEntity implements ConsequencePossibleInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    poids: number;

    @ManyToOne(type => ReponseEntity, reponse => reponse.consequencePossibles, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: "reponseId"})
    reponse?: ReponseEntity;

    @Index()
    @Column()
    reponseId: string;

    @ManyToOne(type => EtapeEntity)
    @JoinColumn({name: "etapeSuivanteId"})
    etapeSuivante?: EtapeEntity;

    @Index()
    @Column()
    etapeSuivanteId: string;
}
