import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Partie} from "../../../../domain/entities/partie";
import {PartieFind} from "../../dtos/partie/partie.find";
import {PartieFindQuery} from "../../../../application/queries/impl/partie/partie.find.query";

// @ApiBearerAuth()
@ApiTags('Partie')
@Controller('parties')
export class PartieFindController {

    constructor(
        private readonly queryBus: QueryBus,
    ) {
    }

    @Post('find')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Body() partieFind: PartieFind): Promise<Partie[]> {
        try {
            return this.queryBus.execute(new PartieFindQuery(partieFind.mondeId, partieFind.discordGuildUuid));
        } catch (e: any) {
            console.error('DiscordGuildSyncByConnectedUserController error : ', e);
        }
    }

}
