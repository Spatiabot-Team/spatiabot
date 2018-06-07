//Require modules

    var express = require('express');
    var bodyParser = require('body-parser');
    var path = require('path');
    var app = express();
    var fs = require('fs');
    var colors = require('colors');
    var session = require('express-session');
    aws = require('aws-sdk');
    Api = require('./api/api');
    Spatiabot = require('./discord/spatiabot');
    JeuService = require('./core/services/jeu.service');

//Configs

    if (fs.existsSync('./config/discord.config.js')) {
        // Hébergement local
        var discordConfig = require('./config/discord.config');
        var appConfig = require('./config/app.config');
    }else{
        // Hébergement Heroku (dans le cas où on ne trouve pas le fichier configDiscord)
        console.log ("Hebergement Heroku")
        var discordConfig = process.env;
        var appConfig = process.env;
        console.log("Process env : ", appConfig);
    }

    app.set('discordConfig',discordConfig);
    app.set('appConfig',appConfig);

    var sessionMiddleware = session(appConfig.sessionConfig);
    app.use(sessionMiddleware);
    
    JeuService.config = require('./config/jeu.config');
    JeuService.config.prefix = discordConfig.prefix;//Le jeu en aura besoin pour l'afficher aux joueurs
    app.set('JeuService',JeuService);
    
//API
api = new Api(app).start();

//SPATIABOT
spatiabot = new Spatiabot(app).start();//on passe app pour avoir une instance commune avec l'api
    