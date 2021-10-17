import {ValueObject} from "../../../core/domain/ValueObject";
import {Guard} from "../../../core/logic/Guard";
import {Result} from "../../../core/logic/Result";

interface CardOrderStatusProps {
    value: number;
}

export class CardOrderStatus extends ValueObject<CardOrderStatusProps> {
    public static readonly statusCodeMap = {
        0: 'idle',
        1: 'failed',
        2: 'processing',
        3: 'completed'
    }

    get value(): number {
        return this.props.value;
    }

    get desc(): string {
        return CardOrderStatus.statusCodeMap[this.value]
    }

    private constructor(props: CardOrderStatusProps) {
        super(props);
    }

    private static isAppropriateStatusCode(statusCode: number) {
        return this.statusCodeMap.hasOwnProperty(statusCode)
    }

    public static create(statusCode: number): Result<CardOrderStatus> {
        const guardResult = Guard.againstNullOrUndefined(statusCode, 'statusCode');

        if (!guardResult.succeeded) {
            return Result.fail<CardOrderStatus>(guardResult.message);
        }
        if (this.isAppropriateStatusCode(statusCode)) {
            return Result.ok<CardOrderStatus>(
                new CardOrderStatus({
                    value: statusCode
                }))
        } else {
            return Result.fail<CardOrderStatus>(`ordering status is not allowed with ${statusCode}`);
        }

    }


}