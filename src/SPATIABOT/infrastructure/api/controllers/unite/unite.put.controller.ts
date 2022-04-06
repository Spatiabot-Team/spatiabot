import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Param, Put, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {UniteInterface} from "../../../../domain/interfaces/unite.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {UniteAlreadyExistsError} from "../../errors/unite/unite-already-exists.error";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {UniteUpdateCommand} from "../../../../application/commands/impl/unite/unite.update.command";
import {UniteNotFoundException} from "../../../../domain/exceptions/unite/unite-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {UniteNotFoundError} from "../../errors/unite/unite-not-found.error";
import {UnitePut} from "../../dtos/unite/unite-put";

@ApiBearerAuth()
@ApiTags('Unite')
@Controller('unites')
export class UnitePutController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param("id") uniteId: string, @Body() unite: UnitePut): Promise<UniteInterface | UniteAlreadyExistsError> {
        try {
            return await this.commandBus.execute(new UniteUpdateCommand({...unite, id: uniteId}, req.user.id));
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
