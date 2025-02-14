const connection = require("../utils/DatabaseConnect");

function CreateCommentTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,
            news_id INT NOT NULL,
            user_id INT NOT NULL,
            comment TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (news_id) REFERENCES news(id),
            FOREIGN KEY (user_id) REFERENCES users(id)    
        );
    `
    connection.query(query)
        .then(res => console.log("COMMENT Table created"))
        .catch(err => console.log(err))
};

module.exports = CreateCommentTable;