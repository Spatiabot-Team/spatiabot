import {Etape} from "./etape.entity";
import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Column} from "typeorm/decorator/columns/Column";

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
    premiereEtape?: string;

    @OneToMany(type => Etape, etape => etape.scenario, {
        cascade: true,
        eager: true
    })
    etapes?: Etape[];

    getPremiereEtape(){
        return this.etapes.find(e => e.id == this.premiereEtape);
    }
}
