import {Entity} from "../../../core/domain/Entity";
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";
import {CardId} from "./CardId";
import {Result} from "../../../core/logic/Result";
import {AggregateRoot} from "../../../core/domain/AggregateRoot";
import {CardCreatedEvent} from "./events/CardCreatedEvent";
import {Guard} from "../../../core/logic/Guard";

interface CardProps {
    cardName: string;
    cardIndex: number;
}

export class Card extends AggregateRoot<CardProps> {
    get id(): UniqueEntityID {
        return this._id
    }

    get cardId(): CardId {
        return CardId.create(this.id);
    }

    get cardIndex(): number {
        return this.props.cardIndex
    }

    get cardName(): string {
        return this.props.cardName
    }

    private constructor(props: CardProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: CardProps, id?: UniqueEntityID): Result<Card> {
        const guardResult = Guard.againstNullOrUndefined(props.cardName, "cardName");

        if (!guardResult.succeeded) {
            return Result.fail<Card>(guardResult.message);
        }
        const card = new Card({
            ...props
        }, id)

        const idWasProvided = !!id;

        if (!idWasProvided) {
            card.addDomainEvent(new CardCreatedEvent(card));
        }

        return Result.ok<Card>(card);
    }


}