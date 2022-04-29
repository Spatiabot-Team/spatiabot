import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeNotFoundError} from "../../errors/monde/monde-not-found.error";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {ParamSlugOrId} from "../../dtos/generic/param.slug-or-id";
import {isUUID} from "@nestjs/common/utils/is-uuid";
import {MondeFindHandler} from "../../../../application/services/monde/monde.find.handler";
import {MondeFindQuery} from "../../../../application/services/monde/monde.find.query";
import {
    ScenarioLightByMondeIdHandler
} from "../../../../application/services/scenario/scenario.light-by-monde-id.handler";
import {ScenarioLightByMondeIdQuery} from "../../../../application/services/scenario/scenario.light-by-monde-id.query";

@ApiBearerAuth()
@ApiTags('Monde')
@Controller('mondes')
export class MondeGetByIdController {

    constructor(
        private readonly mondeFindHandler: MondeFindHandler,
        private readonly scenarioLightByMondeIdHandler: ScenarioLightByMondeIdHandler,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Get('/:slugOrId')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramSlugOrId: ParamSlugOrId): Promise<MondeInterface | AppError> {
        try {

            const paramMonde = isUUID(paramSlugOrId.slugOrId) ? {id: paramSlugOrId.slugOrId} : {slug: paramSlugOrId.slugOrId};

            // Infos principales du monde
            const monde = await this.mondeFindHandler.execute(new MondeFindQuery(paramMonde));

            // On vérifie qu'il est bien auteur de ce monde
            if (!monde.hasAuteur(req.user.id)) {
                return new MondeHasNotThisAuteurError();
            }

            // On complète avec la liste des scenarios en version light (juste les infos principales des scenarios)
            monde.scenarios = await this.scenarioLightByMondeIdHandler.execute(new ScenarioLightByMondeIdQuery(monde.id));

            return monde;
        } catch (e) {
            if (e instanceof MondeNotFoundException) {
                return new MondeNotFoundError();
            }
            this.logger.error(e);
            return new AppError();
        }

    }

}
