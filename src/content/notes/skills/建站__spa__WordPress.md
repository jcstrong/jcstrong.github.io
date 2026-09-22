---
title: "WordPress"
category: skills
tags: ["建站", "Web"]
featured: false
source: "建站/spa/WordPress.md"
updated: 2025-11-14
readingTime: 7
summary: "以下是在 CentOS 8.2 上从零开始搭建 WordPress 的完整流程。建议全程使用 root 权限或在命令前加上 sudo。  环境准备  更新系统      dnf update y     替换源      mv /etc/y..."
---
以下是在 CentOS 8.2 上从零开始搭建 WordPress 的完整流程。建议全程使用 root 权限或在命令前加上 `sudo`。

---

## 环境准备

- **更新系统**

  ```
  dnf update -y
  ```

- 替换源

  ```
  mv /etc/yum.repos.d /etc/yum.repos.d_backup
  mkdir /etc/yum.repos.d
  
  wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo
  ```
- **安装常用工具**

  ```
  dnf install -y wget curl tar unzip policycoreutils-python-utils
  ```

---

## LAMP 组件安装

1. **Apache (httpd)**

   ```
   dnf install -y httpd
   systemctl enable --now httpd
   systemctl start firewalld
   firewall-cmd --permanent --add-service=http
   firewall-cmd --permanent --add-service=https
   firewall-cmd --reload
   ```

2. **MariaDB**

   ```
   dnf install -y mariadb-server
   systemctl enable --now mariadb
   mysql_secure_installation // 初始状态无密码，回车设置密码
   ```

   按提示设置 root 密码、移除匿名用户、禁用远程 root 登录、删除测试库等。

3. **PHP 与扩展**

   CentOS 8 默认模块较旧，可启用 `AppStream` 中较新的版本，例如 PHP 7.4（`stream` 需根据实际可用情况调整）：

   ```
   dnf module reset php
   dnf module enable php:7.4
   dnf install -y php php-cli php-fpm php-mysqlnd php-xml php-json php-gd php-curl php-mbstring php-zip php-opcache
   ```

   重新加载 Apache：

   ```
   systemctl restart httpd
   ```

---

## 创建 WordPress 数据库

进入 MariaDB：

```
mysql -u root -p
```

执行以下 SQL（根据需求修改名称和密码）：

```
CREATE DATABASE wordpress DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wpsususpa'@'localhost' IDENTIFIED BY 'Azjzqz1995';
GRANT ALL PRIVILEGES ON wordpress.* TO 'wpsususpa'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 下载与部署 WordPress

1. **下载最新版 WordPress**

   ```
   cd /tmp
   wget https://wordpress.org/latest.tar.gz
   tar -xzvf latest.tar.gz
   ```

2. **复制到 Web 目录**

   ```
   rsync -avP /tmp/wordpress/ /var/www/html/
   ```

3. **创建上传目录并设置权限**

   ```
   mkdir -p /var/www/html/wp-content/uploads
   chown -R apache:apache /var/www/html
   find /var/www/html -type d -exec chmod 750 {} \;
   find /var/www/html -type f -exec chmod 640 {} \;
   ```

---

## 配置 WordPress

1. **生成配置文件**

   ```
   cd /var/www/html
   cp wp-config-sample.php wp-config.php
   ```

2. **编辑 `wp-config.php`**

   ```
   nano wp-config.php
   ```

   设置数据库信息：

   ```
   define( 'DB_NAME', 'wordpress' );
   define( 'DB_USER', 'wpsususpa' );
   define( 'DB_PASSWORD', 'Azjzqz1995' );
   define( 'DB_HOST', 'localhost' );
   define( 'DB_CHARSET', 'utf8mb4' );
   define( 'DB_COLLATE', '' );
   ```

   为安全起见，访问 https://api.wordpress.org/secret-key/1.1/salt/ 生成并替换密钥部分。

---

## SELinux 与防火墙（若启用）

- **SELinux 上下文**

  ```
  semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/html(/.*)?"
  restorecon -Rv /var/www/html
  ```

- 如果 WordPress 需要将文件写入特定目录（如上传、更新），权限已在之前设置。

---

## ❌HTTPS（可选但推荐）

- **安装 Certbot**

  ```
  dnf install -y certbot python3-certbot-apache
  ```

- **获取证书**

  ```
  certbot --apache
  ```

  按向导完成域名验证并自动配置 HTTPS，之后 Certbot 会添加自动续期任务。

---

## 完成安装向导

在浏览器访问服务器 IP 或域名：

```
http://8.222.160.146/wp-admin/setup-config.php
```

按照页面提示选择语言、站点标题、管理员账号等即可完成 WordPress 安装。

---

## 后续建议

- 立即登录后台设置固定链接、时区、管理员邮箱。
- 安装必要插件（缓存、安全、备份等）。
- 定期更新内核、Apache、PHP、WordPress 核心与插件。
- 规划自动备份策略（数据库 + `wp-content` 目录）。

如有特殊需求（多站点、Nginx、Docker 部署等）可以继续提问。祝顺利上线！









---

## 故障排除

访问 `http://8.222.160.146/test.php` 返回 "Access denied"
      ```bash
      echo "<?php phpinfo(); ?>" > /var/www/html/test.php
      chown apache:apache /var/www/html/test.php
      chmod 644 /var/www/html/test.php
      ```

访问 install.php 显示空白页面


#### 2. 检查 SELinux 状态（最可能的原因）

```bash
# 查看 SELinux 状态
getenforce

# 如果返回 Enforcing，需要设置 SELinux 允许 PHP 执行
setsebool -P httpd_can_network_connect_db 1
setsebool -P httpd_unified 1

# 设置正确的 SELinux 上下文（如果之前没执行）
semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/html(/.*)?"
restorecon -Rv /var/www/html

# 允许 httpd 执行 PHP
setsebool -P httpd_execmem 1
```

#### 3. 检查 PHP 错误日志

```bash
# 查看 PHP 错误日志
tail -f /var/log/php-fpm/error.log
# 或
tail -f /var/log/httpd/error_log

# 查看 Apache 错误日志
tail -f /var/log/httpd/error_log
```

#### 4. 检查 wp-config.php 配置

```bash
# 验证 wp-config.php 语法
php -l /var/www/html/wp-config.php
               
# 检查文件内容是否正确
cat /var/www/html/wp-config.php | grep -E "DB_NAME|DB_USER|DB_PASSWORD|DB_HOST"

define( 'DB_NAME', 'wordpress' );
define( 'DB_USER', 'wpsususpa' );
define( 'DB_PASSWORD', 'Azjzqz1995' );
define( 'DB_HOST', 'localhost' );
```

**常见问题：**
- 确保 `wp-config.php` 中没有 BOM（字节顺序标记）
- 确保所有引号都是英文引号
- 确保没有多余的空格或换行在 `<?php` 标签之前

#### 5. 临时启用 PHP 错误显示（用于调试）

编辑 `wp-config.php`，在文件开头添加：

```php
<?php
define('WP_DEBUG', true);
define('WP_DEBUG_DISPLAY', true);
define('WP_DEBUG_LOG', true);
@ini_set('display_errors', 1);
```

**注意：** 调试完成后记得删除或注释这些行。

#### 6. 检查文件权限（重新设置）

```bash
# 重新设置权限
chown -R apache:apache /var/www/html
find /var/www/html -type d -exec chmod 755 {} \;
find /var/www/html -type f -exec chmod 644 {} \;

# wp-config.php 需要特殊权限
chmod 600 /var/www/html/wp-config.php
```

#### 7. 检查 Apache 是否加载 PHP 模块

```bash
# 检查 PHP 模块是否加载
httpd -M | grep php

# 如果没有输出，需要安装并启用
dnf install -y php
systemctl restart httpd
```

#### 8. 验证数据库连接

```bash
# 测试数据库连接
mysql -u wpsususpa -p'Azjzqz1995' -h localhost wordpress -e "SELECT 1;"
```

如果连接失败，检查：
- 数据库用户是否存在
- 密码是否正确
- 用户是否有权限

#### 9. 如果 wp-config.php 已存在但想重新配置

```bash
# 备份现有配置
cp /var/www/html/wp-config.php /var/www/html/wp-config.php.backup

# 删除现有配置，让 WordPress 重新生成
rm /var/www/html/wp-config.php

# 然后访问 http://8.222.160.146/wp-admin/setup-config.php
```

#### 10. 完整诊断命令（一次性执行）

```bash
# 1. 检查服务状态
systemctl status httpd
systemctl status mariadb
systemctl status php-fpm  # 如果安装了 php-fpm

# 2. 检查 SELinux
getenforce
sestatus

# 3. 检查 PHP 版本
php -v

# 4. 检查 Apache 配置
httpd -t

# 5. 查看最新错误
tail -20 /var/log/httpd/error_log
tail -20 /var/log/php-fpm/error.log  # 如果存在

# 6. 测试 PHP 执行
echo "<?php echo 'PHP works'; ?>" > /var/www/html/test.php
chown apache:apache /var/www/html/test.php
# 然后访问 http://8.222.160.146/test.php
```

**推荐解决顺序：**
1. 先执行步骤 2（SELinux 配置）- **这是最可能的原因**
2. 执行步骤 6（重新设置权限）
3. 执行步骤 7（检查 PHP 模块）
4. 查看步骤 3 的错误日志
5. 如果仍不行，执行步骤 9（重新生成 wp-config.php）

---

[如何安装WordPress](https://developer.wordpress.org/advanced-administration/before-install/howto-install/)







坑

链接有中文找不到网页

Safari打不开ip网址

#### 安装预约插件

伪静态

1. Apache 无法启动 - 修复了 PHP 模块与 event MPM 的冲突

1. URL 重写不工作 - 将 AllowOverride 从 None 改为 All，使 .htaccess 生效

```
vim /var/www/html/.htaccess

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
```

修改PHP限制

时间限制改为600、内存限制改为256最大输入时间改为600早上穿最大文件限制改为50，php最大post大小改为256

```bash
ssh root@8.222.160.146 "sed -i 's/^max_execution_time = .*/max_execution_time = 600/' /etc/php.ini && sed -i 's/^memory_limit = .*/memory_limit = 256M/' /etc/php.ini && sed -i 's/^max_input_time = .*/max_input_time = 600/' /etc/php.ini && sed -i 's/^upload_max_filesize = .*/upload_max_filesize = 50M/' /etc/php.ini && sed -i 's/^post_max_size = .*/post_max_size = 256M/' /etc/php.ini"
重启
ssh root@8.222.160.146 "systemctl restart php-fpm && systemctl status php-fpm | head -15"
备份文件：/etc/php.ini.backup.20251114_225421
max_execution_time = 600（原值：30）
memory_limit = 256M（原值：128M）
max_input_time = 600（原值：60）
upload_max_filesize = 50M（原值：2M）
post_max_size = 256M（原值：8M）
```

