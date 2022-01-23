create table customer
(
    id          int auto_increment
        primary key,
    email       varchar(25) not null,
    firstName   varchar(50) not null,
    lastName    varchar(50) not null,
    age         int         null,
    phoneNumber varchar(12) not null,
    password    varchar(15) not null,
    registered  datetime    not null
)
    charset = utf8;

INSERT INTO contactdb.customer (id, email, firstName, lastName, age, phoneNumber, password, registered) VALUES (10, 'sara.meier@email.ch', 'Sara', 'Meier', 23, '0799099090', 'Hello123!', '2022-01-23 20:16:40');
INSERT INTO contactdb.customer (id, email, firstName, lastName, age, phoneNumber, password, registered) VALUES (11, 'sara.meier@email.ch', 'Sara', 'Meier', 23, '0799099090', 'Hello123!', '2022-01-23 20:16:40');