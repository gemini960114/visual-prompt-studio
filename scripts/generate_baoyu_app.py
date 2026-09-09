#!/usr/bin/env python3
import os
import json

# Let's inspect available screenshot files
base_screenshots = '/home/ubuntu/github/notebooklm/assets/screenshots'

xhs_styles = [
    {"id": "notion", "name": "Notion 簡約手繪", "name_en": "Notion Minimal Line", "desc": "簡約黑色線條手繪、高質感白底或淡米色、黑白灰加單一強調色，適合知識卡片與 SaaS。", "file": "notion.webp"},
    {"id": "cute", "name": "可愛療癒卡通", "name_en": "Cute & Cozy Cartoon", "desc": "圓潤線條、粉嫩配色、親切可愛的角色插圖，社群親和力第一。", "file": "cute.webp"},
    {"id": "fresh", "name": "清新草木手繪", "name_en": "Fresh Botanical", "desc": "清新自然、淡綠與原木色系、柔和水彩與手繪插圖，適合生活、健康主題。", "file": "fresh.webp"},
    {"id": "warm", "name": "溫暖溫馨繪本", "name_en": "Warm Storybook", "desc": "溫暖手繪風、大地暖色調、細膩光影，適合心理勵志、個人成長。", "file": "warm.webp"},
    {"id": "minimal", "name": "極簡商務現代", "name_en": "Modern Minimalist", "desc": "充足留白、精煉幾何圖形、高對比文字排版，適合專業商務與高管簡報。", "file": "minimal.webp"},
    {"id": "retro", "name": "復古紙質版畫", "name_en": "Retro Printmaking", "desc": "美式復古插畫、半色調網點 (Halftone)、泛黃紙張紋理，懷舊感滿分。", "file": "retro.webp"},
    {"id": "pop", "name": "波普普普潮流", "name_en": "Pop Art Modern", "desc": "高飽和撞色、粗黑描邊、動態標籤元素，搶眼度極高。", "file": "pop.webp"},
    {"id": "bold", "name": "強烈對比漫畫", "name_en": "Bold Graphic Comic", "desc": "漫畫網點、黑白高對比、強烈視覺張力與動態感。", "file": "bold.webp"},
    {"id": "chalkboard", "name": "彩色黑板粉筆", "name_en": "Chalkboard Tutorial", "desc": "黑板底色、彩色粉筆質感手寫標註、教學拆解感強。", "file": "chalkboard.webp"}
]

xhs_layouts = [
    {"id": "dense", "name": "密集乾貨知識卡", "name_en": "Dense Knowledge", "desc": "容納 5-8 個重點，結構分明、資訊量大，最受社群收藏的乾貨排版。", "file": "dense.webp"},
    {"id": "list", "name": "條列要點清單卡", "name_en": "Key Points List", "desc": "4-7 項清晰編號清單、搭配圖示標籤，易讀性極高。", "file": "list.webp"},
    {"id": "comparison", "name": "雙欄對照比較卡", "name_en": "Comparison Matrix", "desc": "左右分欄對比、優缺點或正確/錯誤對比，視覺衝擊力強。", "file": "comparison.webp"},
    {"id": "flow", "name": "步驟流程教學卡", "name_en": "Step-by-Step Flow", "desc": "3-6 步順序箭頭導引、新手指南與工作流的最佳展示方式。", "file": "flow.webp"},
    {"id": "balanced", "name": "圖文平衡標準卡", "name_en": "Balanced Card", "desc": "3-4 個重點、圖文各半、閱讀體驗舒適流暢。", "file": "balanced.webp"},
    {"id": "sparse", "name": "大字金句封面卡", "name_en": "Sparse Cover Quote", "desc": "1-2 個核心金句或大標題，視覺穿透力強，適合作為第 1 張封面小卡。", "file": "sparse.webp"}
]

infographic_styles = [
    {"id": "craft-handmade", "name": "手作紙藝插畫", "name_en": "Craft Handmade", "desc": "手繪拼貼、剪紙質感、溫暖人情味與工藝美學（預設首選）。", "file": "craft-handmade.webp"},
    {"id": "claymation", "name": "3D 黏土定格動畫", "name_en": "3D Claymation", "desc": "立體黏土人偶與物件、柔和陰影、定格動畫童趣質感。", "file": "claymation.webp"},
    {"id": "kawaii", "name": "日系卡哇伊", "name_en": "Kawaii Cute", "desc": "日系萌系插畫、粉嫩色彩、圓潤造型，吸引年輕族群。", "file": "kawaii.webp"},
    {"id": "storybook-watercolor", "name": "童話繪本水彩", "name_en": "Storybook Watercolor", "desc": "柔和渲染水彩、童話手繪筆觸、自然溫暖又富有藝術氣息。", "file": "storybook-watercolor.webp"},
    {"id": "chalkboard", "name": "彩色黑板粉筆", "name_en": "Chalkboard Guide", "desc": "深色黑板底色、多彩粉筆手繪圖解、教學與知識解說感極佳。", "file": "chalkboard.webp"},
    {"id": "cyberpunk-neon", "name": "賽博霓虹未來感", "name_en": "Cyberpunk Neon", "desc": "深黑科技底、發光霓虹線條、暗夜高對比，適合前沿科技與 Web3。", "file": "cyberpunk-neon.webp"},
    {"id": "bold-graphic", "name": "美漫波普網點", "name_en": "Bold Graphic Comic", "desc": "經典漫畫風格、半色調網點、粗獷輪廓線與強烈對比色。", "file": "bold-graphic.webp"},
    {"id": "aged-academia", "name": "復古科學素描", "name_en": "Aged Academia", "desc": "泛黃牛皮紙、達文西式精密鋼筆手繪、古典學術探索感。", "file": "aged-academia.webp"},
    {"id": "corporate-memphis", "name": "科技大廠扁平風", "name_en": "Corporate Memphis", "desc": "當代科技巨頭最愛的扁平幾何人物、鮮明色塊、專業友善。", "file": "corporate-memphis.webp"},
    {"id": "technical-schematic", "name": "工程藍圖透視", "name_en": "Technical Schematic", "desc": "等距 3D 視角、精確架構藍圖、硬核科技與系統拆解必備。", "file": "technical-schematic.webp"},
    {"id": "origami", "name": "幾何折紙立體", "name_en": "Origami Papercraft", "desc": "多邊形折紙造型、銳利光影刻面、現代幾何設計感。", "file": "origami.webp"},
    {"id": "pixel-art", "name": "復古像素點陣", "name_en": "Pixel Art 8-Bit", "desc": "8-bit 懷舊遊戲像素畫、geek 感強烈、有趣耐看。", "file": "pixel-art.webp"},
    {"id": "ui-wireframe", "name": "UI 界面線框圖", "name_en": "UI Wireframe", "desc": "灰階線框原型、乾淨卡片元件、產品經理與設計師最愛。", "file": "ui-wireframe.webp"},
    {"id": "subway-map", "name": "地鐵拓撲線路圖", "name_en": "Subway Transit Map", "desc": "倫敦地鐵風格拓撲圖、彩色線路節點、流程網絡極佳展示法。", "file": "subway-map.webp"},
    {"id": "ikea-manual", "name": "IKEA 組裝說明書風", "name_en": "IKEA Assembly Manual", "desc": "極簡黑白線條、零文字直覺裝配圖解、幽默而直觀。", "file": "ikea-manual.webp"},
    {"id": "knolling", "name": "物件俯拍平鋪", "name_en": "Knolling Overhead", "desc": "將所有零組件90度直角整齊排列俯瞰、強迫症極度舒適。", "file": "knolling.webp"},
    {"id": "lego-brick", "name": "樂高積木拼砌", "name_en": "Lego Brick World", "desc": "繽紛積木塊拼接出的知識模型、寓教於樂。", "file": "lego-brick.webp"}
]

infographic_layouts = [
    {"id": "bento-grid", "name": "便當盒網格佈局", "name_en": "Bento Grid", "desc": "Apple 發表會最愛的多區塊卡片組合，適合多主題綜觀。", "file": "grid-cards.webp"},
    {"id": "funnel", "name": "轉化與篩選漏斗", "name_en": "Conversion Funnel", "desc": "層層遞進篩選、流量轉化、用戶旅程各階段數據分析。", "file": "funnel.webp"},
    {"id": "pyramid", "name": "層級金字塔", "name_en": "Hierarchy Pyramid", "desc": "馬斯洛需求、知識體系層次、底層基石至頂層目標。", "file": "pyramid.webp"},
    {"id": "timeline-horizontal", "name": "水平時間軸里程碑", "name_en": "Timeline Roadmap", "desc": "歷史演進、產品發佈路線圖、專案階段發展歷程。", "file": "timeline-horizontal.webp"},
    {"id": "journey-path", "name": "曲折旅程道路圖", "name_en": "Journey Path", "desc": "蜿蜒公路貫穿各個里程碑關卡、探險地圖式展示。", "file": "journey-path.webp"},
    {"id": "mind-map", "name": "思維導圖發散樹", "name_en": "Mind Map Radial", "desc": "核心概念輻射發散、腦力激盪與知識分支體系梳理。", "file": "mind-map.webp"},
    {"id": "bridge", "name": "跨越鴻溝問題橋", "name_en": "Problem-Solution Bridge", "desc": "左岸現狀困境 ➜ 橋樑解決之道 ➜ 右岸理想願景。", "file": "bridge.webp"},
    {"id": "do-dont", "name": "正確與錯誤對照", "name_en": "Do vs Don't Table", "desc": "綠勾正確示範 vs 紅叉錯誤雷區、教學指導一目了然。", "file": "do-dont.webp"},
    {"id": "comparison-table", "name": "多維度矩陣對比表", "name_en": "Comparison Table", "desc": "多方案、競品特性、規格參數橫向對決。", "file": "comparison-table.webp"},
    {"id": "layers-stack", "name": "分層架構技術棧", "name_en": "Tech Layers Stack", "desc": "底層基礎設施 ➜ 中間件 ➜ 應用層 ➜ 用戶介面。", "file": "layers-stack.webp"},
    {"id": "iceberg", "name": "冰山可見與隱藏模型", "name_en": "Iceberg Model", "desc": "水面上表象 vs 水面下龐大的根本原因與技術細節。", "file": "iceberg.webp"},
    {"id": "circular-flow", "name": "循環閉環生態圈", "name_en": "Circular Ecosystem", "desc": "飛輪效應、PDCA 循環、生命週期可持續流轉。", "file": "circular-flow.webp"},
    {"id": "priority-quadrants", "name": "四象限優先級矩陣", "name_en": "Priority Quadrants", "desc": "緊急 vs 重要、成本 vs 收益、四象限決策指南。", "file": "priority-quadrants.webp"},
    {"id": "fishbone", "name": "因果分析魚骨圖", "name_en": "Fishbone Cause & Effect", "desc": "品質管理、根因追蹤、問題拆解成各大支柱骨架。", "file": "fishbone.webp"},
    {"id": "tree-hierarchy", "name": "組織架構分類樹", "name_en": "Tree Hierarchy", "desc": "自頂向下層級架構、團隊部門與分類目錄樹。", "file": "tree-hierarchy.webp"},
    {"id": "venn", "name": "概念重疊韋恩圖", "name_en": "Venn Diagram", "desc": "兩者或三者交集、甜蜜點（Sweet Spot）發現法。", "file": "venn.webp"},
    {"id": "scale-balance", "name": "天平權衡利弊圖", "name_en": "Balance Scale", "desc": "天平兩側稱重、風險與機會、成本與價值的理性衡量。", "file": "scale-balance.webp"},
    {"id": "equation", "name": "公式拆解與輸入輸出", "name_en": "Visual Equation", "desc": "A + B + C = 成功結果，直觀圖解價值公式。", "file": "equation.webp"},
    {"id": "feature-list", "name": "產品特點幾何列表", "name_en": "Feature Showcase", "desc": "核心亮點圖示化、產品優勢與規格展示卡片。", "file": "feature-list.webp"},
    {"id": "nested-circles", "name": "影響力同心圓", "name_en": "Nested Circles", "desc": "由核心向外擴散的層層影響圈層（黃金圈法則）。", "file": "nested-circles.webp"}
]

cover_styles = [
    {"id": "typography", "name": "大字體排版海報", "name_en": "Bold Typography Poster", "desc": "強大的字體層級、大膽的主標題、現代網格排版，宣傳海報首選。", "file": "bold-editorial.webp"},
    {"id": "minimal", "name": "北歐簡約高質感", "name_en": "Nordic Minimalist", "desc": "純淨背景、講究留白、優雅幾何色塊與精緻線條，適合高階商務。", "file": "minimal.webp"},
    {"id": "notion", "name": "Notion 知識手繪風", "name_en": "Notion Line Art", "desc": "知性簡約手繪插圖、黑白線稿加點綴色、科技與生產力最愛。", "file": "notion.webp"},
    {"id": "dark-atmospheric", "name": "暗黑大氣科技海報", "name_en": "Dark Atmospheric Tech", "desc": "深色背景、微光粒子、高對比電影質感、氣勢磅礡。", "file": "dark-atmospheric.webp"},
    {"id": "blueprint", "name": "工程藍圖科技海報", "name_en": "Blueprint Architecture", "desc": "工程藍底白線、精密幾何格線、架構與技術發表會大作。", "file": "blueprint.webp"},
    {"id": "vector-illustration", "name": "精緻扁平向量插畫", "name_en": "Vector Illustration", "desc": "現代向量插畫、豐富細節、友善而富有活力、適合品牌行銷。", "file": "vector-illustration.webp"},
    {"id": "watercolor", "name": "唯美藝術水彩", "name_en": "Artistic Watercolor", "desc": "優雅水彩暈染、手感藝術、人文與生活風格封面首選。", "file": "watercolor.webp"},
    {"id": "chalkboard", "name": "粉筆黑板手繪", "name_en": "Chalkboard Concept", "desc": "黑板底紋、彩色手寫粉筆字、教學活動與講座海報。", "file": "chalkboard.webp"},
    {"id": "retro", "name": "復古美式版畫", "name_en": "Retro Vintage Poster", "desc": "做舊質感、復古配色、經典廣告海報韻味。", "file": "retro.webp"},
    {"id": "pixel-art", "name": "8-Bit 像素懷舊", "name_en": "Pixel Art 8-Bit", "desc": "像素復古風格、遊戲感與開發者文化氛圍十足。", "file": "pixel-art.webp"}
]

print(f"Loaded {len(xhs_styles)} xhs styles, {len(xhs_layouts)} xhs layouts")
print(f"Loaded {len(infographic_styles)} infographic styles, {len(infographic_layouts)} infographic layouts")
print(f"Loaded {len(cover_styles)} cover styles")
