
-- 数据库的三大设计范式

-- 1. 第一范式
-- 1NF
-- 数据表中的所有字段都是不可分割的原子值

create table student2(
    id int primary key,
    name varchar(20),
    address varchar(30)
);

insert into student2 values(1,'张三', '中国四川省成都市武侯区大道100号');
insert into student2 values(2,'李四', '中国四川省成都市武侯区大道200号');
insert into student2 values(3,'王五', '中国四川省成都市武侯区大道300号');

-- 像上面的设计 address 的字段值（中国四川省成都市xxx）还可以继续拆分的就不满足第一范式，正确设计如下


create table student3(
    id int primary key,
    name varchar(20),
    country varchar(30),
    privence varchar(30),
    city varchar(30),
    details varchar(30)
);

insert into student3 values(1,'张三', '中国','四川省','成都市','武侯区大道100号');
insert into student3 values(2,'李四', '中国','四川省','成都市','武侯区大道200号');
insert into student3 values(3,'王五', '中国','四川省','成都市','武侯区大道300号');

select * from student3;
+----+--------+---------+-----------+-----------+-----------------------+
| id | name   | country | privence  | city      | details               |
+----+--------+---------+-----------+-----------+-----------------------+
|  1 | 张三   | 中国    | 四川省    | 成都市    | 武侯区大道100号       |
|  2 | 李四   | 中国    | 四川省    | 成都市    | 武侯区大道200号       |
|  3 | 王五   | 中国    | 四川省    | 成都市    | 武侯区大道300号       |
+----+--------+---------+-----------+-----------+-----------------------+




-- 2. 第二范式
-- 前提，必须是满足第一范式的前提下，第二范式要求，除主键外的每一列必须完全依赖于主键。

-- 订单表
create table myorder(
    product_id int,
    customer_id int,
    product_name varchar(20),
    customer_name varchar(20),
    primary key(product_id, customer_id)
);

-- 像上面的设计，除主键意外的其他列，只依赖于主键的部分字段，正确的设计如下

-- 拆表
create table myorder(
    order_id int primary key,
    product_id int,
    customer_id
);

create table product(
    id int primary key,
    name varchar(20)
);

create table customer(
    id int primary key,
    name varchar(20)
);

-- 分成三个表之后就满足第二范式

-- 3. 第三范式 3NF
必须先满足第二范式，除开主键列的其他列之间不能有传递依赖行为
create table myorder(
    order_id int primary key,
    product_id int,
    customer_id int,
    customer_phone varchar(15)
);

-- 上面这个表的 customer_phone 应该放到 customer 表中才满足第三范式
