create database portfolio;

use portfolio;

create table contacts (
	id int primary key auto_increment,
    name varchar(200),
    email varchar(200),
    subject varchar(200),
    message text,
    created_at timestamp default current_timestamp
);