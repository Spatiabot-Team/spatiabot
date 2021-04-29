import {EntityRepository, In, IsNull, Not, Repository} from "typeorm";
import {Scenario} from "../entity/scenario.entity";
import {Joueur} from "../entity/joueur.entity";
import {Partie} from "../entity/partie.entity";

@EntityRepository(Scenario)
export class ScenarioRepository extends Repository<Scenario> {
    findByUuid(uuid: string): Scenario {
        return Object.assign(new Scenario(), this.find({where: {"id::text": uuid}}));
    }

    async getAllLights() {
        const scenarios = await this.find();
        return scenarios.map(s => ({
            id: s.id,
            titre: s.titre,
            actif: s.actif,
        }));
    }

    async findAllLightByMonde(mondeId) : Promise<Scenario[]> {
        const scenarios = await this.find({
            where: {
                mondeId
            }
        });
        return scenarios.map(s => ({
            id: s.id,
            titre: s.titre,
            actif: s.actif,
            mondeId
        }));
    }

    /**
     * Trouver les scenarios qui n'ont pas encore été joués par le joueur
     * @param joueur
     */
    async findNotPLaiedByJoueur(joueur: Joueur, partie : Partie) : Promise<Scenario[]> {

        // On ne prends que les scenario qui sont actifs et qui ont au moins une première étape
        const query: any = {
            where: {
                actif: true,
                monde: partie.monde,
                premiereEtape: Not(IsNull()), // la première étape existe
            }
        };

        if (joueur.scenarioEffectues && joueur.scenarioEffectues.length > 0) {
            query.where.id = Not(In(joueur.scenarioEffectues));
        }
        return await this.find(query);
    }
}
