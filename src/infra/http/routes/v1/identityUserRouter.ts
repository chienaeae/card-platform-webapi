import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {BaseController} from "card-platform-library/src/core/infra/BaseController";
import {TYPES} from "../../../../../reference/card-platform-library/src/infra/inversify/types";
import container from "../../../inversify/config/config";

const identityUserRouter = express.Router()

identityUserRouter.use(bodyParser.urlencoded({ extended: true }))
identityUserRouter.post('/register', async (req:Request, res: Response) => {
    await container.get<BaseController>(TYPES.RegisterController).execute(req, res);
});

identityUserRouter.post('/token', async (req:Request, res: Response) => {
    await container.get<BaseController>(TYPES.TokenController).execute(req, res);
});



export {identityUserRouter};