export class PartieNotFoundException extends Error{

    constructor() {
        super(`Partie non trouvée`);
    }
}
