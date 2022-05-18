import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {AuteurFind} from "../../dtos/auteur/auteur.find";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AuteurFindHandler} from "../../../../application/queries/auteur/auteur.find.handler";
import {AuteurFindQuery} from "../../../../application/queries/auteur/auteur.find.query";
import {AuteurInterface} from "../../../../domain/interfaces/aueur.interface";

@ApiBearerAuth()
@ApiTags('Auteur')
@Controller('auteurs')
export class AuteurFindController {

    constructor(
        private readonly auteurFindHandler: AuteurFindHandler,
    ) {
    }

    @Post('/find')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() auteurFind: AuteurFind): Promise<AuteurInterface[]> {
        return this.auteurFindHandler.execute(new AuteurFindQuery(auteurFind.username));
    }

}
