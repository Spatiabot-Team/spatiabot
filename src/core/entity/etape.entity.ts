import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";
import {ManyToOne, OneToMany} from "typeorm";
import {Scenario} from "./scenario.entity";
import {Reponse} from "./reponse.entity";
import {ConsequencePossible} from "./consequence-possible.entity";
import {Effet} from "./effet.entity";

@Entity()
export class Etape {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    titre?: string;

    @Column()
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

    @OneToMany(type => Reponse, reponse => reponse.etape, {
        cascade: true,
        eager: true
    })
    reponses?: Reponse[];

    @OneToMany(type => Effet, effet => effet.etapeOrigine, {
        cascade: true,
        eager: true
    })
    effets?: Effet[];

    @OneToMany(type => ConsequencePossible, consequencePossible => consequencePossible.etapeSuivante,{
        cascade: true,
        eager: true
    })
    consequencePossibleOrigines?: ConsequencePossible[];

    constructor(datas?: Etape) {
        if (datas) {
            this.titre = datas.titre;
            this.texte = datas.texte;
            if (datas.reponses) {
                this.reponses = datas.reponses.map(r => new Reponse(r));
            }
        }
    }
}
