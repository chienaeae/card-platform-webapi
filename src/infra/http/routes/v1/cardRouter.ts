import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {BaseController} from "card-platform-library/src/core/infra/BaseController";
import {TYPES} from "../../../../../reference/card-platform-library/src/infra/inversify/types";
import container from "../../../inversify/config/config";

const cardRouter = express.Router()

cardRouter.use(bodyParser.json())
cardRouter.post("/", async (req: Request, res:Response) => {
    await container.get<BaseController>(TYPES.CreateCardController).execute(req, res);
})

export {cardRouter};