import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {CreateUserWithSocialLocalCommand} from "../impl/create-user-with-social-local.command";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../../infrastructure/database/repositories/user.repository";
import {UserInterface} from "../../../domain/interfaces/user.interface";
import {UserRepositoryInterface} from "../../repositories/user.repository.interface";
import {SocialLocalRepository} from "../../../infrastructure/database/repositories/social-local.repository";
import {SocialLocalRepositoryInterface} from "../../repositories/social-local.repository.interface";
import {EncrDecrService} from "../../services/enc-decr.service";

@CommandHandler(CreateUserWithSocialLocalCommand)
export class CreateUserWithSocialLocalHandler implements IQueryHandler<CreateUserWithSocialLocalCommand> {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepositoryInterface,
        @InjectRepository(SocialLocalRepository) private readonly socialLocalRepository: SocialLocalRepositoryInterface,
        private encrDecrService: EncrDecrService
    ) {
    }

    /**
     * Si on est là c'est que le user n'existe pas donc on le crée
     * @param query
     */
    async execute(query: CreateUserWithSocialLocalCommand): Promise<UserInterface> {

        const userEntity = await this.userRepository.createUser({
            username: query.socialLocal.username,
            roles : query.role ?  [query.role] : []
        });

        await this.socialLocalRepository.createSocialLocal({
            ...query.socialLocal,
            password : this.encrDecrService.encrypt(process.env.salt, query.socialLocal.password),
            user : userEntity
        });

        return userEntity;
    }

}
