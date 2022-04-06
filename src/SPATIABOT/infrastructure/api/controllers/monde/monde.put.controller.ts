import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Param, Put, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {MondeAlreadyExistsError} from "../../errors/monde/monde-already-exists.error";
import {AppError} from "../../errors/app.error";
import {MondeNotFoundError} from "../../errors/monde/monde-not-found.error";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {MondeUpdateCommand} from "../../../../application/commands/impl/monde/monde.update.command";
import {MondePut} from "../../dtos/monde/monde.put";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";

@ApiBearerAuth()
@ApiTags('Monde')
@Controller('mondes')
export class MondePutController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param("id") mondeId: string, @Body() monde: MondePut): Promise<MondeInterface | MondeAlreadyExistsError> {
        try {
            return await this.commandBus.execute(new MondeUpdateCommand({...monde, id: mondeId}, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {

        if (e instanceof MondeNotFoundException) {
            return new MondeNotFoundError()
        }

        if (e instanceof MondeHasNotThisAuteurException) {
            return new MondeHasNotThisAuteurError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
