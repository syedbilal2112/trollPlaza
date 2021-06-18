const http = require("http");
const app = require("./app");
const constant = require("./utils/constant");
const server = http.createServer(app);
server.listen(constant.PORT);
server.on("listening", () => {
  server.timeout = 90000;
  console.log(`server is running at ${constant.PORT}`);
});
console.log("env", process.env.NODE_ENV);
server.on("error", e => {
  console.error("Something went wrong!", e);
});