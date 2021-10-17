import * as Models from '../infra/sequlize/models';
import {
    CreateTraderUseCase,
    CreateTraderUseCaseResponse
} from "../modules/trader/useCases/createTrader/CreateTraderUseCase";
import {Container} from "inversify";
import {UseCase} from "../core/domain/UseCase";
import {CreateTraderDTO} from "../modules/trader/useCases/createTrader/CreateTraderDTO";
import {TYPES} from "../infra/inversify/config/types";
import {ITraderRepo} from "../modules/trader/repos/interfaces/ITraderRepo";
import {TraderRepo} from "../modules/trader/repos/TraderRepo";
import {v4 as uuid} from "uuid";
import {Model} from "sequelize-typescript";
import {CardRepo} from "../modules/card/repos/CardRepo";
import {Card} from "../modules/card/domain/Card";

// const a = Models.TraderModel

const container = new Container();

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

    const d = new Date().getTime()
    console.log(d)
}

main();