import {EntityRepository, Like, Repository} from "typeorm";
import {Monde} from "../entity/monde.entity";
import {User} from "../../../users/core/entity/user.entity";

@EntityRepository(Monde)
export class MondeRepository extends Repository<Monde> {

    async findByUser(user: any): Promise<Monde[]> {

        const mondes = await this.find({
            where: qb => {
                qb.where('Monde_Monde_auteurs.userId = :id', {
                    id: user.id
                })
            }
        });

        return mondes.map((m: Monde) => ({
            ...m,
            auteurs: m.auteurs.map((a: User) => ({
                username: a.username,
                id: a.id
            }))
        }));
    }
}
