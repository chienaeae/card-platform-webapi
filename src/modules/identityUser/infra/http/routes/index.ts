import express, {Request, Response} from "express";
import {Result} from "../../../../../core/logic/Result";
import {RegisterController} from "../../../useCases/register/RegisterController";
import {RegisterUseCase} from "../../../useCases/register/RegisterUseCase";
import {IdentityUserRepo} from "../../../repos/IdentityUserRepo";
import * as models from "../../../../../infra/sequlize/models"

const identityUserRouter = express.Router()

identityUserRouter.post('/register', async (req:Request, res: Response) =>
{
    const repo = new IdentityUserRepo(models);
    const useCase = new RegisterUseCase(repo);
    await new RegisterController(useCase).execute(req, res);
});


identityUserRouter.post('/login', (req:Request, res: Response) => {
    res.status(200).send('logging in...')

});



export {identityUserRouter};