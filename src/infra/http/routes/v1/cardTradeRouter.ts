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
 *     summary: 取得 卡牌 近50筆 成交訂單資訊
 *     security:
 *       - traderAuthorization: []
 *     tags: [CardTrade]
 *     parameters:
 *     - name: cardIndex
 *       in: query
 *       descriptions: 卡牌 index
 *       required: true
 *     responses:
 *       200:
 *         description: order 成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trades:
 *                  type: array
 *                  items:
 *                    type: object
 *                    $ref: '#/components/schemas/orderTradeStatusResponse'
 */
cardTradeRouter.get("/cardTrades/status", async (req: Request, res:Response) => {
    await container.get<BaseController>(TYPES.GetOrderTradesController).execute(req, res);
})

export {cardTradeRouter};