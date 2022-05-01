import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {
    ConsequencePossibleGetHandler
} from "../../../../application/queries/consequence-possible/consequence-possible.get.handler";
import {
    ConsequencePossibleGetQuery
} from "../../../../application/queries/consequence-possible/consequence-possible.get.query";

@ApiTags('ConsequencePossible')
@Controller('consequence-possibles')
export class ConsequencePossibleGetController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly consequencePossibleGetHandler: ConsequencePossibleGetHandler,
    ) {
    }

    @Get()
    async index(@Request() req) {
        return this.consequencePossibleGetHandler.execute(new ConsequencePossibleGetQuery());
    }

}
