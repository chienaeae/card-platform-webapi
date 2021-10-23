import {Entity} from "../../../core/domain/Entity";
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";

export class CardTradeId extends Entity<any>{
    get id(): UniqueEntityID{
        return this.id
    }

    private constructor(id?: UniqueEntityID) {
        super(null, id);
    }

    public static create(id?:UniqueEntityID): CardTradeId{
        return new CardTradeId(id);
    }
}