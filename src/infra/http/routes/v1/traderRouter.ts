import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {BaseController} from "../../../../core/infra/BaseController";
import {TYPES} from "../../../inversify/types";
import container from "../../../inversify/config/config";


const traderRouter = express.Router()

traderRouter.use(bodyParser.json());
/**
 * @swagger
 * tags:
 *   name: Trader
 */

/**
 * @swagger
 * /trader:
 *   post:
 *     summary: 註冊交易平台使用者
 *     security:
 *       - traderAuthorization: []
 *     description: 於交易平台中，註冊平台使用者，作為平台身份人
 *     tags: [Trader]
 *     responses:
 *       201:
 *         description: 註冊 register 成功
 */
traderRouter.post("/", async (req: Request, res: Response) => {
    await container.get<BaseController>(TYPES.CreateTraderController).execute(req, res);
});

export {traderRouter};
