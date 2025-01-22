const connect = require("../utils/DatabaseConnect");

function createnewstable() {
    const query = `
        CREATE TABLE IF NOT EXISTS news (
            id SERIAL PRIMARY KEY,
            category_id INT NOT NULL,
            subcategory_id INT NOT NULL,
            news_id INT,
            title_uz VARCHAR(255) NOT NULL,
            title_eng VARCHAR(255) NOT NULL,
            title_ru VARCHAR(255) NOT NULL,
            description_uz TEXT NOT NULL,
            description_eng TEXT NOT NULL,
            description_ru TEXT NOT NULL,
            image_source VARCHAR(255) NOT NULL,
            image_url VARCHAR(255) NOT NULL,
            views INT DEFAULT 0,
            rating INT DEFAULT 0,
            hashtag VARCHAR(255),
            subscribtion BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            status BOOLEAN DEFAULT true,
            FOREIGN KEY (category_id) REFERENCES category(id),
            FOREIGN KEY (subcategory_id) REFERENCES subcategory(id),
            FOREIGN KEY (news_id) REFERENCES news(id)
        )
    `
    
    connect.query(query)
        .then(res => console.log("NEWS Table created"))
        .catch(err => console.log(err))
};

module.exports = createnewstable;