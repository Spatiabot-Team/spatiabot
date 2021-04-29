import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {PartieRepository} from "../core/repository/partie.repository";
import {MondeRepository} from "../core/repository/monde.repository";
import {DiscordGuildRepository} from "../../discord/core/repository/discord-guild.repository";
import {StatRepository} from "../core/repository/stat.repository";
import {CreatePartieDto} from "../core/dto/create-partie.dto";
import {PartieService} from "../core/service/partie.service";
import {JwtAuthGuard} from "../../users/auth/jwt-auth.guard";
import {Roles} from "../../users/auth/roles.decorator";
import {RolesEnum} from "../../users/core/enum/roles.enum";
import {Stat} from "../core/entity/stat.entity";
import {FindPartieDto} from "../core/dto/find-partie.dto";

@ApiBearerAuth()
@ApiTags('Parties')
@Controller('parties')
export class PartieController {

    constructor(
        private readonly partieService: PartieService,
        @InjectRepository(MondeRepository) private readonly mondeRepository: MondeRepository,
        @InjectRepository(DiscordGuildRepository) private readonly discordGuildRepository: DiscordGuildRepository,
        @InjectRepository(StatRepository) private readonly statRepository: StatRepository
    ) {
    }

    @Post('find')
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async find(@Body() findPartieDto: FindPartieDto) {
        return await this.partieService.partieRepository.findByGuildAndMonde(findPartieDto.discordGuildId,findPartieDto.mondeId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async post(@Body() createPartieDto: CreatePartieDto) {

        const monde = await this.mondeRepository.findOne({id: createPartieDto.mondeId});
        if (!monde) {
            return {error: true};
        }

        const discordGuild = await this.discordGuildRepository.findOne({id: createPartieDto.discordGuildId})
        if (!discordGuild) {
            return {error: true};
        }

        const stats = monde.statDefaults.map((s: Stat) => {
            const {id, ...rest} = s;
            return rest;
        });

        return await this.partieService.partieRepository.save({
            monde,
            discordGuild,
            actif : true,
            created: new Date(),
            stats
        });
    }
}
