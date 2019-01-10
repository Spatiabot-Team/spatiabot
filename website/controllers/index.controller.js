/**
 * Controller : Index
 * @param {type} app
 */
module.exports.controller = function (app) 
{
    
    var jwt = app.get('jwt');

    app.get('/', function(req, res){
        //res.send('hello world');
        res.render("welcome/helloworld",{name:""});
    });

    app.get('/custom', app.get('authenticationService').ensureAuthorized, function(req, res){
        res.send('Authenticated !');
    });

};


