import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class SocialGenerated {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({unique:true})
    generatedId: string;

    @Column({nullable: true, default: false })
    activated?: boolean;
}
