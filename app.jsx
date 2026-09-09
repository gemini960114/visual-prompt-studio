
        const { useState, useEffect, useMemo, useRef } = React;

        const SUPABASE_PROJECT_URL = 'https://kwnrkmaoqeyaappnoiwh.supabase.co';
        const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_8yiNskpmUht5dGpmd7SrlQ_R03KtJeB';
        const VIEW_SESSION_KEY = 'gemini-notebook-view-counted';

        const Icon = ({ name, size = 18, className = "" }) => {
            const icons = {
                Copy: <><path d="M8 17.7c0 .3.2.5.5.5h8c.3 0 .5-.5.5-.5V9c0-.3-.2-.5-.5-.5h-8c-.3 0-.5.2-.5.5v8.7Z"/><path d="M4 12c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-6Z"/><path d="M4 4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/><path d="M4 8h14"/></>,
                ExternalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></>,
                Layout: <><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/></>,
                Sparkles: <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>,
                Check: <path d="M20 6 9 17l-5-5"/>,
                Wand2: <><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></>,
                ZoomIn: <><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></>,
                ZoomOut: <><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></>,
                BarChart3: <><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></>,
                FileText: <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></>,
                Download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></>,
                Image: <><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></>,
                Grid3X3: <><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></>,
                Palette: <><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></>,
                Pipette: <><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"/></>,
                Globe: <><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></>,
                Terminal: <><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></>,
                Sliders: <><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/></>,
                Layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
                Smile: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>,
                ChevronRight: <path d="m9 18 6-6-6-6"/>,
                RefreshCw: <><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></>,
                Info: <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>,
                Maximize2: <><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></>,
                Youtube: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></>
            };
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    {icons[name] || null}
                </svg>
            );
        };

        const hexToLum = (hex) => {
            const h = hex.replace('#', '');
            const v = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
            if (isNaN(v)) return 1;
            return (0.299 * ((v >> 16) & 255) + 0.587 * ((v >> 8) & 255) + 0.114 * (v & 255)) / 255;
        };

        const clampByte = n => Math.max(0, Math.min(255, Math.round(n)));
        const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => clampByte(x).toString(16).padStart(2, '0')).join('').toUpperCase();

        const hexToRgbObj = (hex) => {
            const h = hex.replace('#', '');
            const v = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
            if (isNaN(v)) return { r: 128, g: 128, b: 128 };
            return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
        };

        const rgbToHsv = (r, g, b) => {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
            let h = 0;
            if (d !== 0) {
                if (max === r) h = ((g - b) / d + 6) % 6;
                else if (max === g) h = (b - r) / d + 2;
                else h = (r - g) / d + 4;
                h *= 60;
            }
            const s = max === 0 ? 0 : d / max;
            return { h, s, v: max };
        };

        const hsvToRgb = (h, s, v) => {
            const c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c;
            let r = 0, g = 0, b = 0;
            if (h < 60) { r = c; g = x; }
            else if (h < 120) { r = x; g = c; }
            else if (h < 180) { g = c; b = x; }
            else if (h < 240) { g = x; b = c; }
            else if (h < 300) { r = x; b = c; }
            else { r = c; b = x; }
            return { r: clampByte((r + m) * 255), g: clampByte((g + m) * 255), b: clampByte((b + m) * 255) };
        };

        const ColorPicker = ({ value, onChange, onClose }) => {
            const initRgb = hexToRgbObj(value);
            const initHsv = rgbToHsv(initRgb.r, initRgb.g, initRgb.b);
            const [hue, setHue] = useState(initHsv.h);
            const [sat, setSat] = useState(initHsv.s);
            const [val, setVal] = useState(initHsv.v);
            const areaRef = useRef(null);
            const dragRef = useRef(null);

            const rgb = useMemo(() => hsvToRgb(hue, sat, val), [hue, sat, val]);
            const hex = useMemo(() => rgbToHex(rgb.r, rgb.g, rgb.b), [rgb]);

            const emit = (h, s, v) => {
                const c = hsvToRgb(h, s, v);
                onChange(rgbToHex(c.r, c.g, c.b));
            };

            const handleAreaPointer = (e) => {
                if (!areaRef.current) return;
                const rect = areaRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
                setSat(x);
                setVal(1 - y);
                emit(hue, x, 1 - y);
            };

            const onAreaDown = (e) => {
                dragRef.current = 'area';
                handleAreaPointer(e);
                const onMove = (ev) => { if (dragRef.current === 'area') handleAreaPointer(ev); };
                const onUp = () => { dragRef.current = null; window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
                window.addEventListener('pointermove', onMove);
                window.addEventListener('pointerup', onUp);
            };

            const handleEyeDropper = async () => {
                if (!window.EyeDropper) return;
                try {
                    const dropper = new window.EyeDropper();
                    const result = await dropper.open();
                    if (result && result.sRGBHex) {
                        const c = hexToRgbObj(result.sRGBHex);
                        const hsv = rgbToHsv(c.r, c.g, c.b);
                        setHue(hsv.h); setSat(hsv.s); setVal(hsv.v);
                        onChange(result.sRGBHex.toUpperCase());
                    }
                } catch (e) {}
            };

            return (
                <div className="absolute z-50 mt-2 p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-60 text-xs select-none">
                    <div
                        ref={areaRef}
                        onPointerDown={onAreaDown}
                        className="relative w-full h-32 rounded-lg cursor-crosshair overflow-hidden mb-3"
                        style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                        <div
                            className="absolute w-3.5 h-3.5 rounded-full border-2 border-white shadow -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ left: `${sat * 100}%`, top: `${(1 - val) * 100}%`, backgroundColor: hex }}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="range" min="0" max="360" value={hue}
                            onChange={(e) => {
                                const h = Number(e.target.value);
                                setHue(h);
                                emit(h, sat, val);
                            }}
                            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                            style={{ background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' }}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {window.EyeDropper && (
                            <button onClick={handleEyeDropper} title="滴管吸色" className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">
                                <Icon name="Pipette" size={14} />
                            </button>
                        )}
                        <input
                            type="text"
                            value={hex}
                            onChange={(e) => {
                                const valStr = e.target.value;
                                if (/^#[0-9A-Fa-f]{6}$/.test(valStr)) {
                                    const c = hexToRgbObj(valStr);
                                    const hsv = rgbToHsv(c.r, c.g, c.b);
                                    setHue(hsv.h); setSat(hsv.s); setVal(hsv.v);
                                    onChange(valStr.toUpperCase());
                                }
                            }}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center font-mono text-white text-xs font-bold"
                        />
                        <button onClick={onClose} className="px-2.5 py-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded">
                            確定
                        </button>
                    </div>
                </div>
            );
        };

        const palettePresets = [
            { id: 'vivid-contrast', name: '高對比醒目警示 (藍紅白)', colors: ['#0284C7', '#DC2626', '#F8FAFC', '#1E293B', '#F59E0B'] },
            { id: 'classic-navy', name: '經典海軍商務', colors: ['#16324F', '#2E6F95', '#F2A900', '#A9D6E5', '#F7FAFC'] },
            { id: 'tech-cyan', name: '極客科技青', colors: ['#0A192F', '#00F0FF', '#1E293B', '#64FFDA', '#F1F5F9'] },
            { id: 'macaron', name: '馬卡龍溫和', colors: ['#FCA5A5', '#86EFAC', '#93C5FD', '#FDE047', '#F8FAFC'] },
            { id: 'nordic-fresh', name: '北歐自然綠', colors: ['#1C312E', '#3D5A50', '#839D8E', '#BAD1C2', '#F2F7F4'] },
            { id: 'minimal-mono', name: '黑白極簡灰', colors: ['#0F172A', '#334155', '#64748B', '#CBD5E1', '#F8FAFC'] },
            { id: 'sunset-orange', name: '暖陽晚霞橙', colors: ['#7C2D12', '#C2410C', '#EA580C', '#FDBA74', '#FFF7ED'] },
            { id: 'morandi', name: '莫蘭迪雅致', colors: ['#5B7065', '#8C9A8E', '#C4B7A6', '#D9D0C7', '#4A5859'] }
        ];

        // Metadata for Baoyu Skills
        const xhsStyles = [
            { id: "notion", name: "Notion 簡約手繪", name_en: "Notion Minimal Line", desc: "簡約黑色線條手繪、高質感白底或淡米色、黑白灰加單一強調色，適合知識卡片與 SaaS。", img: "./assets/screenshots/xhs-images-styles/notion.webp" },
            { id: "cute", name: "可愛療癒卡通", name_en: "Cute & Cozy Cartoon", desc: "圓潤線條、粉嫩配色、親切可愛的角色插圖，社群親和力第一。", img: "./assets/screenshots/xhs-images-styles/cute.webp" },
            { id: "fresh", name: "清新草木手繪", name_en: "Fresh Botanical", desc: "清新自然、淡綠與原木色系、柔和水彩與手繪插圖，適合生活、健康主題。", img: "./assets/screenshots/xhs-images-styles/fresh.webp" },
            { id: "warm", name: "溫暖溫馨繪本", name_en: "Warm Storybook", desc: "溫暖手繪風、大地暖色調、細膩光影，適合心理勵志、個人成長。", img: "./assets/screenshots/xhs-images-styles/warm.webp" },
            { id: "minimal", name: "極簡商務現代", name_en: "Modern Minimalist", desc: "充足留白、精煉幾何圖形、高對比文字排版，適合專業商務與高管簡報。", img: "./assets/screenshots/xhs-images-styles/minimal.webp" },
            { id: "retro", name: "復古紙質版畫", name_en: "Retro Printmaking", desc: "美式復古插畫、半色調網點 (Halftone)、泛黃紙張紋理，懷舊感滿分。", img: "./assets/screenshots/xhs-images-styles/retro.webp" },
            { id: "pop", name: "波普普普潮流", name_en: "Pop Art Modern", desc: "高飽和撞色、粗黑描邊、動態標籤元素，搶眼度極高。", img: "./assets/screenshots/xhs-images-styles/pop.webp" },
            { id: "bold", name: "強烈對比漫畫", name_en: "Bold Graphic Comic", desc: "漫畫網點、黑白高對比、強烈視覺張力與動態感。", img: "./assets/screenshots/xhs-images-styles/bold.webp" },
            { id: "chalkboard", name: "彩色黑板粉筆", name_en: "Chalkboard Tutorial", desc: "黑板底色、彩色粉筆質感手寫標註、教學拆解感強。", img: "./assets/screenshots/xhs-images-styles/chalkboard.webp" }
        ];

        const xhsLayouts = [
            { id: "dense", name: "密集乾貨知識卡", name_en: "Dense Knowledge", desc: "容納 5-8 個重點，結構分明、資訊量大，最受社群收藏的乾貨排版。", img: "./assets/screenshots/xhs-images-layouts/dense.webp" },
            { id: "list", name: "條列要點清單卡", name_en: "Key Points List", desc: "4-7 項清晰編號清單、搭配圖示標籤，易讀性極高。", img: "./assets/screenshots/xhs-images-layouts/list.webp" },
            { id: "comparison", name: "雙欄對照比較卡", name_en: "Comparison Matrix", desc: "左右分欄對比、優缺點或正確/錯誤對比，視覺衝擊力強。", img: "./assets/screenshots/xhs-images-layouts/comparison.webp" },
            { id: "flow", name: "步驟流程教學卡", name_en: "Step-by-Step Flow", desc: "3-6 步順序箭頭導引、新手指南與工作流的最佳展示方式。", img: "./assets/screenshots/xhs-images-layouts/flow.webp" },
            { id: "balanced", name: "圖文平衡標準卡", name_en: "Balanced Card", desc: "3-4 個重點、圖文各半、閱讀體驗舒適流暢。", img: "./assets/screenshots/xhs-images-layouts/balanced.webp" },
            { id: "sparse", name: "大字金句封面卡", name_en: "Sparse Cover Quote", desc: "1-2 個核心金句或大標題，視覺穿透力強，適合作為第 1 張封面小卡。", img: "./assets/screenshots/xhs-images-layouts/sparse.webp" }
        ];

        const infographicStyles = [
            { id: "craft-handmade", name: "手作紙藝插畫", name_en: "Craft Handmade", desc: "手繪拼貼、剪紙質感、溫暖人情味與工藝美學（預設首選）。", img: "./assets/screenshots/infographic-styles/craft-handmade.webp" },
            { id: "claymation", name: "3D 黏土定格動畫", name_en: "3D Claymation", desc: "立體黏土人偶與物件、柔和陰影、定格動畫童趣質感。", img: "./assets/screenshots/infographic-styles/claymation.webp" },
            { id: "kawaii", name: "日系卡哇伊", name_en: "Kawaii Cute", desc: "日系萌系插畫、粉嫩色彩、圓潤造型，吸引年輕族群。", img: "./assets/screenshots/infographic-styles/kawaii.webp" },
            { id: "storybook-watercolor", name: "童話繪本水彩", name_en: "Storybook Watercolor", desc: "柔和渲染水彩、童話手繪筆觸、自然溫暖又富有藝術氣息。", img: "./assets/screenshots/infographic-styles/storybook-watercolor.webp" },
            { id: "chalkboard", name: "彩色黑板粉筆", name_en: "Chalkboard Guide", desc: "深色黑板底色、多彩粉筆手繪圖解、教學與知識解說感極佳。", img: "./assets/screenshots/infographic-styles/chalkboard.webp" },
            { id: "cyberpunk-neon", name: "賽博霓虹未來感", name_en: "Cyberpunk Neon", desc: "深黑科技底、發光霓虹線條、暗夜高對比，適合前沿科技與 Web3。", img: "./assets/screenshots/infographic-styles/cyberpunk-neon.webp" },
            { id: "bold-graphic", name: "美漫波普網點", name_en: "Bold Graphic Comic", desc: "經典漫畫風格、半色調網點、粗獷輪廓線與強烈對比色。", img: "./assets/screenshots/infographic-styles/bold-graphic.webp" },
            { id: "aged-academia", name: "復古科學素描", name_en: "Aged Academia", desc: "泛黃牛皮紙、達文西式精密鋼筆手繪、古典學術探索感。", img: "./assets/screenshots/infographic-styles/aged-academia.webp" },
            { id: "corporate-memphis", name: "科技大廠扁平風", name_en: "Corporate Memphis", desc: "當代科技巨頭最愛的扁平幾何人物、鮮明色塊、專業友善。", img: "./assets/screenshots/infographic-styles/corporate-memphis.webp" },
            { id: "technical-schematic", name: "工程藍圖透視", name_en: "Technical Schematic", desc: "等距 3D 視角、精確架構藍圖、硬核科技與系統拆解必備。", img: "./assets/screenshots/infographic-styles/technical-schematic.webp" },
            { id: "origami", name: "幾何折紙立體", name_en: "Origami Papercraft", desc: "多邊形折紙造型、銳利光影刻面、現代幾何設計感。", img: "./assets/screenshots/infographic-styles/origami.webp" },
            { id: "pixel-art", name: "復古像素點陣", name_en: "Pixel Art 8-Bit", desc: "8-bit 懷舊遊戲像素畫、geek 感強烈、有趣耐看。", img: "./assets/screenshots/infographic-styles/pixel-art.webp" },
            { id: "ui-wireframe", name: "UI 界面線框圖", name_en: "UI Wireframe", desc: "灰階線框原型、乾淨卡片元件、產品經理與設計師最愛。", img: "./assets/screenshots/infographic-styles/ui-wireframe.webp" },
            { id: "subway-map", name: "地鐵拓撲線路圖", name_en: "Subway Transit Map", desc: "倫敦地鐵風格拓撲圖、彩色線路節點、流程網絡極佳展示法。", img: "./assets/screenshots/infographic-layouts/subway-map.webp" },
            { id: "ikea-manual", name: "IKEA 組裝說明書風", name_en: "IKEA Assembly Manual", desc: "極簡黑白線條、零文字直覺裝配圖解、幽默而直觀。", img: "./assets/screenshots/infographic-styles/ikea-manual.webp" },
            { id: "knolling", name: "物件俯拍平鋪", name_en: "Knolling Overhead", desc: "將所有零組件90度直角整齊排列俯瞰、強迫症極度舒適。", img: "./assets/screenshots/infographic-styles/knolling.webp" },
            { id: "lego-brick", name: "樂高積木拼砌", name_en: "Lego Brick World", desc: "繽紛積木塊拼接出的知識模型、寓教於樂。", img: "./assets/screenshots/infographic-styles/lego-brick.webp" }
        ];

        const infographicLayouts = [
            { id: "journey-path", name: "曲折旅程道路圖", name_en: "Journey Path", desc: "公路關卡式貫穿各階段里程碑與執行步驟，指引感極強。", img: "./assets/screenshots/infographic-layouts/journey-path.webp" },
            { id: "bento-grid", name: "便當盒網格佈局", name_en: "Bento Grid", desc: "多區塊卡片組合，適合多主題或多面向重點綜觀。", img: "./assets/screenshots/infographic-layouts/grid-cards.webp" },
            { id: "timeline-horizontal", name: "水平時間軸里程碑", name_en: "Timeline Roadmap", desc: "按時間順序與關鍵里程節點推進，歷程演進最佳展示法。", img: "./assets/screenshots/infographic-layouts/timeline-horizontal.webp" },
            { id: "do-dont", name: "正確與錯誤對照", name_en: "Do vs Don't Table", desc: "綠勾推薦做法 vs 紅叉避免行為，正反對照一目了然。", img: "./assets/screenshots/infographic-layouts/do-dont.webp" },
            { id: "funnel", name: "轉化與篩選漏斗", name_en: "Conversion Funnel", desc: "層層遞進篩選、流程評估與各階段條件分級。", img: "./assets/screenshots/infographic-layouts/funnel.webp" },
            { id: "pyramid", name: "層級金字塔", name_en: "Hierarchy Pyramid", desc: "重要性與優先度層級金字塔，由基礎穩固推進到頂層核心。", img: "./assets/screenshots/infographic-layouts/pyramid.webp" },
            { id: "mind-map", name: "思維導圖發散樹", name_en: "Mind Map Radial", desc: "核心主題輻射發散、各項關鍵要點分支體系。", img: "./assets/screenshots/infographic-layouts/mind-map.webp" },
            { id: "bridge", name: "跨越鴻溝問題橋", name_en: "Problem-Solution Bridge", desc: "現狀痛點問題 ➜ 解決方案之橋 ➜ 達成目標願景。", img: "./assets/screenshots/infographic-layouts/bridge.webp" },
            { id: "comparison-table", name: "多維度矩陣對比表", name_en: "Comparison Table", desc: "多種方案、情境條件與執行方針橫向對比。", img: "./assets/screenshots/infographic-layouts/comparison-table.webp" },
            { id: "layers-stack", name: "分層架構模組棧", name_en: "Tech Layers Stack", desc: "基礎底層、核心邏輯、頂層應用等層次架構。", img: "./assets/screenshots/infographic-layouts/layers-stack.webp" },
            { id: "iceberg", name: "冰山可見與隱藏模型", name_en: "Iceberg Model", desc: "水面上顯性可見現象 vs 水面下隱性深層關鍵。", img: "./assets/screenshots/infographic-layouts/iceberg.webp" },
            { id: "circular-flow", name: "循環閉環生態圈", name_en: "Circular Ecosystem", desc: "閉環回饋、持續優化與流轉體系。", img: "./assets/screenshots/infographic-layouts/circular-flow.webp" }
        ];

        const coverStyles = [
            { id: "typography", name: "大字體排版海報", name_en: "Bold Typography", desc: "強大的字體層級、大膽的主標題、現代網格排版，宣傳海報首選。", img: "./assets/screenshots/cover-image-styles/bold-editorial.webp" },
            { id: "minimal", name: "北歐簡約高質感", name_en: "Nordic Minimalist", desc: "純淨背景、講究留白、優雅幾何色塊與精緻線條，適合高階商務。", img: "./assets/screenshots/cover-image-styles/minimal.webp" },
            { id: "notion", name: "Notion 知識手繪風", name_en: "Notion Line Art", desc: "知性簡約手繪插圖、黑白線稿加點綴色、科技與生產力最愛。", img: "./assets/screenshots/cover-image-styles/notion.webp" },
            { id: "dark-atmospheric", name: "暗黑大氣科技海報", name_en: "Dark Atmospheric", desc: "深色背景、微光粒子、高對比電影質感、氣勢磅礡。", img: "./assets/screenshots/cover-image-styles/dark-atmospheric.webp" },
            { id: "blueprint", name: "工程藍圖科技海報", name_en: "Blueprint Architecture", desc: "工程藍底白線、精密幾何格線、架構與技術發表會大作。", img: "./assets/screenshots/cover-image-styles/blueprint.webp" },
            { id: "vector-illustration", name: "精緻扁平向量插畫", name_en: "Vector Illustration", desc: "現代向量插畫、豐富細節、友善而富有活力、適合品牌行銷。", img: "./assets/screenshots/cover-image-styles/vector-illustration.webp" },
            { id: "watercolor", name: "唯美藝術水彩", name_en: "Artistic Watercolor", desc: "優雅水彩暈染、手感藝術、人文與生活風格封面首選。", img: "./assets/screenshots/cover-image-styles/watercolor.webp" },
            { id: "chalkboard", name: "粉筆黑板手繪", name_en: "Chalkboard Concept", desc: "黑板底紋、彩色手寫粉筆字、教學活動與講座海報。", img: "./assets/screenshots/cover-image-styles/chalkboard.webp" }
        ];

        const DEFAULT_TITLE = '被動物抓咬，別等！';
        const DEFAULT_SUBTITLE = '沖洗 15 分鐘，儘速就醫評估';

        // Default medical content from user
        const DEFAULT_MARKDOWN = `# 主標
## ${DEFAULT_TITLE}
### **${DEFAULT_SUBTITLE}**

狂犬病一旦發病，致死率幾乎達 100%；
但遭動物抓咬後，及時做好傷口處理並接受適當的暴露後預防，可降低發病風險。

---

# 重點訊息

### 🧼 ① 先沖洗
**立即用肥皂＋大量清水沖洗傷口 15 分鐘**
再以**優碘或 70% 酒精消毒**。

### 🏥 ② 儘速就醫
不要自行判斷「傷口很小應該沒事」。
遭動物抓咬後，**儘速就醫，由醫師評估狂犬病暴露風險**，必要時接受狂犬病疫苗及免疫球蛋白等處置。

### 🐾 ③ 記住動物特徵
保持冷靜，記住動物的**種類、外觀及抓咬地點**。
**不要為了確認動物而冒險捕捉牠。**

---

# 行動指引

## 被抓咬後，記住「3 步驟」
### 01｜沖：肥皂＋大量清水 → 沖洗 15 分鐘
### 02｜消：優碘或 70% 酒精 → 消毒傷口
### 03｜送：儘速就醫 → 由醫師評估是否需要狂犬病暴露後預防

---

# 疫苗政策重點
### 「不是被咬就自己決定要不要打。」
狂犬病疫苗是否需要接種，由醫師依動物種類、暴露情形及所在地風險等因素評估。
符合暴露後預防接種條件者，應依醫師安排接受疫苗及必要的免疫球蛋白。
目前疾管署設有 人用狂犬病疫苗接種服務醫院 及 人用狂犬病免疫球蛋白儲備醫院。

---

# CTA
## **有抓咬，就先沖、再送醫！**
### 不確定怎麼辦？
**撥打疾管署防疫專線 1922** 或 **0800-001922** 諮詢。
**別等症狀出現，先把該做的事做好。**
資料來源：衛生福利部疾病管制署「狂犬病防治專區」`;

        // Resolution & Quality Presets Database
        const RESOLUTION_SPECS = {
            '1:1': {
                name: '【正方形 1:1】',
                direction: '方形',
                desc: 'LINE 官方帳號小卡、輪播訊息、社群方形貼圖',
                mobile: { w: 1040, h: 1040, dpi: '72 DPI', note: 'LINE 官方建議標準（< 1MB 載入極速）' },
                hd2k: { w: 2048, h: 2048, dpi: '150 DPI', note: '2K Retina 視網膜螢幕高清展示' },
                print4k: { w: 3000, h: 3000, dpi: '300 DPI', note: '3000×3000 實體印刷方卡標準' }
            },
            '9:16': {
                name: '【直式長版 9:16】',
                direction: '直式全螢幕',
                desc: '手機全螢幕海報、限時動態 (Story)、直式導覽長圖',
                mobile: { w: 1080, h: 1920, dpi: '72 DPI', note: '手機標準 FHD (1080×1920)' },
                hd2k: { w: 1440, h: 2560, dpi: '150 DPI', note: '2K 旗艦手機高密度清晰長圖' },
                print4k: { w: 2160, h: 3840, dpi: '300 DPI', note: '4K UHD 手機全屏長海報印刷' }
            },
            '3:4': {
                name: '【直式標準 3:4】',
                direction: '直式標準',
                desc: '經典活動海報、社群精美圖卡、展架宣傳單、A4/A3 文宣',
                mobile: { w: 1080, h: 1440, dpi: '72 DPI', note: '社群直式圖卡標準' },
                hd2k: { w: 1800, h: 2400, dpi: '150 DPI', note: '2K 易拉寶 / 數位立牌規格' },
                print4k: { w: 3000, h: 4000, dpi: '300 DPI', note: '3000×4000 px 實體 A3/A2 印刷標準' }
            },
            '16:9': {
                name: '【橫式寬幅 16:9】',
                direction: '橫式寬螢幕',
                desc: '電腦簡報投影片、官網橫幅 (Banner)、橫式廣告看板',
                mobile: { w: 1920, h: 1080, dpi: '72 DPI', note: 'FHD 電腦螢幕 / YouTube 封面' },
                hd2k: { w: 2560, h: 1440, dpi: '150 DPI', note: '2K QHD 官網橫向大 Banner' },
                print4k: { w: 3840, h: 2160, dpi: '300 DPI', note: '4K 寬屏展覽大螢幕 / 戶外看板' }
            }
        };

        // Robust markdown title and subtitle extractor
        const extractTitleAndSubtitle = (rawText) => {
            const lines = (rawText || '').split('\n').map(l => l.trim()).filter(Boolean);
            let newT = '', newSub = '';
            for (let line of lines) {
                if (/^[-=*_]{3,}$/.test(line)) continue;
                let clean = line.replace(/^#+\s*/, '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').trim();
                clean = clean.replace(/^(?:主標題?|標題|主題|Title)[:：\s]*/i, '').trim();
                if (!clean || clean === '重點訊息' || clean === '行動指引' || clean === 'CTA') continue;
                
                if (!newT) {
                    newT = clean;
                } else if (!newSub && clean !== newT) {
                    let subClean = clean.replace(/^(?:副標題?|副標|Subtitle)[:：\s]*/i, '').trim();
                    if (subClean && subClean !== newT && subClean !== '重點訊息' && subClean !== '行動指引') {
                        newSub = subClean;
                        break;
                    }
                }
            }
            return { title: newT, subtitle: newSub };
        };

        const App = () => {
            const [mode, setMode] = useState('infographic'); // 'infographic' | 'xhs' | 'cover'
            const [subTab, setSubTab] = useState('layout'); // 'layout' | 'style'
            const [language, setLanguage] = useState('zh');
            const [totalViews, setTotalViews] = useState(null);

            // Separate inputs with smart sync capability
            const [title, setTitle] = useState(DEFAULT_TITLE);
            const [subtitle, setSubtitle] = useState(DEFAULT_SUBTITLE);
            const [content, setContent] = useState(DEFAULT_MARKDOWN);
            const [autoSyncTitle, setAutoSyncTitle] = useState(true);
            
            // Aspect ratio & Resolution Tier
            const [aspectRatio, setAspectRatio] = useState('9:16');
            const [qualityTier, setQualityTier] = useState('hd2k'); // 'mobile' | 'hd2k' | 'print4k'
            const [cardCount, setCardCount] = useState(5);
            
            // Selections
            const [selectedXhsStyle, setSelectedXhsStyle] = useState('notion');
            const [selectedXhsLayout, setSelectedXhsLayout] = useState('flow');
            
            const [selectedInfoStyle, setSelectedInfoStyle] = useState('craft-handmade');
            const [selectedInfoLayout, setSelectedInfoLayout] = useState('journey-path');

            const [selectedCoverStyle, setSelectedCoverStyle] = useState('typography');
            const [coverType, setCoverType] = useState('hero');
            const [coverRendering, setCoverRendering] = useState('flat-vector');
            const [coverTextLevel, setCoverTextLevel] = useState('title-subtitle');
            const [coverMood, setCoverMood] = useState('bold');

            // Palette (defaults to medical-alert for public health info)
            const [palette, setPalette] = useState(palettePresets[0].colors);
            const [editingColorIdx, setEditingColorIdx] = useState(null);

            // Modal, Feedback & Editable Prompt
            const [copied, setCopied] = useState(false);
            const [copiedCli, setCopiedCli] = useState(false);
            const [copiedImagePrompt, setCopiedImagePrompt] = useState(false);
            const [zoomImage, setZoomImage] = useState(null);
            const [customPrompt, setCustomPrompt] = useState(null);

            // Current Resolution Data
            const currentSpec = useMemo(() => {
                const specGroup = RESOLUTION_SPECS[aspectRatio] || RESOLUTION_SPECS['9:16'];
                const tier = specGroup[qualityTier] || specGroup.hd2k;
                return {
                    direction: specGroup.direction,
                    desc: specGroup.desc,
                    width: tier.w,
                    height: tier.h,
                    dpi: tier.dpi,
                    note: tier.note
                };
            }, [aspectRatio, qualityTier]);

            // Detect title from current content to check synchronization
            const detectedFromContent = useMemo(() => extractTitleAndSubtitle(content), [content]);
            const isOutOfSync = useMemo(() => {
                return Boolean(detectedFromContent.title && detectedFromContent.title !== title);
            }, [detectedFromContent, title]);

            const handleContentChange = (newVal) => {
                setContent(newVal);
                if (autoSyncTitle) {
                    const extracted = extractTitleAndSubtitle(newVal);
                    if (extracted.title) setTitle(extracted.title);
                    if (extracted.subtitle) setSubtitle(extracted.subtitle);
                }
            };

            const handleSmartExtract = () => {
                const { title: t, subtitle: sub } = detectedFromContent;
                if (t) setTitle(t);
                if (sub) setSubtitle(sub);
            };

            // Handle mode switch with natural aspect ratio defaults
            const handleModeChange = (newMode) => {
                setMode(newMode);
                setCustomPrompt(null);
                if (newMode === 'xhs') {
                    setAspectRatio('1:1');
                    setQualityTier('mobile');
                    setSubTab('layout');
                } else if (newMode === 'infographic') {
                    setAspectRatio('9:16');
                    setQualityTier('hd2k');
                    setSubTab('layout');
                } else if (newMode === 'cover') {
                    setAspectRatio('1:1');
                    setQualityTier('hd2k');
                    setSubTab('style');
                }
            };

            // Supabase view count
            useEffect(() => {
                const alreadyCounted = sessionStorage.getItem(VIEW_SESSION_KEY) === '1';
                const rpcName = alreadyCounted ? 'get_gemini_notebook_views' : 'increment_gemini_notebook_views';
                fetch(`${SUPABASE_PROJECT_URL}/rest/v1/rpc/${rpcName}`, {
                    method: alreadyCounted ? 'GET' : 'POST',
                    headers: {
                        apikey: SUPABASE_PUBLISHABLE_KEY,
                        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: alreadyCounted ? undefined : '{}'
                })
                .then(r => r.json())
                .then(c => {
                    if (!alreadyCounted) sessionStorage.setItem(VIEW_SESSION_KEY, '1');
                    if (Number.isFinite(Number(c))) setTotalViews(Number(c));
                })
                .catch(() => {});
            }, []);

            // Generate CLI command including size/quality
            const generatedCli = useMemo(() => {
                const cleanTopic = (title.trim() || '未命名主題').replace(/"/g, '\\"');
                const sizeArg = `--size ${currentSpec.width}x${currentSpec.height}`;
                if (mode === 'xhs') {
                    return `/baoyu-xhs-images "${cleanTopic}" --style ${selectedXhsStyle} --layout ${selectedXhsLayout} --count ${cardCount} --aspect ${aspectRatio} ${sizeArg}`;
                } else if (mode === 'infographic') {
                    return `/baoyu-infographic "${cleanTopic}" --layout ${selectedInfoLayout} --style ${selectedInfoStyle} --aspect ${aspectRatio} ${sizeArg}`;
                } else {
                    return `/baoyu-cover-image "${cleanTopic}" --type ${coverType} --style ${selectedCoverStyle} --rendering ${coverRendering} --text ${coverTextLevel} --mood ${coverMood} --aspect ${aspectRatio} ${sizeArg}`;
                }
            }, [mode, title, selectedXhsStyle, selectedXhsLayout, cardCount, aspectRatio, selectedInfoLayout, selectedInfoStyle, coverType, selectedCoverStyle, coverRendering, coverTextLevel, coverMood, currentSpec]);

            // Generate structured full Prompt with clear palette mapping & pixel dimensions
            const generatedPrompt = useMemo(() => {
                const [cPrimary, cSecondary, cBg, cText, cAccent] = palette;
                const displayTitle = title.trim() || '未命名主題';
                const displaySubtitle = subtitle.trim() || '重要宣導事項';

                if (mode === 'xhs') {
                    const st = xhsStyles.find(s => s.id === selectedXhsStyle) || xhsStyles[0];
                    const lay = xhsLayouts.find(l => l.id === selectedXhsLayout) || xhsLayouts[0];
                    return `### 🎯 任務目標：LINE 官方帳號小卡 / 社群知識圖卡系列生成
你是一位精通社群視覺、LINE 官方帳號輪播小卡 (Card Carousel) 與高說服力知識圖文的頂級視覺設計專家。
請依據以下具體解析度規格、配色邏輯與文案內容，為主題「${displayTitle}」設計一套共 ${cardCount} 張的系列圖卡視覺規範與內容規劃：

### 📐 尺寸、方向與輸出解析度規格
- **卡片長寬比**：${aspectRatio} (${currentSpec.direction}) - ${currentSpec.desc}
- **精準輸出解析度**：${currentSpec.width} × ${currentSpec.height} px (${currentSpec.dpi}，${currentSpec.note})
- **系列卡片張數**：共 ${cardCount} 張連續圖卡（建議第一張大標吸睛，中段步驟拆解，末張強烈行動指引）
- **視覺美學風格**：${st.name} (${st.id}) - ${st.desc}
- **版面佈局結構**：${lay.name} (${lay.id}) - ${lay.desc}

### 🎨 調色盤精準指派 (色彩功能角色)
- [主視覺基調色: ${cPrimary}]：用於系列小卡邊框、大標題徽章、關鍵圖標與外框線條
- [焦點強調色: ${cAccent}]：高對比焦點色，突顯關鍵重點、核心數據指標與重要行動呼籲 (CTA)
- [背景底色: ${cBg}]：保持全局背景純淨，確保行動裝置螢幕高對比不疲勞
- [次級模組容器色: ${cSecondary}]：用於各步驟卡片、內容分塊容器之獨立底色
- [內文正文字體色: ${cText}]：高易讀性文字色彩，保證各年齡層在手機端秒懂

### 📌 標題設定
- **主標題**：${displayTitle}
- **副標導讀**：${displaySubtitle}

### 📝 詳細文案來源與段落依據
${content}

---
### 💡 執行指示（給 Gemini）
請依據上述的「${lay.name}」架構與「${st.name}」視覺風格，將上述內容拆解規劃為共 ${cardCount} 張的連續圖卡文案與各頁畫面排版建議，並嚴格遵循指定的 5 色調色盤。`;
                } else if (mode === 'infographic') {
                    const st = infographicStyles.find(s => s.id === selectedInfoStyle) || infographicStyles[0];
                    const lay = infographicLayouts.find(l => l.id === selectedInfoLayout) || infographicLayouts[0];
                    return `### 🎯 任務目標：高密度知識資訊圖表 / 實體宣傳海報生成
你是一位世界級的資訊視覺化設計總監（Information Architecture & Poster Designer）。
請依據以下結構規格、尺寸解析度、配色原則與輸入文案，為主題「${displayTitle}」規劃一張架構嚴密、一圖看懂的高品質資訊海報：

### 📐 尺寸、方向與輸出解析度規格
- **海報比例**：${aspectRatio} (${currentSpec.direction}) - ${currentSpec.desc}
- **精準輸出解析度**：${currentSpec.width} × ${currentSpec.height} px (${currentSpec.dpi}，${currentSpec.note})
- **視覺美學風格 (Style)**：${st.name} (${st.id}) - ${st.desc}
- **資訊架構模式 (Layout)**：${lay.name} (${lay.id}) - ${lay.desc}

### 🎨 調色盤精準指派 (色彩功能角色)
- [主視覺骨架色: ${cPrimary}]：海報大架構、核心流程導航線、主題 Icon 與外框線條
- [焦點強調色: ${cAccent}]：高對比焦點色，突顯關鍵數據、重要結論與核心行動呼籲 (CTA)
- [背景底色: ${cBg}]：純淨底色，確保密集的資訊區塊擁有充足呼吸空間
- [次要模組容器色: ${cSecondary}]：各章節卡片、內容分塊容器之獨立底色
- [正文字體色: ${cText}]：最高清晰度的文字閱讀顏色

### 📌 標題設定
- **主標題**：${displayTitle}
- **副標導讀**：${displaySubtitle}

### 📝 完整內容與模組規劃依據
${content}

---
### 💡 執行指示（給 Gemini）
請依據上述的「${lay.name}」架構規範與「${st.name}」視覺美學風格，將上述完整內容結構化整理，並嚴格遵循指定的 5 色調色盤，為我輸出完整的海報版面視覺規劃與生圖/排版指示。`;
                } else {
                    const st = coverStyles.find(s => s.id === selectedCoverStyle) || coverStyles[0];
                    return `### 🎯 任務目標：主視覺宣傳海報 / LINE 滿版推播大圖
你是一位知名宣傳海報與數位媒體主視覺藝術總監。
請依據以下客製化規格與解析度設定，為「${displayTitle}」打造一張極具視覺衝擊力與專業感的主視覺封面大圖：

### 📐 尺寸規格與解析度
- **長寬比例**：${aspectRatio} (${currentSpec.direction}) - ${currentSpec.desc}
- **精準輸出解析度**：${currentSpec.width} × ${currentSpec.height} px (${currentSpec.dpi}，${currentSpec.note})
- **構圖類型 (Type)**：${coverType}
- **渲染手法 (Rendering)**：${coverRendering}
- **視覺風格預設 (Style)**：${st.name} (${st.id}) - ${st.desc}
- **氛圍調性 (Mood)**：${coverMood}
- **調色盤指定**：${palette.join(', ')}

### 📌 標題文案
- **主標題**：「${displayTitle}」
- **副標題**：「${displaySubtitle}」

### 📝 內容參考
${content}

---
### 💡 執行指示（給 Gemini）
請依據上述的尺寸比例、構圖類型「${coverType}」、風格「${st.name}」與指定色票，為「${displayTitle}」規劃出最具吸引力的主視覺封面設計與生圖/排版指示。`;
                }
            }, [mode, title, subtitle, content, cardCount, aspectRatio, selectedXhsStyle, selectedXhsLayout, selectedInfoStyle, selectedInfoLayout, selectedCoverStyle, coverType, coverRendering, coverMood, palette, currentSpec]);

            // Active prompt: either user edited custom prompt or auto-generated
            const activePrompt = customPrompt !== null ? customPrompt : generatedPrompt;

            const extractImagePrompt = (text) => {
                const match = text.match(/Prompt:\s*([\s\S]+)$/i);
                return match ? match[1].trim() : text.trim();
            };

            const copyToClipboard = (text, type) => {
                navigator.clipboard.writeText(text).then(() => {
                    if (type === 'cli') {
                        setCopiedCli(true);
                        setTimeout(() => setCopiedCli(false), 2000);
                    } else if (type === 'imagePrompt') {
                        setCopiedImagePrompt(true);
                        setTimeout(() => setCopiedImagePrompt(false), 2000);
                    } else {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    }
                });
            };

            const exportMarkdown = () => {
                const safeTitle = (title.trim() || '未命名主題').replace(/[/\\?%*:|"<>]/g, '_').slice(0, 15);
                const blob = new Blob([activePrompt], { type: 'text/markdown;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${mode}-${safeTitle}.md`;
                a.click();
                URL.revokeObjectURL(url);
            };

            const exportPdf = () => {
                if (!window.jspdf || !window.jspdf.jsPDF) {
                    alert('PDF 函式庫尚未載入完成，請稍候重試');
                    return;
                }
                const displayTitle = title.trim() || '未命名主題';
                const safeTitle = (title.trim() || '未命名主題').replace(/[/\\?%*:|"<>]/g, '_').slice(0, 10);
                const doc = new window.jspdf.jsPDF();
                doc.setFontSize(16);
                doc.text(`Visual Prompt Specification - ${mode}`, 14, 20);
                doc.setFontSize(11);
                doc.text(`Title: ${displayTitle}`, 14, 30);
                doc.text(`Ratio: ${aspectRatio} (${currentSpec.width}x${currentSpec.height} px, ${currentSpec.dpi})`, 14, 38);
                doc.text(`Palette: ${palette.join(', ')}`, 14, 46);
                doc.text(`CLI Command:`, 14, 56);
                doc.setFontSize(9);
                doc.text(generatedCli, 14, 63, { maxWidth: 180 });
                
                doc.setFontSize(11);
                doc.text(`Full Generation Prompt:`, 14, 78);
                doc.setFontSize(8);
                const splitText = doc.splitTextToSize(activePrompt, 180);
                doc.text(splitText, 14, 86);
                doc.save(`${mode}-${safeTitle}.pdf`);
            };

            return (
                <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
                    {/* Header */}
                    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-6 py-3.5 shadow-lg shadow-black/40">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/10">
                                    <Icon name="Wand2" size={22} />
                                </div>
                                <div>
                                    <h1 className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-2">
                                        視覺海報與 LINE 圖卡生成器
                                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">Baoyu Studio v2.3</span>
                                    </h1>
                                    <p className="text-xs text-slate-400">一站式生成 baoyu-xhs-images · baoyu-infographic · baoyu-cover-image 專業 Prompt</p>
                                </div>
                            </div>

                            {/* Mode Navigation Tabs */}
                            <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
                                <button
                                    onClick={() => handleModeChange('infographic')}
                                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'infographic' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <Icon name="BarChart3" size={14} />
                                    <span>baoyu-infographic (資訊海報)</span>
                                </button>
                                <button
                                    onClick={() => handleModeChange('xhs')}
                                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'xhs' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <Icon name="Layers" size={14} />
                                    <span>baoyu-xhs-images (社群小卡)</span>
                                </button>
                                <button
                                    onClick={() => handleModeChange('cover')}
                                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'cover' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <Icon name="Image" size={14} />
                                    <span>baoyu-cover-image (主視覺封面)</span>
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Main Workspace Grid */}
                    <main className="max-w-7xl mx-auto px-4 md:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* LEFT COLUMN: Controls & Configurations (5 cols) */}
                        <section className="lg:col-span-5 flex flex-col gap-5">
                            
                            {/* Card 1: Title & Content */}
                            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                                        <Icon name="FileText" size={16} className="text-cyan-400" />
                                        <span>標題與文案內容</span>
                                    </h2>
                                    <div className="flex items-center gap-2.5">
                                        <label className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1.5 cursor-pointer select-none" title="換貼新文章時，自動更新大標題與副標題">
                                            <input
                                                type="checkbox"
                                                checked={autoSyncTitle}
                                                onChange={(e) => setAutoSyncTitle(e.target.checked)}
                                                className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                                            />
                                            <span>隨內文自動同步</span>
                                        </label>
                                        {isOutOfSync && !autoSyncTitle && (
                                            <button
                                                onClick={handleSmartExtract}
                                                className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 flex items-center gap-1 transition-all animate-pulse shadow-sm shadow-amber-500/10"
                                                title={`偵測到內文標題為「${detectedFromContent.title}」，點擊立即套用`}
                                            >
                                                <Icon name="Sparkles" size={12} />
                                                <span>同步新標題</span>
                                            </button>
                                        )}
                                        {!isOutOfSync && !autoSyncTitle && (
                                            <button
                                                onClick={handleSmartExtract}
                                                className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                                                title="手動從下方內文重新提取標題"
                                            >
                                                <Icon name="Sparkles" size={13} />
                                                <span>從內文識別</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="space-y-3.5">
                                    {/* Dedicated Title Input */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-xs font-bold text-slate-300">
                                                海報主標題 (Main Title)
                                            </label>
                                            {!autoSyncTitle && (
                                                <span className="text-[10px] text-slate-500">已啟用手動自訂</span>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                                setAutoSyncTitle(false);
                                            }}
                                            placeholder={`例如：${DEFAULT_TITLE}`}
                                            className="w-full bg-slate-950 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-white text-sm font-bold focus:border-cyan-400 focus:outline-none transition-all"
                                        />
                                    </div>

                                    {/* Dedicated Subtitle Input */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1">
                                            副標題 / 核心導讀 (Subtitle)
                                        </label>
                                        <input
                                            type="text"
                                            value={subtitle}
                                            onChange={(e) => {
                                                setSubtitle(e.target.value);
                                                setAutoSyncTitle(false);
                                            }}
                                            placeholder={`例如：${DEFAULT_SUBTITLE}`}
                                            className="w-full bg-slate-950 border border-slate-700/70 rounded-xl px-3.5 py-2 text-slate-200 text-xs font-medium focus:border-cyan-400 focus:outline-none transition-all"
                                        />
                                    </div>

                                    {/* Full Content Textarea */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 mb-1">
                                            詳細文案內容 / Markdown 結構 (Full Copy)
                                        </label>
                                        <textarea
                                            rows={8}
                                            value={content}
                                            onChange={(e) => handleContentChange(e.target.value)}
                                            placeholder="貼上完整文章、步驟段落或重點條列..."
                                            className="w-full bg-slate-950 border border-slate-700/70 rounded-xl p-3 text-slate-300 font-mono text-xs leading-relaxed focus:border-cyan-400 focus:outline-none custom-scrollbar select-text"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Aspect Ratio & Professional Resolution Specifications */}
                            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                                        <Icon name="Sliders" size={16} className="text-cyan-400" />
                                        <span>比例、方向與解析度規格</span>
                                    </h2>
                                    <span className="text-[11px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                                        {currentSpec.width} × {currentSpec.height} px
                                    </span>
                                </div>

                                <p className="text-xs text-slate-400 mb-3">請依據發布平台與實體/數位輸出情境選擇比例：</p>
                                
                                {/* 4 Aspect Ratios with Clear Directional Descriptions */}
                                <div className="grid grid-cols-2 gap-2.5 mb-4">
                                    {Object.entries(RESOLUTION_SPECS).map(([ratioKey, item]) => (
                                        <button
                                            key={ratioKey}
                                            onClick={() => setAspectRatio(ratioKey)}
                                            className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${aspectRatio === ratioKey ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400 shadow-md shadow-cyan-500/10' : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'}`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={`text-xs font-black ${aspectRatio === ratioKey ? 'text-cyan-300' : 'text-slate-200'}`}>
                                                    {item.name}
                                                </span>
                                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{ratioKey}</span>
                                            </div>
                                            <span className="text-[11px] text-slate-400 leading-snug">{item.desc}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Quality & DPI Tier Selector */}
                                <div className="pt-3 border-t border-slate-800/80">
                                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                                        <span>輸出解析度檔次 (Resolution Quality Tier)</span>
                                        <span className="text-[11px] font-mono text-slate-400">{currentSpec.dpi} · {currentSpec.note}</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 'mobile', label: '📱 社群輕量', tip: 'LINE / 社群圖卡標準 (<1MB)' },
                                            { id: 'hd2k', label: '🖥️ 數位高清 2K', tip: '螢幕展示 / 視網膜超清' },
                                            { id: 'print4k', label: '🖨️ 印刷輸出 4K', tip: '3000~4000px · 300 DPI 實體海報' }
                                        ].map(tier => (
                                            <button
                                                key={tier.id}
                                                onClick={() => setQualityTier(tier.id)}
                                                className={`py-2 px-1.5 rounded-xl text-center border transition-all ${qualityTier === tier.id ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold' : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'}`}
                                            >
                                                <div className="text-xs">{tier.label}</div>
                                                <div className="text-[9px] text-slate-500 mt-0.5">{tier.tip}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {mode === 'xhs' && (
                                    <div className="mt-4 pt-3 border-t border-slate-800">
                                        <div className="flex justify-between items-center mb-1 text-xs">
                                            <label className="font-bold text-slate-300">系列卡片張數</label>
                                            <span className="font-mono text-cyan-300 font-bold">{cardCount} 張連續小卡</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="10" value={cardCount}
                                            onChange={(e) => setCardCount(Number(e.target.value))}
                                            className="w-full accent-cyan-400 cursor-pointer"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Card 3: Color Palette & Functional Roles */}
                            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl relative">
                                <div className="flex items-center justify-between mb-1">
                                    <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                                        <Icon name="Palette" size={16} className="text-cyan-400" />
                                        <span>調色盤功能與色彩角色</span>
                                    </h2>
                                    <span className="text-[11px] font-bold text-cyan-400">點擊任一色塊即可自訂</span>
                                </div>

                                {/* Explanation of palette's true role */}
                                <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-2.5 mb-3 text-[11px] text-cyan-200/90 leading-relaxed">
                                    💡 <strong>調色盤作用</strong>：這 5 個色碼將直接注入 AI 生圖指令中，分別精確控制海報的<strong>主色調、次要色、背景底色、正文字體與警示強調色</strong>（如紅色緊急處置），防止 AI 隨機雜亂混色。
                                </div>

                                {/* Current 5 Color Swatches with explicit role labels */}
                                <div className="grid grid-cols-5 gap-2 mb-3">
                                    {palette.map((color, idx) => {
                                        const labels = ['主色', '次色', '底色', '字色', '警示'];
                                        return (
                                            <div key={idx} className="relative">
                                                <button
                                                    onClick={() => setEditingColorIdx(editingColorIdx === idx ? null : idx)}
                                                    className="w-full h-12 rounded-xl shadow-md border border-white/10 flex flex-col items-center justify-between p-1 transition-transform hover:scale-105 active:scale-95"
                                                    style={{ backgroundColor: color }}
                                                    title={`點擊調色：${color}`}
                                                >
                                                    <span className="text-[9px] font-bold px-1 rounded bg-black/50 text-white">
                                                        {labels[idx]}
                                                    </span>
                                                    <span
                                                        className="text-[9px] font-mono font-bold"
                                                        style={{ color: hexToLum(color) > 0.5 ? '#000' : '#fff' }}
                                                    >
                                                        {color}
                                                    </span>
                                                </button>
                                                {editingColorIdx === idx && (
                                                    <ColorPicker
                                                        value={color}
                                                        onChange={(newHex) => {
                                                            const np = [...palette];
                                                            np[idx] = newHex;
                                                            setPalette(np);
                                                        }}
                                                        onClose={() => setEditingColorIdx(null)}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Quick Presets */}
                                <div>
                                    <div className="text-[11px] font-bold text-slate-400 mb-1.5">推薦情境色票快速套用：</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {palettePresets.map(preset => (
                                            <button
                                                key={preset.id}
                                                onClick={() => setPalette(preset.colors)}
                                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all ${JSON.stringify(palette) === JSON.stringify(preset.colors) ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                                            >
                                                <div className="flex -space-x-1">
                                                    {preset.colors.slice(0, 3).map((c, ci) => (
                                                        <span key={ci} className="w-2 h-2 rounded-full border border-slate-900" style={{ backgroundColor: c }} />
                                                    ))}
                                                </div>
                                                <span className="text-[11px] font-medium">{preset.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* RIGHT COLUMN: Style Gallery & Prompt Output (7 cols) */}
                        <section className="lg:col-span-7 flex flex-col gap-5">
                            
                            {/* Visual Showcase Gallery */}
                            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
                                    <div className="flex items-center gap-2">
                                        {mode !== 'cover' && (
                                            <button
                                                onClick={() => setSubTab('layout')}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subTab === 'layout' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400 hover:text-white'}`}
                                            >
                                                版面架構 (Layouts)
                                            </button>
                                        )}
                                        <button
                                            onClick={() => setSubTab('style')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subTab === 'style' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            視覺風格 (Styles)
                                        </button>
                                    </div>
                                    <span className="text-xs text-slate-400 font-mono">
                                        點擊卡片套用 · 點放大鏡看大圖
                                    </span>
                                </div>

                                {/* Items Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                                    {(mode === 'xhs' ? (subTab === 'layout' ? xhsLayouts : xhsStyles) :
                                      mode === 'infographic' ? (subTab === 'layout' ? infographicLayouts : infographicStyles) :
                                      coverStyles).map(item => {
                                        const isSelected = mode === 'xhs' ? (subTab === 'layout' ? selectedXhsLayout === item.id : selectedXhsStyle === item.id) :
                                                           mode === 'infographic' ? (subTab === 'layout' ? selectedInfoLayout === item.id : selectedInfoStyle === item.id) :
                                                           selectedCoverStyle === item.id;
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    if (mode === 'xhs') {
                                                        if (subTab === 'layout') setSelectedXhsLayout(item.id);
                                                        else setSelectedXhsStyle(item.id);
                                                    } else if (mode === 'infographic') {
                                                        if (subTab === 'layout') setSelectedInfoLayout(item.id);
                                                        else setSelectedInfoStyle(item.id);
                                                    } else {
                                                        setSelectedCoverStyle(item.id);
                                                    }
                                                }}
                                                className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all group relative bg-slate-950/80 flex flex-col ${isSelected ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400' : 'border-slate-800 hover:border-slate-600'}`}
                                            >
                                                <div className="aspect-video relative overflow-hidden bg-slate-900">
                                                    <img
                                                        src={item.img}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        loading="lazy"
                                                    />
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setZoomImage(item); }}
                                                        className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/70 text-white hover:text-cyan-300 transition-colors"
                                                        title="放大預覽"
                                                    >
                                                        <Icon name="ZoomIn" size={13} />
                                                    </button>
                                                    {isSelected && (
                                                        <div className="absolute top-1.5 left-1.5 bg-cyan-400 text-slate-950 p-0.5 rounded-full shadow">
                                                            <Icon name="Check" size={12} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-2.5 flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <div className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>{item.name}</div>
                                                        <div className="text-[10px] text-slate-500 font-mono">{item.id}</div>
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{item.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Prompt Output Card */}
                            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col gap-3.5">
                                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                                        <span className="text-xs font-bold text-white tracking-wide">
                                            即時 Prompt 編譯輸出 ({currentSpec.width}×{currentSpec.height} px · {currentSpec.dpi})
                                        </span>
                                        {customPrompt !== null && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-in">
                                                手動編輯中
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center flex-wrap gap-2">
                                        <button
                                            onClick={() => copyToClipboard(generatedCli, 'cli')}
                                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-all"
                                            title="複製 CLI 指令"
                                        >
                                            <Icon name="Terminal" size={13} />
                                            <span>{copiedCli ? '已複製！' : '複製 CLI'}</span>
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(activePrompt, 'prompt')}
                                            className="px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-cyan-400/20 transition-all"
                                            title="一鍵複製整份規格，直接貼給 Google Gemini 即可完成排版與生成！"
                                        >
                                            <Icon name={copied ? 'Check' : 'Sparkles'} size={14} />
                                            <span>{copied ? '已複製 Gemini 提示詞！' : '📋 複製 Gemini 提示詞'}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Terminal CLI Banner */}
                                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-cyan-300 flex items-center justify-between overflow-x-auto custom-scrollbar">
                                    <div className="truncate pr-3 select-all">{generatedCli}</div>
                                </div>

                                {/* Full Structured Prompt Content (Directly Editable Textarea) */}
                                <div className="relative">
                                    <textarea
                                        value={activePrompt}
                                        onChange={(e) => setCustomPrompt(e.target.value)}
                                        rows={13}
                                        className="w-full bg-slate-950/90 border border-slate-800/80 focus:border-cyan-400/80 rounded-xl p-4 text-xs font-mono text-slate-200 leading-relaxed custom-scrollbar outline-none resize-y transition-all"
                                        placeholder="即時生成的提示詞..."
                                        spellCheck="false"
                                    />
                                    <div className="flex items-center justify-between mt-1.5 px-1">
                                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                            <span>💡 提示：框內為標準規格書（可直接點擊編輯），<b>複製後直接貼入 Google Gemini 對話框即可！</b></span>
                                        </span>
                                        {customPrompt !== null && (
                                            <button
                                                onClick={() => setCustomPrompt(null)}
                                                className="text-[11px] text-amber-400 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1 transition-colors"
                                            >
                                                <Icon name="RefreshCw" size={11} />
                                                <span>復原為自動生成</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Export Actions */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 border-t border-slate-800/60 mt-1">
                                    <div className="text-[11px] text-slate-500 font-mono">
                                        相容：Google Gemini / Claude / ChatGPT / Codex / CLI
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={exportMarkdown}
                                            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 text-xs font-bold flex items-center gap-1 transition-all"
                                        >
                                            <Icon name="FileText" size={13} />
                                            <span>下載 Markdown</span>
                                        </button>
                                        <button
                                            onClick={exportPdf}
                                            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 text-xs font-bold flex items-center gap-1 transition-all"
                                        >
                                            <Icon name="Download" size={13} />
                                            <span>匯出 PDF 規格書</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Image Zoom Lightbox Modal */}
                    {zoomImage && (
                        <div
                            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in"
                            onClick={() => setZoomImage(null)}
                        >
                            <div
                                className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-sm text-white">{zoomImage.name}</h3>
                                        <p className="text-xs text-slate-400 font-mono">{zoomImage.id}</p>
                                    </div>
                                    <button
                                        onClick={() => setZoomImage(null)}
                                        className="text-slate-400 hover:text-white text-lg font-bold p-1"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="p-4 max-h-[70vh] flex items-center justify-center bg-slate-950 overflow-hidden">
                                    <img src={zoomImage.img} alt={zoomImage.name} className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg" />
                                </div>
                                <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs">
                                    <p className="text-slate-300 max-w-md">{zoomImage.desc}</p>
                                    <button
                                        onClick={() => {
                                            if (mode === 'xhs') {
                                                if (subTab === 'layout') setSelectedXhsLayout(zoomImage.id);
                                                else setSelectedXhsStyle(zoomImage.id);
                                            } else if (mode === 'infographic') {
                                                if (subTab === 'layout') setSelectedInfoLayout(zoomImage.id);
                                                else setSelectedInfoStyle(zoomImage.id);
                                            } else {
                                                setSelectedCoverStyle(zoomImage.id);
                                            }
                                            setZoomImage(null);
                                        }}
                                        className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black"
                                    >
                                        套用此風格 / 佈局
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <footer className="w-full mt-16 pt-8 pb-10 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
                        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                            <div className="flex items-center gap-4">
                                <a href="https://github.com/gemini960114/visual-prompt-studio" target="_blank" className="hover:text-cyan-300 font-bold transition-colors flex items-center gap-1.5">
                                    <span>GitHub: gemini960114/visual-prompt-studio</span>
                                </a>
                            </div>
                            <div className="text-right font-mono">
                                <span>Visual Prompt Studio © 2026</span>
                                {totalViews !== null && (
                                    <span className="ml-3 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-bold">
                                        ◉ 累積訪問 {totalViews.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </footer>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
