import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Delete, Param, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {MondeDeleteCommand} from "../../../../application/commands/monde/monde.delete.command";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeNotFoundError} from "../../errors/monde/monde-not-found.error";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {MondeAlreadyExistsError} from "../../errors/monde/monde-already-exists.error";
import {ParamId} from "../../dtos/generic/param.id";

@ApiBearerAuth()
@ApiTags('Monde')
@Controller('mondes')
export class MondeDeleteController {

    constructor(
        
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param() paramId: ParamId): Promise<MondeInterface | MondeAlreadyExistsError> {
        try {
            return await this.commandBus.execute(new MondeDeleteCommand(paramId.id, req.user.id));
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
