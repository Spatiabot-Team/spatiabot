import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {MondeGetByIdQuery} from "../../../../application/queries/impl/monde/monde.get-by-id.query";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeNotFoundError} from "../../errors/monde/monde-not-found.error";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {
    ScenarioLightByMondeIdQuery
} from "../../../../application/queries/impl/scenario/scenario.light-by-monde-id.query";
import {ParamId} from "../../dtos/generic/param.id";
import {InjectRepository} from "@nestjs/typeorm";
import {ScenarioRepository} from "../../../database/repositories/scenario.repository";
import {ScenarioRepositoryInterface} from "../../../../application/repositories/scenario.repository.interface";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";

@ApiBearerAuth()
@ApiTags('Monde')
@Controller('mondes')
export class MondeScenariosGetController {

    constructor(
        private readonly queryBus: QueryBus,
        @InjectRepository(ScenarioRepository) private readonly scenarioRepository: ScenarioRepositoryInterface,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Get('/:id/scenarios')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param() paramId: ParamId): Promise<ScenarioInterface[] | AppError> {
        try {
            // Infos principales du monde
            const monde = await this.queryBus.execute(new MondeGetByIdQuery(paramId.id));

            // On vérifie qu'il est bien auteur de ce monde
            if (!monde.hasAuteur(req.user.id)) {
                return new MondeHasNotThisAuteurError();
            }
            return this.scenarioRepository.findAllOfMonde(paramId.id);

        } catch (e) {
            if (e instanceof MondeNotFoundException) {
                return new MondeNotFoundError();
            }
            this.logger.error(e);
            return new AppError();
        }

    }

}
