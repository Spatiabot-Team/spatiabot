import {Etape} from "./etape.entity";
import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Monde} from "./monde.entity";
import {JoinColumn} from "typeorm/decorator/relations/JoinColumn";
import {Partie} from "./partie.entity";
import {Joueur} from "./joueur.entity";
import {ScenarioEffectue} from "./scenario-effectue.entity";

@Entity()
export class Scenario {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    titre?: string;

    @Column({nullable: true, default: false })
    actif?: boolean;

    /**
     * uuid de la première étape
     */
    @Column("varchar", {nullable: true})
    premiereEtape?: string|null;

    @OneToMany(type => Etape, etape => etape.scenario, {
        cascade: true,
        eager: true
    })
    etapes?: Etape[];

    @ManyToOne(type => Monde, monde => monde.scenarios,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: "mondeId"})
    monde?: Monde;

    @Column({nullable: true, default: null})
    mondeId?: string;

    @OneToMany(type => ScenarioEffectue, scenarioEffectue => scenarioEffectue.scenario)
    scenarioEffectues?: ScenarioEffectue[];
}
