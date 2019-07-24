import {EntityRepository, getCustomRepository, Repository} from "typeorm";
import {Initialisation} from "../entity/initialisation.entity";

@EntityRepository(Initialisation)
export class InitialisationRepository extends Repository<Initialisation> {

    async getCurrent(): Promise<Initialisation>{
        const initialisationRepository = await getCustomRepository(InitialisationRepository);
        const initialisations = await initialisationRepository.find({take: 1, order: {created: "DESC"}});
        return initialisations.length > 0 ? initialisations[0] : null;
    }

}
