import {User} from "./user.entity";
import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Role {

    constructor(label : string) {
        this.label = label;
    }

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    label: string;

    @ManyToMany(type => User, user => user.roles,{
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE'
    })
    users?: User;
}
