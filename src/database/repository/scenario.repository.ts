import {EntityRepository, In, IsNull, Not, Repository} from "typeorm";
import {Scenario} from "../entity/scenario.entity";
import {Joueur} from "../entity/joueur.entity";

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
            actif: s.actif
        }));
    }

    async findNotPLaiedByJoueur(joueur: Joueur) {

        const query: any = {
            where: {
                actif: true,
                premiereEtape: Not(IsNull())
            }
        };

        // if (joueur.scenariosEffectues && joueur.scenariosEffectues.length > 0) {
        //     query.where.id = Not(In(joueur.scenariosEffectues));
        // }

        return this.find(query);
    }
}
