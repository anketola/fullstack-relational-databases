CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Bloggy Blogger', 'www.example.com', 'The Blog', 5);
insert into blogs (author, url, title, likes) values ('Writey Writer', 'www.example.com', 'Writings', 3);