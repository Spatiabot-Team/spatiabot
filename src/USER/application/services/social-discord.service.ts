import {Injectable} from "@nestjs/common";
import {User} from "../../domain/entities/user";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {SocialDiscordInterface} from "../../domain/interfaces/social-discord.interface";
import {GetUserByDiscordIdQuery} from "../queries/impl/get-user-by-discord-id.query";
import {CreateUserWithSocialDiscordCommand} from "../commands/impl/create-user-with-social-discord.command";

@Injectable()
export class SocialDiscordService {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) {
    }

    async findOrCreateUser(socialDiscord: SocialDiscordInterface): Promise<User> {

        let user = await this.queryBus.execute(new GetUserByDiscordIdQuery(socialDiscord.discordId));

        if (!user) {
            user = await this.commandBus.execute(new CreateUserWithSocialDiscordCommand(socialDiscord))
        }

        return user;

    }
}
