import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as http from "http";
import * as methodOverride from "method-override";
import * as morgan from "morgan";
import { Connection } from "./Database";
import { ROUTER } from "./Router";
import { env } from "process";
import { config } from "../config";
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./config/swagger.yaml');

export class Server {
    private static ConnectDB(): Promise<any> {
        return Connection;
    }

    private readonly app: express.Application;
    private readonly server: http.Server;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
    }

    public Start(): Promise<http.Server> {
        return Server.ConnectDB().then(() => {
            this.ExpressConfiguration();
            this.ConfigurationRouter();
            // this.SocketConfiguration();
            return this.server;
        });
    }

    public App(): express.Application {
        return this.app;
    }

    private ExpressConfiguration(): void {

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(methodOverride());

        this.app.use((req, res, next): void => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
            res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
            next();
        });

        this.app.use(morgan("combined"));
        this.app.use(cors());

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            err.status = 404;
            next(err);
        });
    }

    private ConfigurationRouter(): void {

        for (const route of ROUTER) {
            this.app.use(route.path, route.middleware, route.handler);
        }

        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
            res.status(404);
            res.json({
                error: "Not found",
            });
            next();
        });

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            if (err.name === "UnauthorizedError") {
                res.status(401).json({
                    error: "Please send a valid Token...",
                });
            }
            next();
        });

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            res.status(err.status || 500);
            res.json({
                error: err.message,
            });
            next();
        });
    }

    private SocketConfiguration(): void {
        const io = require('socket.io').listen(this.server);
        // Connect to Socket.io
        io.sockets.on('connection', function(socket: any){
            // Create function to send status
            // socket.join('game');
            function sendStatus(s: any){
                socket.emit('status', s);
            }

            // // Get chats from mongo collection
            // chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            //     if(err){
            //         throw err;
            //     }

            //     // Emit the messages
            //     socket.emit('output', res);
            // });

            // Handle input events
            socket.on('input', function(data: any){
                let name = data.name;
                let message = data.message;

                // Check for name and message
                if(name == '' || message == ''){
                    // Send error status
                    sendStatus('Please enter a name and message');
                } else {
                    // Insert message
                    // chat.insert({name: name, message: message}, function(){
                        io.emit('output', [data]);

                        // Send status object
                        sendStatus({
                            message: 'Message sent',
                            clear: true
                        });
                    // });
                }
            });
        });
    }
}
