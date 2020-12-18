import {Entity} from "typeorm/decorator/entity/Entity";
import {Column} from "typeorm/decorator/columns/Column";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {ManyToOne} from "typeorm/decorator/relations/ManyToOne";
import {JoinColumn} from "typeorm/decorator/relations/JoinColumn";
import {RandomPoidsInterface} from "../interfaces/random-poids.interface";
import {Etape} from "./etape.entity";
import {Reponse} from "./reponse.entity";

@Entity()
export class ConsequencePossible implements RandomPoidsInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    /**
     * Poids qu'aura la possibilité de cette conséquence d'arriver pour le calcul de la proba
     */
    @Column({type: 'float', nullable: true})
    poids?: number;

    @ManyToOne(type => Etape, etape => etape.consequencePossibleOrigines, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
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
    reponse?: Reponse;

    constructor(datas?: ConsequencePossible) {
    }

}
