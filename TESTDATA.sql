-- Insert test data into 'users' table
INSERT INTO
    users (username, password_hash)
VALUES
    ('john_doe', 'hashed_password_1'),
    ('alice_smith', 'hashed_password_2'),
    ('bob_jones', 'hashed_password_3');

-- Insert test data into 'topics' table
INSERT INTO
    topics (topic_name)
VALUES
    ('Programming'),
    ('Science and Technology'),
    ('Travel and Adventure'),
    ('Food and Cooking');

-- Insert test data into 'user_topic' table (associating users with topics)
INSERT INTO
    user_topic (user_id, topic_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 2),
    (3, 3),
    (3, 4);

-- Insert test data into 'posts' table 
INSERT INTO
    posts (user_id, topic_id, title, content, created_at)
VALUES
    (
        1,
        1,
        'Learning Python',
        'I started learning Python last week and it\'s amazing! Python is a versatile and powerful programming language with a clean syntax. So far, I\'ve covered basic data types, control structures, and I\'m excited to delve into more advanced topics like web development and machine learning in the coming weeks.',
        NOW()
    ),
    (
        1,
        2,
        'The Future of Artificial Intelligence',
        'Discussing the latest trends in AI and machine learning. Artificial Intelligence (AI) is evolving rapidly, impacting various industries. From natural language processing to computer vision, the possibilities seem endless. What are your thoughts on the ethical implications of AI development?',
        NOW()
    ),
    (
        2,
        2,
        'CRISPR Technology and Genetic Engineering',
        'Exploring the potential of CRISPR in genetic modification. CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) technology has revolutionized genetic engineering. This technology allows for precise modification of genes, opening up new possibilities in medicine, agriculture, and beyond. Let\'s discuss its applications and the ethical considerations surrounding gene editing.',
        NOW()
    ),
    (
        3,
        3,
        'Backpacking through Southeast Asia',
        'Sharing my experiences from a recent backpacking trip. From the bustling streets of Bangkok to the serene beaches of Bali, Southeast Asia offers a diverse range of experiences for travelers. Join me as I recount the adventures, cultural encounters, and breathtaking landscapes encountered during this memorable journey.',
        NOW()
    ),
    (
        3,
        4,
        'Homemade Pasta Recipes',
        'A collection of my favorite pasta recipes. Cooking has been a passion of mine, and one of my favorite dishes to prepare is pasta. In this post, I\'ll share some tried-and-true recipes for homemade pasta, along with tips on creating the perfect sauce. Let me know your favorite pasta dishes!',
        NOW()
    ),
    (
        2,
        1,
        'Web Development Tips',
        'Tips and tricks for efficient web development. Web development is a dynamic field with constant advancements. In this post, I\'ll share some practical tips for writing clean and maintainable code, optimizing performance, and staying up-to-date with the latest technologies. What are your go-to web development tools and practices?',
        NOW()
    );