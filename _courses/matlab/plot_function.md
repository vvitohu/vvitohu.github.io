---
layout: database_courses
title: "繪圖函數"
type: matlab_menu
permalink: /database_courses/matlab/plot_function
---
# MATLAB

___

### 繪圖函數

| **範例** | **說明** |
| --- | --- |
| [`plot`](https://www.mathworks.com/help/matlab/ref/plot.html)`(x,y,"ro-- ",LineWidth=5)`| 绘制⼀条红⾊ (`r`) 虚线 (`--`)并使⽤圆形 (`o`) 标记，线宽很⼤。 |
| [`hold`](https://www.mathworks.com/help/matlab/ref/hold.html)` on`<br>`…`<br>`hold off` | 在此區間內的所有動作都會再同⼀張圖上進⾏。 |
| [`title`](https://www.mathworks.com/help/matlab/ref/title.html) ("My Title") | 在圖上添加標題。 |
| [`xlabel`](https://www.mathworks.com/help/matlab/ref/xlabel.html)`("x")`<br>[`ylabel`](https://www.mathworks.com/help/matlab/ref/ylabel.html)`("y")` | 在坐標軸上添加標籤。 |
| [`legend`](https://www.mathworks.com/help/matlab/ref/legend.html)`("a","b","c")` | 在圖上添加圖例。 |

### 線條樣式與顏色

| **線條樣式** | **說明** |
| --- | --- |
| `-`(減號) | 實線(預設) |
| `--` | 虛線 |
| `-.` | 虛線和點連成的線段 |
| `:` | 由點連成的線段 |
| `none` | 不繪出線段 |

.

| **線條顏色** | **說明** |
| --- | --- |
| `g` | 綠色 (green) |
| `m` | 洋紅色 (magenta) |
| `b` | 藍色 (blue) (預設) |
| `c` | 青藍色 (cyan) |
| `w` | 白色 (white) |
| `r` | 紅色 (red) |
| `k` | 黑色 (black) |
| `y` | 黃色 (yellow) |

.
### 資料點的顯示符號
| **符號** | **說明** |
| --- | --- |
| `.` | 繪點 |
| `*` | 繪出星號 |
| `o` | 繪出小圓 |
| `+` | 繪出加號 |
| `x` | 繪出打叉符號 |
| `<` | 繪出◁符號 |
| `>` | 繪出▷符號 |
| `^` | 繪出△符號 |
| `v` | 繪出▽符號 |
| `s`或`square` | 繪出正方形 |
| `d`或`diamond` | 繪出菱形 |
| `p`或`pentagram` | 匯出五角形 |
| `h`或`hexagram` | 繪出六角形 |
| `none ` | 不會出任何形狀(預設) |


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
