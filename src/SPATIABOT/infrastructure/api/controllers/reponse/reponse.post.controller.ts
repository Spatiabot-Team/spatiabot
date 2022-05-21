import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {ReponsePost} from "../../dtos/reponse/reponse.post";
import {ReponseInterface} from "../../../../domain/interfaces/reponse.interface";
import {ReponseCreateCommand} from "../../../../application/commands/reponse/reponse.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";

@ApiBearerAuth()
@ApiTags('Reponse')
@Controller('reponses')
export class ReponsePostController {

    constructor(
        
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() ReponsePost: ReponsePost): Promise<ReponseInterface | AppError> {
        try {
            return await this.commandBus.execute(new ReponseCreateCommand(ReponsePost));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        this.logger.error(e);
        return new AppError();
    }

}
