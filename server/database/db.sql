CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    description VARCHAR(255),
    name VARCHAR(50),
    surname VARCHAR(50),
    mail VARCHAR(100) UNIQUE NOT NULL,
    last_visit TIMESTAMP
);

CREATE TABLE chat_*_* (
    id SERIAL PRIMARY KEY,
    message TEXT,
    id1 INTEGER,
    id2 INTEGER,
    date TIMESTAMP
)