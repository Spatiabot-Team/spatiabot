import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Partie} from "../../../../domain/entities/partie";
import {PartieFind} from "../../dtos/partie/partie.find";
import {PartieFindQuery} from "../../../../application/services/partie/partie.find.query";
import {PartieFindHandler} from "../../../../application/services/partie/partie.find.handler";

// @ApiBearerAuth()
@ApiTags('Partie')
@Controller('parties')
export class PartieFindController {

    constructor(
        private readonly partieFindHandler: PartieFindHandler,
    ) {
    }

    @Post('find')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Body() partieFind: PartieFind): Promise<Partie[]> {
        try {
            return await this.partieFindHandler.execute(new PartieFindQuery(partieFind.mondeId, partieFind.discordGuildUuid));
        } catch (e: any) {
            console.error('DiscordGuildSyncByConnectedUserController error : ', e);
        }
    }

}
