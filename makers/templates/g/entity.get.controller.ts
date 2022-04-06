import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {###Entity###GetQuery} from "../../../../application/queries/impl/###entity-tiret###/###entity-tiret###.get.query";

@ApiTags('###Entity###')
@Controller('###entityCase###s')
export class ###Entity###GetController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    async index(@Request() req) {
        return this.queryBus.execute(new ###Entity###GetQuery());
    }

}
