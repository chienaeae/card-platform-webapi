import {Card} from "../../domain/Card";

export interface ICardRepo{
    count(): Promise<number>;

    exists(cardName: string): Promise<boolean>;

    cardIndexExists(cardIndex: number): Promise<boolean>;

    save(card: Card): Promise<void>
}