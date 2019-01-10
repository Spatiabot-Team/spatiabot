const fs = require('fs');
const guid = require('../services/guid');
/**
 * Controller : Index
 * @param {type} app
 */
module.exports.controller = function (app) 
{
    
    var jwt = app.get('jwt');

    //IHM

    app.get('/stories', function(req, res){
        res.render("stories/index",{stories : require('./../../data/stories.json')});
    });


    // REST

    app.get('/rest/stories', function(req, res){
        res.json(require('./../../data/stories.json'));
    });

    app.get('/rest/stories/:id', function(req, res){
        res.json(JSON.parse(fs.readFileSync(__dirname + '/../../data/stories/'+req.params.id+'.json')));
    });

    app.put('/rest/stories/:id', function(req, res){
        fs.writeFile(__dirname + '/../../data/stories/'+req.params.id+'.json', JSON.stringify(req.body), function(err) {
            if(err) {
                return console.log(err);
            }
        });
        res.send("ok");
    });

    app.post('/rest/stories', function(req, res){
        newStory = require('./../../data/stories/init.json');
        newStory.id = guid();
        newStory.name = req.body.name;
        fs.writeFile(__dirname + '/../../data/stories/'+newStory.id+'.json', JSON.stringify(newStory), function(err) {
            if(err) {
                return console.log(err);
            }
        });

        stories = require('./../../data/stories.json');
        stories.push(	{
            "id": newStory.id,
            "name": newStory.name
        });
        fs.writeFile(__dirname + '/../../data/stories.json', JSON.stringify(stories), function(err) {
            if(err) {
                return console.log(err);
            }
        });

        res.json(newStory);
    });

};


