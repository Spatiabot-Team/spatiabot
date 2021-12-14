import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ScenarioInterface} from "../../../../domain/interfaces/scenario.interface";
import {ScenarioFindQuery} from "../../../../application/queries/impl/scenario/scenario.find.query";
import {ScenarioGetBySlug} from "../../dtos/scenario/scenario.get-by-slug";

@ApiBearerAuth()
@ApiTags('Scenario')
@Controller('scenarios')
export class ScenarioGetBySlugController {

    constructor(
        private readonly queryBus: QueryBus,
    ) {
    }

    @Get('/:mondeId/:slug')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramSlug: ScenarioGetBySlug): Promise<ScenarioInterface> {
        return this.queryBus.execute(new ScenarioFindQuery(paramSlug));
    }

}
