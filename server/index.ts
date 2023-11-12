const activeGames = []
const onlineUsers = []

const server = Bun.serve<{ authToken: string }>({
  port: 6969,
  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
     return undefined;
    }
  },
  websocket: {
    async message(ws, message) {
      console.log(`Received ${message}`);
      ws.send(`You said: ${message}`);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);

