// Render backend'e WebSocket bağlantısı
const socket = new WebSocket("wss://pcremoteclient.onrender.com/ws");

// Bağlantı açıldığında
socket.onopen = () => {
    console.log("Sunucuya bağlanıldı!");
};

// Bağlantı hatası olduğunda
socket.onerror = (err) => {
    console.log("WebSocket hatası:", err);
};

// Sunucudan mesaj alındığında
socket.onmessage = (event) => {
    console.log("Sunucudan gelen:", event.data);
};

// Komut gönderme fonksiyonu
function sendCommand(cmd) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(cmd);
        console.log("Gönderildi:", cmd);
    } else {
        console.log("WebSocket bağlı değil.");
    }
}

// HTML butonları
document.getElementById("shutdown").addEventListener("click", () => {
    sendCommand("shutdown");
});

document.getElementById("restart").addEventListener("click", () => {
    sendCommand("restart");
});

document.getElementById("lock").addEventListener("click", () => {
    sendCommand("lock");
});
