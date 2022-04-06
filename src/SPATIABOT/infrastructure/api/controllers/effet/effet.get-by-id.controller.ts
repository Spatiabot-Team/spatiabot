import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {EffetInterface} from "../../../../domain/interfaces/effet.interface";
import {ParamId} from "../../dtos/generic/param.id";
import {EffetGetByIdHandler} from "../../../../application/services/effet/effet.get-by-id.handler";
import {EffetGetByIdQuery} from "../../../../application/services/effet/effet.get-by-id.query";

@ApiBearerAuth()
@ApiTags('Effet')
@Controller('effets')
export class EffetGetByIdController {

    constructor(
        private readonly effetGetByIdHandler: EffetGetByIdHandler,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<EffetInterface>{
        return this.effetGetByIdHandler.execute(new EffetGetByIdQuery(paramId.id));
    }

}
