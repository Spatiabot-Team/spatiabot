import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {EffetGetQuery} from "../../../../application/queries/impl/effet/effet.get.query";

@ApiTags('Effet')
@Controller('Effets')
export class EffetGetController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    async index(@Request() req) {
        return this.queryBus.execute(new EffetGetQuery());
    }

}
