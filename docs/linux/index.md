---
title: Linux
date: 2019-06-25
tags: [linux]
categories: [后端]
---
# Linux
## service [xxx] [command]
```
service network restart   //重启网卡

/etc/init.d/network restart  //上面的命令实际上是调用此脚本进行操作
```

<!--more-->

---

## 网络相关系统配置
```
cd /etc/systemconfig/network-scripts   //网络相关系统配置
vi ifconfig-xxx

修改为=> ONBOOT     随开机启动
```

---

## yum更新
```
yum update      //更新软件+系统内核
yum upgrade     //只更新软件
yum install wget

wget http://xxxxxxxxxxxxxxxxxxx

//清除缓存后更新
yum clean all
yum makecache

yum install net-tools -y
```

---
## 过滤文本
```
find / |grep xxx
```

---

## mariadb
```
1.安装
yum install mariadb-server -y 
mysql_install_db

2.配置
cp /usr/share/mysql/my-xxx.config /etc/my.cnf

3.实验启动
mysqld safe

4.正式启动
service mariadb start

5.加密码
mysqladmin -u [用户名] password

6.权限（外部访问）
grant all privileges on '*.*' to root@'%' identified by 'thisispassword' 
```
-------------------------------
codewars