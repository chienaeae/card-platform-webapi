import express, {Application, Express} from "express";
import {Server} from "../Server";


describe('server', () => {
   test('start server and return application', () => {
       new Server().startServer();
   })
})
