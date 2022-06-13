import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EtapeInterface} from "../../../domain/interfaces/etape.interface";
import {ScenarioEntity} from "./scenario.entity";
import {ReponseEntity} from "./reponse.entity";
import {EffetEntity} from "./effet.entity";

@Entity('etape')
export class EtapeEntity implements EtapeInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    titre: string;

    @Column()
    texte: string;

    @Column({default: false})
    premiereEtape?: boolean;

    @Column({default: false})
    finScenario?: boolean;

    @Column({default: false})
    gameOver?: boolean;

    @ManyToOne(type => ScenarioEntity, scenario => scenario.etapes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: "scenarioId"})
    scenario?: ScenarioEntity;

    @Index()
    @Column()
    scenarioId: string;

    @OneToMany(type => ReponseEntity, reponse => reponse.etape, {
        cascade: true,
        //eager: true
    })
    reponses?: ReponseEntity[];

    @OneToMany(type => EffetEntity, effet => effet.etape, {
        cascade: true,
        //eager: true
    })
    effets?: EffetEntity[];


}
