import { db } from "../connect.js";

export const updateOrderRecords = () => {
    // Function to select quantities from goodreceive_details
    const selectPurchaseQty = () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT sku, SUM(qty) AS purchaseqty FROM goodreceive_details GROUP BY sku";
            db.query(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    // Function to select quantities from salesorder_details
    const selectSoldQty = () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT sku, SUM(qty) AS soldqty FROM salesorder_details GROUP BY sku";
            db.query(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    // Function to select quantities from goodreturn_details
    const selectReturnQty = () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT sku, SUM(qty) AS returnqty FROM goodreturn_details GROUP BY sku";
            db.query(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    // Function to update order_records table
    const updateOrderRecordsTable = (sku, purchaseqty, soldqty, returnqty) => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE order_records SET purchaseqty = ?, soldqty = ?, returnqty = ? WHERE sku = ?";
            const qty = purchaseqty - soldqty;
            db.query(query, [purchaseqty, soldqty, returnqty, sku], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(qty);
                }
            });
        });
    };

    // Select quantities from different tables and update order_records
    Promise.all([selectPurchaseQty(), selectSoldQty(), selectReturnQty()])
        .then(([purchaseQtys, soldQtys, returnQtys]) => {
            purchaseQtys.forEach((purchaseQty) => {
                const { sku, purchaseqty } = purchaseQty;
                const soldQty = soldQtys.find((soldQty) => soldQty.sku === sku);
                const returnQty = returnQtys.find((returnQty) => returnQty.sku === sku);
                const sold = soldQty ? soldQty.soldqty : 0;
                const returned = returnQty ? returnQty.returnqty : 0;
                updateOrderRecordsTable(sku, purchaseqty, sold, returned)
                    .then((qty) => {
                        console.log(`Updated order_records for SKU: ${sku}, new qty: ${qty}`);
                    })
                    .catch((err) => {
                        console.error("Failed to update order_records:", err);
                    });
            });
        })
        .catch((err) => {
            console.error("Failed to fetch data:", err);
        });
};
