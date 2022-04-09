import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {AuteurInterface} from "../../../../domain/interfaces/aueur.interface";
import {AuteurFindByIds} from "../../dtos/auteur/auteur.find-by-ids";
import {AuteurFindByIdsQuery} from "../../../../application/services/auteur/auteur.find-by-ids.query";
import {AuteurFindByIdsHandler} from "../../../../application/services/auteur/auteur.find-by-ids.handler";

@ApiBearerAuth()
@ApiTags('Auteur')
@Controller('auteurs')
export class AuteurFindByIdsController {

    constructor(
        private readonly auteurFindHandler: AuteurFindByIdsHandler,
    ) {
    }

    @Post('/find-by-ids')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Body() auteurFindByIds: AuteurFindByIds): Promise<AuteurInterface[]> {
        return this.auteurFindHandler.execute(new AuteurFindByIdsQuery(auteurFindByIds.ids));
    }

}
