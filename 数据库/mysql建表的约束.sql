

-- 主键约束
它能够唯一确定一张表中的一条记录，也就是我们通过给某个字段添加约束，就可以使得该字段不重复且不为空。

create table user(
    id int primary key,
    name varchar(20)
)

-- 联合主键
只要联合的主键的值加起来不重复就可以
create table user2(
    id int,
    name varchar(20),
    password varchar(20),
    primary key(id,name)
);

-- 自增约束
与主键约束结合一起使用，键值自动增加
create table user3(
    id int primary key auto_increment,
    name varchar(20)
);

insert into user3 (name) values('张三');

-- 动态创建主键约束
create table user4(
    id int,
    name varchar(20)
);

alter table user4 add primary key (id);

-- 删除主键约束
alter table user4 drop primary key;

-- 修改主键约束
alter table user4 modify id int primary key;

-- 唯一约束
约束的字段值不可以重复
create table user5(
    id int, 
    name varchar(20)
);
alter table user5 add unique(name);

create table user5(
    id int,
    name varchar(20) unique
)

-- unique(name, id) 表示name id 加起来不为重复就行
create table user5(
    id int, 
    name varchar(20),
    unique(name, id)
);

create table user6(
    id int unique,
    name varchar(20) unique
);

-- 删除唯一约束
alter table user6 drop index name;

-- modify 添加唯一约束
alter table user6 modify name varchar(20) unique;


-- 非空约束
修饰的字段值不能为空 NULL
create table user7(
    id int, 
    name varchar(20) not null
);

-- 默认约束
当我们插入字段值的时候，如果没有传值，就会使用默认值
create table user8(
    id int, 
    name varchar(20),
    age int default 10
);


-- 外键约束
涉及到两个表，一个父表，一个子表
主表，副表
1. 主表classes中没有的数据，在副表（子表）中，是不可以使用的
2. 主表中记录被副表引用的，若副表已有关联数据，则无法删除
-- 班级 主表
create table classes(
    id int primary key,
    name varchar(20)
);

-- 学生表 副表
create table students(
    id int primary key,
    name varchar(20),
    class_id int,
    foreign key(class_id) references classes(id)
);

insert into classes values(1,'一班');
insert into classes values(2,'二班');
insert into classes values(3,'三班');
insert into classes values(4,'四班');

insert into students values(1001,'张三', 1);
insert into students values(1002,'张三', 2);
insert into students values(1003,'张三', 3);
insert into students values(1004,'张三', 4);
-- 主表classes中没有的数据，在副表（子表）中，是不可以使用的
insert into students values(100,'李四', 5);
ERROR 1062 (23000): Duplicate entry '1004' for key 'students.PRIMARY'

-- 主表中记录被副表引用的，若副表已有关联数据，则无法删除
delete from classes where id=4;
ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails (`test`.`students`, CONSTRAINT `students_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`))

-- 副表没有关联数据，删除成功
insert into classes values(5,'5班');
delete from classes where id=5;
Query OK, 1 row affected (0.01 sec)

-- 总结：
1. 建表的时候添加约束
2. 可以使用 alter xxx add xxx
3. alter xxx modify xxx
4. 删除 alter xxx drop xxx