import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeGetByAuteurIdQuery} from "../../../../application/queries/impl/monde/monde.get-by-auteur-id.query";

@ApiBearerAuth()
@ApiTags('Mondes')
@Controller('mondes')
export class MondeByConnectedUserController {

    constructor(
        private readonly queryBus: QueryBus
    ) {
    }

    @Get('/by-connected-user')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req) {
        return this.queryBus.execute(new MondeGetByAuteurIdQuery(req.user.id));
    }

}
