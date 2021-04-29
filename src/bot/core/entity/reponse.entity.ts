import {Etape} from "./etape.entity";
import {ConsequencePossible} from "./consequence-possible.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";

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

    @ManyToOne(type => Etape, etape=> etape.reponses,
        {onUpdate: 'CASCADE', onDelete: 'CASCADE'}
    )
    etape?: Etape;

    @OneToMany(type => ConsequencePossible, consequencePossible => consequencePossible.reponse, {
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
