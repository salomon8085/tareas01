create table tasks(
    id int not null primary key auto_increment,
    title varchar(255) not null,
    description varchar(300),
    done boolean not null default 0,
    createAt TIMESTAMP NOT NULL default CURRENT_TIMESTAMP
);