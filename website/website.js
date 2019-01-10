var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var authenticationService = require('./services/authenticationService');
var ejsLayouts = require("express-ejs-layouts");
var express = require('express');
module.exports = class Website {

    /**
     *
     * @param app
     */
    constructor(app) {
        this.app = app;
    };

    /**
     *
     * @returns {module.Website}
     */
    start() {

        this.showWelcomeMessage()
            .configureRenderer()
            .configureBodyParser()
            .configureAuthentication()
            .acceptCrossDomain()
            .loadControllers();

        // Tout est pret, on peut demarrer le serveur avec le bon port
        this.app.set('port', process.env.PORT || this.app.get('envConfig').apiPort || 3000);
        let server = http.createServer(this.app);
        let app = this.app;
        server.listen(this.app.get('port'), function () {
            console.log(('Website écoute sur le port ' + app.get('port') + ' (en local : http://localhost:'+ app.get('port')+')').blue);
        });

        return this;
    };

    /**
     * Message de bienvenue sur le website
     * @returns {module.Website}
     */
    showWelcomeMessage() {
        console.log(' o___o '.green);
        console.log(' (^o^)    Bonjour, je suis Website, prêt à vous servir !'.green);
        console.log('o/( )\\o'.green);
        console.log('O_.^._O\n'.green);
        return this;
    }

    /**
     * Les vues seront en ejs
     * @returns {module.Website}
     */
    configureRenderer(){
        this.app.use(ejsLayouts);
        this.app.set("view engine","ejs");
        this.app.set("views","./website/views");
        this.app.use(express.static('website/assets'));
        this.app.use(express.static('node_modules/jsoneditor'));
        this.app.use(express.static('data'));
        return this;
    }

    /**
     * Le body parser permettra de récupérer les paramètre du corp de la requete
     * @returns {module.Website}
     */
    configureBodyParser(){

        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        return this;
    }

    /**
     * On aura besoin d'un service d'authentification qui vérifiera les droits
     * @returns {module.Website}
     */
    configureAuthentication(){
        this.app.set('jwt', jwt);
        authenticationService.init(this.app);
        this.app.set('authenticationService', authenticationService);
        return this;
    }

    /**
     * On fera du cross domain donc il faut autoriser les requetes d'un autre domaine
     */
    acceptCrossDomain() {
        var app = this.app;
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", app.get('envConfig').apiOriginAllowed);
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
            //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            //res.header("Access-Control-Allow-Credentials", "false");
            next();
        });

        return this;
    };

    /**
     * On déclare les controllers de l'api
     */
    loadControllers() {
        var app = this.app;
        fs.readdirSync('./website/controllers/').forEach(function (file) {
            if (file.substr(-3) == '.js') {
                var route = require('./controllers/' + file);
                route.controller(app);
            }
        });
        return this;
    };

};