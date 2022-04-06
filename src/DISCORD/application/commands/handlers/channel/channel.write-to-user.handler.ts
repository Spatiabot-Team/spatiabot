import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {ChannelWriteToUserCommand} from "../../impl/channel/channel.write-to-user.command";
import {DiscordService} from "../../../services/discord.service";

@CommandHandler(ChannelWriteToUserCommand)
export class ChannelWriteToUserHandler implements IQueryHandler<ChannelWriteToUserCommand> {

    constructor(
        private readonly discordService : DiscordService
    ) {
    }

    /**
     * Cherche le channel qu'on a en privé avec l'utilisateur (le créer s'il n'existe pas)
     * Envoie les MessageEmbeds via ce channel
     *
     * @param query
     */
    async execute(query: ChannelWriteToUserCommand) {

        let userDiscord = await this.discordService.findUser(query.discordUserId);

        let dmChannel = userDiscord.dmChannel;
        if(!dmChannel){
            dmChannel = await userDiscord.createDM();
        }

        return await dmChannel.send({embeds :query.messageEmbeds});
    }
}
