# Visual Prompt Studio (視覺海報與社群圖卡 Prompt 生成器)

<p align="center">
  <b>將文字文案一秒轉化為專業級 AI 生圖提示詞與 CLI 指令的視覺設計工作台</b><br>
  專為 <b>LINE 官方帳號輪播小卡</b>、<b>高密度知識資訊海報</b>、<b>主視覺宣傳封面</b> 打造。
</p>

<p align="center">
  <a href="https://github.com/gemini960114/visual-prompt-studio/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/React-18.3-cyan.svg" alt="React 18">
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-38bdf8.svg" alt="Tailwind CSS">
  <a href="https://gemini960114.github.io/visual-prompt-studio/"><img src="https://img.shields.io/badge/Deploy-GitHub%20Pages-success.svg" alt="GitHub Pages Ready"></a>
  <img src="https://img.shields.io/badge/Zero-Backend%20SPA-orange.svg" alt="Zero Backend">
</p>

<p align="center">
  🌐 <b>線上體驗網址</b>：<a href="https://gemini960114.github.io/visual-prompt-studio/">https://gemini960114.github.io/visual-prompt-studio/</a>
</p>

---

## 🌟 核心特色 (Key Features)

### 1. 📱 三大主題模式（整合 Baoyu Skills 體系）
- **`baoyu-xhs-images`（社群圖卡 / LINE 輪播小卡）**：
  - 專為 LINE 官方帳號 Rich Message、輪播小卡 (Card Carousel)、知識圖卡打造。
  - 支援 1～10 張連續卡片排版。
  - 9 種視覺風格（Notion 簡約手繪、溫暖繪本、療癒卡通、復古版畫、黑板粉筆等）× 6 種版面佈局（步驟流程卡、密集乾貨卡、雙欄對照卡、清單卡等）。
- **`baoyu-infographic`（高密度資訊圖表 / 實體宣傳海報）**：
  - 專為手機全螢幕長圖（9:16）與實體活動海報（3:4 / A4 / A3 印刷級）設計。
  - 20 種資訊架構（用戶旅程、時間軸、冰山模型、轉化漏斗、決策矩陣等）× 17 種視覺美學（手作紙藝、黏土定格動畫、工程藍圖、日系萌系等）。
- **`baoyu-cover-image`（主視覺宣傳封面 / 橫幅大圖）**：
  - 5 維度客製化：構圖類型 (Hero/Typography)、氛圍調性 (Bold/Subtle)、渲染手法 (Vector/3D)、文字密度與長寬比例。

---

### 2. 📐 比例方向與解析度檔次矩陣 (Resolution Quality Matrix)
徹底區分螢幕輕量顯示與實體印刷需求，動態注入精準像素與 DPI 提示詞：

| 比例分類 | 適用場景 | 📱 社群輕量 (72 DPI) | 🖥️ 數位高清 2K (150 DPI) | 🖨️ 實體海報 4K (300 DPI) |
| :---: | :--- | :---: | :---: | :---: |
| **【正方形 1:1】** | LINE 官方帳號小卡、IG 方形貼文 | `1040 × 1040 px` (<1MB 官方標準) | `2048 × 2048 px` | `3000 × 3000 px` |
| **【直式長版 9:16】** | 手機全螢幕海報、限時動態、長圖導覽 | `1080 × 1920 px` (FHD) | `1440 × 2560 px` (2K) | `2160 × 3840 px` (4K UHD) |
| **【直式標準 3:4】** | 經典活動海報、社群精美圖卡、展架 | `1080 × 1440 px` | `1800 × 2400 px` | `3000 × 4000 px` (印刷標準) |
| **【橫式寬幅 16:9】** | 電腦簡報、官網橫幅 (Banner)、電視看板 | `1920 × 1080 px` (FHD) | `2560 × 1440 px` (2K QHD) | `3840 × 2160 px` (4K UHD) |

---

### 3. 🧠 智慧標題與文案雙軌同步 (Smart Title Sync)
- **自動提取**：基於標準 Markdown 標題階層（`#`、`##`、`**粗體**`）智慧擷取主標與副標。
- **手動覆寫保護**：使用者一旦手動修改標題，系統自動鎖定手動模式，不再被內文更動無意覆蓋。
- **未同步脈衝提示**：在手動模式下貼入新主題時，按鈕會亮起琥珀色呼吸燈 `✨ 偵測到新標題 (點此同步)`，一鍵完成重新對齊。

---

### 4. 🎨 5 維調色盤防色彩漂移 (Color Palette Lock)
提供 9 款專業主題色票（高對比醒目警示、經典海軍商務、極客科技青、莫蘭迪雅致等），並支援 HSV/RGB 互動吸色盤。
嚴格指派五大功能角色，杜絕特定領域文字殘留：
- **主視覺骨架 (Primary)**：主視覺邊框、大標題徽章、核心架構導航線與關鍵圖標
- **次要容器 (Secondary)**：卡片獨立容器底色、次要步驟區塊
- **全局背景 (Background)**：確保手機閱讀高對比度與充足純淨呼吸空間
- **正文字體 (Text)**：高清晰度易讀性深色字體
- **焦點強調 (Accent)**：關鍵數據指標、核心結論、重要行動呼籲 (CTA) Highlight

---

### 5. 💡 Google Gemini 一鍵生成工作流 (Gemini-First Architecture)
本工具定位為「視覺架構規劃師」，不內建語言模型、不預設生造業務事實。
系統自動整合「長寬比例、精準輸出像素、DPI、色彩功能角色十六進位碼、資訊架構模型與使用者文案」，產出最純粹的**設計架構規範**：
- **一鍵貼入 Google Gemini**：點擊「📋 複製 Gemini 提示詞」，直接貼到 Google Gemini 對話框發送，Gemini 即會嚴格依照此規格與色票完成高水準的海報視覺規劃、文案擴寫或圖像生成！
- **所見即所得可編輯**：右側方框開放直接點擊打字修改，支援手動微調並具備隨時一鍵「復原為自動生成」機制。

---

### 6. ⚡ 雙軌輸出與規格書匯出
- **CLI 終端指令**：一鍵產生並複製 `/baoyu-xxx ...` 標準指令（自動帶入風格、佈局與精確長寬規格）。
- **Google Gemini 提示詞**：標準 Markdown 結構規格書，相容 Gemini / Claude / ChatGPT。
- **企劃規格匯出**：支援匯出 `.md` Markdown 企劃文稿與包含色票與規格的 `.pdf` 簡報規格書。

---

## 🚀 快速開始 (Quick Start)

### 方法一：直接使用 GitHub Pages（零安裝、完全免費）
本專案為純前端 SPA 靜態架構，直接推送至 GitHub 即可啟用 GitHub Pages：
1. Fork 或 Clone 本專案至您的 GitHub：
   `https://github.com/gemini960114/visual-prompt-studio.git`
2. 進入 Repository 頁面的 **Settings** $\rightarrow$ **Pages**。
3. 在 **Build and deployment** 下方的 **Source** 選擇 `Deploy from a branch`。
4. Branch 選擇 `main`、資料夾選擇 `/(root)`，點擊 **Save**。
5. 稍候 1 分鐘即可在 `https://gemini960114.github.io/visual-prompt-studio/` 上線存取！

---

### 方法二：本地開發與編譯

```bash
# 1. 複製專案
git clone https://github.com/gemini960114/visual-prompt-studio.git
cd visual-prompt-studio

# 2. 編輯修改 app.jsx 後執行編譯
npm run build
# 或直接執行: node scripts/build.js

# 3. 本地啟動靜態伺服器
python3 -m http.server 3000
# 開啟瀏覽器訪問 http://localhost:3000
```

---

### 方法三：使用 Docker 容器化運行

```bash
# 使用 docker compose 一鍵啟動 (包含 Nginx 靜態伺服器)
docker compose up -d --build

# 訪問服務
http://localhost:3000
```

---

## 📂 專案架構 (Project Structure)

```text
visual-prompt-studio/
├── index.html            # 應用主入口 (CDN + 本地 fallback)
├── app.jsx               # React 核心原始碼 (JSX 格式)
├── app.js                # Babel 編譯產生的純 JS 執行檔
├── package.json          # 專案資訊與 build 腳本
├── nginx.conf            # Nginx 靜態伺服器快取設定
├── Dockerfile            # Nginx 輕量映像檔建置檔
├── docker-compose.yml    # 本地容器啟動設定
├── assets/               # 靜態資源目錄
│   ├── images/           # 圖標與全域圖片
│   ├── libs/             # 離線備用函式庫 (Tailwind, React, jsPDF, Babel)
│   └── screenshots/      # 72 套官方風格與佈局 WebP 範例圖
└── scripts/
    └── build.js          # JSX 轉譯 Node.js 腳本
```

---

## 📄 開源授權與致謝 (License & Attribution)

本專案採用 [MIT License](LICENSE) 授權釋出。歡迎自由 Fork、客製化與推廣使用！

- **GitHub 原始碼庫**：[https://github.com/gemini960114/visual-prompt-studio](https://github.com/gemini960114/visual-prompt-studio)
- **GitHub Pages 線上版**：[https://gemini960114.github.io/visual-prompt-studio/](https://gemini960114.github.io/visual-prompt-studio/)
