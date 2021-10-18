import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {BaseController} from "card-platform-library/src/core/infra/BaseController";
import {TYPES} from "card-platform-library/src/infra/inversify/types";
import container from "../../../inversify/config/config";


const traderRouter = express.Router()

traderRouter.use(bodyParser.json());
traderRouter.post("/", async (req: Request, res: Response) => {
    await container.get<BaseController>(TYPES.CreateTraderController).execute(req, res);
});

export {traderRouter};
