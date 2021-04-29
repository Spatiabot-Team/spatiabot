import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class SocialGoogle {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    googleId: string;

    @Column({nullable: true})
    username: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    avatar: string;
}
