import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {CreateDateColumn, OneToMany, OneToOne} from "typeorm";
import {Joueur} from "./joueur.entity";
import {Initialisation} from "./initialisation.entity";
import {Monde} from "./monde.entity";

@Entity()
export class Partie {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @CreateDateColumn({type:'date'})
    created?: Date;

    @OneToMany(type => Joueur, joueur => joueur.partie, {
        cascade: true,
        eager: true
    })
    joueurs?: Joueur[];

    @OneToOne(type => Monde, monde => monde.partie, {
        cascade: true,
        eager: true
    })
    monde?: Monde;

    findJoueur(userDiscord) {
        return this.joueurs.find(j => j.user && j.user.discordId === userDiscord.id);
    }

    isDansLaPartie(userDiscord) {
        return this.joueurs.find(j => j.user && j.user.discordId === userDiscord.id) != null;
    }
}
