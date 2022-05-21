import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Param, Put, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {ScenarioNotFoundError} from "../../errors/scenario/scenario-not-found.error";
import {ScenarioHasNotThisAuteurError} from "../../errors/scenario/scenario-has-not-this-auteur.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {ScenarioUpdateCommand} from "../../../../application/commands/scenario/scenario.update.command";
import {ScenarioNotFoundException} from "../../../../domain/exceptions/scenario/scenario-not-found.exception";
import {
    ScenarioHasNotThisAuteurException
} from "../../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {ScenarioPut} from "../../dtos/scenario/scenario.put";

@ApiBearerAuth()
@ApiTags('Scenario')
@Controller('scenarios')
export class ScenarioPutController {

    constructor(
        
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param("id") scenarioId: string, @Body() scenario: ScenarioPut): Promise<ScenarioInterface | AppError> {
        try {
            return await this.commandBus.execute(new ScenarioUpdateCommand({...scenario, id: scenarioId}, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {

        if (e instanceof ScenarioNotFoundException) {
            return new ScenarioNotFoundError()
        }

        if (e instanceof ScenarioHasNotThisAuteurException) {
            return new ScenarioHasNotThisAuteurError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
