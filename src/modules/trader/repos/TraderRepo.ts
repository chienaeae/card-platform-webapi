import {ITraderRepo} from "./interfaces/ITraderRepo";
import {injectable} from "inversify";
import {UserId} from "../../identityUser/domain/UserId";
import {Trader} from "../domain/Trader";
import {TraderMap} from "../mappers/TraderMap";

@injectable()
export class TraderRepo implements ITraderRepo{
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    private createBaseQuery(){
        const {models} = this;
        return {
            where: {}
        }
    }

    async exists(userId: UserId): Promise<boolean> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['identity_user_id'] = userId.id.toString()
        const rawTrader = await this.models.TraderModel.findOne(baseQuery);
        return !!rawTrader === true;
    }

    async findTraderByIdentityUserId(userId: UserId): Promise<Trader> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['identity_user_id'] = userId.id.toString();
        const rawTrader = await this.models.TraderModel.findOne(baseQuery);
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
                await this.models.TraderModel.create(rawTrader);
            }else{
                const sequelizeTraderInstance = await this.models.TraderModel.findOne({
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