use langeee;

select * from bu_comments;

      select * from bu_posts as p
        left join bu_category as c
        on c.categoryId = p.category_id
        order by p.date desc;

select * from bu_category cr left join bu_category cs on cr.categoryId = cs.related order by cs.categoryId asc;

create table `bu_category` (
	`categoryId` int not null auto_increment primary key,
    `name` char(30) not null,
    `related` int null
);

insert into `bu_category` (name) values ('cv');
insert into `bu_category` (name) values ('artwork');
insert into `bu_category` (name) values ('exhibition');
insert into `bu_category` (name) values ('board');
insert into `bu_category` (name) values ('visitor');
insert into `bu_category` (name, related) values ('drawing', 2);
insert into `bu_category` (name, related) values ('painting', 2);
insert into `bu_category` (name, related) values ('photography', 2);
insert into `bu_category` (name, related) values ('digital', 2);
insert into `bu_category` (name, related) values ('notice', 4);
insert into `bu_category` (name, related) values ('essay', 4);


create table `bu_users` (
	`id` varchar(36) not null primary key,
    `username` char(32) not null,
    `password` text not null,
    `date` char(26) not null,
    `staff` int null
);

drop table bu_users;
select * from bu_users;

create table `bu_posts` (
	`postId` varchar(36) not null primary key,
    `title` char(100) not null,
    `description` text null,
    `size` char(100) null,
    `materials` char(100) null,
    `year` int null,
    `filenames` text not null,
    `thumbnail` char(100) not null,
	`date` char(100) not null,
    `price` int null,
    `collector` char(50) null,
    `user_id` varchar(36) not null,
    `category_id` int not null,
    `views` int null
);

create table `bu_exhibition` (
	`exhibitionId` varchar(19) not null primary key,
    `title` char(100) not null,
	`engTitle` char(100) not null,
    `description` text not null,
    `solo` int not null,
	`year` char(20) not null,
	`start` char(20) not null,
	`end` char(20) not null,
	`location` char(200) not null,
	`city` char(200) not null,
    `prefaceTitle` text not null,
    `prefaceAuthor` text not null,
    `prefaceDescription` text not null,
    `etc` text not null,
    `filenames` text not null,
    `thumbnail` char(100) null
);
create table `bu_comments` (
	`commentId` varchar(19) not null primary key,
    `comment` text not null,
	`date` char(100) not null,
    `post_id` varchar(19) not null,
    `user_id` varchar(19) not null,
    `related` text null
);

create table `bu_guest` (
	`guestId` varchar(19) not null primary key,
	`message` text not null,
	`date` char(100) not null,
    `user_id` varchar(19) not null,
    `response` text null,
    `response_date` char(100) not null
);

drop table category;
drop table bu_users;

create table `users` (
	`userId` varchar(36) not null primary key,
    `email` varchar(100) not null,
    `password` varchar(100) not null,
    `phoneNumber` int not null
);

select * from `ls_category` order by date;
select * from `ls_posts` order by date;


create table `comments` (
	`cid` int not null auto_increment primary key,
    `comment` varchar(400) not null
);

create table `ls_users` (
	`userId` varchar(36) not null primary key,
    `username` varchar(100) not null,
    `password` varchar(100) not null
);

create table `ls_category` (
	`categoryId` varchar(36) not null primary key,
    `name` varchar(100) not null,
    `related` varchar(36) null,
    `userId` varchar(36) null,
    `date` varchar(100) not null
);

create table `ls_posts` (
	`postId` varchar(36) not null primary key,
    `title` varchar(100) not null,
    `description` text not null,
	`category_id` varchar(36) not null,
	`user_id` varchar(36) not null,
	`width` int null,
    `height` int null,
    `draw` text null,
    `filename` varchar(20) null,
    `date` varchar(100) not null
)