import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ScenarioInterface} from "../../../domain/interfaces/scenario.interface";
import {MondeEntity} from "./monde.entity";
import {EtapeEntity} from "./etape.entity";

@Entity('scenario')
export class ScenarioEntity implements ScenarioInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    titre: string;

    @Column({nullable: true, default: false})
    actif?: boolean;

    @Column('simple-array')
    auteurIds?: string[] = [];

    /**
     * uuid de la première étape
     */
    @Column("varchar", {nullable: true})
    premiereEtape?: string | null;


    @ManyToOne(type => MondeEntity, monde => monde.scenarios, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: "mondeId"})
    monde?: MondeEntity;

    @Column()
    mondeId: string;

    @OneToMany(type => EtapeEntity, etape => etape.scenario, {
        cascade: true,
        //eager: true
    })
    etapes?: EtapeEntity[];
}
