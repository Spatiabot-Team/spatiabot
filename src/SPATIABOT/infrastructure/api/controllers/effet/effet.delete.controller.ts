import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Delete, Param, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {EffetInterface} from "../../../../domain/interfaces/effet.interface";
import {EffetNotFoundException} from "../../../../domain/exceptions/effet/effet-not-found.exception";
import {EffetNotFoundError} from "../../errors/effet/effet.not-found.error";
import {EffetDeleteCommand} from "../../../../application/commands/impl/effet/effet.delete.command";
import {ParamId} from "../../dtos/generic/param.id";

@ApiBearerAuth()
@ApiTags('Effet')
@Controller('effets')
export class EffetDeleteController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param() paramId: ParamId): Promise<EffetInterface | AppError> {
        try {
            return await this.commandBus.execute(new EffetDeleteCommand(paramId.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if (e instanceof EffetNotFoundException) {
            return new EffetNotFoundError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
