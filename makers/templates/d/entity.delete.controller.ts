import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Delete, Param, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {###Entity###Interface} from "../../../../domain/interfaces/###entity-tiret###.interface";
import {###Entity###NotFoundException} from "../../../../domain/exceptions/###entity-tiret###/###entity-tiret###.not-found.exception";
import {###Entity###NotFoundError} from "../../errors/###entity-tiret###/###entity-tiret###.not-found.error";
import {###Entity###DeleteCommand} from "../../../../application/commands/impl/###entity-tiret###/###entity-tiret###.delete.command";
import {ParamId} from "../../../../../APP/dtos/param.id";

@ApiBearerAuth()
@ApiTags('###Entity###')
@Controller('###entity-tiret###s')
export class ###Entity###DeleteController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param() paramId: ParamId): Promise<###Entity###Interface | AppError> {
        try {
            return await this.commandBus.execute(new ###Entity###DeleteCommand(paramId.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if (e instanceof ###Entity###NotFoundException) {
            return new ###Entity###NotFoundError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
