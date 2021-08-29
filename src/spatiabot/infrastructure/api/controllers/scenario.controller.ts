import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetScenariosQuery} from "../../../application/queries/impl";

@ApiTags('Scenarios')
@Controller('scenarios')
export class ScenarioController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    async index(@Request() req) {
        return this.queryBus.execute(new GetScenariosQuery());
    }

}
