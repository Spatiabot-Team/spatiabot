import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Param, Put, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ReponseInterface} from "../../../../domain/interfaces/reponse.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {ReponseNotFoundError} from "../../errors/reponse/reponse.not-found.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {ReponseNotFoundException} from "../../../../domain/exceptions/reponse/reponse.not-found.exception";
import {ReponseUpdateCommand} from "../../../../application/commands/reponse/reponse.update.command";
import {ReponsePut} from "../../dtos/reponse/reponse.put";

@ApiBearerAuth()
@ApiTags('Reponse')
@Controller('reponses')
export class ReponsePutController {

    constructor(
        
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param("id") reponseId: string, @Body() reponse: ReponsePut): Promise<ReponseInterface | AppError> {
        try {
            return await this.commandBus.execute(new ReponseUpdateCommand({...reponse, id: reponseId}, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {

        if (e instanceof ReponseNotFoundException) {
            return new ReponseNotFoundError()
        }

        this.logger.error(e);
        return new AppError();
    }

}
