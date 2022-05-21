import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ReponseInterface} from "../../../../domain/interfaces/reponse.interface";
import {ParamId} from "../../dtos/generic/param.id";
import {ReponseGetByIdQuery} from "../../../../application/queries/reponse/reponse.get-by-id.query";
import {ReponseGetByIdHandler} from "../../../../application/queries/reponse/reponse.get-by-id.handler";

@ApiBearerAuth()
@ApiTags('Reponse')
@Controller('reponses')
export class ReponseGetByIdController {

    constructor(
        private readonly reponseGetByIdHandler: ReponseGetByIdHandler,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<ReponseInterface>{
        return this.reponseGetByIdHandler.execute(new ReponseGetByIdQuery(paramId.id));
    }

}
