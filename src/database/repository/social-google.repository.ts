import {EntityRepository, Repository} from 'typeorm';
import {SocialGoogle} from "../entity/social-google.entity";

@EntityRepository(SocialGoogle)
export class SocialGoogleRepository extends Repository<SocialGoogle> {

    constructor() {
        super();
    }
}
