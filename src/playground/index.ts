import {Container} from "inversify";
import AWS from "aws-sdk";

const container = new Container();


function createQueue(){
    AWS.config.update({region: 'ap-northeast-1'})

    const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

    sqs.createQueue({
        QueueName: 'card_platform_test_queue',
        Attributes: {
            'DelaySeconds': '60',
            'MessageRetentionPeriod': '86400'
        }
    }, (err, data) => {
        if(err){
            console.log('Error', err);
        }else{
            console.log('Success', data.QueueUrl);
        }
    });
}

function listQueue(){
    AWS.config.update({region: 'ap-northeast-1'})

    const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

    sqs.listQueues({}, (err, data) => {
        if(err){
            console.log('Error', err);
        }else{
            console.log('Success', data.QueueUrls);
        }
    });
}

function sendMessage(){
    AWS.config.update({region: 'ap-northeast-1'})

    const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

    sqs.sendMessage({
        DelaySeconds: 10,
        MessageAttributes: {
            "Title": {
                DataType: "String",
                StringValue: "The Whistler"
            },
            "Author": {
                DataType: "String",
                StringValue: "John Grisham"
            },
            "WeeksOn": {
                DataType: "Number",
                StringValue: "6"
            }
        },
        MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: "https://sqs.ap-northeast-1.amazonaws.com/777386378794/card_platform_test_queue"
    }, (err, data) =>  {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });
}

function receiveMessage(){
    AWS.config.update({region: 'ap-northeast-1'})

    const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

    sqs.receiveMessage({
        AttributeNames: ['SentTimestamp'],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: ['All'],
        QueueUrl: "https://sqs.ap-northeast-1.amazonaws.com/777386378794/card_platform_test_queue",
        VisibilityTimeout: 20,
        WaitTimeSeconds: 0
    }, (err, data) => {
        if (err) {
            console.log("Receive Error", err);
        }else if(data.Messages){
            sqs.deleteMessage({
                QueueUrl: "https://sqs.ap-northeast-1.amazonaws.com/777386378794/card_platform_test_queue",
                ReceiptHandle: data.Messages[0].ReceiptHandle
            }, (err, data) => {
                if(err){
                    console.log('Delete Error', err);
                }else{
                    console.log('Message Deleted', data);
                }
            });

        }
    });
}

async function main() {
    // container.bind<ITraderRepo>(TYPES.TraderRepo).toDynamicValue(() => new TraderRepo(Models)).inTransientScope();
    // container.bind<UseCase<CreateTraderDTO, Promise<CreateTraderUseCaseResponse>>>(TYPES.CreateTraderUseCase).to(CreateTraderUseCase).inSingletonScope();
    //
    // const createTraderUseCase = container.get<UseCase<CreateTraderDTO, Promise<CreateTraderUseCaseResponse>>>(TYPES.CreateTraderUseCase)
    //
    // const result = await createTraderUseCase.execute({
    //     userId: '43c777e9-bc10-4437-8ff6-48d49b05a19b'
    // });
    //
    // if(result.isLeft()){
    //     console.log(result.value.errorValue())
    // }else{
    //     console.log(result.value.getValue())
    // }

    // const i = await Models.CardModel.findOne({
    //     where: {
    //         card_id: '51b4167b-05eb-461c-93ee-d16ea9a794e8'
    //     }
    // })

    // const repo = new CardRepo(Models);
    // let count_num = await repo.count()
    // console.log(count_num);
    // await repo.exists('Pikachu')
    // const newCard = Card.create({
    //     cardIndex: count_num + 1,
    //     cardName: 'zoo'
    // }).getValue()
    // await repo.save(newCard);
    // count_num = await repo.count()
    // console.log(count_num);


}

main();