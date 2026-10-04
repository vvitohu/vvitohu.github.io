---
layout: none
title: Arduino 17 鍵觸控筆電子琴
subtitle: Embedded Systems, PCB Design
date: 2026-07-11
img:
- /stylophone/stylophone.png
- /stylophone/stylophone-front.png
- /stylophone/stylophone-pcb.png
thumbnail: /stylophone/stylophone-thumbnail.png
alt: Arduino 17 鍵觸控筆電子琴
project-date: July–August 2026
type: Hardware Project
category: Embedded Systems, PCB Design
featured: true
home_order: 0
project_key: arduino-17-key-stylus-synth
project_categories:
- embedded
- electronics
- pcb
card_meta: EMBEDDED · ARDUINO
thumbnail_alt: Arduino 17 鍵觸控筆電子琴 PCB 配置圖
project_meta: EMBEDDED / PCB / 2026
project_summary: 以 Arduino Nano 讀取 17 個金屬琴鍵，讓接地觸控筆演奏三段音域，並整合雙層 PCB 設計與製造輸出。
project_results:
- 建立 17 鍵 C4–E5 半音階與低、中、高三段音域的控制程式
- 以接地觸控筆形成直覺的琴鍵輸入介面
- 使用單一 A6 類比輸入辨識兩顆音域按鍵
- 建立雙層 KiCad PCB、BOM、Gerber 與鑽孔輸出
project_tools: Arduino Nano · C/C++ · KiCad 9 · PCB Design · Electronics · tone()
project_objective: 將導電琴鍵、接地觸控筆與 Arduino 音高控制整合成可演奏的實體互動電子琴，並把控制電路與琴鍵配置收斂至自製 PCB。
project_decisions: 採用 17 鍵半音階、三段持續記憶音域與 5 ms 輸入穩定判定；兩顆音域按鍵共用 A6 類比輸入，琴鍵則依固定順序掃描。
project_validation: 現有檔案可靜態確認主控制程式、原理圖、雙層 PCB 佈局與製造輸出存在；實體組裝、完整硬體測試與課堂使用成果仍待補充驗證。
---
### Arduino 17 鍵觸控筆電子琴

這個專案以 **Arduino Nano** 製作一款用金屬觸控筆演奏的電子琴。觸控筆接地後，碰觸 17 個導電琴鍵即可選取 C4 至 E5 的半音階；兩顆按鍵則用來切換低、中、高三段音域。

我的重點不只是在 Arduino 上播放音高，也包括輸入方式、音域控制與 PCB 配置。程式、琴鍵接點、蜂鳴器、控制按鍵及電源最終都整理到同一塊雙層 PCB，方便後續製作與測試。

### 輸入與控制方式

- **接地觸控筆**
  每個琴鍵使用內部上拉。觸控筆接觸金屬琴鍵時，對應輸入會被拉至 `LOW`，程式再查表取得音高並由 D9 輸出方波。

- **17 鍵半音階**
  琴鍵範圍為 C4 至 E5。程式依序掃描輸入，若同時碰觸多個琴鍵，會依固定順序選擇其中一個輸出。

- **三段音域**
  低、中、高音域分別使用基準頻率的二分之一、原值與兩倍。切換後會保留目前音域，重新開機時則回到中音域。

- **兩顆按鍵共用一個類比輸入**
  兩顆音域按鍵透過電阻網路接到 A6，程式以不同的類比讀值區間判斷升降音域，減少數位腳位占用。

- **輸入穩定判定**
  琴鍵與音域按鍵都需維持相同狀態至少 5 ms 才會生效，降低接點抖動造成的誤觸發。

### 系統流程

1. 開機後將音域設為中音。
2. 讀取 A6，判斷是否需要升高或降低音域。
3. 依序掃描 17 個琴鍵，並等待輸入穩定。
4. 有琴鍵被觸碰時，查表取得音高並套用目前音域。
5. 使用 `tone()` 由 D9 發聲；放開琴鍵後以 `noTone()` 停止輸出。

### PCB 設計

KiCad 9 專案包含 Arduino Nano、蜂鳴器、音域按鍵、琴鍵銅箔、電源、板框與安裝孔。板子採雙層配置，尺寸約為 111.5 × 48 mm，並已整理 BOM、Gerber、座標及鑽孔輸出。

### 目前進度

主控制程式、原理圖、PCB 佈局與製造資料已完成整理，程式中的 17 組琴鍵輸入、頻率表、輸入穩定判定及三段音域邏輯也已核對。下一步是重新執行最新版 PCB 的 ERC／DRC，更新製造檔，並補上 Arduino 編譯、實體組裝與操作測試。

專案中另有 PCM 取樣音效的實驗程式，但目前仍存在按鍵索引與腳位設定不一致的問題，因此不列入這一版的正式功能。
