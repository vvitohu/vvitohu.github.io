---
layout: none
title: 低功耗音效吊飾
subtitle: Embedded Systems, Program Design
date: 2026-07-13
img: []
thumbnail: ""
alt: 低功耗音效吊飾
project-date: July 2026
type: Embedded Systems Project
category: Embedded Systems, Program Design
featured: false
home_order: 0
project_key: low-power-sound-effect-pendant
project_categories:
- embedded
- hardware
- education
card_meta: EMBEDDED · ATtiny85
thumbnail_alt: 低功耗音效吊飾
project_meta: EMBEDDED / HARDWARE / 2026
project_summary: 以 ATtiny85、按鈕與被動蜂鳴器建構單鍵喚醒、播放旋律並返回深度睡眠的互動電子吊飾。
project_results:
- 以 PB2／INT0 實作按鈕喚醒，並於播放完成後返回 Power-down
- 旋律與節奏資料使用 PROGMEM 存入 Flash，降低 SRAM 使用負擔
- 建立五份共用低功耗控制架構的 Arduino 音效程式
- 整理一份供學生修改音高與時間陣列的進階課程講義
project_tools: ATtiny85 · Arduino C/C++ · AVR · Interrupts · Power-down Sleep · PROGMEM · Passive Buzzer
project_objective: 建立一套以單鍵觸發短旋律、閒置時進入深度睡眠的音效吊飾程式架構，並將音高與節奏資料整理成可供教學修改的形式。
project_decisions: 使用 PB2／INT0 作為低電位喚醒輸入、PB1 驅動被動蜂鳴器，將旋律資料存入 Flash，並加入休止符、音符間隔與 30 ms 穩定放開判定。
project_validation: 目前可靜態確認五份 sketch 的旋律與時間陣列長度一致，且具備完整的初始化、喚醒、播放、按鍵放開判定與睡眠流程；編譯、燒錄、功耗與實機播放結果尚未確認。
---
### 🚀 低功耗音效吊飾 — 把一段旋律放進口袋

這是一款以 **ATtiny85、按鈕與被動蜂鳴器**構成的互動音效吊飾。裝置的程式流程以低功耗待機為核心：平時進入 AVR Power-down，按下按鈕後由外部中斷喚醒，接著從 Flash 逐步讀取音高與時間資料、播放一段單音旋律，待按鈕穩定放開後再回到睡眠。

專案現有五份 Arduino sketch，共用相同的按鍵喚醒、播放、消抖與睡眠架構，並以不同的音高、節奏及休止資料形成多組音效版本。另有一份 60～90 分鐘的進階課程講義，讓已有 Arduino 程式開啟與燒錄經驗的學生聚焦修改音高與時間陣列；講義已完成，但課程是否實際舉辦尚無資料可確認。

### 核心特色

- **單鍵喚醒與播放**  
  按鈕接於 PB2／INT0，使用內部上拉並於按下時拉至低電位，讓 ATtiny85 從 Power-down 喚醒並進入播放流程。

- **以睡眠流程降低待機耗電**  
  程式使用 `SLEEP_MODE_PWR_DOWN`，停用 ADC 與類比比較器，並將未使用腳位設為上拉輸入；平台支援時，也會在睡眠期間停用 Brown-out Detector。

- **以 Flash 保存旋律資料**  
  音高與節奏陣列使用 `PROGMEM`，播放時再透過 `pgm_read_byte()` 或 `pgm_read_word()` 逐項讀取，減少對 ATtiny85 SRAM 的占用。

- **清楚的節奏與觸發控制**  
  程式支援以頻率 `0` 表示休止符，並在音符之間保留短暫間隔；播放結束後，按鈕必須連續維持放開狀態 30 ms，才會被判定為一次操作完成。

- **可替換的音效資料**  
  五份 sketch 沿用相同硬體控制骨架，現有步數分別為 59、6、12、11 與 22，可透過替換音高與時間資料形成不同長度及節奏的單音旋律。

- **延伸為教學內容**  
  進階講義提供音高表、陣列範例、分階段練習、常見問題與成果檢核，將底層的按鈕、睡眠和蜂鳴器控制與學生主要修改區域分開。

### 系統流程

1. 上電後設定 PB1 蜂鳴器輸出、PB2 上拉按鈕，以及未使用腳位與類比周邊。
2. 若按鈕尚未按下，ATtiny85 進入 Power-down，等待 PB2 低電位觸發 INT0。
3. 喚醒後，程式從 Flash 依序讀取每一步的頻率與時間。
4. 頻率大於 `0` 時由 PB1 驅動被動蜂鳴器；頻率為 `0` 時保留靜音停頓。
5. 所有步驟播放完成後，程式等待按鈕穩定放開 30 ms。
6. 主迴圈再次進入睡眠，等待下一次按壓。

#### 🛠 技術規格總覽

| **規格項目** | **可確認配置** |
| :--- | :--- |
| 微控制器 | ATtiny85 |
| 程式語言 | Arduino C/C++，搭配 AVR 中斷、睡眠與 Flash 存取 API |
| 互動輸入 | SW1 按鈕，PB2／INT0，`INPUT_PULLUP`，按下接 GND |
| 聲音輸出 | BZ1 被動蜂鳴器，由 PB1 透過 `tone()`／`noTone()` 驅動 |
| 待機模式 | AVR Power-down，INT0 低電位喚醒 |
| 資料儲存 | 音高與時間陣列存於 Flash（`PROGMEM`） |
| 觸發控制 | 中斷喚醒、播放完成後等待連續 30 ms 穩定放開 |
| 現有程式 | 五份獨立 Arduino sketch，共用低功耗控制架構 |
| 教學文件 | 一份規劃為 60～90 分鐘的進階音效課程講義 |
| 通訊功能 | 程式未包含網路、藍牙、序列通訊或外部資料傳輸 |

### 目前狀態

目前可確認專案包含五份完整 Arduino sketch 與一份進階課程講義。靜態核對顯示，各 sketch 的旋律陣列與對應時間陣列數量一致，並具備 `setup()`、`loop()` 及其呼叫的喚醒、播放、按鍵放開判定與睡眠函式。

現有資料尚未提供可重現的建置設定、ATtiny85 board core 與版本、時脈／fuse、燒錄方式、BOM、原理圖、PCB 原始檔、外殼設計或展示素材；也沒有編譯輸出、燒錄紀錄、待機電流、續航、音量與實機播放測試。因此，程式的可編譯性、實體成品完成度、低功耗量測結果與課程實施成果均不在目前可確認範圍內。
