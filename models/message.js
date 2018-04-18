module.exports = class Message {


	constructor() {
		this.text = '';
		this.title = "title ~~(did you know you can have markdown here too?)~~";
		this.description = "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```";
		this.url = "https://discordapp.com";
		this.color = 5673749;
		this.timestamp = "2018-03-28T12:06:34.662Z";
		this.footer = {
			"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
			"text": "footer text"
		};
		this.thumbnail = {
			"url": "https://cdn.discordapp.com/embed/avatars/0.png"
		};
		this.image = {
			"url": "https://cdn.discordapp.com/embed/avatars/0.png"
		};
		this.author = {
			"name": "author name",
			"url": "https://discordapp.com",
			"icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
		};
		this.fields = [
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

	getEmbed(){
		return {
			"title": this.title,
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
		/*return {
			"title": this.title,
			"description": this.description,
			"url": this.url,
			"color": this.color,
			"timestamp": this.timestamp,
			"footer": this.footer,
			"thumbnail": this.thumbnail,
			"image": this.image,
			"author": this.author,
			"fields": this.fields,
		  };*/
	};
};