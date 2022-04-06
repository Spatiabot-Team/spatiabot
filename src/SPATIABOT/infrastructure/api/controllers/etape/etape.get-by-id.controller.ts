import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {ParamId} from "../../dtos/generic/param.id";
import {EtapeGetByIdHandler} from "../../../../application/services/etape/etape.get-by-id.handler";
import {EtapeGetByIdQuery} from "../../../../application/services/etape/etape.get-by-id.query";

@ApiBearerAuth()
@ApiTags('Etape')
@Controller('etapes')
export class EtapeGetByIdController {

    constructor(
        private readonly etapeGetByIdHandler: EtapeGetByIdHandler,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<EtapeInterface>{
        return this.etapeGetByIdHandler.execute(new EtapeGetByIdQuery(paramId.id));
    }

}
