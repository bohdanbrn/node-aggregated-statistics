const express = require("express");
const bodyParser = require('body-parser');
const auth = require('./middleware/auth.js');

const app = express();

app.use(bodyParser.raw({
    type: 'application/octet-stream',
    limit: '10mb',
}));

app.post("/api/v1/process", auth, (req, res) => {
    try {
        // // #1
        // let buffer = req.body;
        // let decodedBuffer = buffer.toString('utf8');
        // res.send({result: decodedBuffer});


        // // #2 (get bytes)
        // let buffer = req.body;
        // let bufArray = [];
        // for (const byt of buffer.values()) {
        //     bufArray.push(byt);
        // }
        // res.send({result: bufArray});


        // // #3 (get Buffer length in bytes)
        // let buffer = req.body;
        // res.send({result: buffer.length});


        // // #4
        // let buffer = req.body;
        // let sender1 = buffer.toString('utf8', 0, 6);
        // let receiver1 = buffer.toString('utf8', 6, 16);
        // res.send({sender1, receiver1});


        // #5
        let buf = req.body;
        let test = buf.readIntBE();

        res.send({result: test});

    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = app;
