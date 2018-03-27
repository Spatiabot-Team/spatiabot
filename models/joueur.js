/**
 * 
 * @param {int} id 
 * @param {int} pv 
 */
module.exports.Joueur = function (id, pv) 
{
    this.id = id;
	this.pv = pv;
	//this.time = Date.now() + firstEvent * 3600 * 1000
	this.time = Date.now() + 5000;
	this.isWaitingEvent = true;

	this.computeTimeNextEvent = function()
	{		
		var hour = Math.floor(Math.random()*maxHourWaitingEvent + minHourWaitingEvent);
		this.time = Date.now() + hour * 3600 * 1000;
		console.log("Date actuelle en secondes: " + Date.now() / 1000);
		console.log("Date prochaine en secondes: " + this.time / 1000);
    };
}