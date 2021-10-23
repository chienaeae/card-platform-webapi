import {ICardTradeRepo} from "./interfaces/ICardTradeRepo";
import {CardTrade} from "../domain/CardTrade";
import {CardTrade as CardTradeModel} from "../../../reference/card-platform-library/src/modules/sequlize/models/cardTrade/CardTrade.model";
import {CardOrder as CardOrderModel} from "../../../reference/card-platform-library/src/modules/sequlize/models/cardOrdering/CardOrder.model";
import {CardTradeMap} from "../mappers/CardTradeMap";
import {CardOrderMap} from "../mappers/CardOrderMap";


export class CardTradeRepo implements ICardTradeRepo{
    private cardTradeModel: typeof CardTradeModel;
    private cardOrderModel: typeof CardOrderModel;

    constructor(cardTradeModel: typeof CardTradeModel, cardOrderModel: typeof CardOrderModel) {
        this.cardTradeModel = cardTradeModel;
        this.cardOrderModel = cardOrderModel;
    }

    async findLatestCardTradeByCardIndex(latestCount: number, cardIndex: number): Promise<CardTrade[]> {
        const sequelizeCardTradeCollection = await this.cardTradeModel.findAll({
            where:{
                trade_card_index: cardIndex
            },
            include:[
                {
                    model: this.cardOrderModel,
                    as: 'BuyOrder'
                },
                {
                    model: this.cardOrderModel,
                    as: 'SellOrder'
                }
            ],
            order:[
                ['created_time', 'DESC']
            ],
            limit: latestCount
        })

        return sequelizeCardTradeCollection.map((v) => CardTradeMap.toDomain(v));
    }

}