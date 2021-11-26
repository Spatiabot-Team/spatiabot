import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ScenarioGetByIdQuery} from "../../../../application/queries/impl/scenario/scenario.get-by-id.query";
import {ParamId} from "../../dtos/generic/param-id";

@ApiBearerAuth()
@ApiTags('Scenarios')
@Controller('scenarios')
export class ScenarioGetByIdController {

    constructor(
        private readonly queryBus: QueryBus,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<ScenarioInterface>{
        return this.queryBus.execute(new ScenarioGetByIdQuery(paramId.id));
    }

}
