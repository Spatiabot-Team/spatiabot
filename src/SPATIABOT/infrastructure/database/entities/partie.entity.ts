import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {PartieInterface} from "../../../domain/interfaces/partie.interface";

@Entity('partie')
export class PartieEntity implements PartieInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    discordGuildUuid?: string;

    @CreateDateColumn({type: 'date'})
    created?: Date;

    @Column({default: true})
    actif?: boolean;

}
