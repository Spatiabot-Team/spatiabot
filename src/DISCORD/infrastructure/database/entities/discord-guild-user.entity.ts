import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {DiscordGuildUserInterface} from "../../../domain/interfaces/discord-guild-user.interface";

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
}
