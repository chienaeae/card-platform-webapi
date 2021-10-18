import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {BaseController} from "card-platform-library/src/core/infra/BaseController";
import {TYPES} from "card-platform-library/src/infra/inversify/types";
import container from "../../../inversify/config/config";

const cardOrderingRouter = express.Router();
cardOrderingRouter.use(bodyParser.json());
cardOrderingRouter.post("/trader/cardOrder", async (req: express.Request, res: express.Response) => {
    await container.get<BaseController>(TYPES.PlaceOrderController).execute(req, res);
});


cardOrderingRouter.get("/trader/cardOrders/status", async (req: express.Request, res: express.Response) => {
    await container.get<BaseController>(TYPES.GetOrdersController).execute(req, res);
});

export {cardOrderingRouter};