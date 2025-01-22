const connection = require("../utils/DatabaseConnect");

function CreateApplyTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS apply (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            file TEXT,
            action TEXT DEFAULT 'waiting',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            status BOOLEAN DEFAULT true
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `
    connection.query(query)
        .then(res => console.log("CreateApplyTable Table created"))
        .catch(err => console.log(err))
};

module.exports = CreateApplyTable;