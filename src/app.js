const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth.js");
const { decodeTransactionsData } = require("./utils/transaction-decode.js");

const app = express();

app.use(
    bodyParser.raw({
        type: "application/octet-stream",
        limit: "10mb"
    })
);

app.post("/api/v1/process", auth, (req, res) => {
    // TODO (test) (delete in future)
    const frameSize = 128;
    const offsets = {
        sender: 0,
        receiver: 40,
        amount: 80,
        timestamp: 120
    };

    try {
        const buffer = req.body;
        const decodedData = decodeTransactionsData(buffer, frameSize, offsets);

        res.send({ result: decodedData });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = app;
