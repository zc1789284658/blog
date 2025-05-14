# Git

## Recommend Sites
[Progit](https://www.progit.cn/)

## fatal: unable to access 'xxxxx': Empty reply from server

> 连接过ssr后，push不上去

> 本来已经启用了shadowsocks开启了代理，能够正常服务github的网站。但是在使用git工具时，git clone时却一直出现这个报错，即使shadowsocks开全局模式也不行。原因是这个git客户端访问github没有走ss的代理。

> 解决办法，在开启shadowsocks的前提下，手动配置git的代理。git客户端输入如下两个命令就可以了。

```bash
$ git config --global http.proxy http://127.0.0.1:1080
$ git config --global https.proxy http://127.0.0.1:1080
```

## 取消代理
```bash
$ git config --global --unset http.proxy 
$ git config --global --unset https.proxy 
```

## 关闭ssl认证
```bash
$ git config http.sslVerify "false"
```

## 设置记住密码
```bash
#默认15分钟
$ git config --global credential.helper 
#手动设置超时时间
$ git config credential.helper 'cache --timeout=3600'
#长期记住密码
$ git config --global credential.helper store
```

## git全局用户设置
```bash
$ git config --global user.name  xxxxx
$ git config --global user.email xxxxxxxx
```

## git当前用户设置
```bash
$ git config --local user.name  xxxxx
$ git config --local user.email xxxxxxxx
```

## ssh测试链接是否正常
```bash
$ ssh -T git@github.com
$ ssh -T git@gitlab.com
```

## git多ssh管理

### 1.ssh-keygen 创建新ssh
```bash
$ ssh-keygen
```

### 2.本地链接新仓库host信息
```bash
$ git remote show origin
```

### 3.在.ssh/目录下添加config配置各网址所使用的ssh-key

#### 3.1 .ssh目录
```bash
# windows:
$ cd C:\Users\xxx\.ssh
# linux:
$ cd ~/.ssh
```

#### 3.2 (可跳过)生成的ssh通过ssh-add添加(临时添加/永久添加需要脚本协助)

```bash
$ ssh-agent
# if windows , use Administrator account to excuse POWERSHELL,and excute `Set-Service -Name ssh-agent -StartupType automatic`,then excute `ssh-agent`
$ ssh-add C:\Users\EDZ\.ssh\id_rsa
$ ssh-add C:\Users\EDZ\.ssh\id_rsa_github
```

#### 3.2 创建config
```bash
$ touch config
$ vi config
```

#### 3.3 添加配置
```bash
#  /.ssh/config
# host最好配域名，否则可能找不到对应的ssh-key
$ Host gitlab.com
$ HostName gitlab.com
$ IdentityFile C:\Users\EDZ\.ssh\id_rsa_gitlab
    
$ Host github.com
$ HostName github.com
$ IdentityFile C:\Users\EDZ\.ssh\id_rsa_github
```

## HTTP/2 stream 1 was not closed cleanly before end of the underlying stream

```bash
$ git config --global http.version HTTP/1.1
```

## git sensative

默认`git`对大小写不敏感（有文件名字大小写改变时，不会提交），需要手动处理

### 方案1: `git mv`

```bash
$ git mv -f '.\docs\js\Blob&Url.md' '.\docs\js\blob&Url.md'
```

### 方案2: `git config core.ignorecase false`

```bash
$ git config core.ignorecase false
```


## Failed to connect to github.com port 443 after 21107 ms: Couldn't connect to server

- 首先查看`hosts`文件(window下 `C:\Windows\System32\drivers\etc\hosts`)文件是否有被修改
- 还不行修改git config，关闭sslVerify，设置http 1.1