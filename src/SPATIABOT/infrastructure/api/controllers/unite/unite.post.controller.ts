import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {UniteInterface} from "../../../../domain/interfaces/unite.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {UniteCreateCommand} from "../../../../application/commands/unite/unite.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {UniteAlreadyExistsError} from "../../errors/unite/unite-already-exists.error";
import {UniteAlreadyExistsException} from "../../../../domain/exceptions/unite/unite-already-exists.exception";
import {UnitePost} from "../../dtos/unite/unite-post";

@ApiBearerAuth()
@ApiTags('Unite')
@Controller('unites')
export class UnitePostController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() unite: UnitePost): Promise<UniteInterface | AppError> {
        try {
            return await this.commandBus.execute(new UniteCreateCommand(unite, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if (e instanceof UniteAlreadyExistsException) {
            return new UniteAlreadyExistsError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
