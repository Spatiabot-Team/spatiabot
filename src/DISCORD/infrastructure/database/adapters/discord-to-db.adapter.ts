import {InjectRepository} from "@nestjs/typeorm";
import {DiscordGuildRepository} from "../repositories/discord-guild.repository";
import {DiscordGuild} from "../../../domain/entities/discord-guild.entity";

export class DiscordToDbAdapter {

    constructor(@InjectRepository(DiscordGuildRepository) private readonly repository: DiscordGuildRepository) {
    }

    adapt(discordGuild: any) : DiscordGuild {
        return this.repository.create({
            name : discordGuild.name,
            icon : discordGuild.icon,
            prefix : process.env.DISCORD_PREFIX || '!',
            discordGuildId : discordGuild.id
        })
    }
}
