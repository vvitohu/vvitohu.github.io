---
layout: database_courses
title: "介面總覽"
type: onshape_menu
permalink: /database_courses/interface/interface_overview
---
# 介面總覽

## 一、文件管理中心

當你登入 Onshape 後，首先映入眼簾的是「文件管理中心」。這裡就像是你的雲端檔案櫃。

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
        <img src="{{ site.baseurl }}/img/courses/onshape/ifov/image_(2).png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
        <p class="text-muted" style="font-size: 1.2rem;"></p>
    </div>

### **1. 左側導覽欄**

這裡就像是你的 3D 檔案圖書館，左邊的選單是你找檔案的好幫手：

- **本人所擁有：** 這裡放的是所有你自己建立的文件與資料夾。
- **最近開啟的：** 幫你抓出最近動過的檔案，包含你自己做的跟看別人的公開檔。
- **與本人共享：** 別人分給你一起看的檔案會出現在這。
- **公開：** 可以在這裡挖寶，看看全球各地的設計高手做了什麼。

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
        <img src="{{ site.baseurl }}/img/courses/onshape/ifov/Onshape_教學內容_(1).png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
        <p class="text-muted" style="font-size: 1.2rem;"></p>
    </div>

### **2.右上角小圖示：**

這裡有**通知中心**、**學習中心**（官方教學片都在這）、**說明功能表**（快捷鍵表在這找），還有最關鍵的**個人帳號資訊**（切換中文、改單位都在這）。

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
        <img src="{{ site.baseurl }}/img/courses/onshape/ifov/Onshape_教學內容_(2).png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
        <p class="text-muted" style="font-size: 1.2rem;"></p>
    </div>

### **3.建立文件**

 點下大大的藍色「建立」，就能開新文件或是資料夾來分類。

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
        <img src="{{ site.baseurl }}/img/courses/onshape/ifov/Onshape_教學內容_(3).png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
        <p class="text-muted" style="font-size: 1.2rem;"></p>
    </div>

## 二、零件設計工作區 (Part Studio)

點開文件後，你會進入核心設計介面。這裡的配置非常直覺，分為四大區塊：

### **A. 中間繪圖區 (Graphics Area)**

- **視覺中心：** 預設會有前 (Front)、上 (Top)、右 (Right) 三個基準面。
- **導覽方塊 (View Cube)：** 右上角的方塊可以讓你快速切換視角（如：等角視圖 Isometric）。

### **B. 上方工具列 (Toolbar)**

這是你的工具箱。根據目前的模式，它會自動切換：

- **3D 模式：** 顯示擠出 (Extrude)、旋轉 (Revolve)、圓角 (Fillet) 等特徵工具。
- **2D 草圖模式：** 當你進入 Sketch 時，工具列會變成直線、圓、矩形與約束工具。

<div style="text-align: center; margin-left: -5%; margin-right: -5%;">
        <img src="{{ site.baseurl }}/img/courses/onshape/ifov/Onshape_課程簡報_(6).png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
        <p class="text-muted" style="font-size: 1.2rem;"></p>
    </div>

### **C. 左側列表 (Feature List)**

1. **特徵列表：**
特徵列表不僅是清單，它代表了建模的**先後順序**。在 Onshape 中，修改過去的步驟，後續的模型會隨之連動更新。
    1.  **預設幾何**
    在列表的最上方，預設會有四個項目：
        - **Origin (原點)：** 空間中的絕對座標 (0,0,0)。
        - **Top / Front / Right (基準面)：** 提供繪製草圖的初始平面。
        
        <div class="alert alert-warning" role="alert">
        💡
        
         小撇步： 點擊旁邊的「眼睛圖示」，可以快速隱藏這些平面，讓畫面更乾淨。
        
        <div>
        
    2. **特徵** 
        
        當你開始繪圖或建模，這裡會依序出現：
        
        - **Sketch (草圖)：** 所有的 2D 幾何形狀。
        - **Features (特徵)：** 如 Extrude (擠出)、Fillet (圓角)、Shell (薄殼) 等 3D 指令。
        
        <div class="alert alert-warning" role="alert">
        ⚠️
        
        - 順序重要性： 列表是由上而下執行的。如果你把「圓角」移到「擠出」之前，圓角就會失效。
        <div>
        
    
    <div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/ifov/Onshape_課程簡報_(4).png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>

- **零件清單：**
    
    位於特徵列表的下方：
    
    - 這裡顯示目前工作區產生的所有**實體零件**。
    - 你可以針對單一零件點擊右鍵：設定**材質**、**計算質量屬性**或**修改顏色**。
    
    <div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/ifov/Onshape_課程簡報_(5).png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>

### **D. 下方分頁欄 (Document Tabs)**

- Onshape 採「多頁籤」設計。一個文件內可以包含多個 **Part Studios**（零件設計）、**Assemblies**（組合件）以及 **Drawings**（工程圖）。
    
    <div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/ifov/Onshape_課程簡報_(2).png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>
    
    <div style="text-align: center; margin-left: -5%; margin-right: -5%;">
            <img src="{{ site.baseurl }}/img/courses/onshape/ifov/Onshape_課程簡報_(3).png" style="width: 120%; max-width: 1000px;" class="img-fluid w-50 rounded shadow">
            <p class="text-muted" style="font-size: 1.2rem;"></p>
        </div>