import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {JoueurInterface} from "../../../../domain/interfaces/joueur.interface";
import {JoueurGetByIdQuery} from "../../../../application/services/joueur/joueur.get-by-id.query";
import {ParamId} from "../../dtos/generic/param.id";

@ApiBearerAuth()
@ApiTags('Joueur')
@Controller('joueurs')
export class JoueurGetByIdController {

    constructor(
        private readonly queryBus: QueryBus,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<JoueurInterface>{
        return this.queryBus.execute(new JoueurGetByIdQuery(paramId.id));
    }

}
