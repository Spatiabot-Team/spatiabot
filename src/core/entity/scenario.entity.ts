import {Etape} from "./etape.entity";
import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";
import {ManyToMany, OneToMany} from "typeorm";
import {Joueur} from "./joueur.entity";

@Entity()
export class Scenario {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    titre?: string;

    @Column({nullable: true, default: false })
    actif?: boolean;

    /**
     * uuid de la première étape
     */
    @Column("varchar", {nullable: true})
    premiere_etape?: string;

    @OneToMany(type => Etape, etape => etape.scenario, {
        cascade: true,
        eager: true
    })
    etapes?: Etape[];

    getPremiereEtape(){
        return this.etapes.find(e => e.id == this.premiere_etape);
    }
}
