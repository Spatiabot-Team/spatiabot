import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {EtapePost} from "../../dtos/etape/etape-post";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {EtapeCreateCommand} from "../../../../application/commands/impl/etape/etape.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {MondeDoesntExistException} from "../../../../domain/exceptions/monde/monde-doesnt-exist.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeDoesntExistError} from "../../errors/monde/monde-doesnt-exist.error";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {ScenarioHasNotThisAuteurException} from "../../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {ScenarioHasNotThisAuteurError} from "../../errors/scenario/scenario-has-not-this-auteur.error";
import {ScenarioDoesntExistException} from "../../../../domain/exceptions/scenario/scenario-doesnt-exist.exception";
import {ScenarioDoesntExistError} from "../../errors/scenario/scenario-doesnt-exist.error";

@ApiBearerAuth()
@ApiTags('Etape')
@Controller('etapes')
export class EtapePostController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() etapePost: EtapePost): Promise<EtapeInterface | AppError> {
        try {
            return await this.commandBus.execute(new EtapeCreateCommand(etapePost, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if (e instanceof ScenarioDoesntExistException) {
            return new ScenarioDoesntExistError();
        }
        if (e instanceof ScenarioHasNotThisAuteurException) {
            return new ScenarioHasNotThisAuteurError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
