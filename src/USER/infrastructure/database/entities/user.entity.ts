import {Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserInterface} from "../../../domain/interfaces/user.interface";
import {SocialGeneratedEntity} from "./social-generated.entity";
import {RoleEntity} from "./role.entity";
import {SocialLocalEntity} from "./social-local.entity";
import {SocialDiscordEntity} from "./social-discord.entity";

@Entity('user')
export class UserEntity implements UserInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({unique: true,nullable: true})
    @Index()
    username?: string;

    @Column({nullable: true})
    avatar?: string;

    @Column("simple-json", {nullable: true})
    preferences?: any;

    @OneToOne(type => SocialLocalEntity, {
        eager: false,
        nullable: true
    })
    socialLocal?: SocialLocalEntity;

    @OneToOne(type => SocialDiscordEntity,socialDiscord => socialDiscord.user, {
        eager: false,
        cascade: true,
        nullable: true
    })
    socialDiscord?: SocialDiscordEntity;

    @OneToOne(type => SocialGeneratedEntity, {
        eager: false,
        nullable: true
    })
    @JoinColumn()
    socialGenerated?: SocialGeneratedEntity;

    @ManyToMany(type => RoleEntity, role => role.users, {
        // cascade: true,
        eager: true
    })
    @JoinTable()
    roles?: RoleEntity[];
}
