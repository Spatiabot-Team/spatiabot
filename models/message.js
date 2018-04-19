Discord = require("discord.js");
module.exports = class Message {


	constructor() {
		this.directtext = '';//Message direct

		/** cf https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/examples/using-embeds-in-messages.html */
		this.embedDiscord = new Discord.RichEmbed();
		this.embedDiscord.setColor(0x5F5F70)
	};

	/**
	 * Retourne le message direct. Celui ci est destiné a être envoyé normalement (sans embed)
	 */
	getDirectText() {
		return this.directtext;
	};

	/**
	 * Retourne un objet embedDiscrod, formatte pour un rendu discord
	 */
	getEmbed() {
		if (this.embedDiscord.description) {
			return this.embedDiscord;
		} else {
			return false;
		}
	};

	/**
	 * Exemple de ce que l'on peut faire avec l'objet embed discord
	 */
	setMockembedDiscord() {
		this.embedDiscord.setTitle("This is your title, it can hold 256 characters")
			.setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
			/*
			 * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
			 */
			.setColor(0x00AE86)
			.setDescription("This is the main body of text, it can hold 2048 characters.")
			.setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
			.setImage("http://i.imgur.com/yVpymuV.png")
			.setThumbnail("http://i.imgur.com/p2qNFag.png")
			/*
			 * Takes a Date object, defaults to current date.
			 */
			.setTimestamp()
			.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
			.addField("This is a field title, it can hold 256 characters",
				"This is a field value, it can hold 2048 characters.")
			/*
			 * Inline fields may not display as inline if the thumbnail and/or image is too big.
			 */
			.addField("Inline Field", "They can also be inline.", true)
			/*
			 * Blank field, useful to create some space.
			 */
			.addBlankField(true)
			.addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
	}

	setMock() {
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
};