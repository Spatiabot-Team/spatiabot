import {Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from "./role.entity";
import {PreferencesDto} from "../dto/preferences.dto";
import {SocialGoogle} from "./social-google.entity";
import {SocialDiscord} from "./social-discord.entity";
import {SocialLocal} from "./social-local.entity";
import {SocialGenerated} from "./social-generated.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({unique:true})
    @Index()
    username?: string;

    @Column({nullable: true})
    avatar?: string;

    @Column("simple-json", {nullable: true})
    preferences?: PreferencesDto;

    @OneToOne(type => SocialLocal,  {
        eager: true,
        nullable:true
    })
    @JoinColumn()
    socialLocal?: SocialLocal;

    @OneToOne(type => SocialGenerated,  {
        eager: true,
        nullable:true
    })
    @JoinColumn()
    socialGenerated?: SocialGenerated;

    @OneToOne(type => SocialDiscord, {
        eager: true,
        nullable:true
    })
    @JoinColumn()
    socialDiscord?: SocialDiscord;

    @OneToOne(type => SocialGoogle,  {
        eager: true,
        nullable:true
    })
    @JoinColumn()
    socialGoogle?: SocialGoogle;

    @ManyToMany(type => Role, role => role.users, {
        // cascade: true,
        eager: true
    })
    @JoinTable()
    roles?: Role[];
}
