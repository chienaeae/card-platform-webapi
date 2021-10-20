import {IdentityEmail} from "../../identityUser/domain/IdentityEmail";
import {IdentityPassword} from "../../identityUser/domain/IdentityPassword";
import {Entity} from "../../../core/domain/Entity";
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";
import {UserId} from "../../identityUser/domain/UserId";
import {Result} from "../../../core/logic/Result";
import {AggregateRoot} from "../../../core/domain/AggregateRoot";
import {TraderUserCreatedEvent} from "./events/TraderCreatedEvent";
import {TraderId} from "./TraderId";

interface TraderProps {
    userId: UserId
}

export class Trader extends AggregateRoot<TraderProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get traderId(): TraderId{
        return TraderId.create(this.id);
    }

    get userId(): UserId {
        return this.props.userId
    }

    private constructor(props: TraderProps, id?: UniqueEntityID) {
        super(props, id);

    }

    public static create(props: TraderProps, id?: UniqueEntityID): Result<Trader> {
        const trader = new Trader({
            ...props
        }, id)

        const idWasProvided = !!id;

        if (!idWasProvided) {
            trader.addDomainEvent(new TraderUserCreatedEvent(trader));
        }

        return Result.ok<Trader>(trader);
    }

}