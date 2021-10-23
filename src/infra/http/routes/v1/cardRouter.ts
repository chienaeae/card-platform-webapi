import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {BaseController} from "../../../../core/infra/BaseController";
import {TYPES} from "../../../inversify/types";
import container from "../../../inversify/config/config";

const cardRouter = express.Router()
cardRouter.use(bodyParser.json())

/**
 * @swagger
 * tags:
 *   name: Card
 */

/**
 * @swagger
 * /card:
 *   post:
 *     summary: 新增交易卡牌種類
 *     description: 在卡片交易平台中新增一張交易卡牌種類
 *     security:
 *       - traderAuthorization: []
 *     tags: [Card]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CardRequest'
 *     responses:
 *       201:
 *         description: 註冊成功
 */
cardRouter.post("/", async (req: Request, res:Response) => {
    await container.get<BaseController>(TYPES.CreateCardController).execute(req, res);
})

export {cardRouter};