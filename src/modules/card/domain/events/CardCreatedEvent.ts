import {IDomainEvent} from "../../../../core/domain/events/IDomainEvent";
import {UniqueEntityID} from "../../../../core/domain/UniqueEntityID";
import {Card} from "../Card";

export class CardCreatedEvent implements IDomainEvent{
    public dateTimeOccurred: Date;
    public card: Card;

    constructor(card: Card) {
        this.dateTimeOccurred = new Date();
        this.card = card;
    }

    getAggregateId(): UniqueEntityID {
        return this.card.id;
    }
}