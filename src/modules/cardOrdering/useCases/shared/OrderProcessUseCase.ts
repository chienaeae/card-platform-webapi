import {inject, injectable} from "inversify";
import {
    IOrderProcessUseCase,
    OrderProcessRequestDTO,
    OrderProcessUseCaseResponse
} from "./interfaces/IOrderProcessUseCase";
import {TYPES} from "../../../../infra/inversify/types";
import {OrderingQueueFIFOPublisher} from "../../../../reference/card-platform-library/src/modules/sqs/orderingQueueFIFO/OrderingQueueFIFOPublisher";
import {AWSError} from "aws-sdk";
import {left, right} from "../../../../core/logic/Either";
import {Result} from "../../../../core/logic/Result";
import {CardOrderingError} from "./CardOrderingError";

@injectable()
export class OrderProcessUseCase implements IOrderProcessUseCase {
    @inject(TYPES.OrderingQueueFIFOPublisher) private orderingQueueFIFOPublisher: OrderingQueueFIFOPublisher;

    async execute(request?: OrderProcessRequestDTO): Promise<OrderProcessUseCaseResponse> {
        const cardOrder = request.cardOrder;
        const cardOrderId = cardOrder.CardOrderId.id.toString()
        console.log(cardOrderId)
        try {
            const result = await this.orderingQueueFIFOPublisher.sendMessage(
                {
                    orderId: cardOrderId,
                    orderStatus: cardOrder.status.value,
                    orderType: cardOrder.type.value
                },
                cardOrderId,
                cardOrder.cardIndex.toString())
            const messageId = result.MessageId
            const sequenceNum = result.SequenceNumber
        } catch (err) {
            console.log(err);
            return left(new CardOrderingError.CardOrderProcessedFailure(cardOrderId)) as OrderProcessUseCaseResponse;
        }
        return right(Result.ok<void>()) as OrderProcessUseCaseResponse;
    }

}