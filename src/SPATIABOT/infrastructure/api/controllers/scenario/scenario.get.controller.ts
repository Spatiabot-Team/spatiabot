import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ScenarioGetQuery} from "../../../../application/queries/impl/scenario/scenario.get.query";

@ApiTags('Scenarios')
@Controller('scenarios')
export class ScenarioGetController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    async index(@Request() req) {
        return this.queryBus.execute(new ScenarioGetQuery());
    }

}
