---
layout: database_courses
title: "草圖與基本繪圖工具"
type: onshape_menu
permalink: /database_courses/modeling/basic
---
# 基礎特徵操作

當草圖完成「完全定義」後，下一步就是將2D的圖形轉成3D的模型，接下來要介紹兩個常用的建立形狀工具。

### 1. 擠出 (Extrude)

這是最常用的功能，將 2D 草圖沿著垂直方向「推」出指定厚度，進而形成3D的實體。

- **新建 ：** 建立實體。
- **加入 ：** 增加材料。
- **移除 ：** 挖孔、切削或開槽。
- **操作重點：** 需設定「深度 (Depth)」或「終止條件」。

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/modeling_bas/1.png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/modeling_bas/2.png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>
---

### 2. 旋轉 (Revolve)

旋轉的建立方式與擠出非常像，只是多了一個旋轉軸，將 2D 草圖繞著一條**軸線**旋轉出形狀。這對於圓柱體、球體或輪胎等在建模時非常方便。

- **關鍵要素：** 一個封閉的**「草圖區域」**加上一條**「旋轉軸 」**。

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/modeling_bas/3.png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>