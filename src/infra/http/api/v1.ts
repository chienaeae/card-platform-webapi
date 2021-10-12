import {Router, Request, Response} from "express";
// import express from 'express'
const express = require('express');

const v1Router: Router = express.Router();

v1Router.get('/', (req: Request, res: Response) => {
    res.send('<h1>Express Demo App</h1>' +
        ' <h4>Message: Success</h4>' +
        ' <p>Version 1.0.0</p>' +
        ` <p>Db url ${process.env.DATABASE_URL}</p>`)
})

export {v1Router}