
-- sql 的四种连接查询

-- 内连接
-- inner join 或者 join

-- 外连接
-- 1. 左连接 left join 或者 left outer join
-- 2. 右连接 right join 或者 right outer join
-- 3. 完全外连接 full join 或者 full outer join


-- 创建两个表：
-- person 表
-- id
-- name
-- cardId

create table person(
    id int,
    name varchar(20),
    cardId int
);

-- card 表
-- id
-- name
create table card(
    id int,
    name varchar(20)
);

insert into card values(1,'饭卡'), (2,'建行卡'),(3,'农行卡'),(4,'工行卡'),(5,'邮政卡');

insert into person values(1, '张三', 1),(2, '李四', 3),(3, '王五', 6);

-- 并没有创建外键

-- 1. inner join 查询
select * from person inner join card on person.cardId = card.id;
select * from person join card on person.cardId = card.id;
+------+--------+--------+------+-----------+
| id   | name   | cardId | id   | name      |
+------+--------+--------+------+-----------+
|    1 | 张三   |      1 |    1 | 饭卡      |
|    2 | 李四   |      3 |    3 | 农行卡    |
+------+--------+--------+------+-----------+

-- 内联查询，其实就是两张表中的数据，通过某个字段相对，查询相关记录的数据


-- 2. left join (左外链接)
select * from person left join card on person.cardId = card.id;
select * from person left outer join card on person.cardId = card.id;
+------+--------+--------+------+-----------+
| id   | name   | cardId | id   | name      |
+------+--------+--------+------+-----------+
|    1 | 张三   |      1 |    1 | 饭卡      |
|    2 | 李四   |      3 |    3 | 农行卡    |
|    3 | 王五   |      6 | NULL | NULL      |
+------+--------+--------+------+-----------+

-- 左外链接，会把左边表连的所有数据提取出来，而右边表中的数据，如果有相等的，就显示出来，没有就会补上 NULL

-- 3. right join(右外连接)
select * from person right join card on person.cardId = card.id;
select * from person right outer join card on person.cardId = card.id;
+------+--------+--------+------+-----------+
| id   | name   | cardId | id   | name      |
+------+--------+--------+------+-----------+
|    1 | 张三   |      1 |    1 | 饭卡      |
| NULL | NULL   |   NULL |    2 | 建行卡    |
|    2 | 李四   |      3 |    3 | 农行卡    |
| NULL | NULL   |   NULL |    4 | 工行卡    |
| NULL | NULL   |   NULL |    5 | 邮政卡    |
+------+--------+--------+------+-----------+
-- 右外链接，会把右边表连的所有数据提取出来，而左边表中的数据，如果有相等的，就显示出来，没有就会补上 NULL

-- 4. full join(全外连接)
select * from person full join card on person.cardId = card.id;

-- mysql 不支持full join
select * from person left join card on person.cardId = card.id
union
select * from person right join card on person.cardId = card.id;
+------+--------+--------+------+-----------+
| id   | name   | cardId | id   | name      |
+------+--------+--------+------+-----------+
|    1 | 张三   |      1 |    1 | 饭卡      |
|    2 | 李四   |      3 |    3 | 农行卡    |
|    3 | 王五   |      6 | NULL | NULL      |
| NULL | NULL   |   NULL |    2 | 建行卡    |
| NULL | NULL   |   NULL |    4 | 工行卡    |
| NULL | NULL   |   NULL |    5 | 邮政卡    |
+------+--------+--------+------+-----------+




