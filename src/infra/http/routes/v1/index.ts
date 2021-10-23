import express, {Router, Request, Response} from "express";
import {identityUserRouter} from "./identityUserRouter";
import {traderRouter} from "./traderRouter";
import {cardRouter} from "./cardRouter";
import {cardOrderingRouter} from "./cardOrderingRouter";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express"
import {options} from "./swagger";

const v1Router: Router = express.Router();


v1Router.use('/identity', identityUserRouter);
v1Router.use('/trader', traderRouter);
v1Router.use('/trader', cardOrderingRouter);
v1Router.use('/card', cardRouter);
v1Router.get('/', (req: Request, res: Response) => {
    res.send('<h1>Card Platform App</h1>' +
        ' <h4>Message: Success</h4>' +
        ' <p>Version 1.0.2</p>')
});
v1Router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));


export {v1Router}