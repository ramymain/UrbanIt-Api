import * as cluster from "cluster";
import { cpus } from "os";
import { env } from "process";
import { config } from "./config";
import { Server } from "./config/Server";

if (cluster.isMaster) {

    console.log(`\n -------------------> RUN ${env.NODE_ENV} ENVIRONMENT \n`);

    for (const cpu of cpus()) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log("Worker " + worker.process.pid + " died with code: " + code + ", and signal: " + signal);
        console.log("Starting a new worker");
        cluster.fork();
    });

} else {

    const port: number = Number(env.PORT) || config.PORT_APP || 3000;

    new Server().Start().then((server) => {

        server.listen(port);

        server.on("error", (error: any) => {
            if (error.syscall !== "listen") {
                throw error;
            }

            switch (error.code) {
                case "EACCES":
                    console.error("Port requires elevated privileges");
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    console.error("Port is already in use");
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });

        server.on("listening", () => {
            console.log("Server is running in process " + process.pid + " listening on PORT " + port + "\n");
        });
        // const io = require('socket.io')(server);
        // // Connect to Socket.io
        // io.sockets.on('connection', function (socket: any) {
        //     // Create function to send status
        //     // socket.join('game');
        //     function sendStatus(s: any) {
        //         socket.emit('status', s);
        //     }

        //     // // Get chats from mongo collection
        //     // chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
        //     //     if(err){
        //     //         throw err;
        //     //     }

        //     //     // Emit the messages
        //     //     socket.emit('output', res);
        //     // });

        //     // Handle input events
        //     socket.on('input', function (data: any) {
        //         let name = data.name;
        //         let message = data.message;

        //         // Check for name and message
        //         if (name == '' || message == '') {
        //             // Send error status
        //             sendStatus('Please enter a name and message');
        //         } else {
        //             // Insert message
        //             // chat.insert({name: name, message: message}, function(){
        //             io.emit('output', [data]);

        //             // Send status object
        //             sendStatus({
        //                 message: 'Message sent',
        //                 clear: true
        //             });
        //             // });
        //         }
        //     });
        // });
    });

}
