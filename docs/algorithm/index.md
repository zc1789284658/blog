---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Algorithm"

features:
  - title: Quick sort
    details: 通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。
    link: ./sort-quick
  - title: Merge sort
    details: 分治策略：拆分为子序列，子序列排序完后合并为大序列
    link: ./sort-merge
  - title: Shall sort
    details: 希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止
    link: ./sort-shall
---

