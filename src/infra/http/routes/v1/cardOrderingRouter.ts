import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {BaseController} from "../../../../core/infra/BaseController";
import {TYPES} from "../../../inversify/types";
import container from "../../../inversify/config/config";

const cardOrderingRouter = express.Router();
cardOrderingRouter.use(bodyParser.json());

/**
 * @swagger
 * tags:
 *   name: CardOrder
 */


/**
 * @swagger
 * /trader/cardOrder:
 *   post:
 *     summary: 新增卡片訂單
 *     security:
 *       - traderAuthorization: []
 *     tags: [CardOrder]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CardOrderRequest'
 *     responses:
 *       201:
 *         description: order 成功
 */
cardOrderingRouter.post("/cardOrder", async (req: express.Request, res: express.Response) => {
    await container.get<BaseController>(TYPES.PlaceOrderController).execute(req, res);
});

/**
 * @swagger
 * /trader/cardOrders/status:
 *   get:
 *     summary: 查看 近50筆 卡片訂單狀況
 *     security:
 *       - traderAuthorization: []
 *     tags: [CardOrder]
 *     responses:
 *       200:
 *         description: order 成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cardOrders:
 *                  type: array
 *                  items:
 *                    type: object
 *                    $ref: '#/components/schemas/CardOrderStatusResponse'
 */
cardOrderingRouter.get("/cardOrders/status", async (req: express.Request, res: express.Response) => {
    await container.get<BaseController>(TYPES.GetOrdersController).execute(req, res);
});

export {cardOrderingRouter};