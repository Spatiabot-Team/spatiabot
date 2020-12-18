import {Body, Controller, Get, Param, Put, Req, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordGuildRepository} from "../../database/repository/discord-guild.repository";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ScenarioDto} from "../../database/dto/scenario.dto";

// @ApiBearerAuth()
@ApiTags('Discord')
@Controller('')
export class DiscordGuildsController {

    constructor(
        @InjectRepository(DiscordGuildRepository) private readonly discordGuildRepository: DiscordGuildRepository
    ) {
    }

    @Get('discord/my-guilds')
    @UseGuards(JwtAuthGuard)
    myGuilds(@Req() req) {
        return this.discordGuildRepository.findByDiscordId(req.user.socialDiscord.discordId);
    }

    @Put('discord-guild/:id')
    // @UseGuards(JwtAuthGuard)
    // @Roles(RolesEnum.ADMIN)
    public async put(@Param('id') id: string, @Body() discordGuild: any) {
        await this.discordGuildRepository.update(id, discordGuild);
        return this.discordGuildRepository.findOne(id);
    }

}
