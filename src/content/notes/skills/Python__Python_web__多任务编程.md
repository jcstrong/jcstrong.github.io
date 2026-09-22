---
title: "多任务编程"
category: skills
tags: ["Python", "Web"]
featured: false
source: "Python/Python_web/多任务编程.md"
updated: 2022-07-05
readingTime: 12
summary: "toc  多进程  Process进程类的说明 Processgroup , target , name , args , kwargs  group：指定进程组，目前只能使用None  target：执行的目标任务名  name：进程名字..."
---
[[toc]]

## 多进程

### Process进程类的说明

**Process([group [, target [, name [, args [, kwargs]]]]])**

- group：指定进程组，目前只能使用None
- target：执行的目标任务名
- name：进程名字
- args：以元组方式给执行任务传参
- kwargs：以字典方式给执行任务传参

**Process创建的实例对象的常用方法:**

- start()：启动子进程实例（创建子进程）
- join()：等待子进程执行结束
- terminate()：不管任务是否完成，立即终止子进程

**Process创建的实例对象的常用属性:**

name：当前进程的别名，默认为Process-N，N为从1开始递增的整数

```python
# 1. 导入进程包
import multiprocessing
import time


# 跳舞任务
def dance():
    for i in range(3):
        print("跳舞中...")
        time.sleep(0.2)


# 唱歌任务
def sing():
    for i in range(3):
        print("唱歌中...")
        time.sleep(0.2)


# 2. 创建子进程（自己手动创建的进程称为子进程, 在__init__.py文件中已经导入的Process类）
# 1. group: 进程组，目前只能使用None，一般不需要设置
# 2. target: 进程执行的目标任务
# 3. name: 进程名，如果不设置，默认是Process-1, ......
dance_process = multiprocessing.Process(target=dance)
sing_process = multiprocessing.Process(target=sing)

# 3. 启动进程执行对应的任务
dance_process.start()
sing_process.start()

# 进程执行是无序的，具体那个进程先执行是由操作系统调度决定
```

### 获取进程编号

```PYTHON
# 1. 导入进程包
import multiprocessing
import time
import os

# 跳舞任务
def dance():
    # 获取当前进程（子进程）的编号
    dance_process_id = os.getpid()
    # 获取当前进程对象，查看当前代码是由那个进程执行的 ： multiprocessing.current_process()
    print("dance_process_id:", dance_process_id, multiprocessing.current_process())
    # 获取当前进程的父进程编号
    dance_process_parent_id = os.getppid()
    print("dance_process的父进程编号是:", dance_process_parent_id)

    for i in range(3):
        print("跳舞中...")
        time.sleep(0.2)
        # 扩展： 根据进程编号强制杀死指定进程
        os.kill(dance_process_id, 9)


# 唱歌任务
def sing():
    # 获取当前进程（子进程）的编号
    sing_process_id = os.getpid()
    # 获取当前进程对象，查看当前代码是由那个进程执行的 ： multiprocessing.current_process()
    print("sing_process_id:", sing_process_id, multiprocessing.current_process())

    # 获取当前进程的父进程编号
    sing_process_parent_id = os.getppid()
    print("sing_process的父进程编号是:", sing_process_parent_id)

    for i in range(3):
        print("唱歌中...")
        time.sleep(0.2)


# 获取当前进程(主进程)的编号
main_process_id = os.getpid()
# 获取当前进程对象，查看当前代码是由那个进程执行的 ： multiprocessing.current_process()
print("main_process_id:", main_process_id, multiprocessing.current_process())

# 2. 创建子进程（自己手动创建的进程称为子进程, 在__init__.py文件中已经导入的Process类）
# 1. group: 进程组，目前只能使用None，一般不需要设置
# 2. target: 进程执行的目标任务
# 3. name: 进程名，如果不设置，默认是Process-1, ......
dance_process = multiprocessing.Process(target=dance, name="dance_process")
print("dance_process:", dance_process)
sing_process = multiprocessing.Process(target=sing, name="sing_process")
print("sing_process:", sing_process)

# 3. 启动进程执行对应的任务
dance_process.start()
sing_process.start()

# 进程执行是无序的，具体那个进程先执行是由操作系统调度决定
```

### 进程执行带参数的函数

```python
from multiprocessing import Process


# 显示信息的任务
def show_info(name, age):
    print(name, age)


if __name__ == '__main__':
    # 创建子进程
    
    # 以元组方式传参，元组里面的元素顺序要和函数的参数顺序保持一致
    # sub_process = multiprocessing.Process(target=show_info, args=("李四", 20))

    # 以字典方式传参，字典里面的key要和函数里面的参数名保持一致，没有顺序要求
    # sub_process = multiprocessing.Process(target=show_info, kwargs={"age":20, "name": '王五'})

    # 混合使用时，位置参数要在前吧
    sub_process = Process(target=show_info, args=("冯七",), kwargs={"age": 20})
    # 启动进程
    sub_process.start()
```

> 多进程需要在main函数中运行



###  进程之间执行是无序的，是由操作系统调度进程来决定的

```python
import multiprocessing
import time


def task():
    time.sleep(1)
    # 获取当前线程
    print(multiprocessing.current_process())


if __name__ == '__main__':
    # 循环创建大量进程，测试进程之间执行是否无序
    for i in range(20):
        # 每循环一次创建一个子进程
        sub_process = multiprocessing.Process(target=task)
        # 启动子进程执行对应的任务
        sub_process.start()
```



### 进程之间不共享全局变量

创建子进程其实是对主进程资源进行拷贝


```python
import multiprocessing
import time


print("xxx")
# 定义全局变量列表
g_list = list()  #=> []


# 添加数据的任务
def add_data():
    for i in range(3):
        # 因为列表是可变类型，可以在原有内存的基础上修改数据，并且修改后内存地址不变
        # 所以不需要加上global关键字
        # 加上global 表示声明要修改全局变量的内存地址
        g_list.append(i)
        print("add:", i)
        time.sleep(0.2)

    print("添加完成:", g_list)


# 读取数据的任务
def read_data():
    print("read:", g_list)


# 1. 防止别人导入文件的时候执行main里面的代码
# 2. 防止windows系统递归创建子进程
if __name__ == '__main__':

    # 添加数据的子进程
    add_process = multiprocessing.Process(target=add_data)
    # 读取数据的子进程
    read_process = multiprocessing.Process(target=read_data)

    # 启动进程执行对应的任务
    add_process.start()
    add_process.join()# 当前进程（主进程）等待添加数据的进程执行完成以后代码再继续往下执行
    print("main:", g_list)
    read_process.start()
```

结论： 进程之间不共享全局变量

> 创建子进程其实是对主进程资源进行拷贝，子进程其实就是主进程的一个副本，改变副本（子进程）不会影响其他副本和主进程。



### 主进程会等待子进程执行完成以后程序再退出


```python
import multiprocessing
import time

def task():
    # for i in range(10):
    while True:
        print("任务执行中...")
        time.sleep(0.2)

if __name__ == '__main__':#程序入口模块

    # 创建子进程
    sub_process = multiprocessing.Process(target=task)
    # 把子进程设置成 守护主进程，当主进程退出子进程直接销毁
    sub_process.daemon = True
    sub_process.start()

    # 主进程延时0.5秒钟
    time.sleep(0.5)
    # 退出主进程之前，先让子进程进行销毁
    # sub_process.terminate()
    print("over")
```

需求: 在主进程执行完毕后结束子进程。主进程退出子进程销毁

方法1:让子进程设置成为守护主进程，主进程退出子进程销毁，子进程会依赖主进程

方法2:让主进程退出之前先让子进程销毁



## 多线程

### Thread线程类

**Thread([group [, target [, name [, args [, kwargs]]]]])**

- group: 线程组，目前只能使用None
- target: 执行的目标任务名
- args: 以元组的方式给执行任务传参
- kwargs: 以字典方式给执行任务传参
- name: 线程名，一般不用设置

```python
# 1. 导入线程模块
import threading
import time


def sing():
    # 获取当前线程
    current_thread = threading.current_thread()
    print("sing:", current_thread)

    for i in range(3):
        print("唱歌中...")
        time.sleep(0.2)


def dance():
    # 获取当前线程
    current_thread = threading.current_thread()
    print("dance:", current_thread)

    for i in range(3):
        print("跳舞中...")
        time.sleep(0.2)


if __name__ == '__main__':

    # 获取当前线程
    current_thread = threading.current_thread()
    print("main_thread:", current_thread)

    # 2. 创建子线程
    sing_thread = threading.Thread(target=sing, name="sing_thread")
    dance_thread = threading.Thread(target=dance, name="dance_thread")
    # 3. 启动子线程执行对应的任务
    sing_thread.start()
    dance_thread.start()
```

### 进程执行带参数的函数

```python
import threading


def show_info(name, age):
    print("name: %s age: %d" % (name, age))

if __name__ == '__main__':
    # 创建子线程
    # 以元组方式传参，要保证元组里面元素的顺序和函数的参数顺序一致
    # sub_thread = threading.Thread(target=show_info, args=("李四", 20))
    # # 启动线程执行对应的任务
    # sub_thread.start()

    # 以字典的方式传参，要保证字典里面的key和函数的参数名保持一致
    sub_thread = threading.Thread(target=show_info, kwargs={"name": "王五", "age": 30})
    # 启动线程执行对应的任务
    sub_thread.start()
```



### 线程之间执行是无序的，具体哪个线程执行是由cpu调度决定的

```python
import threading
import time


def task():
    time.sleep(1)
    # 获取当前线程
    print(threading.current_thread())


if __name__ == '__main__':
    # 循环创建大量线程，测试线程之间执行是否无序
    for i in range(20):
        # 每循环一次创建一个子线程
        sub_thread = threading.Thread(target=task)
        # 启动子线程执行对应的任务
        sub_thread.start()
```

### 主线程会等待所有的子线程执行结束再结束

设置子线程为守护主线程

`sub_thread.setDaemon(True)`	或	`sub_thread = threading.Thread(target=task, daemon=True)`

```python
import threading
import time


def task():
    while True:
        print("任务执行中...")
        time.sleep(0.3)

if __name__ == '__main__':
    # 创建子线程
    # daemon=True 表示创建的子线程守护主线程，主线程退出子线程直接销毁
    # sub_thread = threading.Thread(target=task, daemon=True)
    sub_thread = threading.Thread(target=task)
    # 把子线程设置成为守护主线程
    sub_thread.setDaemon(True)
    sub_thread.start()

    # 主线程延时执行1秒
    time.sleep(1)

    print("over")
    # exit()
```

解决办法: 把子线程设置成为守护主线程即可

### 线程之间共享全局变量

因为多线程在同一个进程中，所以多线程可以共享全局

```python
import threading
import time


# 定义全局变量
g_list = []


# 添加数据的任务
def add_data():
    for i in range(3):
        # 每循环一次把数据添加到全局变量
        g_list.append(i)
        print("add:", i)
        time.sleep(0.3)

    # 代码执行到此，说明添加数据完成
    print("添加数据完成:", g_list)


# 读取数据的任务
def read_data():
    print("read:", g_list)


if __name__ == '__main__':
    # 创建添加数据的子线程
    add_thread = threading.Thread(target=add_data)
    # 创建读取数据的子线程
    read_thread = threading.Thread(target=read_data)

    # 启动线程执行对应的任务
    add_thread.start()
    # time.sleep(1)
    # 让当前线程(主线程)等待添加数据的子线程执行完成以后代码再继续执行
    add_thread.join()
    read_thread.start()
```

### 线程之间共享全局变量数据出现错误问题

1. **需求:**
   1. 定义两个函数，实现循环100万次，每循环一次给全局变量加1
   2. 创建两个子线程执行对应的两个函数，查看计算后的结果

```python
import threading


# 全局变量
g_num = 0


# 循环100万次执行的任务
def task1():
    for i in range(1000000):
        global g_num  # 表示要声明修改全局变量的内存地址
        g_num = g_num + 1  # g_num += 1

    print("task1:", g_num)    # 代码执行到此，说明数据计算完成


# 循环100万次执行的任务
def task2():
    for i in range(1000000):
        # 每循环一次给全局变量加1
        global g_num  # 表示要声明修改全局变量的内存地址
        g_num = g_num + 1  # g_num += 1

    # 代码执行到此，说明数据计算完成
    print("task2:", g_num)


if __name__ == '__main__':
    # 创建两个子线程
    first_thread = threading.Thread(target=task1)
    second_thread = threading.Thread(target=task2)

    # 启动线程执行任务
    first_thread.start()
    # 线程等待，让第一个线程先执行，然后在让第二个线程再执行，保证数据不会有问题
    first_thread.join() # 主线程等待第一个子线程执行完成以后代码再继续往下执行
    second_thread.start()
```

执行结果少于 2000000

```python
sum1: 1210949
sum2: 1496035
```

### 线程同步 互斥锁

除了上述使用join线程等待

互斥锁: 对共享数据进行锁定，保证同一时刻只能有一个线程去操作。

注意:

- 互斥锁是**多个线程一起去抢**，抢到锁的线程先执行，没有抢到锁的线程需要等待，等互斥锁使用完释放后，其它等待的线程再去抢这个锁。

```python
# 创建锁
mutex = threading.Lock()

# 上锁
mutex.acquire()

...这里编写代码能保证同一时刻只能有一个线程去操作, 对共享数据进行锁定...

# 释放锁
mutex.release()
```

**注意点:**

- **acquire和release方法之间的代码同一时刻只能有一个线程去操作**
- **如果在调用acquire方法的时候 其他线程已经使用了这个互斥锁，那么此时acquire方法会堵塞，直到这个互斥锁释放后才能再次上锁。**

```python
import threading


# 全局变量
g_num = 0


# 创建互斥锁, Lock本质上是一个函数，通过调用函数可以创建一个互斥锁
lock = threading.Lock()


# 循环100万次执行的任务
def task1():
    # 上锁
    lock.acquire()
    for i in range(1000000):
        # 每循环一次给全局变量加1
        global g_num  # 表示要声明修改全局变量的内存地址
        g_num = g_num + 1  # g_num += 1

    # 代码执行到此，说明数据计算完成
    print("task1:", g_num)
    # 释放锁
    lock.release()


# 循环100万次执行的任务
def task2():
    # 上锁
    lock.acquire()
    for i in range(1000000):
        # 每循环一次给全局变量加1
        global g_num  # 表示要声明修改全局变量的内存地址
        g_num = g_num + 1  # g_num += 1

    # 代码执行到此，说明数据计算完成
    print("task2:", g_num)
    # 释放锁
    lock.release()


if __name__ == '__main__':
    # 创建两个子线程
    first_thread = threading.Thread(target=task1)
    second_thread = threading.Thread(target=task2)

    # 启动线程执行任务
    first_thread.start()
    second_thread.start()
```

> 互斥锁可以保证同一时刻只有一个线程去执行代码，能够保证全局变量的数据没有问题
> 线程等待和互斥锁都是把多任务改成单任务去执行，保证了数据的准确性，但是执行性能会下降
> 使用互斥锁会影响代码的执行效率，多任务改成了单任务执行
> 互斥锁如果没有使用好容易出现死锁的情况

### 死锁实例

根据下标在列表中取值, 保证同一时刻只能有一个线程去取值

```python
# 死锁: 一直等待对方释放锁的情景叫做死锁
import threading


# 创建互斥锁
lock = threading.Lock()


# 需求: 多线程同时根据下标在列表中取值，要保证同一时刻只能有一个线程去取值
def get_value(index):
    # 上锁
    lock.acquire()
    my_list = [1, 4, 6]
    # 判断下标是否越界
    if index >= len(my_list):
        print("下标越界:", index)
        # 取值不成功，也需要释放互斥锁，不要影响后面的线程去取值
        # 锁需要在合适的地方进行释放，防止死锁
        lock.release()
        return

    # 根据下标取值
    value = my_list[index]
    print(value)
    # 释放锁
    lock.release()


if __name__ == '__main__':
    # 创建大量线程，同时执行根据下标取值的任务
    for i in range(10):
        # 每循环一次创建一个子线程
        sub_thread = threading.Thread(target=get_value, args=(i,))
        # 启动线程执行任务
        sub_thread.start()
```

> 互斥锁内部中断程序时也需要释放锁



### 进程与线程

1. 进程之间不共享全局变量

2. 线程之间共享全局变量，但是要注意资源竞争的问题，解决办法: 互斥锁或者线程同步

   

3. 一个进程默认提供一条线程，可以创建多个线程。

4. 创建进程的资源开销要比创建线程的资源开销要大

5. 进程是操作系统资源分配的基本单位，线程是CPU调度的基本单位

6. 线程不能够独立执行，必须依存在进程中

7. 多进程开发比单进程多线程开发稳定性要强



- 进程优缺点:
  - 优点：可以用多核、更稳定，某个进程挂掉不会影响其它进程。
  - 缺点：资源开销大
- 线程优缺点:
  - 优点：资源开销小、可以共享全局变量。
  - 缺点：不能使用多核、线程不能单独执行必须依附在进程里面

