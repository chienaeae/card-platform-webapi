import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {BaseController} from "../../../../core/infra/BaseController";
import {TYPES} from "../../../inversify/types";
import container from "../../../inversify/config/config";

const cardTradeRouter = express.Router()
cardTradeRouter.use(bodyParser.json())

/**
 * @swagger
 * tags:
 *   name: CardTrade
 */

/**
 * @swagger
 * /trader/cardTrades/status:
 *   get:
 *     summary: 新增交易卡牌種類
 *     description: 在卡片交易平台中新增一張交易卡牌種類
 *     tags: [Card]
 *     responses:
 *       200:
 *         description: 註冊成功
 */
cardTradeRouter.get("/cardTrades/status", async (req: Request, res:Response) => {
    await container.get<BaseController>(TYPES.GetOrderTradesController).execute(req, res);
})

export {cardTradeRouter};