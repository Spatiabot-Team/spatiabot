import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {ConsequencePossiblePost} from "../../dtos/consequence-possible/consequence-possible.post";
import {ConsequencePossibleInterface} from "../../../../domain/interfaces/consequence-possible.interface";
import {
    ConsequencePossibleCreateCommand
} from "../../../../application/commands/impl/consequence-possible/consequence-possible.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";

@ApiBearerAuth()
@ApiTags('ConsequencePossible')
@Controller('consequence-possibles')
export class ConsequencePossiblePostController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() ConsequencepossiblePost: ConsequencePossiblePost): Promise<ConsequencePossibleInterface | AppError> {
        try {
            return await this.commandBus.execute(new ConsequencePossibleCreateCommand(ConsequencepossiblePost));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        this.logger.error(e);
        return new AppError();
    }

}
