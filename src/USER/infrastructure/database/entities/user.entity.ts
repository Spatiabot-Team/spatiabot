import {Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserInterface} from "../../../domain/interfaces/user.interface";
import {SocialGeneratedEntity} from "./social-generated.entity";
import {RoleEntity} from "./role.entity";

@Entity('user')
export class UserEntity implements UserInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({unique: true})
    @Index()
    username?: string;

    @Column({nullable: true})
    avatar?: string;

    @Column("simple-json", {nullable: true})
    preferences?: any;

    // @OneToOne(type => SocialLocalEntity, {
    //     eager: true,
    //     nullable: true
    // })
    // @JoinColumn()
    // socialLocal?: SocialLocalEntity;

    @OneToOne(type => SocialGeneratedEntity, {
        eager: true,
        nullable: true
    })
    @JoinColumn()
    socialGenerated?: SocialGeneratedEntity;

    // @OneToOne(type => SocialGoogleEntity,socialDiscord => socialDiscord.user, {
    //     eager: true,
    //     nullable: true
    // })
    // @JoinColumn()
    // socialGoogle?: SocialGoogleEntity;

    @ManyToMany(type => RoleEntity, role => role.users, {
        // cascade: true,
        eager: true
    })
    @JoinTable()
    roles?: RoleEntity[];
}
