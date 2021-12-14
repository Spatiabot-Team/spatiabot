import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ConsequencePossibleGetQuery} from "../../../../application/queries/impl/consequence-possible/consequence-possible.get.query";

@ApiTags('ConsequencePossible')
@Controller('consequence-possibles')
export class ConsequencePossibleGetController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    async index(@Request() req) {
        return this.queryBus.execute(new ConsequencePossibleGetQuery());
    }

}
