import express, {Request, Response} from "express";
import container from "../../../../../infra/inversify/config/config";
import {TYPES} from "../../../../../infra/inversify/config/types";
import bodyParser from "body-parser";
import {BaseController} from "../../../../../core/infra/BaseController";

const identityUserRouter = express.Router()

identityUserRouter.use(bodyParser.urlencoded({ extended: true }))
identityUserRouter.post('/register', async (req:Request, res: Response) => {
    await container.get<BaseController>(TYPES.RegisterController).execute(req, res);
});

identityUserRouter.post('/token', async (req:Request, res: Response) => {
    await container.get<BaseController>(TYPES.TokenController).execute(req, res);
});



export {identityUserRouter};