/**
 * Decode transactions information
 * @param {BinaryType} buffer
 * @param {number} frameSize
 * @param {object} offsets
 */
function decodeTransactionsData(buffer, frameSize, offsets) {
    let result = [];

    let buf8Array = new Uint8Array(buffer);

    if (buf8Array.length % frameSize === 0) {
        const framesCount = buf8Array.length / frameSize;
        let frameStart = 0;
        let frameEnd = frameSize;

        // divide data by single frames
        for (let i = 0; i < framesCount; i++) {
            let frame8Array = buf8Array.slice(frameStart, frameEnd);
            let decodedFrame = decodeTransactionData(frame8Array, offsets);

            // add decoded frame to result array
            result.push(decodedFrame);

            // update start and end positions for bytes of next frame
            frameStart += frameSize;
            frameEnd += frameSize;
        }
    } else {
        throw new Error("Invalid transactions data");
    }

    return result;
}

/**
 * Decode transaction information
 * @param {array} TypedArray (Uint8Array)
 * @param {object} offsets
 */
function decodeTransactionData(TypedArray, offsets) {
    let sender = TypedArray.slice(offsets.sender, offsets.sender + 32);
    let receiver = TypedArray.slice(offsets.receiver, offsets.receiver + 32);
    let amount = TypedArray.slice(offsets.amount, offsets.amount + 4);
    let timestamp = TypedArray.slice(offsets.timestamp, offsets.timestamp + 6);

    let senderBuf = Buffer.from(sender);
    let senderDecoded = senderBuf.toString("utf8");
    // remove symbols - "\u0000"
    senderDecoded = senderDecoded.replace(/\0/g, "");

    let receiverBuf = Buffer.from(receiver);
    let receiverDecoded = receiverBuf.toString("utf8");
    // remove symbols - "\u0000"
    receiverDecoded = receiverDecoded.replace(/\0/g, "");

    let amountBuf = Buffer.from(amount);
    let amountDecoded = amountBuf.readIntBE(0, 4);

    let timestampBuf = Buffer.from(timestamp);
    let timestampDecoded = timestampBuf.readIntBE(0, 6);

    return {
        sender: receiverDecoded,
        receiver: senderDecoded,
        amount: amountDecoded,
        timestamp: timestampDecoded
    };
}

module.exports = { decodeTransactionData, decodeTransactionsData };
