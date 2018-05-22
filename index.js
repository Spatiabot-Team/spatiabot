//Require modules

    var express = require('express');
    var bodyParser = require('body-parser');
    var path = require('path');
    var app = express();
    var fs = require('fs');
    var colors = require('colors');
    var session = require('express-session');
    Api = require('./api/api');
    Spatiabot = require('./discord/spatiabot');
    JeuService = require('./core/services/jeu.service');

//Configs

    appConfig = require('./config/app.config');
    app.set('appConfig',appConfig);
    var sessionMiddleware = session(appConfig.sessionConfig);
    app.use(sessionMiddleware); 
    JeuService.config = require('./config/config');
    app.set('JeuService',JeuService);
    
//API
api = new Api(app).start();

//SPATIABOT
spatiabot = new Spatiabot(app).start();//on passe app pour avoir une instance commune avec l'api
    