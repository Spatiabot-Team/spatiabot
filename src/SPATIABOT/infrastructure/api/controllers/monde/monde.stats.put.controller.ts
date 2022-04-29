import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Param, Put, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeNotFoundError} from "../../errors/monde/monde-not-found.error";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {StatInterface} from "../../../../domain/interfaces/stat.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {MondeGetByIdHandler} from "../../../../application/services/monde/monde.get-by-id.handler";
import {MondeStatPut} from "../../dtos/monde/monde.stat.put";
import {CommandBus} from "@nestjs/cqrs";
import {MondeStatUpdateCommand} from "../../../../application/commands/impl/monde/monde.stat.update.command";
import {StatNotFoundException} from "../../../../domain/exceptions/stat/stat.not-found.exception";
import {StatNotFoundError} from "../../errors/stat/stat-not-found.error";
import {MondeStatPutParam} from "../../dtos/monde/monde.stat.put-param";

@ApiBearerAuth()
@ApiTags('Monde')
@Controller('mondes')
export class MondeStatsPutController {

    constructor(
        private readonly mondeGetByIdHandler: MondeGetByIdHandler,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Put('/:mondeId/stats/:statId')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param() mondeStatPutParam: MondeStatPutParam, @Body() stat: MondeStatPut): Promise<StatInterface | AppError> {
        try {
            // Infos principales du monde
            return await this.commandBus.execute(new MondeStatUpdateCommand(
                mondeStatPutParam.mondeId, mondeStatPutParam.statId, stat, req.user.id)
            );

        } catch (e) {
            if (e instanceof MondeNotFoundException) {
                return new MondeNotFoundError();
            }

            if (e instanceof StatNotFoundException) {
                return new StatNotFoundError();
            }
            this.logger.error(e);
            return new AppError();
        }

    }

}
