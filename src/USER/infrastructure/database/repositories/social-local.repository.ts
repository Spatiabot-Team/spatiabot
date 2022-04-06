import {EntityRepository, Raw, Repository} from "typeorm";
import {SocialLocalRepositoryInterface} from "../../../application/repositories/social-local.repository.interface";
import {SocialLocalEntity} from "../entities/social-local.entity";
import {UserInterface} from "../../../domain/interfaces/user.interface";
import {SocialLocalInterface} from "../../../domain/interfaces/social-local.interface";

@EntityRepository(SocialLocalEntity)
export class SocialLocalRepository extends Repository<SocialLocalEntity> implements SocialLocalRepositoryInterface {

    async createSocialLocal(user: UserInterface) {
        return this.save(user);
    }

    async findByUsername(username : string): Promise<SocialLocalInterface | undefined>{
        const socialLocalEntity : SocialLocalEntity | undefined = await this.findOne({
            where : {
                 username: Raw(alias =>`LOWER(${alias}) Like LOWER(:value)`, { value: username })
            },
        });

        if(!socialLocalEntity){
            return undefined;
        }

        return socialLocalEntity;
    }

}
