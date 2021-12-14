import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MondeInterface} from "../../../domain/interfaces/monde.interface";
import {ScenarioEntity} from "./scenario.entity";
import {UniteEntity} from "./unite.entity";
import {EtapeEntity} from "./etape.entity";
import {PartieEntity} from "./partie.entity";

@Entity('monde')
export class MondeEntity implements MondeInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    nom: string;

    @Index()
    @Column({nullable:true})
    slug?: string;

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

    @OneToMany(type => PartieEntity, partie => partie.monde, {
        cascade: true,
        //eager: true
    })
    parties?: PartieEntity[];
    // scenarios: ScenarioInterface[];
    // statDefaults: StatInterface[];
    // unites: UniteInterface[];
}
