CREATE DATABASE forumApp;

USE forumApp;

-- Users Table
CREATE TABLE
    users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL
        -- Add any other user-related fields as needed
    );

-- Sessions Table
CREATE TABLE
    sessions (
        session_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        session_token VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
    );

-- Topics Table
CREATE TABLE
    topics (
        topic_id INT AUTO_INCREMENT PRIMARY KEY,
        topic_name VARCHAR(255) NOT NULL
        -- Add any other topic-related fields as needed
    );

-- Posts Table
CREATE TABLE
    posts (
        post_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        topic_id INT,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        parent_post_id INT,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (topic_id) REFERENCES topics (topic_id),
        FOREIGN KEY (parent_post_id) REFERENCES posts (post_id)
        -- Add any other post-related fields as needed
    );

-- Replies Table
CREATE TABLE
    replies (
        reply_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        post_id INT,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (post_id) REFERENCES posts (post_id)
        -- Add any other reply-related fields as needed
    );

-- Tags Table
CREATE TABLE
    tags (
        tag_id INT AUTO_INCREMENT PRIMARY KEY,
        tag_name VARCHAR(50) NOT NULL UNIQUE
    );

-- PostTags Table
CREATE TABLE
    post_tags (
        post_id INT,
        tag_id INT,
        PRIMARY KEY (post_id, tag_id),
        FOREIGN KEY (post_id) REFERENCES posts (post_id),
        FOREIGN KEY (tag_id) REFERENCES tags (tag_id)
    );

-- Create a user with CRUD privileges only
CREATE USER 'appuser2' @'localhost' IDENTIFIED BY 'Gottagetdownonfriday2011!';

-- Grant privileges for CRUD operations on the forum database
GRANT
SELECT
,
INSERT
,
UPDATE,
DELETE ON forumApp.* TO 'appuser2' @'localhost';

-- Revoke privileges for creating and altering tables
REVOKE CREATE,
ALTER,
DROP ON forumApp.*
FROM
    'appuser2' @'localhost';