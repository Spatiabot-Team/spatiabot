import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {DiscordGuildInterface} from "../../../domain/interfaces/discord-guild.interface";
import {
    ConsequencePossibleEntity
} from "../../../../SPATIABOT/infrastructure/database/entities/consequence-possible.entity";
import {DiscordGuildUser} from "../../../domain/entities/discord-guild-user.entity";
import {DiscordGuildUserEntity} from "./discord-guild-user.entity";

@Entity('discord_guild')
export class DiscordGuildEntity implements DiscordGuildInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    discordGuildId: string;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    prefix: string;

    @Column({nullable: true})
    icon?: string;

    @OneToMany(type => DiscordGuildUserEntity, discordGuildUserEntity => discordGuildUserEntity.discordGuild, {
        cascade: true,
        eager: true
    })
    discordGuildUsers?: DiscordGuildUserEntity[];

}
