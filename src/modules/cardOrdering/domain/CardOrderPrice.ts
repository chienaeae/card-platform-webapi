import {ValueObject} from "../../../core/domain/ValueObject";
import {Result} from "../../../core/logic/Result";
import {Guard} from "../../../core/logic/Guard";

interface CardOrderPriceProps{
    value: number;
}

export class CardOrderPrice extends ValueObject<CardOrderPriceProps>{
    private static readonly MINIMUM_PRICE: number = 0.0;
    private static readonly MAXIMUM_PRICE: number = 10.0;

    get value(): number{
        return this.props.value;
    }

    private constructor(props: CardOrderPriceProps) {
        super(props);
    }

    public static create(price: number): Result<CardOrderPrice>{
        const guardResult = Guard.againstNullOrUndefined(price, 'price');
        if(!guardResult.succeeded){
            return Result.fail<CardOrderPrice>(guardResult.message);
        }
        if(price < this.MINIMUM_PRICE || price > this.MAXIMUM_PRICE){
            return Result.fail<CardOrderPrice>('Card ordering price doesnt meet criteria [in 0.0-10.0 range].');
        }

        const cardOrderPrice = new CardOrderPrice({
            value: price
        })
        return Result.ok<CardOrderPrice>(cardOrderPrice);


        // 限制輸入範圍為
    }
}