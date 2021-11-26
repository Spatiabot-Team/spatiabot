import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RoleInterface} from "../../../domain/interfaces/role.interface";
import {UserEntity} from "./user.entity";

@Entity('role')
export class RoleEntity implements RoleInterface{

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    label: string | null = null;

    @ManyToMany(type => UserEntity, user => user.roles,{
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE'
    })
    users?: UserEntity[];
}
