import {ICardRepo} from "./interfaces/ICardRepo";
import {Card} from "../domain/Card";
import {CardMap} from "../mappers/cardMap";

export class CardRepo implements ICardRepo{
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

    async count(): Promise<number> {
        return await this.models.CardModel.count();
    }

    async exists(cardName: string): Promise<boolean> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['card_name'] = cardName
        const rawCard = await this.models.CardModel.findOne(baseQuery);
        return !! rawCard === true;
    }

    async cardIndexExists(cardIndex: number): Promise<boolean> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['card_index'] = cardIndex
        const rawCard = await this.models.CardModel.findOne(baseQuery);
        return !! rawCard === true;
    }

    async save(card: Card): Promise<void> {
        const rawCard = await CardMap.toPersistence(card);
        try{
            const sequelizeCardInstance = await this.models.CardModel.findOne({
                where:{
                    card_id: card.cardId.id.toString()
                }
            });
            if(!sequelizeCardInstance){
                await this.models.CardModel.create(rawCard);
            }else{
                await sequelizeCardInstance.update(rawCard);
            }
        }catch (err){
            console.log(err)
        }
    }
}