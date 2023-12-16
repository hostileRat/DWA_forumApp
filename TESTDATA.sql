-- Insert test data into the Users table
INSERT INTO
    users (username, email, password_hash)
VALUES
    ('user1', 'user1@example.com', 'hashed_password_1'),
    ('user2', 'user2@example.com', 'hashed_password_2'),
    ('user3', 'user3@example.com', 'hashed_password_3');

-- Insert test data into the Topics table
INSERT INTO
    topics (topic_name)
VALUES
    ('General Discussion'),
    ('Programming Languages'),
    ('Web Development');

-- Insert test data into the Posts table
INSERT INTO
    posts (user_id, topic_id, title, content)
VALUES
    (
        1,
        1,
        'Hello, World!',
        'This is the first post in the forum.'
    ),
    (
        2,
        2,
        'Favorite Programming Language',
        'What is your favorite programming language and why?'
    );

-- Insert test data into the Replies table
INSERT INTO
    replies (user_id, post_id, content)
VALUES
    (3, 1, 'Nice to meet you!'),
    (
        1,
        2,
        'My favorite programming language is JavaScript.'
    );

-- Insert test data into the Tags table
INSERT INTO
    tags (tag_name)
VALUES
    ('Beginner'),
    ('JavaScript'),
    ('Python');

-- Insert test data into the PostTags table
INSERT INTO
    post_tags (post_id, tag_id)
VALUES
    (1, 1),
    (2, 2);