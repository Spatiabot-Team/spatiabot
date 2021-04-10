import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {PartieRepository} from "../../database/repository/partie.repository";
import {CreatePartieDto} from "../../database/dto/create-partie.dto";
import {MondeRepository} from "../../database/repository/monde.repository";
import {DiscordGuildRepository} from "../../database/repository/discord-guild.repository";
import {StatRepository} from "../../database/repository/stat.repository";
import {Stat} from "../../database/entity/stat.entity";

// @ApiBearerAuth()
@ApiTags('Parties')
@Controller('parties')
export class PartieController {

    constructor(
        @InjectRepository(PartieRepository) private readonly partieRepository: PartieRepository,
        @InjectRepository(MondeRepository) private readonly mondeRepository: MondeRepository,
        @InjectRepository(DiscordGuildRepository) private readonly discordGuildRepository: DiscordGuildRepository,
        @InjectRepository(StatRepository) private readonly statRepository: StatRepository
    ) {
    }

    @Post()
    async post(@Body() createPartieDto: CreatePartieDto) {

        const monde = await this.mondeRepository.findOne(createPartieDto.mondeId)
        if (!monde) {
            return {error: true};
        }

        const stats = monde.statDefaults.map((s: Stat) => {
            const {id, ...rest} = s;
            return rest;
        });

        const partie = await this.partieRepository.save({
            actif: true,
            created: new Date(),
            monde: {id: monde.id},
            stats
        });
        const discordGuild = await this.discordGuildRepository.findOne(createPartieDto.discordGuildId);

        if (!discordGuild) {
            return {error: true};
        }

        if (!discordGuild.parties) {
            discordGuild.parties = [];
        }
        discordGuild.parties.push(partie);

        await this.discordGuildRepository.save({id: discordGuild.id, parties: discordGuild.parties});
        return partie;
    }
}
