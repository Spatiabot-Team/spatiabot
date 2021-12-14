import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ReponseInterface} from "../../../../domain/interfaces/reponse.interface";
import {ReponseGetByIdQuery} from "../../../../application/queries/impl/reponse/reponse.get-by-id.query";
import {ParamId} from "../../dtos/generic/param.id";

@ApiBearerAuth()
@ApiTags('Reponse')
@Controller('reponses')
export class ReponseGetByIdController {

    constructor(
        private readonly queryBus: QueryBus,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<ReponseInterface>{
        return this.queryBus.execute(new ReponseGetByIdQuery(paramId.id));
    }

}
