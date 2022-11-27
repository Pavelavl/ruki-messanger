create TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    description VARCHAR(255),
    name VARCHAR(30),
    surname VARCHAR(30),
    mail VARCHAR(50),
    last_visit TIMESTAMP,
    hash VARCHAR(100)
);

INSERT INTO users (username, password, description, name, surname, mail, last_visit, hash) VALUES ('pavelavl', '1234', 'simple durachok', 'Pavel', 'Nevzorov', 'pavluxa@gmail.com', '2022-11-26 15:31', 'asdasdasdasd');
INSERT INTO users (username, password, description, name, surname, mail, last_visit, hash) VALUES ('kirul', '1234', 'pokemon', 'Kirul', 'Kirulovich', 'kirul@gmail.com', '2022-11-26 21:35', 'aadjdlsdajkldldas');
INSERT INTO users (username, password, description, name, surname, mail, last_visit, hash) VALUES ('kj', '1234', 'java', 'Kirill', 'Ju', 'kj@gmail.com', '2022-11-27 4:20', 'lksdasfldasldasdl');

create TABLE chat_{chathash} (
    id SERIAL PRIMARY KEY,
    sender_hash VARCHAR(100),
    hash VARCHAR(100),
    message TEXT(1000),
    date TIMESTAMP,
    seen BOOLEAN,
);