import {Controller} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";

// @ApiBearerAuth()
@ApiTags('Partie')
@Controller('parties')
export class PartieController {

    constructor(

    ) {
    }
    //
    // @Post()
    // async post(@Body() createPartieDto: CreatePartieDto) {
    //
    //     const monde = await this.mondeRepository.findOne(createPartieDto.mondeId)
    //     if (!monde) {
    //         return {error: true};
    //     }
    //
    //     const stats = monde.statDefaults.map((s: Stat) => {
    //         const {id, ...rest} = s;
    //         return rest;
    //     });
    //
    //     const partie = await this.partieRepository.save({
    //         actif: true,
    //         created: new Date(),
    //         monde: {id: monde.id},
    //         stats
    //     });
    //     const discordGuild = await this.discordGuildRepository.findOne(createPartieDto.discordGuildId);
    //
    //     if (!discordGuild) {
    //         return {error: true};
    //     }
    //
    //     if (!discordGuild.parties) {
    //         discordGuild.parties = [];
    //     }
    //     discordGuild.parties.push(partie);
    //
    //     await this.discordGuildRepository.save({id: discordGuild.id, parties: discordGuild.parties});
    //     return partie;
    // }
}
