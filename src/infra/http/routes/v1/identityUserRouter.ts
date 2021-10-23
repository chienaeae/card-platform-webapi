import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {BaseController} from "../../../../core/infra/BaseController";
import {TYPES} from "../../../inversify/types";
import container from "../../../inversify/config/config";

const identityUserRouter = express.Router()

identityUserRouter.use(bodyParser.urlencoded({ extended: true }))
/**
 * @swagger
 * tags:
 *   name: Identity
 */


/**
 * @swagger
 * /identity/register:
 *   post:
 *     summary: 註冊使用者
 *     description: 於使用者授權系統中，註冊新使用者
 *     tags: [Identity]
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: foo
 *               email:
 *                 type: string
 *                 example: test@email.com
 *               password:
 *                 type: string
 *                 example: password1234
 *     responses:
 *       201:
 *         description: 註冊 register 成功
 */
identityUserRouter.post('/register', async (req:Request, res: Response) => {
    await container.get<BaseController>(TYPES.RegisterController).execute(req, res);
});


/**
 * @swagger
 * /identity/token:
 *   post:
 *     summary: 取得使用者授權 token
 *     description: 於使用者授權系統中，取得授權token
 *     tags: [Identity]
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@email.com
 *               password:
 *                 type: string
 *                 example: password1234
 *     responses:
 *       200:
 *         description: 取得 token 成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/loginResponse'
 */
identityUserRouter.post('/token', async (req:Request, res: Response) => {
    await container.get<BaseController>(TYPES.TokenController).execute(req, res);
});



export {identityUserRouter};