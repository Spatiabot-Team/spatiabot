import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {DiscordGuild} from "./discord-guild.entity";
import {SocialDiscord} from "../../../users/core/entity/social-discord.entity";

@Entity()
export class DiscordGuildUser {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    permissions?: string;

    @Column({default: false})
    isOwner?: boolean;

    @ManyToOne(type => DiscordGuild, discordGuild => discordGuild.discordGuildUsers, {
        primary: true
    })
    discordGuild?: DiscordGuild;

    @ManyToOne(type => SocialDiscord, socialDiscord => socialDiscord.discordGuildUsers, {
        primary: true,
        eager: true
    })
    socialDiscord?: SocialDiscord;

}
