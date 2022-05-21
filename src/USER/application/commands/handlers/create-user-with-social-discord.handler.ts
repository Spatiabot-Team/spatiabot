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

        // Chercher si un user porte déjà ce nom (car username doit être unique)
        const userWithSameName = await this.userRepository.findUserByUsername(query.socialDiscord.username)

        // s'il y en a déjà un on met null pour la table user (on ira chercher son username dans socialDiscord)
        // S'il veut se connecter avec son username il devra en créer un)
        const userEntity = await this.userRepository.createUser({
            username: userWithSameName ? null : query.socialDiscord.username,
            avatar: query.socialDiscord.avatarFullLink
        })

        userEntity.socialDiscord = await this.socialDiscordRepository.createSocialDiscord({
            ...query.socialDiscord,
            user : userEntity
        });

        return userEntity;
    }

}
