import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Stat} from "./stat.entity";
import {Monde} from "./monde.entity";
import {Joueur} from "./joueur.entity";
import {ScenarioEffectue} from "./scenario-effectue.entity";

@Entity()
export class Partie {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @CreateDateColumn({type: 'date'})
    created?: Date;

    @Column({default: true})
    actif?: boolean;

    @OneToMany(type => Stat, stat => stat.partie, {
        cascade: true,
        eager: true
    })
    @ApiProperty()
    stats?: Stat[];

    @ManyToOne(type => Monde, monde => monde.parties, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager : true
    })
    @ApiProperty()
    monde?: Monde;

    @OneToMany(type => Joueur, joueur => joueur.partie,{
        eager: true
    })
    joueurs?: Joueur[];

    @OneToMany(type => ScenarioEffectue, scenarioEffectue => scenarioEffectue.partie)
    scenarioEffectues?: ScenarioEffectue[];

    // @OneToMany(type => Joueur, joueur => joueur.partie, {
    //     cascade: true,
    //     eager: true
    // })
    // joueurs?: Joueur[];

    // findJoueur(userDiscord : any) {
    //     // @ts-ignore
    //     return this.joueurs.find(j => j.user && j.user.discordId === userDiscord.id);
    // }
    //
    // isDansLaPartie(userDiscord : any) {
    //     // @ts-ignore
    //     return this.joueurs.find(j => j.user && j.user.discordId === userDiscord.id) != null;
    // }
}
