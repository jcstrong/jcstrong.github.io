---
title: "heapq"
category: skills
folderPath: "Python/Python语法"
folderTop: "Python"
tags: ["Python", "语法基础"]
featured: false
source: "Python/Python语法/heapq.md"
updated: 2022-05-23
readingTime: 4
summary: "toc  python的堆: heapqhttps://docs.python.org/zhcn/3/library/heapq.html模块的使用 heapq 模块实现了适用于Python列表的最小堆排序算法。 heappop metho..."
---
[toc]

# python的堆: [heapq](https://docs.python.org/zh-cn/3/library/heapq.html)模块的使用

heapq 模块实现了适用于Python列表的**最小堆**排序算法。

`heappop()` method returns the smallest item, not the largest.

`heapq.heapify(x)`：将list x转为heap

```python
heap = []            # creates an empty heap
heappush(heap, item) # pushes a new item on the heap
item = heappop(heap) # pops the smallest item from the heap
item = heap[0]       # smallest item on the heap without popping it
heapify(x)           # transforms list into a heap, in-place, in linear time
item = heapreplace(heap, item) # pops and returns smallest item, and adds
                               # new item; the heap size is unchanged
```

## 用数组存储堆结构（树）

根据堆的**树结构**构建**数组结构**

按降序将数组排列成堆结构，第一个元素是最大的元素

<img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20211021123658.png" alt="Screenshot 2021-10-21 at 12.36.48 PM" style="zoom: 30%;" /><img src="https://chenjun-xs.oss-cn-hangzhou.aliyuncs.com/img/20211021123941.png" alt="Screenshot 2021-10-21 at 12.32.51 PM" style="zoom:25%;" />

## heapq 源码分析

Heap queue algorithm (a.k.a. priority queue)

`heap=[ ]` 数组存储的是堆结构（树）

- 当添加新元素到heap到末尾时，要对heap[ ]重新排序来保持堆结构，

  ```python
  def heappush(heap, item):
      """Push item onto heap, maintaining the heap invariant."""
      heap.append(item)
      _siftdown(heap, 0, len(heap)-1)		# 上浮（相对树中位置）
  ```
  
  ```python
  def _siftdown(heap, startpos, pos):
      newitem = heap[pos]
      # 沿着通往root的路径，将parent向下移动，直到找到newitem的合适位置
      while pos > startpos:
          parentpos = (pos - 1) >> 1		# pos的母节点下标parentpos 正好是 (pos - 1) >> 1 
          parent = heap[parentpos]
          if newitem < parent:		
              heap[pos] = parent		# parent移到pos
              pos = parentpos				# pos指向parentpos
              continue                # continue 和 break 一起用。interesting
          break
      heap[pos] = newitem						
  
  
  # heap = [7, 6, 5, 2, 3, 1, 4]
  heap = [1, 2, 4, 6, 3, 7, 5]
  heap.append(8)
  _siftdown(heap, 0, 7)
  print(heap)
  heapq.heapify(heap)
  print(heap)
  ```
  
- pop最小的元素，并保持堆结构

  ```python
  def heappop(heap):
      """Pop the smallest item off the heap, maintaining the heap invariant."""
    	# 弹出最右边的叶子结点（heap数组的最后一个元素）  
      lastelt = heap.pop()    # raises appropriate IndexError if heap is empty
      if heap:
          returnitem = heap[0]
          heap[0] = lastelt			# 把最后一个元素放到堆顶
          _siftup(heap, 0)			# 下沉（相对树中位置）
          return returnitem
      return lastelt
  ```

  ```python
  def _siftup(heap, pos):
      endpos = len(heap)
      startpos = pos
      newitem = heap[pos]
      childpos = 2*pos + 1    # pos的左子结点 leftmost child position
      while childpos < endpos:    # 循环到叶子结点就结束
          # Set childpos to index of smaller child.
          rightpos = childpos + 1     # pos的右子结点
          if rightpos < endpos and not heap[childpos] < heap[rightpos]:
              childpos = rightpos
          # Move the smaller child up.
          heap[pos] = heap[childpos]
          pos = childpos
          childpos = 2*pos + 1
      # 每次pos所指的结点看作是空位，直到循环结束，pos就是newitem的位置.
      heap[pos] = newitem
      _siftdown(heap, startpos, pos)
  ```

- 把数组转成堆

  ```python
  def heapify(x):
      n = len(x)
      # 从第一个元素开始下沉
      # 到 n//2 是最后一个非叶子结点
      for i in reversed(range(n//2)):
          _siftup(x, i)		
  ```

- [refer](https://blog.csdn.net/yixieling4397/article/details/97965773)

## [heapq](https://docs.python.org/zh-cn/3/library/heapq.html)模块实现优先队列

- `heapq.heapify(x)`：将list x转为heap

```python
def _siftdown(heap, startpos, pos):
    newitem = heap[pos]
    # 沿着通往root的路径，将parent向下移动，直到找到newitem的合适位置
    while pos > startpos:
        parentpos = (pos - 1) >> 1		# pos的母节点下标parentpos 正好是 (pos - 1) >> 1 
        parent = heap[parentpos]
        if newitem < parent:		
            heap[pos] = parent		# parent移到pos
            pos = parentpos				# pos指向parentpos
            continue                # continue 和 break 一起用。有趣
        break
    heap[pos] = newitem						

def _siftup(heap, pos):
    endpos = len(heap)
    startpos = pos
    newitem = heap[pos]
    childpos = 2*pos + 1    # pos的左子结点 leftmost child position
    while childpos < endpos:    # 循环到叶子结点就结束
        # Set childpos to index of smaller child.
        rightpos = childpos + 1     # pos的右子结点
        if rightpos < endpos and not heap[childpos] < heap[rightpos]:
            childpos = rightpos
        # Move the smaller child up.
        heap[pos] = heap[childpos]
        pos = childpos
        childpos = 2*pos + 1
    # 每次pos所指的结点看作是空位，直到循环结束，pos就是newitem的位置.
    heap[pos] = newitem
    _siftdown(heap, startpos, pos)


def heapify(x):
    n = len(x)
    # Transform bottom-up.  The largest index there's any point to looking at
    # is the largest with a child index in-range, so must have 2*i + 1 < n,
    # or i < (n-1)/2.  If n is even = 2*j, this is (2*j-1)/2 = j-1/2 so
    # j-1 is the largest, which is n//2 - 1.  If n is odd = 2*j+1, this is
    # (2*j+1-1)/2 = j so j-1 is the largest, and that's again n//2-1.
    for i in reversed(range(n//2)):
        _siftup(x, i)

heap = [7, 6, 5, 2, 3, 1, 4]
heapify(heap)
print(heap)

heap = [1, 2, 4, 6, 3, 7, 5]
print(_siftup(heap, 0))
print(heap)
```

> ```
> >>> import heapq
> >>> nums = list()
> >>> heapq.heappush(nums, 16)
> >>> heapq.heappush(nums, 13)
> >>> heapq.heappush(nums, 18)
> >>> heapq.heappush(nums, 22)
> >>> heapq.heappush(nums, 13)
> >>> heapq.heappush(nums, 4)
> >>> heapq.heappush(nums, 5)
> >>> heapq.heappush(nums, 16)
> >>> nums
> [4, 13, 5, 16, 16, 18, 13, 22]
> >>> heapq.heappop(nums)
> 4
> >>> nums
> [5, 13, 13, 16, 16, 18, 22]
> ```
>
> 说明执行pop之前都是无序的