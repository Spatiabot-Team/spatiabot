import {EntityRepository, Repository} from 'typeorm';
import {SocialLocal} from "../entity/social-local.entity";
import {User} from "../entity/user.entity";

@EntityRepository(SocialLocal)
export class SocialLocalRepository extends Repository<SocialLocal> {

    constructor() {
        super();
    }

    findByUsername = async (username): Promise<User> => {
        return await this.findOne({
            where: qb => {
                qb.where('LOWER(username) = LOWER(:username)', {
                    username
                })
            }
        });
    }
}
