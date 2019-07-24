import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";
import {JoinColumn, OneToMany, OneToOne} from "typeorm";
import {Initialisation} from "./initialisation.entity";
import {Partie} from "./partie.entity";
import {Effet} from "./effet.entity";
import {Stat} from "./stat.entity";

@Entity()
export class Monde {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @OneToOne(type => Initialisation, initialisation => initialisation.monde, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    initialisation?: Initialisation;

    @OneToMany(type => Stat, stat => stat.monde, {
        cascade: true,
        eager: true
    })
    stats?: Stat[];

    @OneToOne(type => Partie, partie => partie.monde, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    partie?: Partie;

    appliquerEffet(effet: Effet) {

        const stat = this.stats.find(s => s.unite.code === effet.unite.code);
        if(stat){
            stat.quantite += effet.quantite;
        }
        return stat;
    }
}
