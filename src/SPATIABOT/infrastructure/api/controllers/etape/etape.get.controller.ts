import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {EtapeGetQuery} from "../../../../application/queries/impl/etape/etape.get.query";

@ApiTags('Etape')
@Controller('Etapes')
export class EtapeGetController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    async index(@Request() req) {
        return this.queryBus.execute(new EtapeGetQuery());
    }

}
