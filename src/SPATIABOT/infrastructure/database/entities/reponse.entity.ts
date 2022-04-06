import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EtapeInterface} from "../../../domain/interfaces/etape.interface";
import {MondeEntity} from "./monde.entity";
import {ScenarioEntity} from "./scenario.entity";
import {ReponseInterface} from "../../../domain/interfaces/reponse.interface";
import {EtapeEntity} from "./etape.entity";
import {ConsequencePossibleEntity} from "./consequence-possible.entity";

@Entity('reponse')
export class ReponseEntity implements ReponseInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    libelle: string;

    @Column()
    titre: string;

    @Column()
    texte: string;

    @ManyToOne(type => EtapeEntity, etape => etape.reponses, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: "etapeId"})
    etape?: EtapeEntity;

    @Index()
    @Column()
    etapeId: string;

    @OneToMany(type => ConsequencePossibleEntity, consequencePossible => consequencePossible.reponse, {
        cascade: true,
        eager: true
    })
    consequencePossibles?: ConsequencePossibleEntity[];

}
