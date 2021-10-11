import {Application, Request, Response} from "express";

export const register = (app: Application) => {
    app.get("/", (req: Request, res: Response) => {
        res.send('<h1>Express Demo App</h1>' +
            ' <h4>Message: Success</h4>' +
            ' <p>Version 1.0.0</p>' +
            ` <p>Db url ${process.env.DATABASE_URL}</p>`)
    })
};