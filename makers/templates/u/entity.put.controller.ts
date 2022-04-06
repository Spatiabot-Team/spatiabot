import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Param, Put, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {###Entity###Interface} from "../../../../domain/interfaces/###entity-tiret###.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {###Entity###NotFoundError} from "../../errors/###entity-tiret###/###entity-tiret###.not-found.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {###Entity###NotFoundException} from "../../../../domain/exceptions/###entity-tiret###/###entity-tiret###.not-found.exception";
import {###Entity###UpdateCommand} from "../../../../application/commands/impl/###entity-tiret###/###entity-tiret###.update.command";
import {###Entity###Put} from "../../dtos/###entity-tiret###/###entity-tiret###.put";

@ApiBearerAuth()
@ApiTags('###Entity###')
@Controller('###entity-tiret###s')
export class ###Entity###PutController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param("id") ###entityCase###Id: string, @Body() ###entityCase###: ###Entity###Put): Promise<###Entity###Interface | AppError> {
        try {
            return await this.commandBus.execute(new ###Entity###UpdateCommand({...###entityCase###, id: ###entityCase###Id}, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {

        if (e instanceof ###Entity###NotFoundException) {
            return new ###Entity###NotFoundError()
        }

        this.logger.error(e);
        return new AppError();
    }

}
