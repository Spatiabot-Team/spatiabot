import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {EtapeGetByIdQuery} from "../../../../application/queries/impl/etape/etape.get-by-id.query";
import {ParamId} from "../../dtos/generic/param.id";

@ApiBearerAuth()
@ApiTags('Etape')
@Controller('etapes')
export class EtapeGetByIdController {

    constructor(
        private readonly queryBus: QueryBus,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<EtapeInterface>{
        return this.queryBus.execute(new EtapeGetByIdQuery(paramId.id));
    }

}
