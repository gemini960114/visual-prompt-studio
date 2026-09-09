# Gemini Notebook 2.0 簡報 Prompt 生成器 (完整鏡像與解密重構版)

> 本專案為 [Meiko微課頻道 - Gemini Notebook 簡報Prompt生成器](https://meikochang.github.io/gemini_notebook_2.0/) 的完整複製、鏡像備份、反混淆解密與本地化重構版本。

---

## 📌 專案簡介

本專案專為 **Google NotebookLM** 及 **Gemini** 簡報生成所設計，能夠一鍵生成兼具「結構化投影片大綱」與「專業視覺風格指令」的高品質 Prompt。

### 核心功能特色
- 🌐 **多國語言支援**：繁體中文 (`zh`)、English (`en`)、日本語 (`ja`)、한국어 (`ko`) 四語即時切換。
- 🎨 **16+ 種專業簡報風格**：北歐極簡商務風、日系雜誌風、現代科技風、手繪童趣風、簡約高質感、暗黑霓虹科技風等。
- 📊 **架構化大綱生成**：自由自訂投影片頁數（5 至 20 頁）、目標受眾、核心主題、章節段落結構。
- 🎨 **調色盤與顏色拾取器**：內建 20+ 款設計師推薦色票，並具備 HSV / RGB 精準調色與亮度對比度計算器。
- 🖼️ **完整範例投影片圖庫**：內建 197 張高清投影片範例，支援即時預覽、縮放與逐頁輪播。
- 📄 **多格式匯出**：一鍵複製 Prompt、匯出為 Markdown、直接產生與下載 PDF、打包 JSZip。
- 🛡️ **100% 離線可用 + 雙重容錯**：所有靜態圖庫（197 張縮圖）與前端依賴庫皆已完整本地快取，斷網環境下依然能順暢運行。

---

## 📁 檔案目錄結構

```text
/home/ubuntu/github/notebooklm/
├── index.html               # 🚀 生產環境推薦首頁（載入預編譯 app.js，啟動極速，免 Babel 負擔）
├── index.dev.html           # 🛠️ 開發除錯版首頁（包含 Babel Standalone，即時讀取 app.jsx）
├── index.original.html      # 📦 原版網站 100% 原始位元鏡像（含原始 XOR 加密載入層）
├── app.jsx                  # 📖 解密反混淆後之乾淨 React JSX 原始碼（具備完整縮排與本地備援）
├── app.js                   # ⚡ 預編譯的 JavaScript 執行檔（無縫支援各類靜態瀏覽）
├── app.raw.jsx              # 📜 原網站解密出之原始 JSX（未作任何路徑微調）
├── package.json             # 📦 NPM 專案配置與常用腳本指令
├── server.py                # 🐍 零依賴的 Python 靜態伺服器腳本
├── Dockerfile               # 🐳 Nginx 輕量化容器構建設定
├── docker-compose.yml       # 🐳 Docker Compose 一鍵啟動設定
├── nginx.conf               # ⚙️ 效能最佳化 Nginx 伺服器配置
├── assets/
│   ├── images/              # 標誌與品牌圖示（Meiko Logo, NotebookLM Logo）
│   ├── libs/                # 本地化備用函式庫（React, Tailwind, Babel, jsPDF, JSZip, PDF.js）
│   └── thumbnails/          # 197 張完整投影片範例縮圖快取（25 MB）
└── scripts/
    ├── download_assets.py   # 高速並行下載與同步遠端範例圖庫腳本
    └── prepare_app.py       # 原始碼解密與本機資源映射構建腳本
```

---

## 🚀 快速啟動指南

您可以選擇以下任何一種最習慣的方式啟動本網站：

### 方法一：使用 Python 內建伺服器（推薦，零配置）
在專案目錄下執行：
```bash
python3 server.py 3000
```
或使用 Python 原生模組：
```bash
python3 -m http.server 3000
```
開啟瀏覽器訪問：`http://localhost:3000`

---

### 方法二：使用 Node.js / NPM
```bash
# 啟動伺服器
npm run serve

# 若您修改了 app.jsx，可執行以下指令重新編譯出 app.js：
npm run build
```

---

### 方法三：使用 Docker 容器化運行
```bash
# 一鍵構建並於背景啟動容器（預設映射至 8088 埠口）
docker compose up -d
```
訪問網址：`http://localhost:8088`

---

### 方法四：直接雙擊開啟
本專案已對所有資源路徑進行相對路徑適配，您甚至可以直接在檔案總管中雙擊 `index.html` 即可在瀏覽器中正常瀏覽使用！

---

## 🔍 技術反混淆與架構解析

1. **原版加密機制解密**：
   原始 GitHub Pages 頁面透過將 290KB 的 React 原始碼轉換為 Base64 並經過多字元 XOR 遮罩混淆（`p_bytes[i] ^= k_bytes[i % k_len]`），在前端執行時動態調用 `Babel.transform` 與 `eval`。
   我們已完整還原出無混淆的原始程式碼 `app.jsx`，開發者可以直接閱讀、修改、擴充投影片樣板或新增自訂風格。

2. **本地離線快取與遠端 Fallback**：
   - 範例投影片原本高度依賴 `drive.google.com/thumbnail` 外部請求。本鏡像已自動並行爬取全部 197 張圖片至 `assets/thumbnails/`。
   - 程式碼已內建 `onError` 與自動回退邏輯：優先讀取本地圖片，若離線檔案缺失則無感回退至 Google Drive 官方 CDN。

3. **Supabase 計數器無伺服器降級**：
   原網站使用 Supabase RPC 統計全域瀏覽次數。在此複製版中，若未連線或無網路時，程式碼將自動進入無感降級狀態（隱藏計數條，不影響主要 Prompt 生成與導出功能）。

---

## 📜 版權與鳴謝
- 原創設計與提示詞作者：[Meiko微課頻道](https://www.youtube.com/@meiko1)
- 來源網址：`https://meikochang.github.io/gemini_notebook_2.0/`
