import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {DiscordGuildUserInterface} from "../../../domain/interfaces/discord-guild-user.interface";
import {DiscordGuildEntity} from "./discord-guild.entity";
import {DiscordGuild} from "../../../domain/entities/discord-guild.entity";

@Entity('discord_guild_user')
export class DiscordGuildUserEntity implements DiscordGuildUserInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    permissions?: string;

    @Column({default: false})
    isOwner?: boolean;

    @Column()
    socialDiscordId?:string;

    @ManyToOne(type => DiscordGuildEntity, discordGuildEntity => discordGuildEntity.discordGuildUsers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: "discordGuildId"})
    discordGuild?: DiscordGuild;

    @Column()
    discordGuildId: string;
}
