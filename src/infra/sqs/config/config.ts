import {OrderingQueueFIFOPublisher} from "../../../reference/card-platform-library/src/modules/sqs/orderingQueueFIFO/OrderingQueueFIFOPublisher";
import {injectable} from "inversify";
import * as dotenv from "dotenv";

dotenv.config();


const orderingQueueConfig = {
    development: {
        region: process.env.SQS_REGION,
        queueUrl: process.env.DEV_ORDERING_QUEUE_URL,
        queueName: process.env.DEV_ORDERING_QUEUE_NAME,
    },
    test: {
        region: process.env.SQS_REGION,
        queueUrl: process.env.TEST_ORDERING_QUEUE_URL,
        queueName: process.env.TEST_ORDERING_QUEUE_NAME,
    },
    production: {
        region: process.env.SQS_REGION,
        queueUrl: process.env.PROD_ORDERING_QUEUE_URL,
        queueName: process.env.PROD_ORDERING_QUEUE_NAME,
    }
}

export const config =
    process.env.NODE_ENV === 'production' ? orderingQueueConfig.production :
        process.env.NODE_ENV === 'test' ? orderingQueueConfig.test :
            orderingQueueConfig.development


@injectable()
class InjectableOrderingQueueFIFOPublisher extends OrderingQueueFIFOPublisher{

}

export const orderingQueuePublisher = new InjectableOrderingQueueFIFOPublisher({...config});