import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class SocialLocal {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({nullable: true})
    username?: string;

    @Column({nullable: true})
    password?: string;
}
