import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from "./role.entity";
import {Joueur} from "./joueur.entity";
import {Monde} from "./monde.entity";
import {PreferencesDto} from "../dto/preferences.dto";
import {DiscordGuildUser} from "./discord-guild-user.entity";
import {SocialGoogle} from "./social-google.entity";
import {SocialDiscord} from "./social-discord.entity";
import {SocialLocal} from "./social-local.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    username?: string;

    @Column({nullable: true})
    avatar?: string;

    @Column("simple-json", {nullable: true})
    preferences?: PreferencesDto;

    @OneToOne(type => SocialLocal,  {
        eager: true,
        nullable:true
    })
    @JoinColumn()
    socialLocal?: SocialLocal;

    @OneToOne(type => SocialDiscord, {
        eager: true,
        nullable:true
    })
    @JoinColumn()
    socialDiscord?: SocialDiscord;

    @OneToOne(type => SocialGoogle,  {
        eager: true,
        nullable:true
    })
    @JoinColumn()
    socialGoogle?: SocialGoogle;

    @ManyToMany(type => Role, role => role.users, {
        // cascade: true,
        eager: true
    })
    @JoinTable()
    roles?: Role[];

    @OneToMany(type => Joueur, joueur => joueur.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    joueurs?: Joueur[];

    @ManyToMany(type => Monde, monde => monde.auteurs)
    mondes?: Monde[]
}
