---
layout: database_courses
title: "ZMK 設定教學"
image: "onshape.jpg"
desc: "從基礎介面開始，學習 3D 建模的核心邏輯。"
date: "2026-01-29"
permalink: /database_courses/zmk
---
## 1.建立 GitHub **儲存庫**

1. 建立一個 GitHub 檔案儲存庫來存放使用者配置
2. 檔案名稱建議命名為 `zmk-config-"BOARDANME"`
3. 不需要勾選任何初始化儲存庫的選項
4. 按下"Create repository”建立

## 2.用戶配置設定腳本

1. 要啟動安裝過程，請從命令列提示字元執行以下命令：
    
    **Using PowerShell**
    
    `powershell -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://zmk.dev/setup.ps1'))”`
    
2. **Keyboard Selection**
    
    出現提示時，輸入你想要鍵盤配置對應的號碼：
    
    ![img/courses/zmk/image.png](image.png)
    
3. **MCU Board Selection**
    
    出現提示時，輸入你想要定位的對應 MCU 板的編號：
    
    ![image.png](image%201.png)
    
    <aside>
    💡
    
    如果所選的鍵盤使用板載控制器，則將跳過此步驟。
    
    </aside>
    
4. **Keymap Customization**
    
    在下一個提示符號下，你將決定是否要複製原先選擇的鍵盤映射檔案到GitHub檔案裡以進行進一步的設定 :
    
    ![image.png](image%202.png)
    
    按 `Enter` 或輸入 `yes/y` 接受。如果您想保留原先鍵盤映射，或從頭開始編寫鍵盤映射，請輸入 `no/n`。
    
5. **GitHub Details**
    
    為了自動推送新配置，然後使用 GitHub Actions 構建，請輸入一些有關你的特定 GitHub 資訊的資訊：
    
    ![image.png](image%203.png)
    
    - **檔案的SSH連結**
        
        當你建好GitHub檔案時會跳出這個畫面，按下圖中`SSH` 選項，後面出現之文字即為SSH連結
        
        ![image.png](image%204.png)
        
6. **確認選擇**
    
    在執行安裝之前，安裝腳本將最後一次確認你的所有選擇：
    
    ![image.png](image%205.png)
    
    按下 `Enter` 或輸入 `y`後，腳本將在以 repo 名稱命名的目錄中建立初始配置，更新 GitHub Action YAML 文件，提交初始版本，然後推送到您的 repo。
    

## 3.安裝韌體

1. **下載檔案**
    
    一旦安裝腳本完成並且新的用戶配置存儲庫被推送，GitHub 將自動運行操作來建立您的鍵盤韌體檔案。您可以透過點擊 GitHub 儲存庫上的「`Actions`」標籤來查看操作。
    
    ![image.png](image%206.png)
    
    進入“`Actions`”標籤後，從清單中選擇頂部建置，將在右側面板下的`firmware`下載：
    
    ![image.png](image%207.png)
    
    下載完成後，解壓縮 zip 文件，在文件中包含一個或多個 uf2 文件，這些文件將複製到您的鍵盤。
    
2. **燒錄UF2文件**
    - 若要刷新韌體，請先雙擊重置按鈕，將電路板置於引導程式模式。此控制器應作為新的 USB 儲存裝置出現在您的作業系統中。
    - 完成後，請複製正確的 UF2 檔案，然後將其貼上到該鍵盤顯示的 USB 儲存裝置中。刷新完成後，控制器應卸載 USB 存儲，自動重新啟動並加載新刷新的韌體。建議您先透過 USB 測試鍵盤是否正常運作，以排除硬體問題，然後再嘗試無線連線。

## 4.軟體配置

## 基本配置

```
ZMK-CONFIG-"BORADNAME"
	-github\workflows
	   build.yml
	-boards\shieles
		 -"BORADNAME"
		    Kconfig.defconfig
		    Kconfig.shield
		    "BORADNAME".overlay
		    "BORADNAME"-layouts.dtsi
		    "BORADNAME".yml
	   .gitkeep
	-config
	   info.json
	   "BORADNAME".conf
	   "BORADNAME".keymap
	   west.yml
	-zephyr
	   module.yml
	-build.yaml
	
**註:**	
	**要增新的檔案
  使用與Github檔案相同的名稱
  要修改的檔案**
```

### “BORADNAME”資料夾

## 分體鍵盤