---
title: "pygame"
category: skills
folderPath: "Python/Python工具"
folderTop: "Python"
tags: ["Python", "工具"]
featured: false
source: "Python/Python工具/pygame.md"
updated: "2022-07-05"
readingTime: 6
summary: "Pygame模块总览 toc 控制设备https://www.jianshu.com/p/a3cb64df65d7 | 作用      |                                | |  |  | | cdrom  ..."
---
# Pygame模块总览
[[toc]]
[控制设备](https://www.jianshu.com/p/a3cb64df65d7)

| 作用      |                                |
| --------- | ------------------------------ |
| cdrom     | 管理cdrom设备和音频播放        |
| cursors   | 加载光标图像，包括标准光标     |
| display   | 控制显示窗口或屏幕             |
| draw      | 在surface上画简单形状          |
| surface   | 管理图像屏幕                   |
| event     | 管理事件和事件队列             |
| font      | 创建并呈现Truetype字体         |
| image     | 保存和加载图像                 |
| spirit    | 操作移动图象                   |
| joystick  | 管理控制杆装置                 |
| key       | 管理键盘                       |
| mouse     | 管理鼠标                       |
| movie     | mpeg电影播放                   |
| sndarray  | 数字处理声音                   |
| surfarray | 数字处理图像，管理点阵图像数据 |
| time      | 控制时间、帧                   |
| transform | 缩放、旋转和翻转图像           |
| music     | 播放音乐                       |
| transform | 缩放移动图像                   |
| overlay   | 高级视频叠加                   |
| rect      | 管理矩形区域                   |
| mixer     | 声音                           |





##   界面相关

###   display

pygame.display.set_mode():屏幕的设置，返回一个 Surface 对象，代表了桌面上出 现的窗口，第一个参数为分辨率
pygame.display.set_caption():标题的设置，即界面的顶部标题
pygame.display.update():界面的刷新，更新界面的显示

##   图像相关

bg = pygame.image.load("./images/background.png"):图片的加载，参数为图片的地址(绝对地址或相对地址，如果与源文件在同一文件下可以只有名字)，返回一个 surface 对象
bg_rect = bg.get_rect():返回一个覆盖整个图像的矩形，即 Rect 对象

screen.blit(bg, (0, 0)):图像的绘制，第一个参数为 Surface 对象即图像，第二个参数即图像左上角顶点的坐标。Pygame 中的坐标系以界面坐上角顶点为原点，以像素为单位

###   Rect对象

[Rect 是用于存储矩形坐标的 Pygame 对象](https://blog.csdn.net/qq_41556318/article/details/86304872)

常用属性:
 x,y,
top, left, bottom, right, topleft, bottomleft, topright, bottomright midtop, midleft, midbottom, midright center, centerx, centery, size, width, height,
w,h

常用方法
 pygame.Rect.copy - 复制矩形
 pygame.Rect.move - 移动矩形
 pygame.Rect.collidepoint - 测试一个点是否在矩形内
 pygame.Rect.colliderect - 测试两个矩形是否重叠
 pygame.Rect.collidelist - 测试列表中的一个矩形是否相交
 pygame.Rect.collidelistall - 测试列表中的所有矩形是否相交 
 pygame.Rect.collidedict - 测试字典中的一个矩形是否相交
 pygame.Rect.collidedictall - 测试字典中的所有矩形是否相交

其中 move 方法与下文中的 blit 方法配合常用于控制图像移动，collidepoint 方法可与pygame.mouse.get_pos()取鼠标指针坐标函数配合实现按钮的效果，colliderect 方法常用于检查两个图像是否碰撞

##   事件相关

Pygame 会接受用户的各种操作(比如按键盘，移动鼠标等)产生事件。事件随时可能 发生，而且量也可能会很大，Pygame 的做法是把一系列的事件存放一个队列里，逐个的处理

###   event

pygame.event.get():返回游戏系统的事件队列 常用的事件集:

| 事件                      | 产生途径                                             | 参数                         |
| ------------------------- | ---------------------------------------------------- | ---------------------------- |
| QUIT                      | 用户按下关闭按钮                                     | none                         |
| ATIVEEVENT                | Pygame被激活或者隐藏                                 | gain, state                  |
| KEYDOWN                   | 键盘被按下                                           | unicode, key, mod            |
| KEYUP                     | 键盘被放开                                           | key, mod                     |
| MOUSEMOTION               | 鼠标移动                                             | pos, rel, buttons            |
| MOUSEBUTTONDOWN           | ******鼠标按下******                                 | ******pos, button******      |
| ******MOUSEBUTTONUP****** | ******鼠标放开******                                 | ******pos, button******      |
| ******JOYAXISMOTION****** | ******游戏手柄（Joystick or pad）移动******          | ******joy, axis, value****** |
| ******JOYBALLMOTION****** | ******游戏球（Joy ball）移动******                   | ******joy, axis, value****** |
| ******JOYHATMOTION******  | ******游戏手柄（Joystick）移动******                 | ******joy, axis, value****** |
| ******JOYBUTTONDOWN****** | ******游戏手柄按下******                             | ****joy, button******        |
| ******JOYBUTTONUP******   | ******游戏手柄放开******                             | ******joy, button******      |
| ******VIDEORESIZE******   | ************Pygame******窗口缩放******               | ******size, w, h******       |
| ******VIDEOEXPOSE******   | ******Pygame窗口部分公开******（expose）************ | ******none******             |
| ******USEREVENT******     | ******触发了一个用户事件******                       | ******code******             |

[python事件](https://www.cnblogs.com/liming19680104/p/13023617.html)

##   时钟控制相关

clock = pygame.time.Clock():创建一个时钟对象 
clock.tick(500):指定游戏系统的运行帧率，控制游戏的运行速度，clock 为一个时钟对象，参数为指定帧率

##   字体和文字相关

Pygame 中的文字显示需要用到 font 字体类。Pygame 可以直接调用系统字体，或者也可 以使用 TTF 字体

系统字体调用:	`my_font = pygame.font.SysFont("arial", 16)`
第一个参数是字体名，第二个是大小。该函数返回一个系统字体，这个字体与“bold”和 “italic”两个 flag 相匹配。如果找不到，就会使用 pygame 的默认字体。可以使用 **pygame.font.get_fonts()**来获得当前系统所有可用字体。

ttf/ttc 字体文件调用:	`my_font = pygame.font.Font("simsun.ttf", 16)`
使用这个方法,需要把字体文件随同游戏一起发送, 这样可以避免使用者机器上没有所需的字体

字体的使用，即文字显示:`render(text antialias, color, background=None)``
``text_surface = my_font.render("Text in Pygame......", True, (0,0,0), (255, 255, 255))`
第一个参数文字;第二个参数是个布尔值，表示是否开启抗锯齿，如果为 True，字体会比较平滑，不过相应的速度有一点点影响;第三个参数是字体的颜色;第四个是背景色，如 果你想没有背景色(也就是透明)，就不加这第四个参数。

###   颜色相关

Pygame 支持 RGB 颜色，可以直接以(255，255，255)的形式输入，也可以使用 Pygame 提供的 color 类提取颜色，如 `pygame.Color('black')`直接返回 Color 类指定颜色

##   用户输入相关

键盘输入:使用` pygame.event.get()`获取所有事件，当 event.type==KEYDOWN 时，再判 断 event.key 的种类。也可以使用 pygame.key.get_pressed()来获取所有按下的键值，它会返回 一个元组，这个元祖的索引就是键值，对应的值为 True 就是按下。在飞行大战小游戏中， 建议采用后一种实现长按连续移动

###   鼠标pygame.mouse 的常用函数:

pygame.mouse.get_pressed	—— 返回按键按下情况，返回的是一元组，分别为(左键, 中 键, 右键)，如按下则为 True
pygame.mouse.get_rel	 —— 返回相对偏移量，(x 方向, y 方向)的一元组 
pygame.mouse.get_pos —— 返回当前鼠标位置(x, y)
pygame.mouse.set_pos —— 设置鼠标位置
pygame.mouse.set_visible —— 设置鼠标光标是否可见
pygame.mouse.get_focused —— 检查窗口是否接受鼠标事件，即鼠标是否 focus 到窗口 
pygame.mouse.set_cursor —— 设置鼠标光标式样
pygame.mouse.get_cursor ——得到鼠标图片

##   Sprite

pygame.sprite.Sprite就是Pygame里面用来实现精灵的一个类，使用时，并不需要对它实例化，只需要继承他，然后按需写出自己的类就好了

###   Group类

Group.draw(surface)

说明：对精灵组中的每一个精灵依次调用surface.blit()，依次将精灵组中的精灵绘制在surface上

Group.update()

说明：对精灵组中的每一个精灵依次调用update()方法，并且update()方法需要自己在自己定义的精灵类中去实现

##   子弹类

class Bullet(Sprite):

```python
------------------------bullet.py---------------------------
class Bullet(Sprite):
	#继承、初始化
  def update():#移动
  def draw_bullet(self):#画
  
------------------------game_function.py------------------
K_SPACE:#检测到按键就新增
  new_bullet = Bullet(ai_settings,screen,ship)
	bullets.add(new_bullet)
  
def update_screen(ai_settings, screen, ship, bullets): --snip--
  for bullet in bullets.sprites():
    bullet.draw_bullet()
    
------------------------alian_invasion.py-------------------
def run_game():
  bullets = Group()
	gf.check_events(ai_settings, screen, ship, bullets)
  ##   删除已消失的子弹
  for bullet in bullets.copy():
  	if bullet.rect.bottom <= 0: 
      bullets.remove(bullet)
  bullets.update()//移动
  gf.update_screen(ai_settings, screen, ship, bullets)
  
```





