import {CardOrder} from "./CardOrder";
import {CardTradeId} from "./CardTradeId";
import {AggregateRoot} from "../../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";
import {Guard} from "../../../core/logic/Guard";
import {Result} from "../../../core/logic/Result";
import {CardOrderCreatedEvent} from "./events/cardOrderCreatedEvents";
import {CardTradeCreatedEvent} from "./events/cardTradeCreatedEvents";
import {CardId} from "../../card/domain/CardId";

interface CardTradeProps{
    tradeCardIndex: number,
    tradePrice: number,
    buyOrder: CardOrder,
    sellOrder: CardOrder
}

export class CardTrade extends AggregateRoot<CardTradeProps>{
    get id():UniqueEntityID{
        return this._id;
    }

    get cardTradeId(): CardTradeId {
        return CardTradeId.create(this.id);
    }

    get tradePrice(): number{
        return this.props.tradePrice;
    }

    get tradeCardIndex(): number{
        return this.props.tradeCardIndex;
    }

    get buyOrder(): CardOrder{
        return this.props.buyOrder;
    }

    get sellOrder():CardOrder{
        return this.props.sellOrder;
    }

    private constructor(props: CardTradeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: CardTradeProps, id?: UniqueEntityID): Result<CardTrade>{
        const guardResult = Guard.againstNullOrUndefinedBulk([
            {argument: props.tradeCardIndex, argumentName: 'tradeCardIndex'},
            {argument: props.tradePrice, argumentName: 'tradePrice'},
            {argument: props.buyOrder, argumentName: 'buyOrder'},
            {argument: props.sellOrder, argumentName: 'sellOrder'}
        ]);
        if (!guardResult.succeeded) {
            return Result.fail<CardTrade>(guardResult.message);
        }
        const cardTrade = new CardTrade({
            ...props
        }, id);

        const idWasProvided = !!id;

        if (!idWasProvided) {
            cardTrade.addDomainEvent(new CardTradeCreatedEvent(cardTrade));
        }

        return Result.ok<CardTrade>(cardTrade);
    }



}