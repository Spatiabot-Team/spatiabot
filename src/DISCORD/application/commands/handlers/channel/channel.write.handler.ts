import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {DiscordService} from "../../../services/discord.service";
import {ChannelWriteCommand} from "../../impl/channel/channel.write.command";
import {TextChannel} from "discord.js";
import {ChannelNotFoundException} from "../../../../domain/exceptions/channel-not-found.exception";

@CommandHandler(ChannelWriteCommand)
export class ChannelWriteHandler implements IQueryHandler<ChannelWriteCommand> {

    constructor(
        private readonly discordService: DiscordService
    ) {
    }

    /**
     * @param channelWriteCommand
     */
    async execute(channelWriteCommand: ChannelWriteCommand) {

        const channel: TextChannel = await this.discordService.findTextChannel(channelWriteCommand.channelId);

        if (!channel) {
            throw new ChannelNotFoundException(channelWriteCommand.channelId);
        }

        return await channel.send({embeds: channelWriteCommand.messageEmbeds});
    }
}
