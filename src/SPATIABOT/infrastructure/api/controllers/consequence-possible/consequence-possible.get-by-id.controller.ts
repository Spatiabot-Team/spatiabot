import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Request, UseGuards} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../../../../../USER/infrastructure/api/security/jwt-auth.guard";
import {ConsequencePossibleInterface} from "../../../../domain/interfaces/consequence-possible.interface";
import {ParamId} from "../../dtos/generic/param.id";
import {
    ConsequencePossibleGetByIdHandler
} from "../../../../application/services/consequence-possible/consequence-possible.get-by-id.handler";
import {
    ConsequencePossibleGetByIdQuery
} from "../../../../application/services/consequence-possible/consequence-possible.get-by-id.query";

@ApiBearerAuth()
@ApiTags('ConsequencePossible')
@Controller('consequence-possibles')
export class ConsequencePossibleGetByIdController {

    constructor(
        private readonly consequencePossibleGetByIdHandler: ConsequencePossibleGetByIdHandler,
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async index(@Request() req, @Param() paramId: ParamId) : Promise<ConsequencePossibleInterface>{
        return this.consequencePossibleGetByIdHandler.execute(new ConsequencePossibleGetByIdQuery(paramId.id));
    }

}
