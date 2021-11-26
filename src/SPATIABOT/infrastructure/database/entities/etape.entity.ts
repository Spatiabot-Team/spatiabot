import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {EtapeInterface} from "../../../domain/interfaces/etape.interface";
import {MondeEntity} from "./monde.entity";
import {ScenarioEntity} from "./scenario.entity";

@Entity('etape')
export class EtapeEntity implements EtapeInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    titre: string;

    @Column()
    texte: string;

    @ManyToOne(type => ScenarioEntity, scenario => scenario.etapes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: "scenarioId"})
    scenario?: ScenarioEntity;

    @Column()
    scenarioId: string;
}
