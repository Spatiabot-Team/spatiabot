import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {SocialDiscordInterface} from "../../../domain/interfaces/social-discord.interface";
import {UserEntity} from "./user.entity";

@Entity('social_discord')
export class SocialDiscordEntity implements SocialDiscordInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    discordId: string;

    @Column({nullable: true})
    username: string | null = null;

    @Column({nullable: true})
    email ?: string | null = null;

    @Column({nullable: true})
    avatar ?: string | null = null;

    @Column({nullable: true})
    accessToken ?: string | null = null;

    @OneToOne(type => UserEntity, user => user.socialDiscord,{
        eager: true,
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name : 'userId'})
    user: UserEntity | null = null;

    @Column()
    userId: string;

}
