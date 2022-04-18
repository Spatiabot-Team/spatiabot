import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {PartiePost} from "../../dtos/partie/partie.post";
import {PartieInterface} from "../../../../domain/interfaces/partie.interface";
import {PartieCreateCommand} from "../../../../application/commands/impl/partie/partie.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {PartieAlreadyExistsException} from "../../../../domain/exceptions/partie/partie.already-exists.exception";
import {PartieAlreadyExistsError} from "../../errors/partie/partie.already-exists.error";

@ApiBearerAuth()
@ApiTags('Partie')
@Controller('parties')
export class PartiePostController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() partiePost: PartiePost): Promise<PartieInterface | AppError> {
        try {
            return await this.commandBus.execute(new PartieCreateCommand(partiePost));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        if(e instanceof PartieAlreadyExistsException){
            return new PartieAlreadyExistsError();
        }
        this.logger.error(e);
        return new AppError();
    }

}
