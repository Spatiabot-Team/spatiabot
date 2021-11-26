import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Param, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {MondeDoesntExistException} from "../../../../domain/exceptions/monde/monde-doesnt-exist.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeDoesntExistError} from "../../errors/monde/monde-doesnt-exist.error";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {MondeAlreadyExistsError} from "../../errors/monde/monde-already-exists.error";
import {MondeAddAuteurCommand} from "../../../../application/commands/impl/monde/monde.add-auteur.command";
import {MondeHasAlreadyThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-already-this-auteur.exception";
import {MondeHasAlreadyThisAuteurError} from "../../errors/monde/monde-has-already-this-auteur.error";
import {UserNotFoundException} from "../../../../domain/exceptions/auteur/user-not-found.exception";
import {MondeAddAuteur} from "../../dtos/monde/monde.add-auteur";

@ApiBearerAuth()
@ApiTags('Mondes')
@Controller('mondes')
export class MondeAddAuteurController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post('/:mondeId/auteurs/:auteurId')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param() params: MondeAddAuteur): Promise<MondeInterface | MondeAlreadyExistsError> {
        try {
            return await this.commandBus.execute(new MondeAddAuteurCommand(params.mondeId, params.auteurId, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {

        // Erreurs applicatives
        if (e instanceof MondeDoesntExistException) {
            return new MondeDoesntExistError();
        }
        if (e instanceof MondeHasNotThisAuteurException) {
            return new MondeHasNotThisAuteurError();
        }
        if (e instanceof MondeHasAlreadyThisAuteurException) {
            return new MondeHasAlreadyThisAuteurError();
        }
        if (e instanceof UserNotFoundException) {
            return new MondeHasAlreadyThisAuteurError();
        }

        // Autre erreurs
        this.logger.error(e);
        return new AppError();
    }

}
