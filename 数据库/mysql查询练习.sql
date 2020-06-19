

-- 学生表
-- Student
-- 学号
-- 姓名
-- 性别
-- 出生年月
-- 所在班级
create table student(
    sno varchar(20) primary key,
    sname varchar(20) not null,
    ssex varchar(10) not null,
    sbirthday datetime,
    class varchar(20)
);

-- 教师表
-- Teacher
-- 教师编号
-- 教师名字
-- 教师性别
-- 出生年月
-- 职称
-- 所在部门
create table teacher(
    tno varchar(20) primary key,
    tname varchar(20) not null,
    tsex varchar(10) not null,
    tbirthday datetime,
    prof varchar(20),
    depart varchar(20) not null
);



-- 课程表
-- Course
-- 课程号
-- 课程名称
-- 教师编号
create table course(
    cno varchar(20) primary key,
    cname varchar(20) not null,
    tno varchar(20) not null,
    foreign key(tno) references teacher(tno)
);


-- 成绩表
-- Score
-- 学号
-- 课程号
-- 成绩
create table score(
    sno varchar(20) not null,
    cno varchar(20) not null,
    degree decimal,
    foreign key(sno) references student(sno),
    foreign key(cno) references course(cno),
    primary key(sno, cno)
);


-- 往数据表中添加数据
-- 添加学生表数据
insert into student values('101', '曾华', '男', '1977-09-10', '95033');
insert into student values('102', '匡明', '男', '1975-10-02', '95031');
insert into student values('103', '王丽', '女', '1976-01-23', '95033');
insert into student values('104', '李军', '男', '1992-09-10', '95033');
insert into student values('105', '王芳', '女', '1989-07-11', '95031');
insert into student values('106', '陆军', '男', '1980-03-12', '95031');
insert into student values('107', '汪峰', '男', '1992-09-10', '95033');
insert into student values('108', '李成', '女', '1989-07-11', '95031');
insert into student values('109', '程璐', '女', '1980-03-12', '95031');

-- 添加教师表数据
insert into teacher values('804', '张旭', '男', '1980-03-12', '副教授', '计算机系');
insert into teacher values('856', '李虎', '男', '1970-04-20', '讲师', '电子工程系');
insert into teacher values('825', '王萍', '女', '1960-09-19', '助教', '计算机系');
insert into teacher values('831', '刘冰', '女', '1980-03-11', '助教', '电子工程系');

-- 添加课程表
insert into course values('3-105', '计算机导论', '825');
insert into course values('3-245', '操作系统', '804');
insert into course values('6-166', '数字电路', '856');
insert into course values('9-888', '高等数学', '831');

-- 添加成绩表
insert into score values('103', '3-105', '100');
insert into score values('103', '3-245', '89');
insert into score values('103', '6-166', '73');
insert into score values('105', '3-105', '20');
insert into score values('104', '3-245', '66');
insert into score values('105', '6-166', '38');
insert into score values('106', '3-105', '88');
insert into score values('106', '3-245', '68');
insert into score values('109', '6-166', '70');


-- 查询练习：

-- 1、查询student表中的所有字段
select * from student;

-- 2、查询student表中的sname, ssex, class 字段
select sname,ssex,class from student;

-- 3、查询教师所有的单位，即不重复的depart列。（distinct关键字排重）
select distinct depart from teacher;

-- 4、查询score表中成绩在60到80之间的记录。（包括60-80）
-- 查询区间（between ... and ...）
select * from score where degree between 60 and 80;
-- 直接使用运算符进行比较
select * from score where degree >= 60 and degree <= 80;

-- 5、查询score表中成绩为68，88或100的成绩
-- 表示或者关系的查询 （in）
select * from score where degree in(68,88,100);

-- 6、查询student表中‘95031’班或性别为‘女’的同学记录
-- 表示或（or）
select * from student where class='95031' or ssex='女';


-- 7、以class降序查询student表中的所有记录。
-- 排序order by ， 升序（asc），降序（desc）
select * from student order by class desc;

-- 8、以cno 升序，degree降序查询score表中的所有记录
select * from score order by cno asc, degree desc;

-- 9、查询‘95031’班的学生人数
-- 统计（count(*)）
select count(*) from student where class='95031';

-- 10、查询score表中的最高分的学生号和课程号。（子查询或者排序）
-- 子查询做法（先查询最高分，在查询对应的学生号课程号）
select sno,cno from score where degree=(select max(degree) from score);

-- 排序做法（先排序，再取第一条）
select sno, cno from score order by degree desc limit 0,1;


-- 11、查询没门课的平均成绩
-- avg() 单组查询
select avg(degree) from score where cno='3-105';

-- 分组查询平均值
select cno, avg(degree) from score group by cno;

-- 12、查询score表中至少有2名学生选修的并以3开头的课程的平均分数
select cno,avg(degree),count(*) from score group by cno having count(cno)>=2 and cno like '3%';

-- 13、查询分数大于70，小于90的sno列
select sno,degree from score where degree>=70 and degree<=90;
select sno, degree from score where degree between 70 and 90;

-- 14、查询所有学生的 sname cno 和 degree（姓名，班级，分数）
-- 先找出字段从那些表获取，再设置筛选条件
-- 从两个表查询
select sname, cno, degree from student,score where student.sno = score.sno;
-- 从三个表查询
select sname, course.cno, degree from student, score, course where score.cno = course.cno and score.sno = student.sno;

-- 15、查询所有学生的sno、cname和degree列
select sno, cname, degree from course, score where score.cno = course.cno;

-- 16、查询所有学生的sname、cname和degree
select sname, cname, degree from student, course, score where score.sno = student.sno and score.cno = course.cno;
-- 使用as 取别名
select sname, cname, degree, student.sno as '学号', course.cno as '班级' from student, course, score where score.sno = student.sno and score.cno = course.cno;

-- 17、查询‘95031‘班学生每门课的平均数
-- 先找出分数表中95031班的学生
select * from score where sno in (select sno from student where class='95031');
-- 再分组计算平均数
select cno, avg(degree) 
from score where sno in (select sno from student where class='95031')
group by cno;

-- 18、查询选修’3-105‘课程的成绩高于’109‘号所有同学的记录
-- 先找出109号同学3-105课程的成绩
select * from score where sno='109' and cno = '3-105';
-- 再查询
select * from score where degree > (select degree from score where sno='109' and cno = '3-105') and cno='3-105';


-- 19、查询成绩高于学号为’109‘、课程号为‘3-105’的成绩的所有记录
select * from score where degree > (select degree from score where sno='109' and cno = '3-105');

-- 20、查询和学号为108、101的同学同年出生的所有学生的sno、sname、sbirthday。
-- 先找出108，101 同学的出生年份
select year(sbirthday) from student where sno in ('101','108');

select * from student where year(sbirthday) in (select year(sbirthday) from student where sno in ('101','108'));


-- 21、查询张旭老师任课的学生成绩
-- 先找出张旭老师的教师编号
select tno from teacher where tname = '张旭'
-- 再查询张旭老师教的课程编号
select cno from course where tno = (select tno from teacher where tname = '张旭')
-- 再查询成绩
select * from score where cno = (select cno from course where tno = (select tno from teacher where tname = '张旭'));

-- 22、查询选修某课程的同学人数多于3人的教师姓名
-- 先排序
select cno from score group by cno
-- 再筛选大于3的课程
select cno from score group by cno having count(*) > 3;
-- 再从课程表里找出 教师编号
select tno from course where cno in (select cno from score group by cno having count(*) > 3);
-- 之后再从教会表中找出教师名
select * from teacher where tno in (select tno from course where cno in (select cno from score group by cno having count(*) > 3));


-- 23、查询 95033 和 95031 班的学生
select * from student where class in ('95033','95031');

-- 24、查询存在有85分以上成绩的课程cno
select distinct cno from score where degree >= 85;

-- 25、查询出‘计算机系’教师所教课程的成绩表
select tno from teacher where depart = '计算机系';
select cno from course where tno in (select tno from teacher where depart = '计算机系');
select * from score where cno in (select cno from course where tno in (select tno from teacher where depart = '计算机系'));

-- 26、查询‘计算机系’ 与 ‘电子工程系’ 不同职称的教师的 tname 和 prof
select prof from teacher where depart='电子工程系'
select * from teacher where depart='计算机系' and prof not in(select prof from teacher where depart='电子工程系')
union
select * from teacher where depart='电子工程系' and prof not in (select prof from teacher where depart='计算机系');
