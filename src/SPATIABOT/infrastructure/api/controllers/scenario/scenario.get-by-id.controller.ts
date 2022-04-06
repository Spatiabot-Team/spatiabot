import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ParamId} from "../../dtos/generic/param.id";
import {ScenarioGetByIdHandler} from "../../../../application/services/scenario/scenario.get-by-id.handler";
import {ScenarioGetByIdQuery} from "../../../../application/services/scenario/scenario.get-by-id.query";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {AppError} from "../../errors/app.error";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeNotFoundError} from "../../errors/monde/monde-not-found.error";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";

@ApiBearerAuth()
@ApiTags('Scenario')
@Controller('scenarios')
export class ScenarioGetByIdController {

    constructor(
        private readonly scenarioGetByIdHandler: ScenarioGetByIdHandler,
        private readonly logger: WinstonLogger
    ) {
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId): Promise<ScenarioInterface | AppError> {
        try {
            return this.scenarioGetByIdHandler.execute(new ScenarioGetByIdQuery(paramId.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if (e instanceof MondeNotFoundException) {
            return new MondeNotFoundError();
        }
        if (e instanceof MondeHasNotThisAuteurException) {
            return new MondeHasNotThisAuteurError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
