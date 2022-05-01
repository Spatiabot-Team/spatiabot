export class EtapeNextDateHandler {

    execute(): Date {
        return this.calcNextDateAffichageEtape(
            parseFloat(process.env.minMinutesWaitingEvent),
            parseFloat(process.env.maxMinutesWaitingEvent)
        );
    }

    /**
     * Calcule dans combien de temps l'étape pourra être affichée au joueur
     * @param minTimeWait en millisecondes
     * @param maxTimeWait en millisecondes
     * @private
     */
    calcNextDateAffichageEtape(minTimeWait: number, maxTimeWait: number): Date {
        return new Date(
            Date.now() + (Math.random() * (maxTimeWait - minTimeWait) + minTimeWait)
        );
    }
}
