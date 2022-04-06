import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {ReponseGetHandler} from "../../../../application/services/reponse/reponse.get.handler";
import {ReponseGetQuery} from "../../../../application/services/reponse/reponse.get.query";

@ApiTags('Reponse')
@Controller('Reponses')
export class ReponseGetController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly reponseGetHandler: ReponseGetHandler,
    ) {
    }

    @Get()
    async index(@Request() req) {
        return this.reponseGetHandler.execute(new ReponseGetQuery());
    }

}
