import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {CommandHandlers} from "./application/commands/handlers";
import {EventHandlers} from "./application/events/handlers";
import {QueryHandlers} from "./application/queries/handlers";
import {Controllers} from "./infrastructure/api/controllers";
import {ScenarioRepository} from "./infrastructure/database/repositories/scenario.repository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [CqrsModule,TypeOrmModule.forFeature([ScenarioRepository])],
    controllers: [...Controllers],
    providers: [
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
    ],
})
export class SpatiabotModule {
}
