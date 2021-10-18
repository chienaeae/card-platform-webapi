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
}