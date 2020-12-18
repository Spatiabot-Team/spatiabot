import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from "./role.entity";
import {PreferencesDto} from "../dto/preferences.dto";
import {DiscordGuildUser} from "./discord-guild-user.entity";
import {Scenario} from "./scenario.entity";
import {Partie} from "./partie.entity";
import {DiscordRole} from "./discord-role.entity";

@Entity()
export class DiscordGuild {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    /**
     * Id at discord
     */
    @Column()
    guildId: string;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    prefix: string;

    @Column({nullable: true})
    icon?: string;

    @OneToMany(type => DiscordGuildUser, discordGuildUser => discordGuildUser.discordGuild,{
        eager: true
    })
    discordGuildUsers?: DiscordGuildUser[];

    @ManyToMany(type => Partie, {
        // cascade: true,
        eager: true
    })
    @JoinTable()
    parties?: Partie[];
}
