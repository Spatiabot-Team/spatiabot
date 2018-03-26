
//Configuration
var minHourWaitingEvent = 5  // Temps minimum avant déclanchement event en heure
var maxHourWaitingEvent = 48 // Temps maximum avant déclanchement event en heure
var firstEvent = 1 // Temps avant le premier évènement en heure (fixe)
var ChannelID = "231151508585054208" // id du salon où sera diffusé le contenu
var prefix = "!"

function Joueur (id, pv) {
	this.id = id
	this.pv = pv
	//this.time = Date.now() + firstEvent * 3600 * 1000
	this.time = Date.now() + 5000
	this.isWaitingEvent = true

	this.computeTimeNextEvent = function()
	{		
		var hour = Math.floor(Math.random()*maxHourWaitingEvent + minHourWaitingEvent)
		this.time = Date.now() + hour * 3600 * 1000
		console.log("Date actuelle en secondes: " + Date.now() / 1000)
		console.log("Date prochaine en secondes: " + this.time / 1000)
	}
}

//Initialisation
var tabJoueurs = new Array()
const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log("Logged in as " + client.user.tag + "!");
});

client.on('message', msg => {
	
	var channel = client.channels.find("id", ChannelID)
	if (channel == undefined)
	{
		console.log ("Erreur : salon " + ChannelID + "introuvable")
		return
	}

	// Décollage
	if (msg.content === prefix + 'decollage') {
		// TODO : vérifier que le joueur n'existe pas déjà
		channel.send(" Un decollage vient d'avoir lieu, celui de " + msg.author.username + " ! Parti explorer les fins fond de l'univers, va t'il aller au bout de son periple ?");
		var j = new Joueur (msg.author.id, 10)
		tabJoueurs.push(j)
	}
	
	var joueur = tabJoueurs.find(function(element)
	{
		return element.id == msg.author.id
	});
	
	// Toute cette section concerne un joueur
	if (joueur)
	{
		// Vérifier si la personne a une nouvelle aventure
		if (Date.now() >= joueur.time && joueur.isWaitingEvent)
		{
			console.log("Et la, l'aventure commencera")
		}		
	}
});

client.login('NDI3MDU0Mzc0NTczOTY1MzEy.DZfCgw.g1ll1f5EfPCRjZxaGLku8mFwabg');