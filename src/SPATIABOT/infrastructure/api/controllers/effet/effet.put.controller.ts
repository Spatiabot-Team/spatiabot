import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Param, Put, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {EffetInterface} from "../../../../domain/interfaces/effet.interface";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {EffetNotFoundError} from "../../errors/effet/effet.not-found.error";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {EffetNotFoundException} from "../../../../domain/exceptions/effet/effet-not-found.exception";
import {EffetUpdateCommand} from "../../../../application/commands/effet/effet.update.command";
import {EffetPut} from "../../dtos/effet/effet.put";

@ApiBearerAuth()
@ApiTags('Effet')
@Controller('effets')
export class EffetPutController {

    constructor(
        
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
    ) {
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Param("id") EffetId: string, @Body() Effet: EffetPut): Promise<EffetInterface | AppError> {
        try {
            return await this.commandBus.execute(new EffetUpdateCommand({...Effet, id: EffetId}, req.user.id));
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {

        if (e instanceof EffetNotFoundException) {
            return new EffetNotFoundError()
        }

        this.logger.error(e);
        return new AppError();
    }

}
