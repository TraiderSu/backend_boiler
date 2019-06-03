import server from "./server";

server.listen(process.env.PORT, () => {
  console.log('Application server listening on port ' + process.env.PORT);
});

export default server;