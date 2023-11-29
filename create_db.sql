-- create data
CREATE DATABASE myForumApp;

USE myForumApp;

CREATE TABLE users (
    user_id INT  KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE topics (
    topic_id INT PRIMARY KEY AUTO_INCREMENT,
    topic_name VARCHAR(50) NOT NULL
);

CREATE TABLE threads (
    thread_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INT,
    topic_id INT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);

CREATE TABLE posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT,
    user_id INT,
    thread_id INT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (thread_id) REFERENCES threads(thread_id)
);

CREATE TABLE user_topics (
  user_id INT,
  topic_id INT,
  PRIMARY KEY (user_id, topic_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);




CREATE USER 'Logic1970'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Castle2.Joy';
GRANT ALL PRIVILEGES ON myForumApp.* TO 'Logic1970'@'localhost';

