import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {MondeGetByIdQuery} from "../../../../application/queries/impl/monde/monde.get-by-id.query";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {MondeDoesntExistException} from "../../../../domain/exceptions/monde/monde-doesnt-exist.exception";
import {MondeDoesntExistError} from "../../errors/monde/monde-doesnt-exist.error";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {ScenarioLightByMondeIdQuery} from "../../../../application/queries/impl/scenario/scenario.light-by-monde-id.query";
import {ParamId} from "../../dtos/generic/param-id";

@ApiBearerAuth()
@ApiTags('Mondes')
@Controller('mondes')
export class MondeGetByIdController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly logger: WinstonLogger,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<MondeInterface | AppError>{
        try{
            // Infos principales du monde
            const monde = await this.queryBus.execute(new MondeGetByIdQuery(paramId.id));

            // On vérifie qu'il est bien auteur de ce monde
            if (!monde.hasAuteur(req.user.id)) {
                return new MondeHasNotThisAuteurError();
            }

            // On complète avec la liste des scenarios en version light (juste les infos principales des scenarios)
            monde.scenarios = await this.queryBus.execute(new ScenarioLightByMondeIdQuery(paramId.id));

            return monde;
        }catch(e){
            if (e instanceof MondeDoesntExistException) {
                return new MondeDoesntExistError();
            }
            this.logger.error(e);
            return new AppError();
        }

    }

}
