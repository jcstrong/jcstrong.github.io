---
title: "python&raspberry pi"
category: skills
folderPath: "嵌入式/树莓派raspberry"
folderTop: "嵌入式"
tags: ["嵌入式", "树莓派"]
featured: false
source: "嵌入式/树莓派raspberry/python&raspberry pi.md"
updated: "2022-07-06"
readingTime: 27
summary: "toc  配置geany 1. 检查Python版本    python、python3 2. 安装文本编辑器Geany        sudo aptget install geany     3. 配置geany：如果你的系统安装了多个..."
---
[toc]



## 配置geany

1. 检查Python版本
   `python`、`python3`

2. 安装文本编辑器Geany

   ```
   sudo apt-get install geany
   ```

3. 配置geany：如果你的系统安装了多个Python版本，就必须对Geany进行配置，使其使用正确的版本。为此，可选择菜单 `Build(生成)-Set Build Commands(设置生成命令)`;你将看到文字Compile(编 译)和Execute(执行)，它们旁边都有一个命令。默认情况下，这两个命令都是python，要让Geany 使用命令python3,将编译命令修改成下面这样:

   ```
   python3 -m py_compile "%f" 
   ```

   你必须完全按上面的代码显示的那样输出这个命令，确保空格和大小写都完全相同。
     将执行命令修改成下面这样:
   

同样，务必确保空格和大小写都完全与显示的相同。图1-1显示了该如何在Geany中配置这些 命令。

   ```
python3 "%f"
   ```

   同样，务必确保空格和大小写都完全与显示的相同。图1-1显示了该如何在Geany中配置这些 命令。

4. 运行Hello World程序

   将文件命名为hello_world.py，主意后缀一定要改成`.py`存入工作目录。输入 `print("Hello Python world!")`，保存，按F5运行即可。

   

## There is no public key available for the following key IDs:

解决方案就是导入对应仓库的公钥，命令格式为:

```xml
gpg --keyserver <KeyServer> --recv <公钥签名> gpg --export --armor <公钥签名> | sudo apt-key add 
```

也可以用如下格式：

```xml
apt-key adv --keyserver <KeyServer> --recv-keys <公钥签名>
gpg --export --armor 40976EAF437D05B5 | sudo apt-key add -
```

`<KeyServer>`，key服务器，可以填 `keyserver.ubuntu.com` ，当然也可以填其他的。

```bash
gpg --keyserver  keyserver.ubuntu.com --recv-keys 9165938D90FDDD2E
gpg --export --armor  9165938D90FDDD2E | sudo apt-key add -
```

然后再执行`sudo apt-get update`即可解决问题。

> https://www.jianshu.com/p/8a1921413fad

‘





## TK编写GUI

### 常用PythonGUI库

- Tkinter

  Tkinter 模块(Tk 接口)是 Python 的标准 Tk GUI 工具包的接口 .Tk 和 Tkinter 可以在大多数的 Unix 平台下使用,同样可以应用在 Windows 和 Macintosh 系统 里。Tk8.0 的后续版本可以实现本地窗口风格,并良好地运行在绝大多数平台中。

- wxPython

  wxPython 是一款开源软件，是 Python 语言的一套优秀的 GUI 图形 库，允许 Python 程序员很方便的创建完整的、功能健全的 GUI 用户界面。

- Jython

  Jython 程序可以和 Java 无缝集成。除了一些标准模块，Jython 使用 Java 的模块。Jython 几乎拥有标准的 Python 中不依赖于 C 语言的全部模块。比如，Jython 的 用户界面将使用 Swing，AWT 或者 SWT。Jython 可以被动态或静态地编译成 Java 字节码。

- PyQt

  Qt 是一个 1991 年由 Qt Company 开发的跨平台 C++图形用户界面应用程序 开发框架。它既可以开发 GUI 程序，也可用于开发非 GUI 程序，比如控制台工具和服务器。 PyQt 是一个创建 GUI 应用程序的工具包。它是 Python 编程语言和 Qt 库的成功融合。

  



### Tkinter

Tkinter 是 Python 的标准 GUI 库。Python 使用 Tkinter 可以快速的创建 GUI 应用程序。由于 Tkinter 是内置到 python 的安装包中的，只要安装好 Python 之后就能 import tkinter 库、而且 IDLE 也是用 Tkinter 编写而成、对于简单的图形界面 Tkinter 还是能应付自如创。

建一个 GUI 程序基本步骤: 
1、导入 Tkinter 模块
2、创建控件
3、指定这个控件的 master， 即这个控件属于哪一个
4、告诉 GM(geometry manager) 有一个控件产生了。 

#### 基本代码

```python
import tkinter as tk 
window = tk.Tk()#创建控件
window.title('my window') 
window.geometry('300x200')
#在进入消息循环之前添加各种控件
window.mainloop()#进入消息循环
```

#### 控件

 tk.TK

	[after方法实现定时器](https://www.pynote.net/archives/1713)

Text	文本控件;用于显示多行文本

	.insert('')

Entry	输入控件;用于显示简单的文本内。

Button 	[按钮控件](https://blog.csdn.net/weixin_42272768/article/details/100589708?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&dist_request_id=&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control)

Label	框架控件;在屏幕上显示一个矩形区域，多用来作为容器



Canvas	画布控件;显示图形元素如线条或文本 

Checkbutton	多选框控件

Listbox	列表框控件

Menubutton	菜单按钮控件。

Frame	标签控件;可以显示文本和位图

Menu	菜单控件;显示菜单栏,下拉菜单和弹出菜单

Message	消息控件;用来显示多行文本，与 label 比较类似

Radiobutton	单选按钮控件;

Scale	范围控件;显示一个数值刻度，为输出限定范围的数字区间

Scrollbar	滚动条控件，当内容超过可视化区域时使用，如列表框。.

Toplevel	容器控件;用来提供一个单独的对话框，和 Frame 比较类似

Spinbox	输入控件;与 Entry 类似，但是可以指定输入范围值

PanedWindow	是一个窗口布局管理的插件，可以包含一个或者多个子控件。 

LabelFrame	简单的容器控件。常用与复杂的窗口布局。 

tkMessageBox	用于显示你应用程序的消息框。

#### 属性

标准属性:标准属性也就是所有控件的共同属性，如大小，字体和颜色等等。

Dimension 控件大小; 

Color 控件颜色; 

Font 控件字体;

Anchor 锚点：文本起始位置，有CENTER（默认）、E、S、W、N、NE、SE、NW

Relief 控件样式：3D浮雕样式，有 FLAT(平的)、RAISED(凸起的)、SUNKEN(凹陷的)、GROOVE(沟槽状边缘)和 RIDGE(脊状边缘) 5种。

Bitmap 位图; 

Cursor 光标;

padx和pady用于设置框架的外部填充显示

ipadx和ipady用于设置框架的内部显示。

#### 几何管理

Tkinter 控件有特定的几何状态管理方法，管理整个控件区域组织

pack() 包装;

grid() 网格;

place() 位置;

### 刷新控件的after

[tkinter窗口的after方法](https://www.pynote.net/archives/1713)

#### 控件实例



```python
import tkinter as tk 
from tkinter import LEFT, RIGHT,END,BOTH,Y
window = tk.Tk()
window.title('my window') 
window.geometry('500x1200')

#标签
var = tk.StringVar()### 文字变量储存器
var.set('I am variable')
label = tk.Label(window,
             #text='OMG! this is TK!', 
             textvariable = var, ### 使用 textvariable 替换 text, 这样可以变化
             bg='blue',
             font=('Arial', 18), 
             width=15, height=2
            )
label.pack()#固定窗口位置
#按钮
var2 = tk.StringVar()### 文字变量储存器
var2.set('you\'re so cool huh?')
on_hit = False
def hit_me():
    global on_hit
    if on_hit == False:
        on_hit=True
        var.set('you hit me!')
        var2.set('sorry~')
        label.config(bg='red')
    else:
        on_hit = False
        var.set('lalala~')
        label.config(bg='green')
        var2.set('(hit him……)')
tk.Button
b = tk.Button(window,
            ### 显示按钮上的文字
            textvariable = var2, ### 显示按钮上的文字
            width=15, height=2, 
             font=('Arial', 18), 
            ### 点击按钮执行的命令
            command=hit_me
    )
b.pack()### 按钮位置

#输入框
e = tk.Entry(window, show='*') #输入框(父窗口，*：不可见/none：可见)输入任何内容都显示*
e.pack()
var3 = e.get()#从entry获得变量值

#输入框Entry中的文字显示在文本框中
def insert_point():
    var=e.get()      
    text.insert('insert',var)#insert表示插在光标处
def insert_end():
    var=e.get()
    text.insert('end',var)#end表示插入在结尾，可以换为1.2，则插入在第一行第二位后面

#按钮
b1=tk.Button(window,text='insert point',
    width=15,height=2,command=insert_point)
b1.pack()
b2=tk.Button(window,text='insert end',
    width=15,height=2,command=insert_end)
b2.pack()

#文本框
text = tk.Text(window,height=2)  #创建文本框，用户可输入内容
text.pack()

#列表
var4 = tk.StringVar()
var4.set((11,22,33,44)) #为变量设置值
#创建Listbox
lb = tk.Listbox(window, listvariable=var4)  #将var2的值赋给Listbox
#创建一个list并将值循环添加到Listbox控件中
list_items = [1,2,3,4]
for item in list_items:
    lb.insert('end', item)  #从最后一个位置开始加入值
#增删列表内容
lb.insert(0, 'first')       #插入操作，在最前面加上'first'字符
lb.insert(1, 'second')      #在第一个位置后加入'second'字符
lb.delete(3)                #删除操作，删除第4个位置的字符“44”
lb.pack()

#选择按钮 tk.Radiobutton
var5 = tk.StringVar()
l = tk.Label(window, bg='yellow', width=20, text='请选择')
l.pack()
 
def print_selection():
    l.config(text='你选了 ' + var5.get())  #var.get()即获取到变量 var 的值

r1 = tk.Radiobutton(window, text='1. 选', 
                    variable=var5, value='选', command=print_selection)
r1.pack()
r2 = tk.Radiobutton(window, text='b. 项', 
                    variable=var5, value='项', command=print_selection)
r2.pack()
r3 = tk.Radiobutton(window, text='显示. A', 
                    variable=var5, value='A', command=print_selection)
r3.pack()

#尺度
s = tk.Scale(window, label='try me', from_=5, to=11, orient=tk.VERTICAL,
             length=200, showvalue=1, tickinterval=2, resolution=0.01, command=print_selection)
s.pack()
### 这里的参数label是指scale部件的名称，为try me
### 参数from_=5，to=11,即这个滚动条最小值为5，最大值为11（这里使用from_是因为在python中有from这个关键词）
### 参数orient=tk.HORIZONTAL在这里就是设置滚动条的方向，HORIZONTAL就是横向。
### 参数length这里是指滚动条部件的长度，但注意width=4，就是4个字符的长度，而length=200，为200个像素
### 参数resolution=0.01 保留几位小数，此处的0.01就是保留2位小数
### 这里的showvalue=1就是设置当前值在滚动条上方的显示。showvalue=0时3不显示结果

#勾选项
l2 = tk.Label(window, bg='yellow', width=20, text='empty')
l2.pack()
 
def print_selection():
    if(var11.get() == 1) & (var22.get() == 0):
        l2.config(text='I love only python!')
    elif(var11.get() == 0) & (var22.get() == 1):
        l2.config(text='I love only C++!')
    elif (var11.get() == 0) & (var22.get() == 0):
        l2.config(text='I love neither!')
    else:
        l2.config(text='I love both!')
var11 = tk.IntVar()### 整型变量储存器
var22 = tk.IntVar()

c1 = tk.Checkbutton(window, text='Python',variable=var11, onvalue=1, 													offvalue=0, command=print_selection)
c1.pack()
c2 = tk.Checkbutton(window, text='C++', variable=var22, onvalue=1, 														offvalue=0, command=print_selection)
c2.pack()
#当我们选中了这个checkbutton，onvalue的值1就会放入到var1中

window.mainloop()
   
```

<img src="https://jcstrong.github.io/img/20210405232411.png" alt="Screenshot 2021-04-05 at 11.06.37 PM" style="zoom: 50%;" />

```python
import tkinter as tk
import tkinter.messagebox

window = tk.Tk()
window.title = 'tkinter窗口'
window.geometry('820x620') 

#画布
canvas = tk.Canvas(window, bg='blue', height=600, width=850)
image_file = tk.PhotoImage(file='/Users/chenjun/Downloads/src=http---img.zcool.cn-community-01b0d857b1a34d0000012e7e87f5eb.gif&refer=http---img.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg.gif')
image = canvas.create_image(10, 10, anchor='nw', image=image_file)
x0, y0, x1, y1 = 50, 50, 80, 80
#两点确定一条直线。此处给的就是从坐标(50,50)到(80,80)画一条直线。
line = canvas.create_line(x0, y0, x1, y1)   
#画一个圆，填充色为red
oval = canvas.create_oval(x0, y0, x1, y1, fill='red')
#从0度到180度画一个扇形
arc = canvas.create_arc(x0+130, y0+30, x1+130, y1+30, start=0, extent=150)
#创建一个矩形
rect = canvas.create_rectangle(100, 30, 100+20, 30+20)
canvas.pack()

#弹窗
def do_job():
    tk.messagebox.showinfo(title='--',message='--。--我是可爱的小弹窗') #提示信息对话窗
    tk.messagebox.showwarning()                    #提出警告对话窗
    tk.messagebox.showerror()                      #提出错误对话窗
    tk.messagebox.askquestion()                    #询问选择对话窗
    print(tk.messagebox.askquestion())             #返回yes和no
    print(tk.messagebox.askokcancel())             #返回true和false
    print(tk.messagebox.askyesno())                #返回true和false
    print(tk.messagebox.askretrycancel())          #返回true和false

#菜单栏
#创建一个菜单栏，可以理解成一个容器，在窗口的上方
menubar = tk.Menu(window)
#定义一个空菜单单元
filemenu = tk.Menu(menubar, tearoff=0)
#将上面定义的空菜单命名为`File`，放在菜单栏中，就是装入那个容器中
menubar.add_cascade(label='File', menu=filemenu)
#在File中加入New的小菜单，即我们平时看到的下拉菜单，每一个小菜单对应命令操作。
#如果点击这些单元, 就会触发`do_job`的功能
filemenu.add_command(label='New', command=do_job)
filemenu.add_command(label='Open', command=do_job)
filemenu.add_command(label='Save', command=do_job)
filemenu.add_separator()#添加一条分割线
filemenu.add_command(label='Exit', command=window.quit)
#在_cascade(`File`-`Import`-)中加入一个小菜单命令_command(`Submenu1`)
submenu = tk.Menu(filemenu)
filemenu.add_cascade(label='Import', menu=submenu, underline=0)
submenu.add_command(label="Submenu1", command=do_job)
#再定义一个空菜单单元。
editmenu = tk.Menu(menubar, tearoff=0)
menubar.add_cascade(label='Edit', menu=editmenu)
editmenu.add_command(label='弹窗', command=do_job)
window.config(menu=menubar)
#mac系统下如果——cascade的label名为`Edit`，会自动添加两个command

#框架
frm = tk.Frame(window)  #在`window`上创建一个frame
frm.pack()
#在刚刚创建的`frame`上创建两个`frame`，我们可以把它理解成一个大容器里套了一个小容器，即`frm`上有两个`frame` ，`frm_l`和`frm_r`
frm_l = tk.Frame(frm)
frm_r = tk.Frame(frm)
#这里是控制小的`frm`部件在大的`frm`的相对位置，此处`frm_l`就是在`frm`的左边，`frm_r`在`frm`的右边
frm_l.pack(side='left')
frm_r.pack(side='right')
#这里的三个label就是在我们创建的frame上定义的label部件，还是以容器理解，就是容器上贴了标签，来指明这个是什么，解释这个容器。
tk.Label(frm_l, text='on the frm_l1').pack()
tk.Label(frm_l, text='on the frm_l2').pack()
tk.Label(frm_r, text='on the frm_r1').pack()
#按照上下左右的方式排列
tk.Label(window, text='1').pack(side='top')#上
tk.Label(window, text='1').pack(side='bottom')#下
tk.Label(window, text='1').pack(side='left')#左
tk.Label(window, text='1').pack(side='right')#右

window.mainloop()
```



<img src="https://jcstrong.github.io/img/20210406000109.png" alt="Screenshot 2021-04-06 at 12.00.59 AM" style="zoom:50%;" />

```python
import tkinter as tk 
from tkinter import LEFT, RIGHT,END,BOTH,Y
window = tk.Tk()
window.title('my window') 
window.geometry('130x190')
### grid 是方格, 所以所有的内容会被放在这些规律的方格中。
for i in range(4):
    for j in range(3):
        tk.Label(window, text=1).grid(row=i, column=j, padx=10, pady=10)
### 创建一个四行三列的表格，用表格的形式定位的。
### 这里的参数 row为行，colum为列，padx就是单元格左右间距，pady就是单元格上下间距。

### tk.place：给精确的坐标来定位，
tk.Label(window, text=8).place(x=20, y=20, anchor='nw')
### 将这个部件放在坐标为（x，y）的这个位置，参数anchor=nw就是锚定点，nw是西北角。

window.mainloop()
```

<img src="https://jcstrong.github.io/img/20210406000220.png" alt="Screenshot 2021-04-06 at 12.02.14 AM" style="zoom:50%;" />

### 计算器-TK实例

```python
import tkinter as tk
import tkinter.messagebox
import re
import math
'''
按钮映射到entry的函数
'''
def button_input(entry,arg):###   1~9、加减乘除
    entry.insert('end',arg)
def clear(entry):###  C
    entry.delete(0,'end')
def negetive(entry):###   -
    input = -float(entry.get())
    entry.delete(0,'end')
    button_input(entry,input)
def percent(entry):###    %
    input = float(entry.get())
    entry.delete(0,'end')
    button_input(entry,input*0.01)
def equal(entry,text):###  =
    input=entry.get()
    try:
        out=eval(input.strip())  
    except: 
        output=str('ERROR') 
    else:
        output=str(out) 
    clear(entry) 
    entry.insert('end',output) 
    #同时记录本次输入的式子和结果
    text.insert('end',input+'='+entry.get()+'\n')
    text.see(input)

#创建窗口
window = tk.Tk()
window.title('计算器')
window.geometry('246x335')

#显示历史输入和结果
text = tk.Text(window,height=3,width=34)  #创建文本框显示结果
text.grid(row=0,columnspan=4)

#显示当前输入和结果
entry = tk.Entry(window,justify='right')  #justify右对齐
entry.grid(row=1,columnspan=4,sticky='wens')    #sticky固定

#按键定义
button_clear = tk.Button(window,text='C',height=3,width=6,command=lambda:clear(entry))
button_clear.grid(row=2,column=0)
button_negtive = tk.Button(window,text='+/-',height=3,width=6,command=lambda:negetive(entry))
button_negtive.grid(row=2,column=1)
bt_percent = tk.Button(window, text='%',height=3,width=6,command=lambda:percent(entry))
bt_percent.grid(row=2,column=2)
button_divide = tk.Button(window,text='➗',height=3,width=6,command=lambda:button_input(entry,'/'))
button_divide.grid(row=2,column=3)

bt7 = tk.Button(window, text=7,height=3,width=6,command=lambda:button_input(entry,'7'))
bt7.grid(row=3,column=0)
bt8 = tk.Button(window, text=8,height=3,width=6,command=lambda:button_input(entry,'8'))
bt8.grid(row=3,column=1)
bt9 = tk.Button(window, text=9,height=3,width=6,command=lambda:button_input(entry,'9'))
bt9.grid(row=3,column=2)
bt_cheng = tk.Button(window, text='✖️',height=3,width=6,command=lambda:button_input(entry,'*'))
bt_cheng.grid(row=3,column=3)

bt4 = tk.Button(window, text=4,height=3,width=6,command=lambda:button_input(entry,'4'))
bt4.grid(row=4,column=0)
bt5 = tk.Button(window, text=5,height=3,width=6,command=lambda:button_input(entry,'5'))
bt5.grid(row=4,column=1)
bt6 = tk.Button(window, text=6,height=3,width=6,command=lambda:button_input(entry,'6'))
bt6.grid(row=4,column=2)
bt_jian = tk.Button(window, text='➖',height=3,width=6,command=lambda:button_input(entry,'-'))
bt_jian.grid(row=4,column=3)

bt1 = tk.Button(window, text=1,height=3,width=6,command=lambda:button_input(entry,'1'))
bt1.grid(row=5,column=0)
bt2 = tk.Button(window, text=2,height=3,width=6,command=lambda:button_input(entry,'2'))
bt2.grid(row=5,column=1)
bt3 = tk.Button(window, text=3,height=3,width=6,command=lambda:button_input(entry,'3'))
bt3.grid(row=5,column=2)
bt_plus = tk.Button(window, text='➕',height=3,width=6,command=lambda:button_input(entry,'+'))
bt_plus.grid(row=5,column=3)

bt0 = tk.Button(window, text=0,height=3,width=13,command=lambda:button_input(entry,'0'))
bt0.grid(row=6,column=0,columnspan=2)
bt_dot = tk.Button(window, text='.',height=3,width=6,command=lambda:button_input(entry,'.'))
bt_dot.grid(row=6,column=2)
bt_equal = tk.Button(window, text='=',height=3,width=6,command=lambda:equal(entry,text))
bt_equal.grid(row=6,column=3)

window.mainloop()
```





### TK报错

#### _tkinter.TclError: couldn't recognize data in image file

原因：PhotoImage 报错，tkinter中PhotoImage只能打开gif文件，
解决：改用gifcvbnq



### 如何给主窗口添加滑块？

### 如何更改主窗口颜色？

```python
from tkinter import *
from PIL import Image,ImageTk  #用于在Label标签中显示jpg格式的图片
from tkinter.ttk import Separator #分隔线
root = Tk()#将Tk对象名称root
root.title('普通凭证管理系统')#窗口标题
root.geometry("800x500+300+120")#设定宽、高、上、下位置，单位是像素,乘法符号为小写x
root.maxsize(850,550)#设置最大可调整的宽、高，无需引号
root.minsize(500,300)#设置最小可调整的宽、高，无需引号
root.configure(bg = 'Azure')#配置窗口背景颜色,或用bg = '#00ff00'16进制表示
root.resizable(1,1)#设置是否可更改窗口大小，第一个参数为宽，第二个为高。bool类型
root.state('zoomed')#最大化窗口，但需遵守maxsize()方法设置的最大值
### root.iconify()#最小化窗口，缩至任务栏
root.iconbitmap('nd.ico')#更改窗口默认图标，ICO文件应与.py文件放在同一目录
screenwidth = root.winfo_screenwidth()#获取当前屏幕宽度
screenheight = root.winfo_screenheight()#获取当前屏幕高度
### print(screenwidth,screenheight)
###############################################################################
#在Label标签中显示jpg文件的预处理
image = Image.open('日出.JPG')
richu = ImageTk.PhotoImage(image)  #k为小写
#标签Label
label = Label(root,text = '欢迎使用普通凭证管理系统',fg = 'blue',bg = 'yellow',
              height = 30,width = 80,anchor = 'center',wraplength = 400,justify= 'left',
              font = 'Helvetic 20 bold italic underline overstrike',
              compound = 'center',relief = 'raised',padx = 5,pady = 5,
              image = richu,cursor = 'gobbler')#root为父对象或父窗口或容器
label.pack(padx = 10 ,pady = 10)#包装与定位组件，用于在窗体上显示标签
### label = Label(root,text = '欢迎使用普通凭证管理系统').pack()#与17，18句内容相同，建议将对象声明与pack方法分开使用
### fg = foreground 标签的前景色
### bg = background 标签的背景色
### height = 3 标签的高度
### width = 30 标签的宽度
### anchor = 'nw'表示标签中文字的对齐方式为西北面，也就是左上角。种类为n,s,w,e,nw,ne,sw,se,center
### 表示标签对齐方式的参数‘n’等也可使用大写，大写时可省略‘’号
### wraplength = 50表示标签中的文字达到50像素的宽度后自动换行，设10像素时能一般显示1个汉字，30像素一般2个汉字
### font = 'Helvetic 20 bold'表示设置字体类型、字号及粗体，font包含：字形Helvetica、Times等，bold粗体，italic斜体，underline下划线，overstrike删除线
### justify= 'left'表示标签文本最后一行靠左对齐，有left\center\right，如果只有一行文本则无作用。
### Label标签中参数除了首个参数必须为root父窗口，其余参数均无顺序要求
### bitmap = 'error'在标签上放置内建位图的功能，有error\info\questhead\question\warning等,此语句放入参数后运行显示不正常
### compound = 'left'表示当图像与文字同时存在时进行顺序的排列，图像在文字的左边用left，图像在右边在right,上top,下bottom,覆盖center
### relief = 'raised'显示Label标签边框效果，有flat\groove\raised\ridge\solid\sunken
### padx = 5,pady = 5 padx设置Label的左右边框与文字的间距，pady设置Label的上下边框与文字的间距，与参数height及width冲突，如存在height及width,相应边距设置失效
### imge显示图像的大小与height及width有关,且照片是放大效果，可能与Label大小设置有关
### cursor = 'gobbler'设置鼠标的样式
sep = Separator(root,orient = HORIZONTAL)#在root窗口中添加水平分隔线，VERTICAL为垂直线
sep.pack(fill = X , padx = 5)#分隔线填满X轴，与窗口边界相距5个像素
lab2 = Label(root , text = '普通凭证管理系统主要便于统计普通凭证领用，使用，库存及预警情况')
lab2.pack(padx = 10 ,pady = 10)
print(label.keys())#在Shell窗口中查看Label所有的参数
root.mainloop()#显示交互界面，放在最后
 
 
#######################################################################################
#Widget Layout Manager
#pack()方法
#在GUI中，可以使用三种方法包装和定位各组件在窗口中的位置，三种方法称为控件配置管理员（Widget Layout Manager）
#三种方法为pack()、grid()、place()
#pack(参数有side、fill、padx\pady、ipadx\ipady、anchor)
from tkinter import *
window = Tk()
window.title('控件位置摆放的学习，pack()方法')                              #窗口标题
window.geometry('500x300')                                                #设置窗口大小，单位为像素
lab1 = Label(window,text = '我是第一个有点长的标签',bg ='red')              #lab1标签内容及背景色
lab2 = Label(window,text = '我是第二个标签',bg = 'yellow')                 #lab2标签内容及背景色
lab3 = Label(window,text = '我是第三个标签也很长，恩，很长',bg = 'blue')    #lab3标签内容及背景色
lab4 = Label(window,text = '我是第四个标签',bg = 'green')                  #lab4标签内容及背景色
 
#第一种排列方式
### lab1.pack(side = BOTTOM)    #用pack()方法默认从上往下排列，用pack()的side参数可以改变顺序，BOTTOM是靠在窗体最下方居中
### lab2.pack(side = LEFT)      #标签垂直方向居中，紧靠窗体最左方
### lab3.pack(side = RIGHT)     #标签垂直方向居中，紧靠窗体最右方
### lab4.pack(side = TOP)       #标签靠在窗体最上方，但水平方向并没有在正中位置
 
#第二种排列方式，全部使用LEFT参数时，控件在窗体上排列顺序为从左至右，有序排列
### lab1.pack(side = LEFT)
### lab2.pack(side = LEFT)
### lab3.pack(side = LEFT)
### lab4.pack(side = LEFT)
 
#第三种方式，lab1和lab4是上下苟且在一起的，不加参数永远上下扎堆，lab2与lab3一右一左在同一水平线，垂直位置随窗体高度调整而发生变化
lab1.pack(fill = X, pady = 10, ipady = 10)     #lab1填满水平X轴,pady设置该标签的上下（垂直方向）控件边缘相距10像素,ipady表示Label边界与文字在垂直方向之间的间距
lab2.pack(side = RIGHT, padx = 10, ipadx = 10, anchor = SE) #控件靠右对齐，padx标签的左右边（水平方向）与其他控件或窗体相距10像素,
### ipadx表示Label边界与文字在水平方向之间的间距,anchor = SE，表示控件在窗体上的方位，有（NW,N,NE,W,CENTER,E,SW,S,SE）分别为左上、上、右上等等，英文与地图上东南西北对应
lab3.pack(side = LEFT, fill = Y)  #控件靠左对齐，fill = y填满该控件Y轴，但不占用lab1已控件位置
lab4.pack(fill = X)     #此处lab4并不能水平填满该行X轴，因为与lab2和lab3的控件已占用部分位置，尽管在窗体高度调大后并不在同一水平线
 
window.mainloop()
```







### pack()

https://blog.csdn.net/superfanstoprogram/article/details/83713196

### Button

https://www.runoob.com/python/python-tk-button.html

#### lamada匿名函数

```python
#不行
btn_fore = tkinter.Button(root, text="☁️", bg="black", command=get_weather(1))
----------
#可以
btn_fore = tkinter.Button(root, text="☁️", bg="black", command=lambda: get_weather(1))
```

#### 问题

tkinter.button在macOs系统下无法改变颜色，可以使用tkmacosx库中的Button

```
from tkmacosx import Button
```



### partial函数？

将创建Button时的一些参数固定，变成新的Button组件构造函数myButton

（重写Button？？？）







## Pygame模块总览


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





###   界面相关

####   display

pygame.display.set_mode():屏幕的设置，返回一个 Surface 对象，代表了桌面上出 现的窗口，第一个参数为分辨率
pygame.display.set_caption():标题的设置，即界面的顶部标题
pygame.display.update():界面的刷新，更新界面的显示

###   图像相关

bg = pygame.image.load("./images/background.png"):图片的加载，参数为图片的地址(绝对地址或相对地址，如果与源文件在同一文件下可以只有名字)，返回一个 surface 对象
bg_rect = bg.get_rect():返回一个覆盖整个图像的矩形，即 Rect 对象

screen.blit(bg, (0, 0)):图像的绘制，第一个参数为 Surface 对象即图像，第二个参数即图像左上角顶点的坐标。Pygame 中的坐标系以界面坐上角顶点为原点，以像素为单位

####   Rect对象

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

###   事件相关

Pygame 会接受用户的各种操作(比如按键盘，移动鼠标等)产生事件。事件随时可能 发生，而且量也可能会很大，Pygame 的做法是把一系列的事件存放一个队列里，逐个的处理

####   event

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

###   时钟控制相关

clock = pygame.time.Clock():创建一个时钟对象 
clock.tick(500):指定游戏系统的运行帧率，控制游戏的运行速度，clock 为一个时钟对象，参数为指定帧率

###   字体和文字相关

Pygame 中的文字显示需要用到 font 字体类。Pygame 可以直接调用系统字体，或者也可 以使用 TTF 字体

系统字体调用:	`my_font = pygame.font.SysFont("arial", 16)`
第一个参数是字体名，第二个是大小。该函数返回一个系统字体，这个字体与“bold”和 “italic”两个 flag 相匹配。如果找不到，就会使用 pygame 的默认字体。可以使用 **pygame.font.get_fonts()**来获得当前系统所有可用字体。

ttf/ttc 字体文件调用:	`my_font = pygame.font.Font("simsun.ttf", 16)`
使用这个方法,需要把字体文件随同游戏一起发送, 这样可以避免使用者机器上没有所需的字体

字体的使用，即文字显示:`render(text antialias, color, background=None)``
``text_surface = my_font.render("Text in Pygame......", True, (0,0,0), (255, 255, 255))`
第一个参数文字;第二个参数是个布尔值，表示是否开启抗锯齿，如果为 True，字体会比较平滑，不过相应的速度有一点点影响;第三个参数是字体的颜色;第四个是背景色，如 果你想没有背景色(也就是透明)，就不加这第四个参数。

####   颜色相关

Pygame 支持 RGB 颜色，可以直接以(255，255，255)的形式输入，也可以使用 Pygame 提供的 color 类提取颜色，如 `pygame.Color('black')`直接返回 Color 类指定颜色

###   用户输入相关

键盘输入:使用` pygame.event.get()`获取所有事件，当 event.type==KEYDOWN 时，再判 断 event.key 的种类。也可以使用 pygame.key.get_pressed()来获取所有按下的键值，它会返回 一个元组，这个元祖的索引就是键值，对应的值为 True 就是按下。在飞行大战小游戏中， 建议采用后一种实现长按连续移动

####   鼠标pygame.mouse 的常用函数:

pygame.mouse.get_pressed	—— 返回按键按下情况，返回的是一元组，分别为(左键, 中 键, 右键)，如按下则为 True
pygame.mouse.get_rel	 —— 返回相对偏移量，(x 方向, y 方向)的一元组 
pygame.mouse.get_pos —— 返回当前鼠标位置(x, y)
pygame.mouse.set_pos —— 设置鼠标位置
pygame.mouse.set_visible —— 设置鼠标光标是否可见
pygame.mouse.get_focused —— 检查窗口是否接受鼠标事件，即鼠标是否 focus 到窗口 
pygame.mouse.set_cursor —— 设置鼠标光标式样
pygame.mouse.get_cursor ——得到鼠标图片

###   Sprite

pygame.sprite.Sprite就是Pygame里面用来实现精灵的一个类，使用时，并不需要对它实例化，只需要继承他，然后按需写出自己的类就好了

####   Group类

Group.draw(surface)

说明：对精灵组中的每一个精灵依次调用surface.blit()，依次将精灵组中的精灵绘制在surface上

Group.update()

说明：对精灵组中的每一个精灵依次调用update()方法，并且update()方法需要自己在自己定义的精灵类中去实现

###   子弹类

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
  ###   删除已消失的子弹
  for bullet in bullets.copy():
  	if bullet.rect.bottom <= 0: 
      bullets.remove(bullet)
  bullets.update()//移动
  gf.update_screen(ai_settings, screen, ship, bullets)
  
```







## pygame报错 

### PYGAME

### Invalid rectstyle object

（0，0，0）解释器并没有把他当成一个参数，因为后面还有rect = None,的默认参数，所以必须要把（0，0，0）单独括起来，才能把它作为一个元组。

（（255，255，255））

### 树莓派

### SyntaxError: Non-ASCII character '\xe5' in file

报错原因：python默认的是ASCII编码，使用 中文等非英语字符 就会报上述错误。

解决办法：设置编码为UTF-8。
在文件顶部加上 

```python
#conding:utf-8
```

### IndentationError: unindent does not match any outer indentation level

报错原因：没有对齐、tab和空格混用

解决方法：在视图中找到`显示空格与制表符`，查找错误位置

### IndexError: tuple index out of range

报错原因:元组索引越界

### ModuleNotFoundError: *No* *module* *named* '*tkinter*'

报错原因：未发现包

解决方法：在geany中执行如下代码查看包的路径

```python
import sys
print(sys.path)
```

[geany找不到包](https://blog.csdn.net/jd_457619512/article/details/81179788)

### TypeError: test() argument after * must be an iterable, not int

调用threading.Thread 报错

```python
t = threading.Thread(target = test,args = (5))
```

报错原因：在使用多线程时，会调用多线程类中的run()函数，这个函数需要传入一个可迭代对象，当我们的参数只有一个整数时，单独的整数不可迭代，所以报错

解决办法：这里参数后面要加逗号（5,）

```python
t = threading.Thread(target=test,args=(5,))
```



### The channel sent is invalid on a Raspberry Pi

不是GPIO引脚
多半是GPIO.BCM写成BAORD的原因



### NameError: global name 'xxx' is not defined

全局变量声明和定义的位置出错可能会使其他线程无法访问全局变量。还可能出现下面的错误

#### SyntaxWarning: name 'dist' is assigned to before global declaration

如下是正确使用全局变量的方法

在global之前先赋值，在会修改的函数内声明global。

```python
dist = 0
def thread_dist():
    global dist
    while True:
        time.sleep(1.0)
        dist = int(ultraSonic.checkdist(6,5))
        print(dist)
def thread_show():
    while True:
        LED.fun4LED(LED_PINS,dist)
```

### IOError: [Errno 121] Remote I/O error

I2C设备接线没接好
