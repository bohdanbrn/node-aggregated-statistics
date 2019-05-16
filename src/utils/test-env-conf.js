function testEnvConf(envConf) {
    // check fields type
    if (typeof envConf.frameSize !== "number") {
        throw new Error('Field "frameSize" should be a number!');
    } else if (typeof envConf.offset.sender !== "number") {
        throw new Error('Field "offset.sender" should be a number!');
    } else if (typeof envConf.offset.receiver !== "number") {
        throw new Error('Field "offset.receiver" should be a number!');
    } else if (typeof envConf.offset.amount !== "number") {
        throw new Error('Field "offset.amount" should be a number!');
    } else if (typeof envConf.offset.timestamp !== "number") {
        throw new Error('Field "offset.timestamp" should be a number!');
    }

    // check fields size
    if (envConf.offset.sender + 32 > envConf.frameSize) {
        throw new Error('Field "offset.sender" exceeds the frame size!');
    } else if (envConf.offset.receiver + 32 > envConf.frameSize) {
        throw new Error('Field "offset.receiver" exceeds the frame size!');
    } else if (envConf.offset.amount + 4 > envConf.frameSize) {
        throw new Error('Field "offset.amount" exceeds the frame size!');
    } else if (envConf.offset.timestamp + 6 > envConf.frameSize) {
        throw new Error('Field "offset.timestamp" exceeds the frame size!');
    }

    return true;
}

module.exports = testEnvConf;
