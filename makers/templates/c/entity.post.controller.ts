import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {###Entity###Post} from "../../dtos/###entity-tiret###/###entity-tiret###.post";
import {###Entity###Interface} from "../../../../domain/interfaces/###entity-tiret###.interface";
import {###Entity###CreateCommand} from "../../../../application/commands/impl/###entity-tiret###/###entity-tiret###.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";

@ApiBearerAuth()
@ApiTags('###Entity###')
@Controller('###entity-tiret###s')
export class ###Entity###PostController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() ###entityCase###Post: ###Entity###Post): Promise<###Entity###Interface | AppError> {
        try {
            return await this.commandBus.execute(new ###Entity###CreateCommand(###entityCase###Post));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        this.logger.error(e);
        return new AppError();
    }

}
