import {EntityRepository, Repository} from "typeorm";
import {UserEntity} from "../entities/user.entity";
import {UserRepositoryInterface} from "../../../application/repositories/user.repository.interface";
import {UserInterface} from "../../../domain/interfaces/user.interface";
import {User} from "../../../domain/entities/user";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> implements UserRepositoryInterface {

    async createUser(user : UserInterface){
        return this.save(user);
    }

    async findUserByUsername(username:string) : Promise<UserEntity | undefined>{
        return this.findOne({username});
    }

    /**
     * Retourne le profil complet d'un utilisateur
     */
    async findProfil(userId : string) : Promise<User>{
        return this.findOne({
            relations : ['socialDiscord','roles'],
            where : {id : userId}
        });
    }

}
