const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth.js");
const { decodeTransactionsData } = require("./utils/transaction-decode.js");
const testEnvConf = require("./utils/test-env-conf.js");

const environment = process.env.NODE_ENV;
const defaultConf = require("../config/default.json");
const envConf = require(`../config/${environment}.json`);
const mainConf = {...defaultConf, ...envConf};

// configuration validation
testEnvConf(mainConf);

const app = express();

app.use(
    bodyParser.raw({
        type: "application/octet-stream",
        limit: "10mb"
    })
);

app.post("/api/v1/process", auth, (req, res) => {
    try {
        const buffer = req.body;
        const decodedData = decodeTransactionsData(buffer, mainConf.frameSize, mainConf.offset);

        res.send({ result: decodedData });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = app;
