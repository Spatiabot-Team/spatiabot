import {EntityRepository, Repository} from "typeorm";
import {Joueur} from "../entity/joueur.entity";

@EntityRepository(Joueur)
export class JoueurRepository extends Repository<Joueur> {

}
