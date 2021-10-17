import {CardOrder} from "../domain/CardOrder";
import Mapper from "../../../core/infra/Mapper";
import {UserId} from "../../identityUser/domain/UserId";
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";
import {Trader} from "../../trader/domain/Trader";
import {TraderId} from "../../trader/domain/TraderId";
import {CardOrderPrice} from "../domain/CardOrderPrice";
import {CardOrderStatus} from "../domain/CardOrderStatus";
import {CardOrderId} from "../domain/CardOrderId";
import {CardOrderType} from "../domain/CardOrderType";
import {Guard} from "../../../core/logic/Guard";

export class CardOrderMap extends Mapper<CardOrder> {
    public static toPersistence(cardOrder: CardOrder): any {
        return {
            order_id: cardOrder.id.toString(),
            order_price: cardOrder.price.value,
            order_trader_id: cardOrder.traderId.id.toString(),
            order_card_index: cardOrder.cardIndex,
            order_status: cardOrder.status.value,
            order_type: cardOrder.type.value,
            ordered_time: cardOrder.orderedTime
        }
    }

    public static toDomain(raw: any): CardOrder {
        // Decimal Type (string) to number
        const priceOrError = CardOrderPrice.create(parseFloat(raw.order_price));
        if(priceOrError.isFailure){
            console.log(priceOrError.errorValue())
            return null;
        }

        const cardOrderError = CardOrder.create({
            traderId: TraderId.create(new UniqueEntityID(raw.order_trader_id)),
            cardIndex: raw.order_card_index,
            price: priceOrError.getValue(),
            status: CardOrderStatus.create(raw.order_status).getValue(),
            type: CardOrderType.create(raw.order_type).getValue(),
            orderedTime: raw.ordered_time
        }, new UniqueEntityID(raw.order_id));

        cardOrderError.isFailure ? console.log(cardOrderError.error): '';

        return cardOrderError.isSuccess ? cardOrderError.getValue() : null;

    }
}