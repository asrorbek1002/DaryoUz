const connect = require("../utils/DatabaseConnect");


function CreatUserTable() {
    const query = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,                  
    name VARCHAR(255) NOT NULL,             
    phone VARCHAR(15) UNIQUE,      
    email VARCHAR(255) NOT NULL UNIQUE,     
    order_id NUMERIC NOT NULL UNIQUE,        
    password VARCHAR(255) NOT NULL,         
    balance NUMERIC DEFAULT 0,              
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'user')), 
    tarif VARCHAR(50) DEFAULT 'none' CHECK (tarif IN ('none', 'vip')), 
    deadline TIMESTAMP DEFAULT NULL,        
    status BOOLEAN DEFAULT TRUE,            
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
    `
    connect.query(query)
        .then(res => console.log("Table created"))
        .catch(err => console.log(err))
}

module.exports = CreatUserTable;


