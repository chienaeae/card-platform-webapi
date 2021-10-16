import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import container from "../../../../../infra/inversify/config/config";
import {BaseController} from "../../../../../core/infra/BaseController";
import {TYPES} from "../../../../../infra/inversify/config/types";


const traderRouter = express.Router()

traderRouter.use(bodyParser.json());
traderRouter.post("/", async (req: Request, res: Response) => {
    await container.get<BaseController>(TYPES.CreateTraderController).execute(req, res);
});

export {traderRouter};
