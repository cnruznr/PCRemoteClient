const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

// Statik dosyalar
app.use(express.static("public"));

// WebSocket server
const wss = new WebSocket.Server({ server, path: "/ws" });

wss.on("connection", (ws) => {
    console.log("📡 Yeni WebSocket bağlantısı!");

    ws.on("message", (msg) => {
        console.log("📥 Komut alındı:", msg.toString());

        // Bağlı olan bütün clientlara ilet
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        });
    });

    ws.on("close", () => {
        console.log("🔌 WebSocket bağlantısı kapandı.");
    });
});

// Render veya local port
const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
    console.log("🚀 Server çalışıyor:", PORT);
});
