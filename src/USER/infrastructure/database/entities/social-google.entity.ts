import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {SocialGoogleInterface} from "../../../domain/interfaces/social-google.interface";

@Entity('social_google')
export class SocialGoogleEntity implements SocialGoogleInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    googleId: string;

    @Column({nullable: true})
    username: string | null = null;

    @Column({nullable: true})
    email: string | null = null;

    @Column({nullable: true})
    avatar: string | null = null;
}
