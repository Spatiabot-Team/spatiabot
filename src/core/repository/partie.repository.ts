import {EntityRepository, Repository} from "typeorm";
import {Partie} from "../entity/partie.entity";

@EntityRepository(Partie)
export class PartieRepository extends Repository<Partie> {

    async getCurrent(): Promise<Partie>{
        const parties = await this.find({take:1,order:{created : "DESC"}})

        return parties.length > 0 ? parties[0] : null;

    }


}
