import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MondeInterface} from "../../../domain/interfaces/monde.interface";
import {ScenarioEntity} from "./scenario.entity";
import {UniteEntity} from "./unite.entity";

@Entity('monde')
export class MondeEntity implements MondeInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    nom: string;

    @Column()
    code: string;

    @Column()
    description: string;

    @Column('simple-array')
    auteurIds?: string[] = [];

    @OneToMany(type => ScenarioEntity, scenario => scenario.monde, {
        cascade: true,
        //eager: true
    })
    scenarios?: ScenarioEntity[];

    @OneToMany(type => UniteEntity, unite => unite.monde, {
        cascade: true,
        eager: true
    })
    unites?: UniteEntity[];

    // parties: PartieInterface[];
    // scenarios: ScenarioInterface[];
    // statDefaults: StatInterface[];
    // unites: UniteInterface[];
}
