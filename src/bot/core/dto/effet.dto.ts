export class EffetDto {
    readonly quantite?: number;
    readonly texte: string|null;
    readonly etape: { id: string };
    readonly unite: { id: string };
}
