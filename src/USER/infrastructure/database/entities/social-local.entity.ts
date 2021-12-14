import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {SocialLocalInterface} from "../../../domain/interfaces/social-local.interface";
import {UserEntity} from "./user.entity";

@Entity('social_local')
export class SocialLocalEntity implements SocialLocalInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({nullable: true})
    username?: string;

    @Column({nullable: true})
    password?: string;

    @OneToOne(type => UserEntity, user => user.socialLocal,{
        eager: true,
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    user?: UserEntity;
}
