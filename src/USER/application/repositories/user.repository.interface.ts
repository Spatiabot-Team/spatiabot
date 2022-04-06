import {UserInterface} from "../../domain/interfaces/user.interface";
import {User} from "../../domain/entities/user";

export interface UserRepositoryInterface {
    find(options : any) : Promise<UserInterface[]>;
    findOne(options : any) : Promise<UserInterface>;
    createUser(user : UserInterface) : Promise<UserInterface>;
    findUserByUsername(username : string) : Promise<UserInterface | undefined>;
    findProfil(userId : string) : Promise<User>;
}
