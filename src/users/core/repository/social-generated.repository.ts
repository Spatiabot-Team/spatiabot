import {EntityRepository, Repository} from 'typeorm';
import {SocialGenerated} from "../entity/social-generated.entity";

@EntityRepository(SocialGenerated)
export class SocialGeneratedRepository extends Repository<SocialGenerated> {

    constructor() {
        super();
    }
}
