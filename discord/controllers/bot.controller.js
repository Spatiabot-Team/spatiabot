Message = require('../../core/models/message');

/**
 * S'assurer que le bot repond bien
 * 
 * @param Object channel 
 * @param Object msg 
 */
module.exports.IWork = function(channel,msg){
  var message = new Message();
  message.embedDiscord.setDescription("Oui **" + msg.author.username + "** je fonctionne super bien ! ");
  embed = message.getEmbed();
  channel.send({ embed });
};

/**
 * Action 404 : commande non trouvée
 * @toto : Faire une analyse de la chaine pour essayer de deviner la commande que voulais lancer la personne
 *         et donc repondre par exemple : "vouliez vous dire !test"
 * 
 * @param Object channel 
 * @param Object msg 
 */
module.exports.notFound = function(channel,msg){
    channel.send("Euh...je n'ai pas très bien compris :thinking: ");
};

/**
 * Test de messages formattés avec couleurs, images, markdown etc
 * 
 * @param Object channel 
 * @param Object msg 
 */
module.exports.embed = function(channel,msg){
    embed = {
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
      channel.send("this `supports` __a__ **subset** *of* ~~markdown~~ 😃 ```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```", { embed });
};

/**
 * Test de messages formattés avec couleurs, images, markdown etc
 * 
 * @param Object channel 
 * @param Object msg 
 */
module.exports.embedme = function(channel,msg){
    embed = {
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
            "name": "\r\n🤔 Oyez oyez !",
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
      msg.author.send("this `supports` __a__ **subset** *of* ~~markdown~~ 😃 ```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```", { embed });
};