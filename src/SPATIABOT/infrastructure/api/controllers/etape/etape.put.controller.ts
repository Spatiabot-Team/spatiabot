import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Param, Put, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {EtapeNotFoundError} from "../../errors/etape/etape-not-found.error";
import {ScenarioHasNotThisAuteurError} from "../../errors/scenario/scenario-has-not-this-auteur.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {EtapeNotFoundException} from "../../../../domain/exceptions/etape/etape-not-found.exception";
import {
    ScenarioHasNotThisAuteurException
} from "../../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {EtapeUpdateCommand} from "../../../../application/commands/impl/etape/etape.update.command";
import {EtapePut} from "../../dtos/etape/etape.put";

@ApiBearerAuth()
@ApiTags('Etape')
@Controller('etapes')
export class EtapePutController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param("id") etapeId: string, @Body() etape: EtapePut): Promise<EtapeInterface | AppError> {
        try {
            return await this.commandBus.execute(new EtapeUpdateCommand({...etape, id: etapeId}, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {

        if (e instanceof EtapeNotFoundException) {
            return new EtapeNotFoundError()
        }

        if (e instanceof ScenarioHasNotThisAuteurException) {
            return new ScenarioHasNotThisAuteurError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
