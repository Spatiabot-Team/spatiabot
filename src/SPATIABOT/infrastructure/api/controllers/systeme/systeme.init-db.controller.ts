import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
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
