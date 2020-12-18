import {User} from "./user.entity";
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {DiscordGuildUser} from "./discord-guild-user.entity";

@Entity()
export class DiscordRole {

    constructor(label : string) {
        this.label = label;
    }

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    label: string;

    @ManyToMany(type => DiscordGuildUser, discordGuildUser => discordGuildUser.discordRoles,{
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE'
    })
    discordGuildUsers?: DiscordGuildUser;
}
