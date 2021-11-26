import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetPartieByDiscordGuildQuery} from "../../../application/queries/impl/get-discord-guilds.query";

@ApiTags('DiscordGuild')
@Controller('discord-guilds')
export class DiscordGuildController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    async index(@Request() req) {
        return this.queryBus.execute(new GetPartieByDiscordGuildQuery());
    }

}
