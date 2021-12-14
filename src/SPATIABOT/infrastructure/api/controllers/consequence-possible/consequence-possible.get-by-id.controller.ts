import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ConsequencePossibleInterface} from "../../../../domain/interfaces/consequence-possible.interface";
import {ConsequencePossibleGetByIdQuery} from "../../../../application/queries/impl/consequence-possible/consequence-possible.get-by-id.query";
import {ParamId} from "../../dtos/generic/param.id";

@ApiBearerAuth()
@ApiTags('ConsequencePossible')
@Controller('consequence-possibles')
export class ConsequencePossibleGetByIdController {

    constructor(
        private readonly queryBus: QueryBus,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<ConsequencePossibleInterface>{
        return this.queryBus.execute(new ConsequencePossibleGetByIdQuery(paramId.id));
    }

}
