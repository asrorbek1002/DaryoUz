const connection = require("../utils/DatabaseConnect");

function CreateAdvertisingTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS advertisings (
            id SERIAL PRIMARY KEY,
            subject = VARCHAR(255) NOT NULL,
            url = VARCHAR(255) NOT NULL,
            image = VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
        )
    `
    connection.query(query)
        .then(res => console.log("CreateAdvertisingTable  Table created"))
        .catch(err => console.log(err))
};

module.exports = CreateAdvertisingTable;