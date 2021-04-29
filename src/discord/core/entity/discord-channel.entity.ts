import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {SocialDiscord} from "../../../users/core/entity/social-discord.entity";
import {DiscordGuild} from "./discord-guild.entity";

@Entity()
export class DiscordChannel {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    /**
     * Id at discord
     */
    @Column()
    channelId: string;

    @Column({nullable: true})
    name: string;

    @ManyToOne(type => DiscordGuild, discordGuild => discordGuild.discordChannels, {
        primary: true
    })
    discordGuild?: SocialDiscord;
}
