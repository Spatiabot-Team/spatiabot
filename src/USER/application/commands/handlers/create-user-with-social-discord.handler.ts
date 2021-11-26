import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {CreateUserWithSocialDiscordCommand} from "../impl/create-user-with-social-discord.command";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../../infrastructure/database/repositories/user.repository";
import {UserInterface} from "../../../domain/interfaces/user.interface";
import {UserRepositoryInterface} from "../../repositories/user.repository.interface";
import {SocialDiscordRepository} from "../../../infrastructure/database/repositories/social-discord.repository";
import {SocialDiscordRepositoryInterface} from "../../repositories/social-discord.repository.interface";

@CommandHandler(CreateUserWithSocialDiscordCommand)
export class CreateUserWithSocialDiscordHandler implements IQueryHandler<CreateUserWithSocialDiscordCommand> {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepositoryInterface,
        @InjectRepository(SocialDiscordRepository) private readonly socialDiscordRepository: SocialDiscordRepositoryInterface
    ) {
    }

    /**
     * Si on est là c'est que le user n'existe pas donc on le crée
     * @param query
     */
    async execute(query: CreateUserWithSocialDiscordCommand): Promise<UserInterface> {

        const userEntity = await this.userRepository.createUser({
            username: query.socialDiscord.username,
            avatar: query.socialDiscord.avatarFullLink
        })

        await this.socialDiscordRepository.createSocialDiscord({
            ...query.socialDiscord,
            user : userEntity
        });

        return userEntity;
    }

}
