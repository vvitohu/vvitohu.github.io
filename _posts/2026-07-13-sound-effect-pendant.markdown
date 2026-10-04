---
layout: none
title: 低功耗音效吊飾
subtitle: Embedded Systems, Program Design
date: 2026-07-13
img:
- /sound-effect-pendant/sound-effect-pendant.webp
- /sound-effect-pendant/sound-effect-pendant-back.webp
- /sound-effect-pendant/sound-effect-pendant-pcb.png
thumbnail: /sound-effect-pendant/sound-effect-pendant-thumbnail.webp
alt: 低功耗音效吊飾
project-date: July 2026
type: Embedded Systems Project
category: Embedded Systems, Program Design
featured: true
home_order: 0
project_key: low-power-sound-effect-pendant
project_categories:
- embedded
- hardware
- education
card_meta: EMBEDDED · ATtiny85
thumbnail_alt: 低功耗音效吊飾 PCB 配置圖
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
### 低功耗音效吊飾

這個專案以 **ATtiny85、按鈕與被動蜂鳴器**製作一款單鍵觸發的音效吊飾。我希望裝置在閒置時盡量減少耗電，因此沒有讓微控制器持續輪詢按鈕，而是讓它進入 Power-down，等到外部中斷發生後才喚醒並播放旋律。

除了完成播放流程，我也把旋律與節奏資料從控制邏輯中分離。不同音效可以沿用相同的喚醒、播放與睡眠架構，只需更換音高和時間陣列，後續修改會比較直接。

### 設計與實作

- **低功耗待機**
  PB2／INT0 作為喚醒輸入。待機時，程式停用 ADC 與類比比較器，並讓 ATtiny85 進入 `SLEEP_MODE_PWR_DOWN`；按鈕拉至低電位後才喚醒裝置。

- **旋律資料存入 Flash**
  音高與節奏陣列使用 `PROGMEM`，播放時再逐項讀取，避免有限的 SRAM 被旋律資料占用。

- **處理休止與重複觸發**
  頻率 `0` 代表休止符，音符之間保留短暫間隔。播放結束後，程式會確認按鈕已穩定放開 30 ms，再回到睡眠，避免同一次按壓重複觸發。

- **共用程式架構**
  目前整理了五份音效程式。它們共用相同的硬體控制流程，只替換各自的音高、節奏和休止資料。

### 運作流程

1. 上電後設定蜂鳴器、上拉按鈕與未使用腳位。
2. ATtiny85 進入 Power-down，等待按鈕觸發外部中斷。
3. 喚醒後，程式從 Flash 讀取音高與時間資料。
4. PB1 依序驅動被動蜂鳴器，遇到休止符時保持靜音。
5. 播放結束並確認按鈕放開後，裝置再次進入睡眠。

### 教學延伸

我另外整理了一份 60～90 分鐘的進階講義，讓已有 Arduino 開啟與燒錄經驗的學生練習修改音高與時間陣列。講義將底層的中斷、睡眠與蜂鳴器控制保留在既有架構中，讓學習重點放在旋律資料、節奏安排和測試結果。

### 目前進度

五份 Arduino sketch 與進階講義已完成整理，旋律陣列和時間陣列的項目數也已逐一核對。下一步仍需補上可重現的 ATtiny85 建置與燒錄設定，並透過實機量測待機電流、音量與續航；目前不將「低功耗」延伸解讀為已完成的量測結果。

### 程式碼

[在 GitHub 查看 Sound-effect-pendant 原始碼](https://github.com/vvitohu/Sound-effect-pendant)
