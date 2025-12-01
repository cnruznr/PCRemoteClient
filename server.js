const express = require("express");
const cors = require("cors");

let lastCommand = "";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("PC Remote Controller is running.");
});

// TELEFON → backend
app.post("/send-command", (req, res) => {
    const { command } = req.body;

    if (!command) return res.status(400).send("Komut eksik.");

    lastCommand = command;
    console.log("Komut alındı:", command);

    res.send("Komut gönderildi.");
});

// PC CLIENT → backend
app.get("/get-command", (req, res) => {
    res.send(lastCommand);
    lastCommand = "";  // komutu okuduktan sonra sıfırla
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server çalışıyor: ${port}`));
