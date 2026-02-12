---
layout: database_courses
title: "MATLAB"
type: matlab_menu
permalink: /database_courses/matlab
---
## 基本語法

| **範例** | **說明** |
| --- | --- |
| [`x = pi`](https://www.mathworks.com/help/matlab/matlab_env/create-and-edit-variables.html) | 使用等號 (`=`) 建立變數並給其值。左側 (`x`) 是變數名稱，右側 (`pi`) 是其值。 |
| [`y = sin(-5)`](https://www.mathworks.com/help/matlab/learn_matlab/calling-functions.html) | 使用括號`( )`提供函數輸入。 |

## **桌面管理**

| **函数** | **範例** | **說明** |
| --- | --- | --- |
| [`save`](https://www.mathworks.com/help/matlab/ref/save.html) | `save data.mat`  | 將目前工作區保存到MAT文件中。 |
| [`load`](https://www.mathworks.com/help/matlab/ref/load.html) | `load data.mat` | 將MAT文件中的變數載入到工作區。 |
| [`clear`](https://www.mathworks.com/help/matlab/ref/clear.html) | `clear` | 清除工作區的所有變數。 |
| [`clc`](https://www.mathworks.com/help/matlab/ref/clc.html) | `clc` | 清除命令行窗口中的所有文本。 |
| [`format`](https://www.mathworks.com/help/matlab/ref/format.html) | `format long` | 更改命令行窗口中數值輸出的顯示方式。 |

## **數組類別**

| **範例** | **說明** |
| --- | --- |
| `4` | 標量 |
| `[3 5]` | 列向量 |
| `[1;3]` | 行向量 |
| `[3 4 5; 6 7 8]` | 矩陣 |

## **等間距向量**

| **範例** | **說明** |
| --- | --- |
| `1:4` | 使用冒號運算子 (`:`)，建立一個從 `1` 到 `4`，間距為 `1` 的向量。 |
| `1:0.5:4` | 建立一個從 `1` 到 `4`，間距為 `0.5` 的向量。 |
| [`linspace`](https://www.mathworks.com/help/matlab/ref/double.linspace.html)`(1,10,5)` | 建立一個包含 `5` 個元素的向量。這些值從 `1` 到 `10` 等間距間隔。 |

## **矩陣建立**

| **範例** | **說明** |
| --- | --- |
| [`rand`](https://www.mathworks.com/help/matlab/ref/double.rand.html)`(2)` | 建立一個`2`行`2`列 數值介於`0-1`的隨機方陣。 |
| [`zeros`](https://www.mathworks.com/help/matlab/ref/zeros.html)`(2,3)` | 建立一個 `3` 行 `2` 列的零矩陣。 |
| [`ones`](https://www.mathworks.com/help/matlab/ref/ones.html)`(2,3)` | 建立一個`3`行`2`列的全一矩陣。 |
| `eye(3)` | 建立一個`3`行`3`列的單位矩陣 |

## 數組索引

| **範例** | **說明** |
| --- | --- |
| `A(`[`end`](https://www.mathworks.com/help/matlab/ref/end.html)`,2)` | 最後一列第二行的元素。 |
| `A(2,:)` | 第二列所有元素。 |
| `A(1:3,:)` | 前三列所有元素。 |
| `A(2) = 11` | 將數組中第二個元素改為11。 |

## 數組運算

| **範例** | **說明** |
| --- | --- |
| `[1 2; 3 4] + 1`
`ans =`
    ` 2     3`
    ` 4     5` | 執行[數組加法](https://www.mathworks.com/help/matlab/ref/plus.html)。 |
| `[1 1; 1 1]*[2 2; 2 2]`
`ans =`
     `4     4`
     `4     4` | 執行[矩陣乘法](https://www.mathworks.com/help/matlab/matlab_prog/array-vs-matrix-operations.html#btyv9yp-4)。 |
| `[1 1; 1 1].*[2 2; 2 2]
ans =
     2     2
     2     2` | 執行[按元素乘法](https://www.mathworks.com/help/matlab/matlab_prog/array-vs-matrix-operations.html#bu90xxy-1)。 |

## 多個輸出

| **範例** | **說明** |
| --- | --- |
| `[xrow,xcol] = [size](https://www.mathworks.com/help/matlab/ref/double.size.html)(x)` | 將 `x` 中的行數和列數儲存為兩個不同變數。 |
| `[xMax,idx] = [max](https://www.mathworks.com/help/matlab/ref/double.max.html)(x)` | 計算 `x` 的最大值(`xMax`)及其對應的索引值(`idx`)。 |

## 文檔

| **範例** | **說明** |
| --- | --- |
| [`doc](https://www.mathworks.com/help/matlab/ref/doc.html) randi` | 開啟 `randi` 函數的說明文檔頁。 |

## 繪圖

| **範例** | **說明** |
| --- | --- |
| [`plot](https://www.mathworks.com/help/matlab/ref/plot.html)(x,y,"ro--",LineWidth=5)` | 绘制一条红色 (`r`) 虚线 (`--`)并使用圆形 (`o`) 标记，线宽很大。 |
| [`hold](https://www.mathworks.com/help/matlab/ref/hold.html) on`
…
`hold off` | 在此區間內的所有動作都會再同一張圖上進行。 |
| [`title](https://www.mathworks.com/help/matlab/ref/title.html)("My Title")` | 在圖上添加標題。 |
| [`xlabel](https://www.mathworks.com/help/matlab/ref/xlabel.html)("x")[ylabel](https://www.mathworks.com/help/matlab/ref/ylabel.html)("y")` | 在坐標軸上添加標籤。 |
| [`legend](https://www.mathworks.com/help/matlab/ref/legend.html)("a","b","c")` | 在圖上添加圖例。 |

## 表格

| **範例** | **說明** |
| --- | --- |
| [`data.HeightYards`](https://www.mathworks.com/help/matlab/matlab_prog/access-data-in-a-table.html) | 從表格 `data` 中提取變數 `HeightYards`。 |
| `data.HeightMeters = data.HeightYards*0.9144` | 從表格(`data`)中的數據(`HeightYards`)去定義另一個數據(`HeightMeters`)。 |

## 邏輯索引

| **範例** | **說明** |
| --- | --- |
| [`[5 10 15] > 12`](https://www.mathworks.com/help/matlab/matlab_prog/array-comparison-with-relational-operators.html) | 將向量元素去和`12`進行比較。 |
| [`v1(v1 > 6)`](https://www.mathworks.com/help/matlab/matlab_prog/find-array-elements-that-meet-a-condition.html) | 提取 `v1` 中大於 `6` 的所有元素。 |
| `x(x==999) = 1` | 將 `x` 中所有等於 `999` 的值，替換為值 `1`。 |

## 編程

| **範例** | **說明** |
| --- | --- |
| [`if](https://www.mathworks.com/help/matlab/ref/if.html) x > 0.5
    y = 3
else
    y = 4
end` | 如果 `x` 大於 `0.5`，則將 `y` 設為 `3`。
否則，將 `y` 設定為 `4`。 |
| [`for](https://www.mathworks.com/help/matlab/ref/for.html) c = 1:3
    disp(c)
end` | 迴圈計數器的值 (`c`)依序為 1:3(`1`到`3` 間隔`1`）。
迴圈顯示 `c` 的每個值。 |

<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</table>