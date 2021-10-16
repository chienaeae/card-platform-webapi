import sequelize from "../config/config";
import {Trader as TraderModel} from "./Trader.model";
import {IdentityUser as IdentityUserModel} from "./IdentityUser.model";
import {Card as CardModel} from "./Card.models";
import {CardOrder as CardOrderModel} from "./CardOrder.model";
import {CardTrade as CardTradeModel} from "./CardTrade.model";

sequelize.addModels([CardModel, CardOrderModel, CardTradeModel, TraderModel, IdentityUserModel
])

async function authConnection() {
    try{
        await sequelize.authenticate();
        await sequelize.sync({force: true})
        console.log('Connection has been established successfully.');
    }catch (error){
        console.error('Unable to connect to the database:', error);
    }
}

authConnection()

export {TraderModel, IdentityUserModel};