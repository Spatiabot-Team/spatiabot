import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {ScenarioPost} from "../../dtos/scenario/scenario-post";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ScenarioCreateCommand} from "../../../../application/commands/impl/scenario/scenario.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {MondeDoesntExistException} from "../../../../domain/exceptions/monde/monde-doesnt-exist.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeDoesntExistError} from "../../errors/monde/monde-doesnt-exist.error";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";

@ApiBearerAuth()
@ApiTags('Scenarios')
@Controller('scenarios')
export class ScenarioPostController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() scenarioPost: ScenarioPost): Promise<ScenarioInterface | AppError> {
        try {
            return await this.commandBus.execute(new ScenarioCreateCommand(scenarioPost, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if (e instanceof MondeDoesntExistException) {
            return new MondeDoesntExistError();
        }
        if (e instanceof MondeHasNotThisAuteurException) {
            return new MondeHasNotThisAuteurError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
