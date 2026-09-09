# Baoyu Visual Studio - 寶玉視覺海報與圖卡 Prompt 生成器

> 以 原版網頁優雅架構為基礎，全新重構升級為專為 **`baoyu-xhs-images`**、**`baoyu-infographic`**、**`baoyu-cover-image`** 三大主題量身打造的專業視覺提示詞生成與調色工作台！

---

## 🌟 核心三大主題模式

### 1. 📱 `baoyu-xhs-images`（社群小卡 / LINE 圖卡系列）
- **主要用途**：LINE 官方帳號輪播小卡 (Carousel)、小紅書圖文筆記、重點知識卡片。
- **支援規格**：1～10 張連續卡片、支援 `1:1`（LINE 方形卡）與 `3:4`（直式小卡）。
- **視覺風格 (9種)**：Notion 簡約手繪、可愛療癒卡通、清新草木、溫暖繪本、極簡商務、復古版畫、波普潮流、黑板粉筆等。
- **版面結構 (6種)**：密集乾貨卡 (dense)、要點清單卡 (list)、雙欄對照卡 (comparison)、步驟流程卡 (flow)、圖文平衡卡 (balanced)、金句封面卡 (sparse)。

### 2. 📊 `baoyu-infographic`（高密度資訊圖 / 知識海報）
- **主要用途**：手機全螢幕直式長海報（9:16）、一圖看懂、科技架構與商業分析大圖。
- **資訊結構 (20種)**：便當盒網格 (Bento Grid)、轉化漏斗 (Funnel)、層級金字塔 (Pyramid)、時間軸 (Timeline)、用戶旅程 (Journey Path)、思維導圖 (Mind Map)、問題與解方橋樑 (Bridge)、正確/錯誤對照 (Do vs Don't)、冰山模型 (Iceberg) 等。
- **視覺風格 (17種)**：手作紙藝 (craft-handmade)、3D黏土定格動畫 (claymation)、日系萌系 (kawaii)、童話水彩、賽博霓虹、科技扁平 (corporate-memphis)、工程藍圖透視 (technical-schematic)、復古像素等。

### 3. 🎨 `baoyu-cover-image`（主視覺封面 / 宣傳海報）
- **主要用途**：活動主視覺宣傳海報、LINE 推播滿版大圖 (Rich Message)、部落格與社群封面。
- **5維度定制系統**：
  - **構圖類型 (Type)**：Hero 英雄主圖、Typography 大字體排版、Conceptual 概念隱喻、Minimal 極簡留白。
  - **氛圍調性 (Mood)**：Balanced 均衡、Bold 強烈對比、Subtle 低調雅致。
  - **海報比例 (Aspect)**：1:1（方形小卡/推播圖）、16:9（橫幅海報）、2.35:1（電影感海報）。

---

## 🛠️ 強大沿用與增強功能

1. 🎨 **HSV / RGB 互動式色彩調配盤**：
   - 內建 9 款設計師色票（馬卡龍、莫蘭迪、未來科技藍、賽博霓虹、北歐清新、大地秋色等）。
   - 點擊任意色塊即可展開調色盤，支援即時拖曳飽和度/明度、色相滑桿、滴管吸色與 Hex 代碼編輯。
2. 🖼️ **真實截圖畫廊 (Showcase Gallery) 與點擊放大檢視**：
   - 收錄 `baoyu-skills` 官方全套 72 張高清風格與佈局範例 `.webp` 截圖。
   - 點擊卡片右上角放大鏡即可叫出燈箱 (Lightbox)，仔細檢閱設計細節並一鍵套用。
3. ⚡ **即時雙重輸出**：
   - **CLI 終端指令**：一鍵產生並複製 `/baoyu-xxx ...` 標準指令。
   - **AI 繪圖提示詞 (Full Prompt)**：一鍵複製格式嚴謹、分層詳盡的 Midjourney / Flux / Gemini / 通義萬相結構化 Prompt。
4. 📄 **匯出支援**：
   - 一鍵匯出 Markdown 企劃文稿。
   - 整合 jsPDF 即時產生包含色票與規格的 PDF 企劃書。

---

## 🌐 服務連線資訊

- **本地本機存取**：[`http://localhost:3000`](http://localhost:3000)
- **外部持久連線（Cloudflare Tunnel）**：[https://satisfied-artists-ended-vaccine.trycloudflare.com](https://satisfied-artists-ended-vaccine.trycloudflare.com)
