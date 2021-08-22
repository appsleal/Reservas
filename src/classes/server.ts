import express from 'express';
import http from 'http';
import fs from 'fs';


export default class Server{

    private static _instance:Server;
    

    public app : express.Application;
    public port : number = 4550;

    
    private constructor(){
        this.app=express();
    }

    public static get instance(){
        return this._instance || (this._instance = new this() );
    }

    start( callback:any ){
        this.app.listen( this.port, callback );
    }
 
}