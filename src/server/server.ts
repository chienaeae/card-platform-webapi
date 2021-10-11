import express, {Application} from "express";
import {register} from "./routes/routes";
import http from "http";

export class Server {

    private httpServer: http.Server | undefined;


    public startServer() {
        const app: Application = express();

        register(app);

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