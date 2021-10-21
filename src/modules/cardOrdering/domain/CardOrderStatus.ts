import {ValueObject} from "../../../core/domain/ValueObject";
import {Guard} from "../../../core/logic/Guard";
import {Result} from "../../../core/logic/Result";

interface CardOrderStatusProps {
    value: string;
}

export class CardOrderStatus extends ValueObject<CardOrderStatusProps> {
    public static readonly IDLE_STATUS: string = 'idle';
    public static readonly FAILED_STATUS: string = 'failed';
    public static readonly PROCESSED_STATUS: string = 'processed';
    public static readonly COMPLETED_STATUS: string = 'completed';

    get value(): string {
        return this.props.value;
    }

    private constructor(props: CardOrderStatusProps) {
        super(props);
    }

    public static create(status: string): Result<CardOrderStatus> {
        const guardTypeResult = Guard.againstInvalidTypes(status, ['string'], 'CardOrderStatus');
        if (!guardTypeResult.succeeded) {
            return Result.fail<CardOrderStatus>(guardTypeResult.message);
        }

        const guardResult = Guard.againstNullOrUndefined(status, 'CardOrderStatus');

        if (!guardResult.succeeded) {
            return Result.fail<CardOrderStatus>(guardResult.message);
        }

        const guardValueResult = Guard.isOneOf(status, [
            this.IDLE_STATUS,
            this.FAILED_STATUS,
            this.PROCESSED_STATUS,
            this.COMPLETED_STATUS
        ], 'CardOrderStatus')

        if (!guardValueResult.succeeded) {
            return Result.fail<CardOrderStatus>(guardValueResult.message);
        }

        return Result.ok<CardOrderStatus>(
            new CardOrderStatus({
                value: status
            }))


    }


}