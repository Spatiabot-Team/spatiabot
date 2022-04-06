import {EntityRepository, Repository} from "typeorm";
import {ScenarioEntity} from "../entities/scenario.entity";
import {ScenarioRepositoryInterface} from "../../../application/repositories/scenario.repository.interface";
import {ScenarioInterface} from "../../../domain/interfaces/scenario.interface";
import {ScenarioLightInterface} from "../../../domain/interfaces/scenario-light.interface";
import {MondeEntity} from "../entities/monde.entity";

@EntityRepository(ScenarioEntity)
export class ScenarioRepository extends Repository<ScenarioEntity> implements ScenarioRepositoryInterface {

    findOneById(id : string): Promise<ScenarioEntity> {
        return super.findOne({
            where : {
                id
            },
            relations : ['etapes','etapes.effets','etapes.reponses']
        });
    }

    async findAll(): Promise<ScenarioInterface[]> {
        return await this.find();
    }

    async findAllOfMonde(mondeId): Promise<ScenarioInterface[]> {
        return await this.find({
            relations : ['etapes','etapes.effets','etapes.reponses'],
            where: {
                mondeId
            }
        });
    }

    async findLightOfMonde(mondeId : string) : Promise<ScenarioLightInterface[]> {
        return this.find({
            select : ['id','titre','mondeId','slug'],
            where : {
                mondeId
            }
        });
    }

    /**
     * Retourne un scenario aléatoire en respectant les conditions suivantes :
     * - il y a une première étape
     * - le joueur ne l'a pas encore fait
     * - le scenario est actif
     * @param joueurId
     */
    async determinerScenarioSuivantJoueur(joueurId : string) : Promise<ScenarioInterface | null>{

        return this.createQueryBuilder('scenario')
            .innerJoin('scenario.monde', 'monde')
            .innerJoin('monde.parties', 'partie')
            .innerJoin('partie.joueurs', 'joueur')
            .innerJoinAndSelect('scenario.etapes', 'etape')
            .where('etape.premiereEtape = true')
            .andWhere('joueur.id = :joueurId', {joueurId})
            .andWhere('not(scenario.id::text = ANY (joueur.scenarioEffectues))')
            .andWhere('scenario.actif = true')
            .orderBy("RANDOM()")
            .getOne();
    }

}
