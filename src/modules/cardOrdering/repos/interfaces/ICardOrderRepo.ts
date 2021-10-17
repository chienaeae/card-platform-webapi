import {TraderId} from "../../../trader/domain/TraderId";
import {CardOrder} from "../../domain/CardOrder";
import {CardOrderId} from "../../domain/CardOrderId";

export interface ICardOrderRepo{
    findLatestOrdersByTraderId(latestCount: number, traderId: TraderId): Promise<CardOrder[]>;

    findLatestOrderByCardIndex(latestCount: number, cardIndex: number): Promise<CardOrder[]>;

    exists(cardOrderId: CardOrderId): Promise<boolean>;

    save(cardOrder: CardOrder): Promise<void>;
}