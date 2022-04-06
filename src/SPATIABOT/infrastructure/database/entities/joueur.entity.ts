import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {EtapeEntity} from "./etape.entity";
import {EtapeEtatEnum} from "../../../domain/enums/etape-etat.enum";
import {PartieEntity} from "./partie.entity";
import {JoueurInterface} from "../../../domain/interfaces/joueur.interface";
import {StatEntity} from "./stat.entity";
import {UserEntity} from "../../../../USER/infrastructure/database/entities/user.entity";

@Entity('joueur')
export class JoueurEntity implements JoueurInterface {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(type => UserEntity, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true
    })
    user?: UserEntity;

    @Index()
    @Column()
    userId?: string;

    @ManyToOne(type => EtapeEntity, {
        eager: true
    })
    etapeEnCours?: EtapeEntity;

    @Column({nullable: true, default: EtapeEtatEnum.A_AFFICHER})
    etapeEnCoursEtat?: EtapeEtatEnum;

    @Column({type: 'timestamptz',nullable : true})
    etapeDateAffichage?: Date;

    @ManyToOne(type => PartieEntity, partie => partie.joueurs)
    partie?: PartieEntity;

    @Index()
    @Column()
    partieId?: string;

    /** id des scenarios déjà effectués **/
    @Column({type: 'text',array : true,default : []})
    scenarioEffectues?: string[] = [];

    @OneToMany(type => StatEntity,stat => stat.joueur, {
        cascade: true,
    })
    stats?: StatEntity[];

}
