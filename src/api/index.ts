import express from "express";
import bodyParser = require('body-parser');
import colors = require('colors');
import {CONFIG_ENV} from "../../config/config";
import {RegisterRoutes} from './routes';
import {HomeController} from "./controllers/home.controller";
import "./controllers/consequence-possible.controller";
import "./controllers/effet.controller";
import "./controllers/etape.controller";
import "./controllers/initialisation.controller";
import "./controllers/monde.controller";
import "./controllers/joueur.controller";
import "./controllers/reponse.controller";
import "./controllers/stat.controller";
import "./controllers/scenario.controller";
import "./controllers/partie.controller";
import "./controllers/unite.controller";
import swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../../public/swagger.json');


export const Api = () => {

    const app = express();

    const setConfig = () => {
        app.set("port", CONFIG_ENV.port);
        app.use(express.static('dist/public'));
    }

    const setRoutes = () => {
        app.get("/", HomeController.index);
        app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        RegisterRoutes(app);
        app.use((err, req, res, next) => {
            if (err){
		console.error("Une erreur 500 va être retournée", err)
        //         console.error("Une erreur 500 va être retournée", {req,err})
		res.status(err.status ? err.status : 500);
                res.json(err);
            }
        });
    };

    const configureBodyParser = () => {
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    }

    const showWelcomeMessage = () => {
        console.log(colors.green(' o___o '));
        console.log(colors.green(' (^o^)    Bonjour, je suis Website, prêt à vous servir !'));
        console.log(colors.green('o/( )\\o'));
        console.log(colors.green('O_.^._O\n'));
    };

    const startServer = () => {
        app.listen(app.get("port"), () => {
            console.log(
                colors.blue("App is running at %s:%d in %s mode"),
                CONFIG_ENV.url,
                app.get("port"),
                app.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
        });
    };


    return {
        start: () => {
            showWelcomeMessage();
            setConfig();
            configureBodyParser();
            setRoutes();
            startServer();
            return app;
        }
    }
}



