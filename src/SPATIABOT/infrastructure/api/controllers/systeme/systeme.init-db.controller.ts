import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {ScenarioPost} from "../../dtos/scenario/scenario.post";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ScenarioCreateCommand} from "../../../../application/commands/impl/scenario/scenario.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {MondeNotFoundException} from "../../../../domain/exceptions/monde/monde-not-found.exception";
import {MondeHasNotThisAuteurException} from "../../../../domain/exceptions/monde/monde-has-not-this-auteur.exception";
import {MondeNotFoundError} from "../../errors/monde/monde-not-found.error";
import {MondeHasNotThisAuteurError} from "../../errors/monde/monde-has-not-this-auteur.error";
import {monde} from "../../../../../tmp/monde";
import {MondeCreateCommand} from "../../../../application/commands/impl/monde/monde.create.command";
import slugify from "slugify";
import {MondeAlreadyExistsException} from "../../../../domain/exceptions/monde/monde-already-exists.exception";
import {MondeAlreadyExistsError} from "../../errors/monde/monde-already-exists.error";

@ApiBearerAuth()
@ApiTags('Systeme')
@Controller('systeme')
export class SystemeInitDbController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req) {
        try {
            monde.scenarios = monde.scenarios.map(scenario => ({
                ...scenario,
                slug : slugify(scenario.titre),
                auteurIds : [req.user.id]
            }))
            return await this.commandBus.execute(new MondeCreateCommand(monde, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if(e instanceof MondeAlreadyExistsException){
            return new MondeAlreadyExistsError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
