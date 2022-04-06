import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {EffetGetHandler} from "../../../../application/services/effet/effet.get.handler";
import {EffetGetQuery} from "../../../../application/services/effet/effet.get.query";

@ApiTags('Effet')
@Controller('Effets')
export class EffetGetController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly effetGetHandler: EffetGetHandler,
    ) {
    }

    @Get()
    async index(@Request() req) {
        return this.effetGetHandler.execute(new EffetGetQuery());
    }

}
