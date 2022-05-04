import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {Roles} from "../../../../../USER/infrastructure/api/security/roles.decorator";
import {RolesEnum} from "../../../../../USER/domain/enum/roles.enum";
import {AppError} from "../../errors/app.error";
import {EtapePost} from "../../dtos/etape/etape.post";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";
import {EtapeCreateCommand} from "../../../../application/commands/etape/etape.create.command";
import {WinstonLogger} from "../../../../../LOGGER/winston-logger";
import {
    ScenarioHasNotThisAuteurException
} from "../../../../domain/exceptions/scenario/scenario-has-not-this-auteur.exception";
import {ScenarioHasNotThisAuteurError} from "../../errors/scenario/scenario-has-not-this-auteur.error";
import {ScenarioNotFoundException} from "../../../../domain/exceptions/scenario/scenario-not-found.exception";
import {ScenarioNotFoundError} from "../../errors/scenario/scenario-not-found.error";
import {MessagePost} from "../../dtos/message/message.post";
import {ChannelWriteCommand} from "../../../../../DISCORD/application/commands/impl/channel/channel.write.command";
import {MessageEmbedService} from "../../../discord/services/message/message.embed.service";

@ApiBearerAuth()
@ApiTags('Message')
@Controller('messages')
export class MessagePostController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly logger: WinstonLogger,
        private readonly messageEmbedService: MessageEmbedService,
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(RolesEnum.ADMIN)
    async index(@Request() req, @Body() messagePost: MessagePost): Promise<AppError> {
        try {

            const messageEmbeds = this.messageEmbedService.execute(messagePost.titre, messagePost.texte);

            return await this.commandBus.execute(
                new ChannelWriteCommand(messagePost.channelId, messageEmbeds)
            );
        } catch (e) {
            return this.parseError(e);
        }
    }

    parseError(e): AppError {
        this.logger.error(e);
        return new AppError();
    }

}
