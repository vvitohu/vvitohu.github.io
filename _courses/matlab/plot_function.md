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
| [`plot`](https://www.mathworks.com/help/matlab/ref/plot.html)`(x,y,'ro-- ',LineWidth=5)`| 繪製⼀條红⾊ (`r`) 虛線 (`--`)並使⽤圓形 (`o`) 標記，線寬=5。 |
| [`hold`](https://www.mathworks.com/help/matlab/ref/hold.html)` on`<br>`…`<br>`hold off` | 在此區間內的所有動作都會再同⼀張圖上進⾏。 |
| [`title`](https://www.mathworks.com/help/matlab/ref/title.html) `("My Title")` | 在圖上添加標題。 |
| [`xlabel`](https://www.mathworks.com/help/matlab/ref/xlabel.html)`('x')`<br>[`ylabel`](https://www.mathworks.com/help/matlab/ref/ylabel.html)`('y')`<br>[`zlabel`](https://www.mathworks.com/help/matlab/ref/zlabel.html)`('z')`(用於三維繪圖) | 在坐標軸上添加標籤。 |
| [`legend`](https://www.mathworks.com/help/matlab/ref/legend.html)`('a','b','c')` | 在圖上添加圖例。 |
| `legend off` | 清除圖例 |
| `text(x,y,'text')` | 在圖形中位置為(x,y)之處加入註解文字 |

### 線條樣式與顏色

| **線條樣式** | **說明** |
| --- | --- |
| `-`(減號) | 實線(預設) |
| `--` | 虛線 |
| `-.` | 虛線和點連成的線段 |
| `:` | 由點連成的線段 |
| `none` | 不繪出線段 |

.

| **線條顏色** | **說明** | **線條顏色** | **說明** |
| --- | --- | --- | --- |
| `g` | 綠色 (green) | `w` | 白色 (white) |
| `m` | 洋紅色 (magenta) | `r` | 紅色 (red) |
| `b` | 藍色 (blue) (預設) | `k` | 黑色 (black) |
| `c` | 青藍色 (cyan) | `y` | 黃色 (yellow) |


### 資料點顯示符號

| **符號** | **說明** | **符號** | **說明** |
| --- | --- | --- | --- |
| `.` | 繪點 | `^` | 繪出△符號 |
| `*` | 繪出星號 | `v` | 繪出▽符號 |
| `o` | 繪出小圓 | `s`或`square` | 繪出正方形 |
| `+` | 繪出加號 | `d`或`diamond` | 繪出菱形 |
| `x` | 繪出打叉符號 | `p`或`pentagram` | 匯出五角形 |
| `<` | 繪出◁符號 | `h`或`hexagram` | 繪出六角形 |
| `>` | 繪出▷符號 | `none ` | 不會出任何形狀(預設) |


### 繪圖範圍與顯示方式

| **範例** | **說明** |
| --- | --- |
| `axis([xmin, xmax, ymin, ymax])` | 更改圖形顯示範圍 |
| `grid on/off` | 設定顯示格線 |
| `box on/off` | 設定顯示圖形外框 |
| `axis normal` | 預設的寬高比,可調整比例  |
| `axis square` | 寬高比1:1 |
| `axis equal` | 坐標軸比例1:1 |
| `axis tight` | 圖形緊貼繪圖區域外框 |

### 建立繪圖視窗

| **範例** | **說明** |
| --- | --- |
| `figure` | 建立新的繪圖視窗 |
| `figure(n)` | 建立新的繪圖視窗，<br>視窗標題為Figure n |
| `subplot(m,n,p)` | 繪圖視窗分成𝑚 × 𝑛個區域，並在第p個位置建立一個繪圖區。(位置p的計算方式是由左到右，由上而下來排列) |
| `subplot(m,n,p,'replace')` | 於第p個位置建立子繪圖區，若此已有圖形存在則取代掉原有的圖。 |

### 更簡潔繪圖函數

| **範例** | **說明** |
| --- | --- |
| `fplot('f_str',[xmin,xmax])` | 繪出函數f_str的圖形，x軸的範圍取xmin到xmax |
| `fplot('f_str',[xmin,xmax,ymin,ymax])` | 繪出函數f_str的圖形，x軸的範圍取xmin到xmax，y軸的範圍取ymin到ymax |
| `ezplot('f_str',[xmin,xmax])` | 繪出函數f_str的圖形，繪圖範圍在x與y方向均取xmin到xmax |
| `ezplot('f_str',[xmin,xmax,ymin,ymax])` | 繪出函數f_str的圖形，繪圖範圍在x方向取xmin到xmax，在y方向取ymin到ymax |
| `ezplot('fx','fy',[tmin,tmax]) ` | 參數繪圖，匯出(fx(t),fy(t))，t取tmin到tmax的參數 |

### 三維圖形的基本編修

| **範例** | **說明** |
| --- | --- |
| `hidden on/off` | 設定隱藏線 |
| `axis on/off` | 設定座標軸與刻度 |
| `box on/off` | 設定顯示圖形外框 |
| `hold on/off ` | 新產生的圖形會繪製在同一張圖上 |
| `grid on/off` | 設定顯示格線 |
| `view(az,el)` | 設定圖形的視角<br>其中方位角為az，仰角為el，單位為度 |

### 繪製三維的網格圖

| **範例** | **說明** |
| --- | --- |
| `[xx,yy]=meshgrid(vx,vy)` | 把兩個向量`VX` `vy`，建構出兩個二維矩陣xx與yy |
| `mesh(xx,yy,zz)` | 以x、y與z座標之集合，所組成的矩陣來繪出三維的網格圖 |
| `mesh(z)` | 二維矩陣z的維度為𝑚 × 𝑛，則mesh(z)可繪出x座標從1到n，y座標從1到m的三維網格圖 |
| `meshc(xx,yy,zz)` | 匯出網格圖並附帶函數圖形等高線圖 |
| `waterfall(xx,yy,zz)` | 以切片方式來繪製三維立體圖 |
| `surf(xx,yy,zz)` | 繪製三維曲面圖 |
| `surfc(xx,yy,zz)` | 同surf並附帶函數圖形等高線圖 |

### 更簡潔三維繪圖函數

| **範例** | **說明** |
| --- | --- |
| `ezmesh(f,[xmin,xmax,ymin,ymax])` | 同mesh,以60x60個網格數繪出f的三維圖形<br>若繪圖範圍省略，則預設x與y方向的範圍均是從−2𝜋~2𝜋 |
| `ezmeshc(f,[xmin,xmax,ymin,ymax])` | 同meshc |
| `ezsurf(f,[xmin,xmax,ymin,ymax])` | 同surf |
| `ezsurfc(f,[xmin,xmax,ymin,ymax])` | 同surfc |

### 三維圖形展示函數

| **範例** | **說明** |
| --- | --- |
| `peaks` | 以49x49個資料點繪製數學函數peaks，範圍x與y方向同為-3~3 |
| `peaks(n)` | 同peaks，但以𝑛 × 𝑛個資料點來繪製 |
| `[xx,yy,zz]=peaks(n)` | 以𝑛 × 𝑛個資料點計算數學函數peaks的值，並把資料點分別存放在矩陣xx、yy與zz內 |

### 空間曲線繪圖

| **範例** | **說明** |
| --- | --- |
| `plot3(x,y,z,'str')` | 繪製三維空間線條 |


### 等高線繪圖

| **範例** | **說明** |
| --- | --- |
| `contour(xx,yy,zz,n)` | 繪製三維空間線條 |
| `cmat=contour(xx,yy,zz)`<br>`clabel(cmat)` | 在等高線圖內加上高度的標記 |
| `clabel(cmat,[z1,z2,...])` | 在高度為[z1,z2,z3,...]的等高線上加上高度標記 |
| `contour3(xx,yy,zz,n)` | 分別以矩陣xx、yy與zz繪出n條三維的等高線 |
| `contour3(xx,yy,zz,[z1,z2,...])` | 指定繪出高度為z1,z2,...的三維等高線圖 |


