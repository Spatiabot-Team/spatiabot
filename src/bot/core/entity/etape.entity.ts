import {Scenario} from "./scenario.entity";
import {ConsequencePossible} from "./consequence-possible.entity";
import {Effet} from "./effet.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Reponse} from "./reponse.entity";

@Entity()
export class Etape {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    titre?: string;

    @Column({nullable: true, default: null })
    texte?: string;

    @Column({nullable: true, default: null })
    order?: number;

    @Column({nullable: true, default: false })
    finScenario?: boolean;

    @ManyToOne(type => Scenario, scenario => scenario.etapes,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    scenario?: Scenario;

    @OneToMany(type => Reponse, reponses => reponses.etape, {
        cascade: true,
        eager: true
    })
    reponses?: Reponse[];

    @OneToMany(type => Effet, effet => effet.etape, {
        cascade: true,
        eager: true
    })
    effets?: Effet[];

    @OneToMany(type => ConsequencePossible, consequencePossible => consequencePossible.etapeSuivante,{
        eager: true
    })
    consequencePossibleOrigines?: ConsequencePossible[];

    constructor(datas?: Etape) {
        // if (datas) {
        //     this.titre = datas.titre;
        //     this.texte = datas.texte;
        //     if (datas.reponses) {
        //         this.reponses = datas.reponses.map(r => new Reponse(r));
        //     }
        // }
    }
}
