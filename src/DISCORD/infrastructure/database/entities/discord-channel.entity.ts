import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {DiscordChannelInterface} from "../../../domain/interfaces/discord-channel.interface";

@Entity('discord_channel')
export class DiscordChannelEntity implements DiscordChannelInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    channelId: string;

    @Column({nullable: true})
    name: string;
}
