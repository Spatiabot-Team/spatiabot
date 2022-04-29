import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Param, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {ScenarioNotFoundException} from "../../../../domain/exceptions/scenario/scenario-not-found.exception";
import {
    ScenarioHasNotThisAuteurException
} from "../../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {ScenarioNotFoundError} from "../../errors/scenario/scenario-not-found.error";
import {ScenarioHasNotThisAuteurError} from "../../errors/scenario/scenario-has-not-this-auteur.error";
import {ScenarioHasAlreadyThisAuteurError} from "../../errors/scenario/scenario-has-already-this-auteur.error";
import {UserNotFoundException} from "../../../../domain/exceptions/auteur/user-not-found.exception";
import {ScenarioAddAuteur} from "../../dtos/scenario/scenario.add-auteur";
import {
    ScenarioHasAlreadyThisAuteurException
} from "../../../../domain/exceptions/scenario/scenario-has-already-this-auteur.exception";
import {ScenarioAddAuteurCommand} from "../../../../application/commands/impl/scenario/scenario.add-auteur.command";

@ApiBearerAuth()
@ApiTags('Scenario')
@Controller('scenarios')
export class ScenarioAddAuteurController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post('/:scenarioId/auteurs/:auteurId')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param() params: ScenarioAddAuteur): Promise<ScenarioInterface | AppError> {
        try {
            return await this.commandBus.execute(new ScenarioAddAuteurCommand(params.scenarioId, params.auteurId, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {

        // Erreurs applicatives
        if (e instanceof ScenarioNotFoundException) {
            return new ScenarioNotFoundError();
        }
        if (e instanceof ScenarioHasNotThisAuteurException) {
            return new ScenarioHasNotThisAuteurError();
        }
        if (e instanceof ScenarioHasAlreadyThisAuteurException) {
            return new ScenarioHasAlreadyThisAuteurError();
        }
        if (e instanceof UserNotFoundException) {
            return new ScenarioHasAlreadyThisAuteurError();
        }

        // Autre erreurs
        this.logger.error(e);
        return new AppError();
    }

}
