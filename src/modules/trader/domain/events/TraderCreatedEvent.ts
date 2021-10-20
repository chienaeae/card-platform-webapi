import {IDomainEvent} from "../../../../core/domain/events/IDomainEvent";
import {UniqueEntityID} from "../../../../core/domain/UniqueEntityID";
import {Trader} from "../Trader";

export class TraderUserCreatedEvent implements IDomainEvent {
    public dateTimeOccurred: Date;
    public trader: Trader;

    constructor(trader: Trader) {
        this.dateTimeOccurred = new Date();
        this.trader = trader;
    }

    getAggregateId(): UniqueEntityID {
        return this.trader.id;
    }
}