import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Delete, Param, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {JoueurInterface} from "../../../../domain/interfaces/joueur.interface";
import {JoueurNotFoundException} from "../../../../domain/exceptions/joueur/joueur.not-found.exception";
import {JoueurNotFoundError} from "../../errors/joueur/joueur.not-found.error";
import {JoueurDeleteCommand} from "../../../../application/commands/joueur/joueur.delete.command";
import {ParamId} from "../../../../../APP/dtos/param.id";

@ApiBearerAuth()
@ApiTags('Joueur')
@Controller('joueurs')
export class JoueurDeleteController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param() paramId: ParamId): Promise<JoueurInterface | AppError> {
        try {
            return await this.commandBus.execute(new JoueurDeleteCommand(paramId.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if (e instanceof JoueurNotFoundException) {
            return new JoueurNotFoundError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
