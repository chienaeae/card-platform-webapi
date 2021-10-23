import express from "express";
import {v1Router} from "./routes/v1";
import * as http from "http";

export class App {
    private httpServer?: http.Server;

    public startServer() {
        const app: express.Application = express();

        app.use('/api/v1', v1Router);

        const PORT = process.env.PORT || 8000;

        this.httpServer = app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    }

    public closeServer(): Promise<void>{
        if(!!this.httpServer == false){
            console.log(`Not yet start server`);
            return
        }

        console.info(`closing server`)
        return new Promise(async (resolve, reject) => {
            await this.httpServer.close((err) => {
                if(err){
                    reject(err)
                }
                console.info(`server has closed`)
                resolve()
            });
        })

    }
}