import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column, ManyToOne, OneToMany} from "typeorm";
import {Joueur} from "./joueur.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name?: string;

    @Column({nullable: true, default: null })
    discordId?: string;

    @OneToMany(type => Joueur, joueur => joueur.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    joueurs?: Joueur[];
}
