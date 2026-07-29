---
layout: course
title: "邏輯控制"
type: matlab_menu
permalink: /database_courses/matlab/logic_control
---
# MATLAB

___


### 邏輯索引

| **範例** | **說明** |
| --- | --- |
| [`[5 10 15] > 12`](https://www.mathworks.com/help/matlab/matlab_prog/array-comparison-with-relational-operators.html) | 將向量元素去和 `12` 進⾏⽐較。 |
| [`v1(v1 > 6)`](https://www.mathworks.com/help/matlab/matlab_prog/find-array-elements-that-meet-a-condition.html) | 提取 `v1` 中⼤於 `6` 的所有元素。 |
| `x(x==999) = 1` | 將 `x` 中所有等於 `999` 的值，替換為值 `1` 。 |

### 編程

| **範例** | **說明** |
| --- | --- |
| [`if`](https://www.mathworks.com/help/matlab/ref/if.html)` x > 0.5` <br>`y = 3`<br>`else` <br>`y = 4` <br>`end` | 如果 `x` ⼤於 `0.5` ，則將 `y` 設為 `3` 。<br>否則，將 `y` 設定為 `4` 。 |
| `switch 運算式`<br>`case 選擇值1`<br>`敘述主體1`<br>  `case 選擇值2`<br>       `敘述主體2`<br>...<br>`otherwise`<br>`敘述主體n`<br>`end` | 若運算式的值等於選擇值1，執行敘述主體1，<br>若運算式的值等於選擇值2，則執行敘述主體2，以此類推，<br>如果運算式的直接不等於所列的選擇值，則執行敘述主體n |
| [`for`](https://www.mathworks.com/help/matlab/ref/for.html)` c = 1:3` <br>`disp(c)`<br>`end` | 迴圈計數器的值 (`c`)依序為 `1:3`  ( `1`到`3` 間隔`1`)。<br>迴圈顯⽰ `c` 的每個值。 |
| `while 判斷主體`<br>`敘述主體`<br>`end` | 當判斷條件為true時，會重複執行敘述主體，直到判斷條件為false為止 |

