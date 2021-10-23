import {CardTrade} from "../../domain/CardTrade";

export interface ICardTradeRepo{
    findLatestCardTradeByCardIndex(latestCount: number, cardIndex:number): Promise<CardTrade[]>;
}