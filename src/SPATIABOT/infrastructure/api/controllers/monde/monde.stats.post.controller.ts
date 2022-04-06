import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Param, Post, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeNotFoundError} from "../../errors/monde/monde-not-found.error";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {ParamId} from "../../dtos/generic/param.id";
import {InjectRepository} from "@nestjs/typeorm";
import {StatRepositoryInterface} from "../../../../application/repositories/stat.repository.interface";
import {StatInterface} from "../../../../domain/interfaces/stat.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {MondeGetByIdHandler} from "../../../../application/services/monde/monde.get-by-id.handler";
import {MondeGetByIdQuery} from "../../../../application/services/monde/monde.get-by-id.query";
import {StatRepository} from "../../../database/repositories/stat.repository";
import {MondeStatPost} from "../../dtos/monde/monde.stat.post";

@ApiBearerAuth()
@ApiTags('Monde')
@Controller('mondes')
export class MondeStatsPostController {

    constructor(
        private readonly mondeGetByIdHandler: MondeGetByIdHandler,
        @InjectRepository(StatRepository) private readonly statRepository: StatRepositoryInterface,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post('/:id/stats')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param() paramId: ParamId, @Body() stat: MondeStatPost): Promise<StatInterface | AppError> {
        try {
            // Infos principales du monde
            const monde = await this.mondeGetByIdHandler.execute(new MondeGetByIdQuery(paramId.id));

            // On vérifie qu'il est bien auteur de ce monde
            if (!monde.hasAuteur(req.user.id)) {
                return new MondeHasNotThisAuteurError();
            }

            return await this.statRepository.save({...stat,mondeId : monde.id});

        } catch (e) {
            if (e instanceof MondeNotFoundException) {
                return new MondeNotFoundError();
            }
            this.logger.error(e);
            return new AppError();
        }

    }

}
