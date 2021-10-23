import {CardTrade} from "../domain/CardTrade";
import Mapper from "../../../core/infra/Mapper";
import {CardOrderMap} from "./CardOrderMap";
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";

export class CardTradeMap extends Mapper<CardTrade> {
    public static toPersistence(cardTrade: CardTrade): any {
        return {
            trade_id: cardTrade.id.toString(),
            trade_price: cardTrade.tradePrice,
            trade_card_index: cardTrade.tradeCardIndex,
            buy_order_id: cardTrade.buyOrder.id.toString(),
            sell_order_id: cardTrade.sellOrder.id.toString()
        }
    }

    public static toDomain(raw: any): CardTrade {
        if (!!raw == false) return null;
        const cardTradeOrError = CardTrade.create({
            tradeCardIndex: raw.trade_card_index,
            tradePrice: raw.trade_price,
            buyOrder: CardOrderMap.toDomain(raw['BuyOrder']),
            sellOrder: CardOrderMap.toDomain(raw['SellOrder'])
        }, new UniqueEntityID(raw.trade_id));

        cardTradeOrError.isFailure ? console.log(cardTradeOrError) : '';

        return cardTradeOrError.isSuccess ? cardTradeOrError.getValue() : null;
    }
}