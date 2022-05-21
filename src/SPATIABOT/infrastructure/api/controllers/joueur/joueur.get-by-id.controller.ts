import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {JoueurInterface} from "../../../../domain/interfaces/joueur.interface";
import {JoueurGetByIdQuery} from "../../../../application/queries/joueur/joueur.get-by-id.query";
import {ParamId} from "../../dtos/generic/param.id";
import {JoueurGetByIdHandler} from "../../../../application/queries/joueur/joueur.get-by-id.handler";

@ApiBearerAuth()
@ApiTags('Joueur')
@Controller('joueurs')
export class JoueurGetByIdController {

    constructor(private readonly joueurGetByIdHandler: JoueurGetByIdHandler) {
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId): Promise<JoueurInterface> {
        return this.joueurGetByIdHandler.execute(new JoueurGetByIdQuery(paramId.id));
    }

}
