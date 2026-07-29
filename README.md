# Portfolio source structure

目前的新版作品集是網站正式首頁；舊版仍保留在 `/old/`。

## 主要網站

- `index.html`：正式首頁入口。
- `_layouts/default.html`：首頁版型。
- `_layouts/course.html`：所有課程文章共用版型。
- `_includes/main/`：Header、Hero、Projects、Skills、About、Courses、Contact 與專案彈窗。
- `assets/css/`：主要網站與課程頁樣式。
- `assets/js/`：主要網站與課程頁互動。
- `assets/vendor/`：新舊版本共用的第三方前端資源。

## 共用內容

- `_posts/`：專案資料；新版與舊版共同讀取。
- `_courses/`：課程文章。
- `_data/`：課程卡片、課程章節與其他結構化資料。
- `img/`：專案、課程與個人照片；新舊版本共用。

## 舊版與相容網址

- `old/`：舊版首頁、舊版 includes、樣式與 JavaScript，網址維持 `/old/`。
- `old/_archive/`：搬移前使用的舊 layout 原始檔，僅供保存參考，不參與輸出。
- `redirects/new.html`：保留舊的 `/new/` 網址，會導向正式首頁 `/`。

新增專案時編輯 `_posts/`，新增課程時編輯 `_courses/` 與對應的 `_data/`，圖片統一放在 `img/`。
