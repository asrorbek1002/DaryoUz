const connection = require("../utils/DatabaseConnect");

function CreateConfirmTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS confirm (
            id SERIAL PRIMARY KEY,
            apply_id INT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            status BOOLEAN DEFAULT true,
            CONSTRAINT fk_apply
                FOREIGN KEY (apply_id) 
                REFERENCES apply(id)
        )
    `;
    connection.query(query)
        .then(res => console.log("CreateConfirmTable Table created"))
        .catch(err => console.log(err));
}

module.exports = CreateConfirmTable;
