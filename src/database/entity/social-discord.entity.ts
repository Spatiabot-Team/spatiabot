import {Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from "./role.entity";
import {PreferencesDto} from "../dto/preferences.dto";
import {DiscordGuildUser} from "./discord-guild-user.entity";
import {User} from "./user.entity";

@Entity()
export class SocialDiscord {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    discordId: string;

    @Column({nullable: true})
    username: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    avatar: string;

    @OneToMany(type => DiscordGuildUser, discordGuildUser => discordGuildUser.socialDiscord)
    discordGuildUsers?: DiscordGuildUser[];
}
