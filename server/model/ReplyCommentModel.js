const connection = require("../utils/DatabaseConnect");

function CreateReplaycommentTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS replaycomments (
            id SERIAL PRIMARY KEY,
            comment_id INT NOT NULL,
            user_id INT NOT NULL,
            replay_comment TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            status BOOLEAN DEFAULT true,
            FOREIGN KEY (comment_id) REFERENCES comments(id),
            FOREIGN KEY (user_id) REFERENCES users(id)    
        );
    `
    connection.query(query)
        .then(res => console.log("REPLYCOMMENT Table created"))
        .catch(err => console.log(err))
}

module.exports = CreateReplaycommentTable;

