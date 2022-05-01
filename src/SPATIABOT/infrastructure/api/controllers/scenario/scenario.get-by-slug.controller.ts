import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ScenarioGetBySlug} from "../../dtos/scenario/scenario.get-by-slug";
import {ScenarioFindHandler} from "../../../../application/queries/scenario/scenario.find.handler";
import {ScenarioFindQuery} from "../../../../application/queries/scenario/scenario.find.query";
import {AppError} from "../../errors/app.error";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeNotFoundError} from "../../errors/monde/monde-not-found.error";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {ScenarioNotFoundException} from "../../../../domain/exceptions/scenario/scenario-not-found.exception";
import {ScenarioNotFoundError} from "../../errors/scenario/scenario-not-found.error";

@ApiBearerAuth()
@ApiTags('Scenario')
@Controller('scenarios')
export class ScenarioGetBySlugController {

    constructor(
        private readonly scenarioFindHandler: ScenarioFindHandler,
        private readonly logger: WinstonLogger
    ) {
    }

    @Get('/:mondeId/:slug')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramSlug: ScenarioGetBySlug): Promise<ScenarioInterface | AppError> {
        try {
            return this.scenarioFindHandler.execute(new ScenarioFindQuery(paramSlug));
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
        if (e instanceof ScenarioNotFoundException) {
            return new ScenarioNotFoundError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
