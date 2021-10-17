import express from "express";
import {v1Router} from "./api/v1";
import * as http from "http";
import bodyParser from "body-parser";

export class App {

    private httpServer?: http.Server;


    public startServer() {
        const app: express.Application = express();

        app.use('/api/v1', v1Router);

        const PORT = process.env.PORT || 8000;

        this.httpServer = app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });

        // process.on('SIGTERM', () => {
        //     this.shutdown()
        // });
        //
        // process.once('SIGUSR2', () => {
        //     console.log("aaa")
        //     this.shutdown();
        //     process.exit();
        // });
        //
        // process.on('SIGINT', () => {
        //     console.log("bbb")
        //     // this is only called on ctrl+c, not restart
        //     this.shutdown();
        //     process.exit();
        // });
        // process.on('exit', () => {
        //     console.log('exiting...');
        //     this.shutdown();
        //     process.exit();
        // });
    }

    // private shutdown(){
    //     if (this.httpServer){
    //         console.log('Closing http server.');
    //
    //         this.httpServer.close(() => {
    //             console.log('Http server closed.');
    //         })
    //     }
    //
    // }
}