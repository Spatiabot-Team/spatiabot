import {CommandHandler, IQueryHandler} from "@nestjs/cqrs";
import {AnswerInChannelCommand} from "../impl/answer-in-channel.command";
import {EmbedService} from "../../services/embed.service";

@CommandHandler(AnswerInChannelCommand)
export class AnswerInChannelHandler implements IQueryHandler<AnswerInChannelCommand> {

    constructor(
        private readonly embedService: EmbedService
    ) {
    }

    async execute(answerInChannelCommand: AnswerInChannelCommand) {
        answerInChannelCommand.channel.send({
            embeds : [this.embedService.embedMessage({description: answerInChannelCommand.answer})]
        });
    }
}
