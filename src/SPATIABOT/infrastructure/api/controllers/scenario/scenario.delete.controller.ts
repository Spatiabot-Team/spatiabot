import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Delete, Param, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ScenarioNotFoundException} from "../../../../domain/exceptions/scenario/scenario-not-found.exception";
import {ScenarioHasNotThisAuteurException} from "../../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {ScenarioNotFoundError} from "../../errors/scenario/scenario-not-found.error";
import {ScenarioHasNotThisAuteurError} from "../../errors/scenario/scenario-has-not-this-auteur.error";
import {ScenarioDeleteCommand} from "../../../../application/commands/impl/scenario/scenario.delete.command";
import {ParamId} from "../../dtos/generic/param.id";

@ApiBearerAuth()
@ApiTags('Scenario')
@Controller('scenarios')
export class ScenarioDeleteController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param() paramId: ParamId): Promise<ScenarioInterface | AppError> {
        try {
            return await this.commandBus.execute(new ScenarioDeleteCommand(paramId.id, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if (e instanceof ScenarioNotFoundException) {
            return new ScenarioNotFoundError();
        }
        if (e instanceof ScenarioHasNotThisAuteurException) {
            return new ScenarioHasNotThisAuteurError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
