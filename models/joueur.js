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
		this.isWaitingEvent = false;
	};

	/**
	 * 
	 * @param {*} timeForNextEvent 
	 */
	setNextEvent (timeForNextEvent){
		this.timeForNextEvent = timeForNextEvent
		this.isWaitingEvent = true;
	};

	hasNextEventReady(){
		return Date.now() >= this.timeForNextEvent && joueur.isWaitingEvent;
	};

}
