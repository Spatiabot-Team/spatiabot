import {EntityRepository, Repository} from "typeorm";
import {UserEntity} from "../entities/user.entity";
import {UserRepositoryInterface} from "../../../application/repositories/user.repository.interface";
import {UserInterface} from "../../../domain/interfaces/user.interface";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> implements UserRepositoryInterface {

    async createUser(user : UserInterface){
        return this.save(user);
    }

    async findUserByUsername(username:string) : Promise<UserEntity | undefined>{
        return this.findOne({username});
    }


}
