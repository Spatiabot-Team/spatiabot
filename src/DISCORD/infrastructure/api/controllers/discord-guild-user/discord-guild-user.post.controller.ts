import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {DiscordGuildUserInterface} from "../../../../domain/interfaces/discord-guild-user.interface";
import {DiscordGuildUserCreateCommand} from "../../../../application/commands/impl/discord-guild-user/discord-guild-user.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {DiscordGuildUserPost} from "../../dtos/discord-guild-user/discord-guild-user.post";
import {AppError} from "../../../../../SPATIABOT/infrastructure/api/errors/app.error";

@ApiBearerAuth()
@ApiTags('DiscordGuildUser')
@Controller('discord-guild-users')
export class DiscordGuildUserPostController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() discordGuildUserPost: DiscordGuildUserPost): Promise<DiscordGuildUserInterface | AppError> {
        try {
            return await this.commandBus.execute(new DiscordGuildUserCreateCommand(discordGuildUserPost));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        this.logger.error(e);
        return new AppError();
    }

}
