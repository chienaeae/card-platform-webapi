import {ICardRepo} from "./interfaces/ICardRepo";
import {Card} from "../domain/Card";
import {CardMap} from "../mappers/cardMap";
import {Card as CardModel} from "../../../reference/card-platform-library/src/modules/sequlize/models/card/Card.models";

export class CardRepo implements ICardRepo{
    private model: typeof CardModel;

    constructor(model: typeof CardModel) {
        this.model = model;
    }

    private createBaseQuery(){
        const {model} = this;
        return {
            where: {}
        }
    }

    async count(): Promise<number> {
        return await this.model.count();
    }

    async exists(cardName: string): Promise<boolean> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['card_name'] = cardName
        const rawCard = await this.model.findOne(baseQuery);
        return !! rawCard === true;
    }

    async cardIndexExists(cardIndex: number): Promise<boolean> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['card_index'] = cardIndex
        const rawCard = await this.model.findOne(baseQuery);
        return !! rawCard === true;
    }

    async save(card: Card): Promise<void> {
        const rawCard = await CardMap.toPersistence(card);
        try{
            const sequelizeCardInstance = await this.model.findOne({
                where:{
                    card_id: card.cardId.id.toString()
                }
            });
            if(!sequelizeCardInstance){
                await this.model.create(rawCard);
            }else{
                await sequelizeCardInstance.update(rawCard);
            }
        }catch (err){
            console.log(err)
        }
    }
}