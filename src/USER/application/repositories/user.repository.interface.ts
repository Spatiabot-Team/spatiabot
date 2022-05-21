import {UserInterface} from "../../domain/interfaces/user.interface";
import {User} from "../../domain/entities/user";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {UserEntity} from "../../infrastructure/database/entities/user.entity";

export interface UserRepositoryInterface {
    find(options : any) : Promise<UserInterface[]>;
    findOne(options : any) : Promise<UserInterface>;
    findUsers(ids : string[]) : Promise<UserInterface[]>;
    createUser(user : UserInterface) : Promise<UserInterface>;
    findUserByUsername(username : string) : Promise<UserInterface | undefined>;
    findProfil(userId : string) : Promise<User>;
}
