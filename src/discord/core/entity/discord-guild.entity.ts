import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {DiscordGuildUser} from "./discord-guild-user.entity";
import {DiscordChannel} from "./discord-channel.entity";

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

    @OneToMany(type => DiscordChannel, discordChannel => discordChannel.discordGuild,{
        eager: true
    })
    discordChannels?: DiscordChannel[];
}
