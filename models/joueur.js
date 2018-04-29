/**
 * 
 * @param int id 
 * @param string username 
 * @param string avatar 
 * @param int pv 
 */
module.exports = class Joueur {

	/**
	 * 
	 * @param int id 
	 * @param string username 
	 * @param string avatar 
	 * @param int pv 
	 */
	constructor(id, username, avatar, pv) {
		this.id = id;
		this.username = username;
		this.avatar = avatar;
		this.timeForNextEvent = Date.now() + 5000;
		this.currentScenario = -1;
		this.currentStep = -1;
		this.isWaitingEvent = false;
		this.stats = {};

		// Definition des statistiques du joueur
		


	};

	/**
	 * 
	 * @param {*} timeForNextEvent 
	 */
	setNextEvent (timeForNextEvent){
		this.timeForNextEvent = timeForNextEvent
	};

	setDefaultNextEvent(){
		var minutes = Math.random() * (JeuService.config.maxMinutesWaitingEvent - JeuService.config.minMinutesWaitingEvent)
		+ JeuService.config.minMinutesWaitingEvent;
		joueur.setNextEvent(Date.now() + minutes * 60 * 1000);		
	};

	hasNextEventReady(){
		return Date.now() >= this.timeForNextEvent && this.isWaitingEvent;
	};

}
