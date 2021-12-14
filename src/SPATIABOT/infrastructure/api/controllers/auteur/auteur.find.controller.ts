import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeInterface} from "../../../../domain/interfaces/monde.interface";
import {AuteurFind} from "../../dtos/auteur/auteur.find";
import {AuteurFindQuery} from "../../../../application/queries/impl/auteur/auteur.find.query";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";

@ApiBearerAuth()
@ApiTags('Auteur')
@Controller('auteurs')
export class AuteurFindController {

    constructor(
        private readonly queryBus: QueryBus,
    ) {
    }

    @Post('/find')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() auteurFind: AuteurFind): Promise<MondeInterface> {
        return this.queryBus.execute(new AuteurFindQuery(auteurFind.username));
    }

}
