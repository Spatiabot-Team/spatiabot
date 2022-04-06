import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {MondeAlreadyExistsError} from "../../errors/monde/monde-already-exists.error";
import {AppError} from "../../errors/app.error";
import {MondeCreateCommand} from "../../../../application/commands/impl/monde/monde.create.command";
import {MondePost} from "../../dtos/monde/monde.post";
import {MondeAlreadyExistsException} from "../../../../domain/exceptions/monde/monde-already-exists.exception";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";

@ApiBearerAuth()
@ApiTags('Monde')
@Controller('mondes')
export class MondePostController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() monde: MondePost): Promise<MondeInterface | MondeAlreadyExistsError> {
        try {
            return await this.commandBus.execute(new MondeCreateCommand(monde, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if (e instanceof MondeAlreadyExistsException) {
            return new MondeAlreadyExistsError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
