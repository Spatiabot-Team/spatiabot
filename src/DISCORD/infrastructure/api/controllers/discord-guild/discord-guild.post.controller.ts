import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {DiscordGuildInterface} from "../../../../domain/interfaces/discord-guild.interface";
import {
    DiscordGuildCreateCommand
} from "../../../../application/commands/impl/discord-guild/discord-guild.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {DiscordGuildPost} from "../../dtos/discord-guild/discord-guild.post";
import {AppError} from "../../../../../APP/errors/app.error";

@ApiBearerAuth()
@ApiTags('DiscordGuild')
@Controller('discord-guilds')
export class DiscordGuildPostController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() discordGuildPost: DiscordGuildPost): Promise<DiscordGuildInterface | AppError> {
        try {
            return await this.commandBus.execute(new DiscordGuildCreateCommand(discordGuildPost));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        this.logger.error(e);
        return new AppError();
    }

}
