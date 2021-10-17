import {ValueObject} from "../../../core/domain/ValueObject";
import {CardOrderPrice} from "./CardOrderPrice";
import {Result} from "../../../core/logic/Result";
import {Guard} from "../../../core/logic/Guard";

interface CardOrderTypeProps{
    value: string;
}

export class CardOrderType extends ValueObject<CardOrderTypeProps>{
    private static readonly typeOptions: Array<string> = ['buy', 'sell'];

    get value(): string{
        return this.props.value;
    }

    private constructor(props: CardOrderTypeProps) {
        super(props);
    }

    public static createSellType(): Result<CardOrderType>{
        return this.create('sell');
    }

    public static createBuyType(): Result<CardOrderType>{
        return this.create('buy')
    }

    public static create(orderingType: string): Result<CardOrderType>{
        const guardTypeResult = Guard.againstInvalidTypes(orderingType, ['string'], 'orderingType');
        if(!guardTypeResult.succeeded){
            return Result.fail<CardOrderType>(guardTypeResult.message);
        }

        const nullGuardResult = Guard.againstNullOrUndefined(orderingType, 'type');
        if(!nullGuardResult.succeeded){
            return Result.fail<CardOrderType>(nullGuardResult.message);
        }

        const oneOfGuardResult = Guard.isOneOf(orderingType, this.typeOptions, 'type');
        if(!oneOfGuardResult.succeeded){
            return Result.fail<CardOrderType>(oneOfGuardResult.message);
        }

        return Result.ok<CardOrderType>(new CardOrderType({value: orderingType}))
    }
}