import {EntityRepository, Repository} from 'typeorm';
import {SocialLocal} from "../entity/social-local.entity";

@EntityRepository(SocialLocal)
export class SocialLocalRepository extends Repository<SocialLocal> {

    constructor() {
        super();
    }
}
