/**
 * Calculate statistics of decoded payment data
 * @param {array} paymentData
 */
function calculateStatistics(paymentData) {
    const result = {
        total: {
            amount: 0,
            transactions: 0
        },
        customerStatistics: {},
        dayStatistics: {}
    };

    paymentData.forEach(function(item) {
        result.total.amount += item.amount;
        result.total.transactions++;

        const sender = item.sender.toLowerCase();
        const receiver = item.receiver.toLowerCase();

        // sender
        if (result.customerStatistics.hasOwnProperty(sender)) {
            result.customerStatistics[sender].transactions++;
            result.customerStatistics[sender].totalSent += item.amount;
        } else {
            result.customerStatistics[sender] = createCustomerStatistics(1, item.amount, 0);
        }

        // receiver
        if (result.customerStatistics.hasOwnProperty(receiver)) {
            result.customerStatistics[receiver].transactions++;
            result.customerStatistics[receiver].totalReceived += item.amount;
        } else {
            result.customerStatistics[receiver] = createCustomerStatistics(1, 0, item.amount);
        }

        // date
        let transactionDay = new Date(item.timestamp);
        transactionDay.setHours(0, 0, 0, 0);
        transactionDay = transactionDay.toISOString();

        if (result.dayStatistics.hasOwnProperty(transactionDay)) {
            result.dayStatistics[transactionDay].transactions++;
        } else {
            result.dayStatistics[transactionDay] = {
                transactions: 1
            };
        }
    });

    return result;
}

/**
 * Create an object with сustomer statistics
 * @param {number} transactions
 * @param {number} totalSent
 * @param {number} totalReceived
 */
function createCustomerStatistics(transactions, totalSent, totalReceived) {
    return {
        transactions,
        totalSent,
        totalReceived
    };
}

module.exports = { calculateStatistics };
