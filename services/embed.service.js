var EmbedService = module.exports = {

    embedMessage : function(message){
        return {
            "title": "title ~~(did you know you can have markdown here too?)~~",
            "description": "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```",
            "url": "https://discordapp.com",
            "color": 5673749,
            "timestamp": "2018-03-28T12:06:34.662Z",
            "footer": {
              "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
              "text": "footer text"
            },
            "thumbnail": {
              "url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "image": {
              "url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "author": {
              "name": "author name",
              "url": "https://discordapp.com",
              "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "fields": [
              {
                "name": "🤔",
                "value": "some of these properties have certain limits..."
              },
              {
                "name": "😱",
                "value": "try exceeding some of them!"
              },
              {
                "name": "🙄",
                "value": "an informative error should show up, and this view will remain as-is until all issues are fixed"
              },
              {
                "name": "<:thonkang:219069250692841473>",
                "value": "these last two",
                "inline": true
              },
              {
                "name": "<:thonkang:219069250692841473>",
                "value": "are inline fields",
                "inline": true
              }
            ]
          };
    }
}