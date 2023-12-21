-- Insert test data into the Users table
INSERT INTO
    users (username, email, password_hash)
VALUES
    (
        'user1',
        'user1@example.com',
        '$2b$12$Zhm0pjMmtkNB4V6wO5ce.OjP0t1UTyBxHy3deiS66aAxrDKDTZ5CS'
    ), -- Hashed password for 'password1'
    (
        'user2',
        'user2@example.com',
        '$2b$12$hBjOp2T5.N3R4eNU6Ys3c.BJmyvGwIb.e3BQFNrN7fS3RidEoLkG2'
    ), -- Hashed password for 'password2'
    (
        'user3',
        'user3@example.com',
        '$2b$12$9YBbwZNEA.YcmCZ03eJ5iOJLTxALwXlfgVgHzHNK2CeZIXR2q6KJu'
    ),
    -- Hashed password for 'password3'
    -- Add more users as needed
;

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