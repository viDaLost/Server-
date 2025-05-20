const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT || 3000 });

wss.on('connection', (ws) => {
  console.log('Новый игрок подключён');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log('Получено:', data);

    // Пересылка всем остальным
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on('close', () => {
    console.log('Игрок отключился');
  });
});
