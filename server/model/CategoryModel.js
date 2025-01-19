const connect = require("../utils/DatabaseConnect");


function CreatCategoryTable() {
    const query = `
CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `
    connect.query(query)
        .then(res => console.log("Table created"))
        .catch(err => console.log(err))
}

module.exports = CreatCategoryTable;


