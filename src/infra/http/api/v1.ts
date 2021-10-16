import {Router, Request, Response} from "express";
// import express from 'express'
const express = require('express');
import {identityUserRouter} from "../../../modules/identityUser/infra/http/routes";
import {traderRouter} from "../../../modules/trader/infra/http/routes";

const v1Router: Router = express.Router();

v1Router.use('/identity', identityUserRouter);
v1Router.use('/trader', traderRouter);
v1Router.get('/', (req: Request, res: Response) => {
    res.send('<h1>Card Platform App</h1>' +
        ' <h4>Message: Success</h4>' +
        ' <p>Version 1.0.0</p>')
});


export {v1Router}