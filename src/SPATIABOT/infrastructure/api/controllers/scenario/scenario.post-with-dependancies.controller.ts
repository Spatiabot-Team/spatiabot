import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ScenarioCreateCommand} from "../../../../application/commands/scenario/scenario.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeNotFoundError} from "../../errors/monde/monde-not-found.error";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";

@ApiBearerAuth()
@ApiTags('Scenario')
@Controller('scenarios')
export class ScenarioPostWithDependanciesController {

    constructor(
        
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post('with-dependancies')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() scenarioPost: any): Promise<ScenarioInterface | AppError> {
        try {
            return await this.commandBus.execute(new ScenarioCreateCommand(scenarioPost, req.user.id));
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
