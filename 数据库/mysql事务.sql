-- mysql 事务

-- mysql 中， 事务其实是一个最小的不可分割的工作单元，事务能够保证一个业务的完整性。

-- 比如我们的银行转账：
-- a -> -100
-- update user set money = money - 100 where name = 'a';
-- b <- +100
-- update user set money = money + 100 where name = 'b';
-- 实际过程中，如果只有一条执行成功，另外一条没有执行成功，就会出现数据前后不一致。
-- 多条sql 语句， 可能会有同时完成成功的要求， 要么就同时失败

-- mysql 中如如何控制事务
-- 1. mysql 默认是开启事务的（自动提交）

-- 默认开启的作用是，当我们去执行一个sql语句的时候，效果会立即提现出来，且不能回滚。
select @@autocommit
create database bank;
create table user(
    id int primary key,
    name varchar(20),
    money int
);

insert into user values(1,'a',1000);

-- 事务回滚： 撤销 sql 语句执行效果
rollback;
select * from user;

-- 设置mysql 自动提交为false，即可以执行 rollback
set autocommit = 0;
insert into user values(2,'b',200);
rollback;

-- 执行了 commit 无法 rollback
insert into user values(2,'b',200);
commit;
rollback;


-- 自动提交 @@autocommit = 1

-- 手动提交 commit

-- 事务回滚 rollback

-- 提交之后无法回滚


-- begin 或者 start transaction 都可以帮我们手动开启一个事务， 事务commit 之后无法 rollback
begin;
update user set money = money - 100 where name = 'a';
update user set money = money + 100 where name = 'b';
commit;


-- 事务的一些特征:
-- A 原子性：事务是最小的单位，不可以分割。
-- C 一致性：事务要求，同一事务中的sql 语句，必须保证同时成功或者同时失败。
-- I 隔离性：事务a 和 事务 b 之间是具有隔离性的。
-- D 持久性：事务一旦结束（commit之后无法rollback），就不可以返回。


-- 事务开启的三种方式：
-- 1. 修改默认提交 set autocommit = 0;
-- 2. begin;
-- 3. start transaction;

-- 事务手动提交：
-- commit;

-- 事务手动回滚：
-- rollback;

-- 事务的隔离性
-- 1. read uncommitted;     可读未提交
-- 2. read committed;       可读已提交
-- 3. repeatable read;      可以重复读
-- 4. serializable;         串行化

-- 1.  read uncommitted;
-- 如果事务a 和事务b， 事务a对数据进行操作，在操作过程中，事务没有被提交，但是b可以看见a操作的结果。
insert into user values(3, '小明', 1000);
insert into user values(4, '淘宝店', 1000);

--  如何查看数据库的隔离级别？
-- mysql 8.0
-- 系统级别的
select @@global.transaction_isolation;
-- 回话级别的
select @@transaction_isolation;
+--------------------------------+
| @@global.transaction_isolation |
+--------------------------------+
| REPEATABLE-READ                |
+--------------------------------+

-- mysql 5.x;
select @@global.tx_isolation;
select @@tx_isolation;

-- 如何修改隔离级别？
set global transaction isolation level read uncommitted;
set transaction isolation level read committed;

-- 转账：小明在淘宝店买鞋子：800块钱
-- 小明 -> 成都ATM
-- 淘宝 -> 广州 ATM
start transaction;
update user set money = money - 800 where name = '小明';
update user set money = money + 800 where name = '淘宝店';

+----+-----------+-------+
| id | name      | money |
+----+-----------+-------+
|  1 | a         |   900 |
|  2 | b         |   300 |
|  3 | 小明      |   200 |
|  4 | 淘宝店    |  1800 |
+----+-----------+-------+

-- 发货
-- 淘宝老板晚上请女朋友吃好的
-- 1800
rollback;
+----+-----------+-------+
| id | name      | money |
+----+-----------+-------+
|  1 | a         |   900 |
|  2 | b         |   300 |
|  3 | 小明      |  1000 |
|  4 | 淘宝店    |  1000 |
+----+-----------+-------+

-- 如果两个不同的地方，都在进行操作，如果事务a 开启之后，他的数据可以被其他事务读取到。
-- 这样就会出现（脏读）
-- 脏读：一个事务读到了另外一个事务的数据。


-- 2. read committed; 读已提交的
set global transaction isolation level read committed;
select @@global.transaction_isolation;
+--------------------------------+
| @@global.transaction_isolation |
+--------------------------------+
| READ-COMMITTED                 |
+--------------------------------+

start transaction;
insert into user values(5, 'c', 100);
commit;


select avg(money) from user;

-- 虽然我只能读到另外一个事务提交的数据，但还是会出现问题，就是读取同一个表的数据，发现前后不一致，
-- 不可重复读现象：read committed;

-- 3. repeatable read;  可以重复读
set global transaction isolation level repeatable read;
select @@global.transaction_isolation;

-- 事务a 和事务b 同时操作一张表，事务a 提交的数据，也不能被事务b 读到，就会造成幻读


-- 4. serializable： 串行化
set global transaction isolation level serializable;
select @@global.transaction_isolation;

+--------------------------------+
| @@global.transaction_isolation |
+--------------------------------+
| SERIALIZABLE                   |
+--------------------------------+

-- 当user 表被另外一个事务操作的时候，其他的事务里面的写入操作，是不可以进行的，
-- 进入排队状态（串行队列），直到另外一个事务结束之后，写入操作才会执行
-- 在没有等待超时的情况下。
-- 串行化问题是，性能特差
READ-UNCOMMITTED > READ-COMMITTED > REPEATABLE-READ > SERIALIZABLE