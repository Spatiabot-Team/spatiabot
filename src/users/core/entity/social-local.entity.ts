import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Exclude} from 'class-transformer';

@Entity()
export class SocialLocal {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({nullable: true})
    username?: string;

    @Column({nullable: true})
    password?: string;
}
