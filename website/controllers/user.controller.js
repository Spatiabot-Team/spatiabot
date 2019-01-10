/**
 * Controller : Index
 * @param {type} app
 */
module.exports.controller = function (app) 
{
    
    var jwt = app.get('jwt');

    /**
     * 
     */
    app.post('/user/login', function(req, res){
        console.log(req.body);
        var login = req.body.login;
        var password = req.body.password;
        console.log('Connection ! %s %s',login,password);

        if(login == app.get('envConfig').apiLogin && password == app.get('envConfig').apiPassword){

            //Créer le jwt que l'on demadera lors des requêtes protégées        
            var token = jwt.sign({login : app.get('envConfig').apiLogin}, "secret", { expiresIn : 60000 });
            
            res.json({ token: token });
        }else{
            res.status(401).send('Erreur dans l\'authentification');
        }

    });

};


