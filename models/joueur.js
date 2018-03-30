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
		this.pv = pv;
		this.timeForNextEvent = Date.now() + 5000;
		this.currentScenario = -1;
		this.currentStep = -1;
	};

	/**
	 * 
	 * @param {*} timeForNextEvent 
	 */
	setNextEvent (timeForNextEvent){
		this.timeForNextEvent = timeForNextEvent
	};

	hasNextEventReady(){
		return Date.now() >= this.timeForNextEvent;
	};

}
