import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Partie} from "./partie.entity";
import {Joueur} from "./joueur.entity";
import {Scenario} from "./scenario.entity";

@Entity()
export class ScenarioEffectue {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(type => Partie, partie => partie.scenarioEffectues, {
        primary: true
    })
    partie?: Partie;

    @ManyToOne(type => Joueur, joueur => joueur.scenarioEffectues, {
        primary: true
    })
    joueur?: Joueur;

    @ManyToOne(type => Scenario, scenario => scenario.scenarioEffectues, {
        primary: true
    })
    scenario?: Scenario;

}
