const connect = require("../utils/DatabaseConnect");

function CreateSubcategoryTable() {
    const query = `
CREATE TABLE IF NOT EXISTS subcategory (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL,
    name_uz VARCHAR(255) NOT NULL,
    name_eng VARCHAR(255) NOT NULL,
    name_ru VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);
    `;
    connect.query(query)
        .then(res => console.log("Subcategory table created"))
        .catch(err => console.log(err));
}

module.exports = CreateSubcategoryTable;
