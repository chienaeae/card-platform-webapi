import {IDomainEvent} from "../../../../core/domain/events/IDomainEvent";
import {UniqueEntityID} from "../../../../core/domain/UniqueEntityID";
import {CardTrade} from "../CardTrade";

export class CardTradeCreatedEvent implements IDomainEvent {
    public dateTimeOccurred: Date;
    public cardTrade: CardTrade;

    constructor(cardTrade: CardTrade) {
        this.dateTimeOccurred = new Date();
        this.cardTrade = cardTrade;
    }

    getAggregateId(): UniqueEntityID {
        return this.cardTrade.id;
    }
}