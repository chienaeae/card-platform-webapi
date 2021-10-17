import {ICardOrderRepo} from "./interfaces/ICardOrderRepo";
import {CardOrderId} from "../domain/CardOrderId";
import {CardOrder} from "../domain/CardOrder";
import {TraderId} from "../../trader/domain/TraderId";
import {CardOrderMap} from "../mappers/CardOrderMap";

export class CardOrderRepo implements ICardOrderRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    private createBaseQuery() {
        const {models} = this;
        return {
            where: {}
        }
    }

    async exists(cardOrderId: CardOrderId): Promise<boolean> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['order_id'] = cardOrderId.id.toString();
        const sequelizeCardOrder = await this.models.CardOrderModel.findOne(baseQuery);
        return !!sequelizeCardOrder == true;
    }

    async findLatestOrderByCardIndex(latestCount: number, cardIndex: number): Promise<CardOrder[]> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['order_card_index'] = cardIndex;
        baseQuery['limit'] = latestCount;
        const sequelizeCardOrderCollection = await this.models.CardOrderModel.findAll(baseQuery);
        return sequelizeCardOrderCollection.map((v) => CardOrderMap.toDomain(v));
    }

    async findLatestOrdersByTraderId(latestCount: number, traderId: TraderId): Promise<CardOrder[]> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['order_trader_id'] = traderId.id.toString();
        baseQuery['limit'] = latestCount;
        const sequelizeCardOrderCollection = await this.models.CardOrderModel.findAll(baseQuery);
        return sequelizeCardOrderCollection.map((v) => CardOrderMap.toDomain(v));
    }

    async save(cardOrder: CardOrder): Promise<void> {
        const cardOrderModel = this.models.CardOrderModel;
        const rawCardOrder = CardOrderMap.toPersistence(cardOrder);
        try {
            const exists: boolean = await this.exists(cardOrder.CardOrderId);
            if (!exists) {
                await cardOrderModel.create(rawCardOrder)
            } else {
                const sequelizeCardOrder = await cardOrderModel.findOne({
                    where: {order_id: cardOrder.id.toString()}
                })
                await sequelizeCardOrder.update(rawCardOrder);
            }
        } catch (err) {
            console.log(err);
        }
    }

}