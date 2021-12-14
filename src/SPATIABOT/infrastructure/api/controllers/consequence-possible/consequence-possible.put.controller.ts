import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Param, Put, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ConsequencePossibleInterface} from "../../../../domain/interfaces/consequence-possible.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {ConsequencePossibleNotFoundError} from "../../errors/consequence-possible/consequence-possible-not-found.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {ConsequencePossibleNotFoundException} from "../../../../domain/exceptions/consequence-possible/consequence-possible.not-found.exception";
import {ConsequencePossibleUpdateCommand} from "../../../../application/commands/impl/consequence-possible/consequence-possible.update.command";
import {ConsequencePossiblePut} from "../../dtos/consequence-possible/consequence-possible.put";

@ApiBearerAuth()
@ApiTags('ConsequencePossible')
@Controller('consequence-possibles')
export class ConsequencePossiblePutController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param("id") consequencePossibleId: string, @Body() consequencePossible: ConsequencePossiblePut): Promise<ConsequencePossibleInterface | AppError> {
        try {
            return await this.commandBus.execute(new ConsequencePossibleUpdateCommand({...consequencePossible, id: consequencePossibleId}, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {

        if (e instanceof ConsequencePossibleNotFoundException) {
            return new ConsequencePossibleNotFoundError()
        }

        this.logger.error(e);
        return new AppError();
    }

}
