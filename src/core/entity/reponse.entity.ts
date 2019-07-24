import {Entity} from "typeorm/decorator/entity/Entity";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";
import {ManyToOne, OneToMany, Unique} from "typeorm";
import {Etape} from "./etape.entity";
import {ConsequencePossible} from "./consequence-possible.entity";

@Entity()
@Unique(["etape","libelle"])
export class Reponse {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    titre?: string;

    @Column({nullable: true, default: null })
    texte?: string;

    @Column()
    libelle?: string;

    @ManyToOne(type => Etape, etape => etape.reponses,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    etape?: Etape;

    @OneToMany(type => ConsequencePossible, consequencePossible => consequencePossible.reponseOrigine, {
        cascade: true,
        eager: true
    })
    consequencePossibles?: ConsequencePossible[];

    constructor(datas?: Reponse) {
        if (datas) {
            this.titre = datas.titre;
            this.texte = datas.texte;
        }
    }
}
