const dotenv = require("dotenv")
dotenv.config()
const http = require("http");
const app = require("./app")


const server = http.createServer(app);

const port = 3000;

server.listen(port);
server.once("listening", function() {
    console.log(`Unlockvistador server listening on port ${port}`);
    //console.log(process.env.ACCESS_TOKEN_SECRET)
});
