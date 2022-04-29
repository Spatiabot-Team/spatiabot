import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Delete, Param, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {ConsequencePossibleInterface} from "../../../../domain/interfaces/consequence-possible.interface";
import {
    ConsequencePossibleNotFoundException
} from "../../../../domain/exceptions/consequence-possible/consequence-possible.not-found.exception";
import {ConsequencePossibleNotFoundError} from "../../errors/consequence-possible/consequence-possible-not-found.error";
import {
    ConsequencePossibleDeleteCommand
} from "../../../../application/commands/impl/consequence-possible/consequence-possible.delete.command";
import {ParamId} from "../../dtos/generic/param.id";

@ApiBearerAuth()
@ApiTags('ConsequencePossible')
@Controller('consequence-possibles')
export class ConsequencePossibleDeleteController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param() paramId: ParamId): Promise<ConsequencePossibleInterface | AppError> {
        try {
            return await this.commandBus.execute(new ConsequencePossibleDeleteCommand(paramId.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if (e instanceof ConsequencePossibleNotFoundException) {
            return new ConsequencePossibleNotFoundError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
