import {IDomainEvent} from "../../../../core/domain/events/IDomainEvent";
import {UniqueEntityID} from "../../../../core/domain/UniqueEntityID";
import {CardOrder} from "../CardOrder";

export class CardOrderCreatedEvent implements IDomainEvent {
    public dateTimeOccurred: Date;
    public cardOrder: CardOrder;

    constructor(cardOrder: CardOrder) {
        this.dateTimeOccurred = new Date();
        this.cardOrder = cardOrder;
    }

    getAggregateId(): UniqueEntityID {
        return this.cardOrder.id;
    }
}