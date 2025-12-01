const socket = new WebSocket("wss://pcremoteclient.onrender.com/ws");

// Bağlantı kuruldu
socket.onopen = () => {
    console.log("🔗 WebSocket bağlandı!");
};

// Hata
socket.onerror = (err) => {
    console.log("⚠ WebSocket hatası:", err);
};

// Sunucudan veri
socket.onmessage = (event) => {
    console.log("📥 Sunucudan gelen:", event.data);
};

// Komut gönderici
function sendCommand(cmd) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(cmd);
        console.log("📤 Gönderildi:", cmd);
    } else {
        console.log("❌ WebSocket bağlı değil!");
    }
}

document.getElementById("shutdown").onclick = () => sendCommand("shutdown");
document.getElementById("restart").onclick = () => sendCommand("restart");
document.getElementById("lock").onclick = () => sendCommand("lock");
