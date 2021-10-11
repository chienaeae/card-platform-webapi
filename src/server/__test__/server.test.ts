import express, {Application, Express} from "express";
import {Server} from "../server";


describe('server', () => {
   test('start server and return application', () => {
       const application = new Server().startServer();
   })
})
