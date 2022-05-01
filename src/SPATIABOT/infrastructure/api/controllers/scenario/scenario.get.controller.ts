import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {ScenarioGetQuery} from "../../../../application/queries/scenario/scenario.get.query";
import {ScenarioGetHandler} from "../../../../application/queries/scenario/scenario.get.handler";

@ApiTags('Scenario')
@Controller('scenarios')
export class ScenarioGetController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly scenarioGetHandler: ScenarioGetHandler,
    ) {}

    @Get()
    async index(@Request() req) {
        return this.scenarioGetHandler.execute(new ScenarioGetQuery());
    }

}
