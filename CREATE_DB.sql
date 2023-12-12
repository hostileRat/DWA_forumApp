CREATE DATABASE forum_app;
USE forum_app;

CREATE TABLE Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Forums (
  forum_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Threads (
  thread_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  user_id INT,
  forum_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (forum_id) REFERENCES Forums(forum_id)
);

CREATE TABLE Posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT,
  user_id INT,
  thread_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (thread_id) REFERENCES Threads(thread_id)
);


-- Log in as a user with sufficient privileges, e.g., the root user
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';

-- Grant basic CRUD privileges on a specific database
GRANT SELECT, INSERT, UPDATE, DELETE ON forum_app.* TO 'newuser'@'localhost';

-- Flush privileges to apply the changes
FLUSH PRIVILEGES;
