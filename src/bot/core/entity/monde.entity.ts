import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {User} from "../../../users/core/entity/user.entity";
import {Partie} from "./partie.entity";
import {Scenario} from "./scenario.entity";
import {Unite} from "./unite.entity";
import {Stat} from "./stat.entity";

@Entity()
export class Monde {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({nullable: true, default: null, unique: true})
    @ApiProperty()
    @IsNotEmpty()
    code?: string;

    @Column({nullable: true, default: null})
    @ApiProperty()
    @IsNotEmpty()
    titre?: string;

    @Column({nullable: true, default: null})
    @ApiProperty()
    @IsNotEmpty()
    texte?: string;

    @ManyToMany(type => User, {
        eager: true
    })
    @JoinTable()
    auteurs?: User[];

    @OneToMany(type => Stat, stat => stat.monde, {
        cascade: true,
        eager: true
    })
    @ApiProperty()
    statDefaults?: Stat[];

    @OneToMany(type => Unite, unite => unite.monde, {
        cascade: true,
        eager: true
    })
    unites?: Unite[];

    @OneToMany(type => Scenario, scenario => scenario.monde, {
        cascade: true,
        //eager: true
    })
    scenarios?: Scenario[];

    @OneToMany(type => Partie, partie => partie.monde, {
        cascade: true,
        // eager: true
    })
    parties?: Partie[];


    // appliquerEffet(effet: Effet) {
    //
    //     // @ts-ignore
    //     const stat = this.stats.find(s => s.unite.code === effet.unite.code);
    //     if (stat) {
    //         // @ts-ignore
    //         stat.quantite += effet.quantite;
    //     }
    //     return stat;
    // }
}
