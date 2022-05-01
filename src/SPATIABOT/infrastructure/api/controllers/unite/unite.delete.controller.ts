import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Delete, Param, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {MondeAlreadyExistsError} from "../../errors/monde/monde-already-exists.error";
import {UniteDeleteCommand} from "../../../../application/commands/unite/unite.delete.command";
import {UniteNotFoundException} from "../../../../domain/exceptions/unite/unite-not-found.exception";
import {UniteNotFoundError} from "../../errors/unite/unite-not-found.error";

@ApiBearerAuth()
@ApiTags('Unite')
@Controller('unites')
export class UniteDeleteController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Delete('/:uniteId')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param("uniteId") uniteId: string): Promise<MondeInterface | MondeAlreadyExistsError> {
        try {
            return await this.commandBus.execute(new UniteDeleteCommand(uniteId, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if (e instanceof UniteNotFoundException) {
            return new UniteNotFoundError();
        }
        if (e instanceof MondeHasNotThisAuteurException) {
            return new MondeHasNotThisAuteurError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
