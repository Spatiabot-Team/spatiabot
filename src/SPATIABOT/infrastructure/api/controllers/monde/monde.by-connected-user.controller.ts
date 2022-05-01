import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {MondeGetByAuteurIdHandler} from "../../../../application/queries/monde/monde.get-by-auteur-id.handler";
import {MondeGetByAuteurIdQuery} from "../../../../application/queries/monde/monde.get-by-auteur-id.query";

@ApiBearerAuth()
@ApiTags('Monde')
@Controller('mondes')
export class MondeByConnectedUserController {

    constructor(
        private readonly mondeGetByAuteurIdHandler: MondeGetByAuteurIdHandler
    ) {
    }

    @Get('/by-connected-user')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req) {
        return this.mondeGetByAuteurIdHandler.execute(new MondeGetByAuteurIdQuery(req.user.id));
    }

}
