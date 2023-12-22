CREATE DATABASE forumApp;

USE forumApp;

CREATE TABLE
    `users` (
        `user_id` int NOT NULL AUTO_INCREMENT,
        `username` varchar(255) NOT NULL,
        `password_hash` varchar(255) NOT NULL,
        PRIMARY KEY (`user_id`)
    );

CREATE TABLE
    `topics` (
        `topic_id` int NOT NULL AUTO_INCREMENT,
        `topic_name` varchar(255) NOT NULL,
        PRIMARY KEY (`topic_id`)
    );

CREATE TABLE
    `posts` (
        `post_id` int NOT NULL AUTO_INCREMENT,
        `user_id` int DEFAULT NULL,
        `topic_id` int DEFAULT NULL,
        `title` varchar(255) NOT NULL,
        `content` text NOT NULL,
        `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`post_id`),
        KEY `user_id` (`user_id`),
        KEY `topic_id` (`topic_id`),
        CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
        CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`)
    );

CREATE TABLE
    `user_topic` (
        `user_id` int NOT NULL,
        `topic_id` int NOT NULL,
        PRIMARY KEY (`user_id`, `topic_id`),
        KEY `topic_id` (`topic_id`),
        CONSTRAINT `user_topic_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
        CONSTRAINT `user_topic_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topic_id`)
    );

CREATE USER 'appuser2'@'localhost' IDENTIFIED BY 'Gottagetdownonfriday2011!';

GRANT ALL PRIVILEGES TO 'appuser2' @'localhost';