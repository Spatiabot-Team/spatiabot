import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {DiscordGuildInterface} from "../../../domain/interfaces/discord-guild.interface";

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
}
