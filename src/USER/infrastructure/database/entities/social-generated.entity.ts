import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {SocialGeneratedInterface} from "../../../domain/interfaces/social-generated.interface";

@Entity('social_generated')
export class SocialGeneratedEntity implements SocialGeneratedInterface{

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({unique:true})
    generatedId: string;

    @Column({nullable: true, default: false })
    activated?: boolean;
}
