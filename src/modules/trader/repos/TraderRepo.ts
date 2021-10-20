import {ITraderRepo} from "./interfaces/ITraderRepo";
import {injectable} from "inversify";
import {UserId} from "../../identityUser/domain/UserId";
import {Trader} from "../domain/Trader";
import {TraderMap} from "../mappers/TraderMap";
import {Trader as TraderModel} from "../../../reference/card-platform-library/src/modules/sequlize/models/trader/Trader.model";

@injectable()
export class TraderRepo implements ITraderRepo{
    private model: typeof TraderModel;

    constructor(model: typeof TraderModel) {
        this.model = model;
    }

    private createBaseQuery(){
        const {model} = this;
        return {
            where: {}
        }
    }

    async exists(userId: UserId): Promise<boolean> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['identity_user_id'] = userId.id.toString()
        const rawTrader = await this.model.findOne(baseQuery);
        return !!rawTrader === true;
    }

    async findTraderByIdentityUserId(userId: UserId): Promise<Trader> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['identity_user_id'] = userId.id.toString();
        const rawTrader = await this.model.findOne(baseQuery);
        if(!!rawTrader === true) {
            return TraderMap.toDomain(rawTrader);
        }
        return null;
    }

    async save(trader: Trader): Promise<void> {
        const exists = await this.exists(trader.userId);
        const rawTrader = await TraderMap.toPersistence(trader);
        try{
            if(!exists){
                await this.model.create(rawTrader);
            }else{
                const sequelizeTraderInstance = await this.model.findOne({
                    where:{
                        identity_user_id: trader.userId.id.toString(),
                        trader_id: trader.traderId.id.toString()
                    }
                });
                await sequelizeTraderInstance.update(rawTrader);
            }
        }catch (err){
            console.log(err)
        }
    }
}