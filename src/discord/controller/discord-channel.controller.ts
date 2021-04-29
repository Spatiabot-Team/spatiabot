import {Controller} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordGuildRepository} from "../core/repository/discord-guild.repository";
import {DiscordUserService} from "../../users/discord/discord-user.service";

// @ApiBearerAuth()
@ApiTags('Discord')
@Controller('')
export class DiscordChannelController {

}
