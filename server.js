const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    const signalsPerSecond = 256;
    const intervalTime = 1000 / signalsPerSecond;

    const sendData = () => {
        const signals = Array.from({ length: 5 }, () =>
            Math.floor(Math.random() * 100)
        );

        const data = {
            time: Date.now(),
            signals,
        };

        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
        }
    };

    const interval = setInterval(sendData, intervalTime);

    ws.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

wss.on('error', (error) => {
    console.error('WebSocket error:', error);
});

console.log('WebSocket server is running on ws://localhost:8080');
