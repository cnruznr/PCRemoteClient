const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

// PUBLIC klasörünü serve et
app.use(express.static("public"));

// WebSocket server aynı portu kullanıyor
const wss = new WebSocket.Server({ server, path: "/ws" });

wss.on("connection", (ws) => {
    console.log("📡 WebSocket bağlı!");

    ws.on("message", (msg) => {
        console.log("Komut alındı:", msg.toString());

        // İstersen geri mesaj da gönderebilirsin
        ws.send("Komut işlendi: " + msg);
    });

    ws.on("close", () => {
        console.log("🔌 WebSocket bağlantısı kapandı.");
    });
});

// Render PORT'u yoksa local 10000 kullan
const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
    console.log("🚀 Server çalışıyor:", PORT);
});
