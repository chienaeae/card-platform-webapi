import {CardOrderPrice} from "./CardOrderPrice";
import {CardOrderStatus} from "./CardOrderStatus";
import {CardId} from "../../card/domain/CardId";
import {TraderId} from "../../trader/domain/TraderId";
import {AggregateRoot} from "../../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";
import {CardOrderId} from "./CardOrderId";
import {CardOrderType} from "./CardOrderType";
import {Result} from "../../../core/logic/Result";
import {Guard} from "../../../core/logic/Guard";
import {CardOrderCreatedEvent} from "./events/cardOrderCreatedEvents";

interface CardOrderProps {
    traderId: TraderId
    cardIndex: number,
    price: CardOrderPrice,
    status: CardOrderStatus,
    type: CardOrderType,
    orderedTime: Date
}

export class CardOrder extends AggregateRoot<CardOrderProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get CardOrderId(): CardOrderId {
        return CardOrderId.create(this.id);
    }

    get traderId(): TraderId {
        return this.props.traderId;
    }

    get cardIndex(): number {
        return this.props.cardIndex;
    }

    get price(): CardOrderPrice {
        return this.props.price;
    }

    get status(): CardOrderStatus {
        return this.props.status;
    }

    get type(): CardOrderType {
        return this.props.type;
    }

    get orderedTime(): Date {
        return this.props.orderedTime;
    }

    private constructor(props: CardOrderProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: CardOrderProps, id?: UniqueEntityID): Result<CardOrder> {
        const guardedProps = [
            {argument: props.traderId, argumentName: 'traderId'},
            {argument: props.cardIndex, argumentName: 'cardIndex'},
            {argument: props.price, argumentName: 'price'},
            {argument: props.status, argumentName: 'status'},
            {argument: props.type, argumentName: 'type'},
            {argument: props.orderedTime, argumentName: 'orderedTime'},
        ]
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result.fail<CardOrder>(guardResult.message);
        }
        const cardOrder = new CardOrder({
            ...props
        }, id);

        const idWasProvided = !!id;

        if (!idWasProvided) {
            cardOrder.addDomainEvent(new CardOrderCreatedEvent(cardOrder));
        }

        return Result.ok<CardOrder>(cardOrder);
    }
}