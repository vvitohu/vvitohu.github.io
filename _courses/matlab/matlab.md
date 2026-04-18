---
layout: database_courses
title: "MATLAB"
type: matlab_menu
permalink: /database_courses/matlab
---
# MATLAB

___

### 基本語法

| **範例** | **說明** |
| --- | --- |
| [`x = pi`](https://www.mathworks.com/help/matlab/matlab_env/create-and-edit-variables.html) | 使⽤等號 ( `=`) 建⽴變數並給其值。左側 ( `x` ) 是變數名稱，右側 ( `pi` ) 是其值。 |
| [`y = sin(-5)`](https://www.mathworks.com/help/matlab/learn_matlab/calling-functions.html) | 使⽤括號 `( )` 提供函數輸⼊。 |

### 桌⾯管理

| **函数** | **範例** | **說明** |
| --- | --- | --- |
| [`save`](https://www.mathworks.com/help/matlab/ref/save.html) | `save data.mat` | 將⽬前⼯作區保存到MAT⽂件中。 |
| [`load`](https://www.mathworks.com/help/matlab/ref/load.html) | `load data.mat` | 將MAT⽂件中的變數載⼊到⼯作區。 |
| [`who`](https://www.mathworks.com/help/matlab/ref/who.html) | `who` | 查詢於目前的工作區內，正在使用的變數。 |
| [`whos`](https://www.mathworks.com/help/matlab/ref/whos.html) | `whos var` | 查詢特定或所有變數的詳細資訊。 |
| [`clear`](https://www.mathworks.com/help/matlab/ref/clear.html) | `clear` | 清除⼯作區的所有變數。 |
| [`clc`](https://www.mathworks.com/help/matlab/ref/clc.html) | `clc` | 清除命令⾏窗⼝中的所有⽂本。 |
| [`format`](https://www.mathworks.com/help/matlab/ref/format.html) | `format long` | 更改命令⾏窗⼝中數值輸出的顯⽰⽅式。 |

### 永久常數

| **永久常數** | **說明** |
| --- | --- |
| `pi`   | 圓周率，𝜋 = 3.14159265358970  |
| `inf`或`Inf` | 無限大(∞) |
| `i` , `j` | 虛數 (imaginary number) |
| `NaN`或`nan` | 不存在的數 |
| `realmax` | 系統所能表示之最大數值  |
| `realmin` | 系統所能表示之最小數值  |

### 數學函數

| **數學函數** | **說明** |
| --- | --- |
| `pi`   | 圓周率，𝜋 = 3.14159265358970  |
| `inf`或`Inf` | 無限大(∞) |
| `i` , `j` | 虛數 (imaginary number) |
| `NaN`或`nan` | 不存在的數 |
| `realmax` | 系統所能表示之最大數值  |
| `realmin` | 系統所能表示之最小數值  |

| **數學函數** | **說明** |
| --- | --- |
| `pi`   | 圓周率，𝜋 = 3.14159265358970  |
| `inf`或`Inf` | 無限大(∞) |
| `i` , `j` | 虛數 (imaginary number) |
| `NaN`或`nan` | 不存在的數 |
| `realmax` | 系統所能表示之最大數值  |
| `realmin` | 系統所能表示之最小數值  |

### 數組類別

| **範例** | **說明** |
| --- | --- |
| `4`   | 標量  |
| `[3 5]` | 列向量 |
| `[1;3]` | ⾏向量 |
| `[3 4 5; 6 7 8]` | 矩陣  |

### 向量建立

| **範例** | **說明** |
| --- | --- |
| `a:b` | 使⽤冒號運算⼦ (`:`)，建⽴⼀個從`a`到`b`，間距為`1`的向量。 |
| `a:step:b` | 建⽴⼀個從`a`到`b`，間距為`step`的向量。 |
| [`linspace`](https://www.mathworks.com/help/matlab/ref/double.linspace.html)`(a,b,n)` | 建⽴⼀個包含`n`個元素的向量。這些值從`a`到`b`等間距間隔。 |
| [`length`](https://www.mathworks.com/help/matlab/ref/double.length.html)`(v)` | 查詢向量`ν`的元素個數。 |
| `v'` | 將向量`ν`轉置，也就是列向量變行向量，行向量變列向量。 |

### 向量處理函數

| **範例** | **說明** |
| --- | --- |
| [`sum`](https://www.mathworks.com/help/matlab/ref/double.sum.html)`(v)` | 計算向量`ν`的總和。 |
| [`prod`](https://www.mathworks.com/help/matlab/ref/double.prod.html)`(v)` | 計算向量`ν`的乘積。 |
| [`max`](https://www.mathworks.com/help/matlab/ref/double.max.html)`(v)` | 取出向量`ν`的最大值。 |
| [`min`](https://www.mathworks.com/help/matlab/ref/double.min.html)`(v)` | 取出向量`ν`的最小值。 |
| [`sort`](https://www.mathworks.com/help/matlab/ref/double.sort.html)`(v)` | 將向量`ν`裡的元素由小到大排序。 |
| [`sort`](https://www.mathworks.com/help/matlab/ref/double.sort.html)`(v, 'descend')` | 將向量`ν`裡的元素由大到小排序。 |
| [`cumsum`](https://www.mathworks.com/help/matlab/ref/double.cumsum.html)`(v)` | 計算向量`ν`的累加。 |
| [`cumprod`](https://www.mathworks.com/help/matlab/ref/double.cumprod.html)`(v)` | 計算向量`ν`的累乘。 |

### 矩陣建⽴

| **範例** | **說明** |
| --- | --- |
| [`rand`](https://www.mathworks.com/help/matlab/ref/double.rand.html)`(2)` | 建⽴⼀個 `2` ⾏ `2` 列 數值介於 `0-1` 的隨機⽅陣。 |
| [`zeros`](https://www.mathworks.com/help/matlab/ref/zeros.html)`(2,3)` | 建⽴⼀個 `3` ⾏ `2` 列的零矩陣。 |
| [`ones`](https://www.mathworks.com/help/matlab/ref/ones.html)`(2,3)` | 建⽴⼀個 `3` ⾏ `2` 列的全⼀矩陣。 |
| [`eye`](https://www.mathworks.com/help/matlab/ref/eye.html)`(3)` | 建⽴⼀個 `3` ⾏ `3` 列的單位矩陣。 |
| [`diag`](https://www.mathworks.com/help/matlab/ref/diag.html)`(v)` | 以向量`v`為對角元素，建立一個矩陣。 |
| [`magic`](https://www.mathworks.com/help/matlab/ref/magic.html)`(n)` | 建立一個`𝑛`×`𝑛`的魔術方陣。 |

### 查詢陣列函數

| **範例** | **說明** |
| --- | --- |
| [`size`](https://www.mathworks.com/help/matlab/ref/double.size.html)`(m)` | 查詢陣列`m`的大小。 |
| [`length`]()`(m)` | 傳回陣列`m`行數與列數中，較大的數。 |
| [`numel`]()`(m)` | 查詢陣列`m`元素的總數。 |
| [`ndims`]()`(m)` | 查詢陣列`m`的維度。 |

### 數組索引

| **範例** | **說明** |
| --- | --- |
| `A(`[`end`](https://www.mathworks.com/help/matlab/ref/end.html)`,2)` | 最後⼀列第⼆⾏的元素。 |
| `A(2,: )` | 第⼆列所有元素。 |
| `A(1 : 3,: )` | 前三列所有元素。 |
| `A(2) = 11` | 將數組中第⼆個元素改為11。 |

### 數組運算

| **範例** | **說明** |
| --- | --- |
| `[1 2; 3 4] + 1` <br>`ans =2 3`<br>`4 5`| 執⾏[數組加法](https://www.mathworks.com/help/matlab/ref/plus.html)。 |
| `[1 1; 1 1]*[2 2; 2 2]`<br>`ans =4 4`<br>`4 4` | 執⾏[矩陣乘法](https://www.mathworks.com/help/matlab/matlab_prog/array-vs-matrix-operations.html#btyv9yp-4)。 |
| `[1 1; 1 1].*[2 2; 2 2]`<br>`ans =2 2`<br>`2 2` | 執⾏[按元素乘法](https://www.mathworks.com/help/matlab/matlab_prog/array-vs-matrix-operations.html#bu90xxy-1)。 |

### 多個輸出

| **範例** | **說明** |
| --- | --- |
| `[xrow,xcol] = `[`size`](https://www.mathworks.com/help/matlab/ref/double.size.html)`(x)` | 將 `x` 中的⾏數和列數儲存為兩個不同變數。 |
| `[xMax,idx] = `[`max`](https://www.mathworks.com/help/matlab/ref/double.max.html)`(x)` | 計算 `x` 的最⼤值(`xMax`)及其對應的索引值(`idx`)。 |
| `[xMin,idx] = `[`min`](https://www.mathworks.com/help/matlab/ref/double.min.html)`(x)` | 計算 `x` 的最小值(`xMin`)及其對應的索引值(`idx`)。 |
| `[val, ind] = `[`sort`](https://www.mathworks.com/help/matlab/ref/double.min.html)`(x)` | 排序向量`x`，同時傳回元素相對應的原始位置。 |

### ⽂檔

| **範例** | **說明** |
| --- | --- |
| [`doc`](https://www.mathworks.com/help/matlab/ref/doc.html)`randi` | 開啟 `randi` 函數的說明⽂檔⾴。 |

### 繪圖

| **範例** | **說明** |
| --- | --- |
| [`plot`](https://www.mathworks.com/help/matlab/ref/plot.html)`(x,y,"ro-- ",LineWidth=5)`| 绘制⼀条红⾊ (`r`) 虚线 (`--`)并使⽤圆形 (`o`) 标记，线宽很⼤。 |
| [`hold`](https://www.mathworks.com/help/matlab/ref/hold.html)` on`<br>`…`<br>`hold off` | 在此區間內的所有動作都會再同⼀張圖上進⾏。 |
| [`title`](https://www.mathworks.com/help/matlab/ref/title.html) ("My Title") | 在圖上添加標題。 |
| [`xlabel`](https://www.mathworks.com/help/matlab/ref/xlabel.html)`("x")`<br>[`ylabel`](https://www.mathworks.com/help/matlab/ref/ylabel.html)`("y")` | 在坐標軸上添加標籤。 |
| [`legend`](https://www.mathworks.com/help/matlab/ref/legend.html)`("a","b","c")` | 在圖上添加圖例。 |

### 表格

| **範例** | **說明** |
| --- | --- |
| [`data.HeightYards`](https://www.mathworks.com/help/matlab/matlab_prog/access-data-in-a-table.html) | 從表格 `data` 中提取變數 `HeightYards` 。 |
| `data.HeightMeters = data.HeightYards * 0.9144` | 從表格(`data`)中的數據(`HeightYards`)去定義另⼀個數據(`HeightMeters`)。 |

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
| [`for`](https://www.mathworks.com/help/matlab/ref/for.html)` c = 1:3` <br>`disp(c)`<br>`end` | 迴圈計數器的值 (`c`)依序為 `1:3`  ( `1`到`3` 間隔`1`)。<br>迴圈顯⽰ `c` 的每個值。 |
