CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Author One', 'www.example.com', 'Blog one');

insert into blogs (author, url, title, likes) values ('Author Two', 'www.example.com', 'Blog two', 5);