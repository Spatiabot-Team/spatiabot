import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {EffetInterface} from "../../../../domain/interfaces/effet.interface";
import {EffetGetByIdQuery} from "../../../../application/queries/impl/effet/effet.get-by-id.query";
import {ParamId} from "../../dtos/generic/param.id";

@ApiBearerAuth()
@ApiTags('Effet')
@Controller('effets')
export class EffetGetByIdController {

    constructor(
        private readonly queryBus: QueryBus,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<EffetInterface>{
        return this.queryBus.execute(new EffetGetByIdQuery(paramId.id));
    }

}
