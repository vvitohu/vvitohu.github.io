---
layout: database_courses
title: "幾何約束與尺寸標註"
type: onshape_menu
permalink: /database_courses/sketch/geometric_constraints_and_dimensioning
---
# 幾何約束與尺寸

在 Onshape 或任何參數化建模軟體中，**「草圖 (Sketch)」** 是所有 3D 零件的靈魂。而在設計一個零件時，最重要的東西是這個零件要有一個確定的尺寸，才可以在製作時保持零件的精準與精細。
要畫出精準的草圖，靠的不是手感，而是**幾何約束**與 **尺寸**。

你可以把這兩者想像成你與電腦溝通的方式：**幾何約束規定了形狀的關係，而尺寸規定了形狀的大小**，透過這樣告訴電腦你的圖形要長甚麼樣子**。**

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/gcd/1.png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>
---

## 1. 幾何約束

幾何約束定義了兩條線或點之間的「相對關係」。當你移動其中一個元素時，另一個會跟著連動，以維持設定好的規則。

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/gcd/2.png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>

### 常用的幾何約束表


<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/gcd/3.png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>
---

## 2. 尺寸標註

當幾何關係確定後，我們需要給他一個精確的數值，這時就需要尺寸工具，他位在幾何約束工具的前面，也可使用快捷鍵( D )來使用工具。

尺寸工具的使用方式非常簡單且直觀，你要定甚麼東西的尺寸，就去點那個物件，可以重複點。也可使用快捷鍵( D )來使用工具

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/gcd/4.png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>

- **尺寸工具可標定的項目：**
    - **長度：** 直線段的長短。
    - **距離：** 兩點之間、點與線之間，或是兩條平行線之間的間距。
    - **半徑與直徑：** 用於標定圓弧（半徑）或圓（直徑）的大小。
    - **夾角：** 兩條不平行直線之間的角度。

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/gcd/5.png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>

---

## 💡 畫圖小撇步

建議初學者按照這個步驟去完成你的草圖：先「約束」後「尺寸」

1. **大致構圖：** 畫出零件的大概輪廓。
2. **套用幾何約束：** 先設定好誰跟誰平行、誰跟誰垂直。
3. **最後標註尺寸：** 當形狀穩固後，再輸入具體的數值。

<div class="alert alert-warning" role="alert">
💡

Q : 為什麼要先幾何約束再標尺寸？ 
<br>
A : 如果先給尺寸再給約束，有時候草圖會因為幾何關係的變動而產生劇烈的扭曲。

</div>


---