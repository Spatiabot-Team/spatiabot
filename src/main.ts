import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import {WinstonLogger} from "./LOGGER/winston-logger";
import {clc} from "@nestjs/common/utils/cli-colors.util";


async function bootstrap() {

    clc.red(`Environnement de ${process.env.ENVIRONMENT}`)

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api/v1');

    // Aller dans le constructeur car actuellement on écrase options
    app.useLogger(app.get(WinstonLogger));

    app.useGlobalPipes(new ValidationPipe({whitelist: true}));
    app.enableCors();
    const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Spatiabot')
    .setDescription('Spatiabot API description')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3000);
    console.log(clc.magentaBright(`Server is listening on ${process.env.PORT || 3000}`))
}

bootstrap();
