const connection = require("../utils/DatabaseConnect");

function CreateRatingTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS rating (
            id SERIAL PRIMARY KEY,
            news_id INT NOT NULL,
            user_id INT NOT NULL,
            rating INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            status BOOLEAN DEFAULT true,
            FOREIGN KEY (news_id) REFERENCES news(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `
    connection.query(query)
        .then(res => console.log("Rating Table created"))
        .catch(err => console.log(err))
}

module.exports = CreateRatingTable;