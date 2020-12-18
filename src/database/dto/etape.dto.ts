export class EtapeDto {
    readonly titre: string;
    readonly texte: string;
    readonly scenario: { id: string };
    effets: [];
    reponses: [];
}
