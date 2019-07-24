import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {CreateDateColumn, JoinColumn, OneToOne} from "typeorm";
import {Monde} from "./monde.entity";
import {Joueur} from "./joueur.entity";

@Entity()
export class Initialisation {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @CreateDateColumn({type:'date'})
    created?: Date;

    @OneToOne(type => Monde, monde => monde.initialisation, {
        cascade: true,
        eager: true
    })
    monde?: Monde;

    @OneToOne(type => Joueur, joueur => joueur.initialisation, {
        cascade: true,
        eager: true
    })
    joueur?: Joueur;
}
