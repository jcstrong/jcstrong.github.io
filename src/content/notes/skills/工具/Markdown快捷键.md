---
title: "Markdown快捷键"
category: skills
folderPath: "工具"
folderTop: "工具"
tags: ["开发工具", "效率"]
featured: false
source: "工具/Markdown快捷键.md"
updated: 2023-03-28
readingTime: 8
summary: "跳转  方法1 <a href=\"a的name\"跳到A</a  html <a href=\"a的name\"跳到A</a  <span name = \"a的name\"这是A</span <span name = \"a的name\"这是A</sp..."
---
# 跳转

### 方法1

<a href="#a的name">跳到A</a> 

```html
<a href="#a的name">跳到A</a> 



<span name = "a的name">这是A</span>
```

<span name = "a的name">这是A</span>

### 方法2

[跳转到方法1](#方法1)

```
[跳转到方法1](#方法1)
[显示的文字](# + 标题名)
```



# 下标

- 下标：n<sub>3</sub>
- 上标：n<sup>3</sup>

## 内联公式    $ctrl+M$

![Screenshot 2021-08-27 at 12.59.00 PM](https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20210827125906.png)

$\Rightarrow$ [csdn](https://blog.csdn.net/weixin_43444930/article/details/119791074)

# mac回删

第一种：按 delete 键，实现 Windows 键盘上退格键的功能，也就是删除光标之前的一个字符（默认）；

第二种：按 fn+delete 键，删除光标之后的一个字符；

第三种：按 option+delete 键，删除光标之前的一个单词（英文有效）；

第四种：结合第二种，按住fn+option+delete，删除光标之后的一个单词；

# 

# typora快捷键mac markdown语法

[toc]



enter是硬回车，作为一段分隔的标志。
shift+enter是软回车，可以视觉上分段，但在设置段落格式的时候word仍作为一段处理。

shift+enter是换行 标志是向下的箭头
enter是换段 标志是下左箭头

# 一、标题

typora快捷键

`⌘1～6`分别是6～1级标题

------

# 二、字体

```undefined
**这是加粗的文字**  ⌘B
*这是倾斜的文字*  ⌘I
***这是斜体加粗的文字***  ⌘U
~~这是加删除线的文字~~  ⌃⇧`
```

效果如下：

**这是加粗的文字**
*这是倾斜的文字*
***这是倾斜加粗的文字***
~~这是加删除线的文字~~



------

# 三、引用

```ruby
>这是引用的内容
>>这是引用的内容
>>>>>>>>>>这是引用的内容
```

效果如下：

> 这是引用的内容
>
> > 这是引用的内容
> >
> > > > > > > > > > 这是引用的内容

# 四、分割线

```undefined
---
----
***
*****
```

效果如下：
可以看到，显示效果是一样的。

------

------

------

------

# 五、图片

语法：

```bash
*（图片缺失：图片地址 ''图片title''）*

图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加
```

示例：

```cpp
![blockchain](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/
u=702257389,1274025419&fm=27&gp=0.jpg "区块链")
```

md文件中图片的永久存储方法：图床、cdn、文件夹。

# 六、超链接

语法：

```csharp
[超链接名](超链接地址 "超链接title")
title可加可不加
⌘ K
```

示例：

```csharp
[简书](http://jianshu.com)
[百度](http://baidu.com)
```

效果如下：

[简书](https://www.jianshu.com/u/1f5ac0cf6a8b)
[百度](https://links.jianshu.com/go?to=http%3A%2F%2Fbaidu.com)

注：Markdown本身语法不支持链接在新页面中打开，貌似简书做了处理，是可以的。别的平台可能就不行了，如果想要在新页面中打开的话可以用html语言的a标签代替。

```xml
<a href="超链接地址" target="_blank">超链接名</a>

示例
<a href="https://www.jianshu.com/u/1f5ac0cf6a8b" target="_blank">简书</a>
```

------

# 七、列表

**无序列表**

语法：
无序列表用 - + * 任何一种都可以

```undefined
- 列表内容
+ 列表内容
* 列表内容

注意：- + * 跟内容之间都要有一个空格
```

效果如下：

- 列表内容
- 列表内容
- 列表内容

**有序列表**

语法：
数字加点



```undefined
1. 列表内容
2. 列表内容
3. 列表内容

注意：序号跟内容之间要有空格
```

效果如下：

1. 列表内容
2. 列表内容
3. 列表内容

**列表嵌套**

**上一级和下一级之间敲三个空格即可**

- 一级无序列表内容
  - 二级无序列表内容
  - 二级无序列表内容
  - 二级无序列表内容
  
- 一级无序列表内容

  ​	1.

  1. 二级有序列表内容
  2. 二级有序列表内容
  3. 二级有序列表内容

1. 一级有序列表内容
   - 二级无序列表内容
   - 二级无序列表内容
   - 二级无序列表内容
2. 一级有序列表内容
   1. 二级有序列表内容
   2. 二级有序列表内容
   3. 二级有序列表内容

------

# 表格

语法：

```ruby
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

第二行分割表头和内容。
- 有一个就行，为了对齐，多加了几个
文字默认居左
- 两边加：表示文字居中
- 右边加：表示文字居右
注：原生的语法两边都要用 | 包起来。此处省略
```

示例：

```ruby
姓名|技能|排行
--|:--:|--:
刘备|哭|大哥
关羽|打|二哥
张飞|骂|三弟
```

效果如下：

| 姓名 | 技能 | 排行 |
| ---- | :--: | ---: |
| 刘备 |  哭  | 大哥 |
| 关羽 |  打  | 二哥 |
| 张飞 |  骂  | 三弟 |

# 代码

语法：
单行代码：代码之间分别用一个反引号包起来

```go
    `代码内容`
```

代码块：代码之间分别用三个反引号包起来，且两边的反引号单独占一行



```go
(```)
  代码...
  代码...
  代码...
(```)
```

> 注：为了防止转译，前后三个反引号处加了小括号，实际是没有的。这里只是用来演示，实际中去掉两边小括号即可。

示例：

单行代码

```go
`create database hero;`
```

代码块

```kotlin
(```)
    function fun(){
         echo "这是一句非常牛逼的代码";
    }
    fun();
(```)
```

效果如下：

单行代码

```
create database hero;
```

代码块

```kotlin
function fun(){
  echo "这是一句非常牛逼的代码";
}
fun();
```

# mermaid

- `->` 表示实心箭头
- `->>`表示空心箭头
- `-->` 表示虚线箭头
- `-->>`表示空心箭头

## 时序图

sequence可以创建没有连接的对象

```mermaid
sequenceDiagram
title: sequenceDiagram时序图
participant A
participant B
participant C
participant D
A ->> B: hello
B -> C:world
C -->> B:fine
```

## [流程图](https://blog.csdn.net/weixin_44360592/article/details/109526990)

### 方向

- TB - top to bottom
- TD - top-down/ same as top to bottom
- BT - bottom to top
- RL - right to left
- LR - left to right

```mermaid
graph LR
LRA[方形] -->B(圆角)
B --> C{条件a}
C -->|a=1| D[结果1]
C -->|a=2| E[结果2]
F[横向流程图]
```



### 连接方式

```mermaid
graph LR
	id1["[x1x]"]
	id2[["[[x2x]]"]]
	id3(["([x3x])"])
	id4[("[(x4x)]")]
	id5(("((x5x))"))
	id6>">x6x]"]
	id7{"{x7x}"}
	id8{{"{{x8x}}"}}
	id9[/"[/x9x/]"/]
	id10[/"[/x10x\]"\]
	id11[\"\x11x/"/]
	id12[12]
	id1 --- |"---"| id2 -->|"-->"| id3 -.->|"-.->"| id4
	id5 --- |直线| id6 -->|带箭头<br/>的直线| id7 -.->|带箭头<br/>的虚线| id8
	id9 == "==>" ==>id10
	id9 -.- |"-.-"| id10
	id10 --> id11 -.- id12
```



### 自定义风格

```mermaid
graph LR
    id1(红色填充<br/>黑色边框<br/>宽度为4px)
    id2(绿色填充<br/>虚线边框<br/>白色字体)
    style id1 fill:#f00,stroke:#333,stroke-width:4px
    %% stroke-dasharray属性设置虚线边框的点的大小(长10宽5)
    style id2 fill:#0f0,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 10 5
    id1 -->a[继承mystyle1风格] & b[继承mystyle2风格] -->id2
    %% 或者定义成一个类，其它继承即可，重复利用
    classDef mystyle1 fill:#f9f,stroke:#333,stroke-width:4px;
    classDef mystyle2 fill:#00f,stroke:#f33,stroke-width:4px,color:#f2f;
    %% 继承mystyleX风格
    a:::mystyle1
    b:::mystyle2
```





### flowchart图

```mermaid
flowchart TB
    c1-->|不同子图元素<br/>之间的连接| a2
    subgraph one
    a1-->|子图内部元素<br/>之间的连接| a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
    one -->|子图之间的连接| two
    three --> two
    two --> c2
```

### 状态图stateDiagram

```mermaid
stateDiagram
[*] --> s1
s1 --> s2: 01
s2 --> s1: 11
s2 --> s2: 00
s2 --> s3: 10
s3 --> [*]
```

### 甘特图

```mermaid
gantt
dateFormat YYYY-MM-DD
title 软件开发甘特图
section 设计
需求:done,des1, 2019-01-06,2019-01-08
原型:active,des2, 2019-01-09, 3d
UI设计:des3, after des2, 5d
未来任务:des4, after des3, 5d
section 开发
理解需求:crit, done, 2019-01-06,24h
设计框架:crit, done, after des2, 2d
开发:crit, active, 3d
未来任务:crit, 5d
休息时间:2d
section 测试
功能测试:active, a1, after des3, 3d
压力测试:after a1, 20h
测试报告: 48h
```

### graph图

```mermaid
graph LR
	%% flowchart改为graph也可以
	%% 风格1，用红色填充，边框用蓝色，边框宽度两个像素
	classDef mystyle1 fill:#f00, stroke:#00f, stroke-width:2px;
	classDef mystyle2 fill:#0f0, stroke:#f00, stroke-width:4px;
	classDef mystyle3 fill:#00f, stroke:#0f0, stroke-width:8px,color:#fff,stroke-dasharray: 6 3
	classDef default fill:#f9f,stroke:#333,stroke-width:4px;
	%% :::表示继承类（风格）
	D[(默认风格)]
	B(绿色填充<br/>红边框<br/>圆角):::mystyle2 --> D
	C[蓝色填充<br/>绿色边框<br/>白色字体]:::mystyle3 --> D
	%% D默认为default风格
	e((显示特别<br/>的符号)) -->|"f(,.?!+-*ز)"| f(,.?!+-*ز)

C --> b2
subgraph subgraph1
	a1{"{菱形}"} --- a2[/"[/梯形\]"\]
end
subgraph subgraph2
	b1[["[[xxx]]"]] -->|子图内部元<br/>素的连接| b2(["([圆角])"])
end
%% graph图形是不能在子图之间进行连接，但是子图内部的元素还是可以
%% subgraph1 --> subgraph2
%% a1 -->|子图元素<br/>之间的连接| b1
```
### 饼图

```mermaid
pie 
    title Like
    "DSP" : 23
    "通信原理" : 21
    "移动通信" : 18
    "电信传输理论" : 10
    "毛概" : 15
```

### 类图

箭头

```mermaid
classDiagram
	%% [classA][Arrow][ClassB]:LabelText
        classA --|> classB : Inheritance
        classC --* classD : Composition
        classE --o classF : Aggregation
        classG --> classH : Association
        classI -- classJ : Link(Solid)
        classK ..> classL : Dependency
        classM ..|> classN : Realization
        classO .. classP : Link(Dashed)


```



```mermaid
classDiagram
	%% Duck继承自Animal
        Animal <|-- Duck
        Animal <|-- Fish
        Animal <|-- Zebra
        %% +即public；-即private；#即protected；~即Package/Internal
        Animal : +int age
        Animal : +String gender
        %% 返回值类型，在括号后面加，记得要有一个空格
        Animal: +isMammal() bool
        Animal: +mate()
        %% Duck有Animal的属性和方法
        class Duck{
            +String beakColor
            +swim()
            +quack()
        }
        class Fish{
            -int sizeInFeet
            -canEat()
        }
        class Zebra{
            +bool is_wild
            +run(speed)
        }
        Duck <|-- yellowDuck
        class yellowDuck{
        	-string color
        	-int size
        }
```

类注释

<<Interface>> To represent an Interface class：接口类
<<abstract>> To represent an abstract class：抽象类
<<Service>> To represent a service class：服务类
<<enumeration>> To represent an enum：枚举类

```mermaid
classDiagram
    class Shape {
        <<interface>>
        noOfVertices
        -len
        -high
        drawPoint()
        drawLine()
        drawRctangle()
    }
    class Color {
        <<enumeration>>
        RED
        BLUE
        GREEN
        WHITE
        BLACK
    }
    class type {
    	<<abstract>>
    	Animal
    }

```

```flow
st=>start: 开始
op=>operation: My Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
&```
```







# 添加目录

文档开头添加`[toc]`

# Markdown 实现页面内部跳转

先定义要跳转的锚点

 <span id = "anchor">锚点</span>
1
2
注: id是您随意取的,当然必须是唯一的.

跳转

[锚点](#anchor)
1
2
注: []内是要填转的按钮显示的文字,小括号内#后面是跟的id值.因为跳转是根据id跳的.
————————————————
版权声明：本文为CSDN博主「大大大大大桃子」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/soindy/article/details/50426362