import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";
import {ManyToOne, JoinColumn} from "typeorm";
import {Etape} from "./etape.entity";
import {Reponse} from "./reponse.entity";
import {RandomPoidsInterface} from "../interfaces/random-poids.interface";

@Entity()
export class ConsequencePossible implements RandomPoidsInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    /**
     * Poids qu'aura la possibilité de cette conséquence d'arriver pour le calcul de la proba
     */
    @Column()
    poids?: number;

    @ManyToOne(type => Etape, etape => etape.consequencePossibleOrigines)
    @JoinColumn({name: "etapeSuivanteId"})
    etapeSuivante?: Etape;

    /**
     * Pour la jointure
     */
    @Column({nullable: true, default: null})
    etapeSuivanteId?: string;

    @ManyToOne(type => Reponse, reponse => reponse.consequencePossibles, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    reponseOrigine?: Reponse;

    constructor(datas?: ConsequencePossible) {
    }

}
