import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {EffetPost} from "../../dtos/effet/effet.post";
import {EffetInterface} from "../../../../domain/interfaces/effet.interface";
import {EffetCreateCommand} from "../../../../application/commands/impl/effet/effet.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";

@ApiBearerAuth()
@ApiTags('Effet')
@Controller('effets')
export class EffetPostController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() EffetPost: EffetPost): Promise<EffetInterface | AppError> {
        try {
            return await this.commandBus.execute(new EffetCreateCommand(EffetPost));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        this.logger.error(e);
        return new AppError();
    }

}
