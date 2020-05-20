CREATE TABLE rooms
(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    description VARCHAR(200),
    picture_url VARCHAR(200),
    host_is_superhost VARCHAR(1),
    city VARCHAR(100),
    country VARCHAR(100),
    latitude DOUBLE,
    longitude DOUBLE,
    price VARCHAR(100),
    security_deposit VARCHAR(100),
    cleaning_fee VARCHAR(100),
    number_of_reviews INT,
    review_scores_rating INT
);