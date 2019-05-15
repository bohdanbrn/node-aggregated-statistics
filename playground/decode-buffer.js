const random = require('../tests/lib/random');
const pack = require('../tests/lib/pack');

const frameSize = 128;
const offsets = {
    sender: 0,
    receiver: 40,
    amount: 80,
    timestamp: 120
};

const frame = random.frame();
const buffer = pack(frame, frameSize, offsets);
const buf8Array = new Uint8Array(buffer);

let sender = buf8Array.slice(offsets.sender, offsets.sender + 32);
let receiver = buf8Array.slice(offsets.receiver, offsets.receiver + 32);
let amount = buf8Array.slice(offsets.amount, offsets.amount + 4);
let timestamp = buf8Array.slice(offsets.timestamp, offsets.timestamp + 6);

let senderBuf = Buffer.from(sender);
let senderDecoded = senderBuf.toString( 'utf8' );
// remove symbols - "\u0000"
senderDecoded = senderDecoded.replace(/\0/g, '');

let receiverBuf = Buffer.from(receiver);
let receiverDecoded = receiverBuf.toString( 'utf8' );
// remove symbols - "\u0000"
receiverDecoded = receiverDecoded.replace(/\0/g, '');

let amountBuf = Buffer.from(amount);
let amountDecoded = amountBuf.readIntBE(0, 4);

let timestampBuf = Buffer.from(timestamp);
let timestampDecoded = timestampBuf.readIntBE(0, 6);

console.log(receiverDecoded);
console.log(senderDecoded);
console.log(amountDecoded);
console.log(timestampDecoded);


// // #1
// let buf = Buffer.allocUnsafe(128);
// buf.fill(0, 0, 15);
// buf.write('test test test test 111111111', 0, 50);
// // let decodedBuf = buf.toString( 'utf8' );
// let decodedBuf = new Uint8Array(buf);
// console.log(decodedBuf);

// // #2
// let buf = Buffer.allocUnsafe(128);
// buf.fill(0, 0, 15);
// buf.write('test test test test 111111111', 0, 50);
// let bufArray = new Uint8Array(buf);
// console.log(bufArray);

// // #3
// let buf = Buffer.allocUnsafe(128);
// buf.fill(0, 0, 128);
// buf.write('test test test test 111111111', 0, 50);
// let bufJson = JSON.stringify(buf);
// let decodedBuf = Buffer.from(JSON.parse(bufJson).data);

// console.log(bufJson);
