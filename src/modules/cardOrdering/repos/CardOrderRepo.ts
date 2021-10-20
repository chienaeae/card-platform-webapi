import {ICardOrderRepo} from "./interfaces/ICardOrderRepo";
import {CardOrderId} from "../domain/CardOrderId";
import {CardOrder} from "../domain/CardOrder";
import {TraderId} from "../../trader/domain/TraderId";
import {CardOrderMap} from "../mappers/CardOrderMap";
import {CardOrder as CardOrderModel} from "../../../reference/card-platform-library/src/modules/sequlize/models/cardOrdering/CardOrder.model";

export class CardOrderRepo implements ICardOrderRepo {
    private model: typeof CardOrderModel;

    constructor(model: typeof CardOrderModel) {
        this.model = model;
    }

    private createBaseQuery() {
        const {model} = this;
        return {
            where: {}
        }
    }

    async exists(cardOrderId: CardOrderId): Promise<boolean> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['order_id'] = cardOrderId.id.toString();
        const sequelizeCardOrder = await this.model.findOne(baseQuery);
        return !!sequelizeCardOrder == true;
    }

    async findLatestOrderByCardIndex(latestCount: number, cardIndex: number): Promise<CardOrder[]> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['order_card_index'] = cardIndex;
        baseQuery['limit'] = latestCount;
        const sequelizeCardOrderCollection = await this.model.findAll(baseQuery);
        return sequelizeCardOrderCollection.map((v) => CardOrderMap.toDomain(v));
    }

    async findLatestOrdersByTraderId(latestCount: number, traderId: TraderId): Promise<CardOrder[]> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['order_trader_id'] = traderId.id.toString();
        baseQuery['limit'] = latestCount;
        const sequelizeCardOrderCollection = await this.model.findAll(baseQuery);
        return sequelizeCardOrderCollection.map((v) => CardOrderMap.toDomain(v));
    }

    async save(cardOrder: CardOrder): Promise<void> {
        const rawCardOrder = CardOrderMap.toPersistence(cardOrder);
        try {
            const exists: boolean = await this.exists(cardOrder.CardOrderId);
            if (!exists) {
                await this.model.create(rawCardOrder)
            } else {
                const sequelizeCardOrder = await this.model.findOne({
                    where: {order_id: cardOrder.id.toString()}
                })
                await sequelizeCardOrder.update(rawCardOrder);
            }
        } catch (err) {
            console.log(err);
        }
    }

}