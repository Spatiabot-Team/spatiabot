import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ReponseGetQuery} from "../../../../application/queries/impl/reponse/reponse.get.query";

@ApiTags('Reponse')
@Controller('Reponses')
export class ReponseGetController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    async index(@Request() req) {
        return this.queryBus.execute(new ReponseGetQuery());
    }

}
