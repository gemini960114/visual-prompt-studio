
        const { useState, useEffect, useMemo } = React;

        const SUPABASE_PROJECT_URL = 'https://kwnrkmaoqeyaappnoiwh.supabase.co';
        const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_8yiNskpmUht5dGpmd7SrlQ_R03KtJeB';
        const VIEW_SESSION_KEY = 'gemini-notebook-view-counted';

        const getSlideAssetUrl = (url) => {
            if (!url || typeof url !== 'string') return url;
            const m = url.match(/id=([A-Za-z0-9_-]+)/);
            if (m) {
                return './assets/thumbnails/' + m[1] + '.jpg';
            }
            return url;
        };


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
                Zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
                BookOpen: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
                History: <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></>,
                Share2: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></>,
                Layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
                GitCommit: <><circle cx="12" cy="12" r="4"/><line x1="1.05" x2="8" y1="12" y2="12"/><line x1="16" x2="22.95" y1="12" y2="12"/></>,
                Network: <><rect width="6" height="6" x="9" y="2" rx="1"/><rect width="6" height="6" x="2" y="16" rx="1"/><rect width="6" height="6" x="16" y="16" rx="1"/><path d="M12 8v4M12 12H5v4M12 12h7v4"/></>,
                Grid3X3: <><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></>,
                Triangle: <path d="M13.73 21a2 2 0 0 1-3.46 0L1.73 6A2 2 0 0 1 3.46 3h17.08a2 2 0 0 1 1.73 3l-8.54 15z"/>,
                Youtube: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></>,
                Projector: <><path d="M5 7 3 21"/><path d="m19 7 2 14"/><path d="M6 3h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><circle cx="12" cy="6" r="2"/></>,
                Settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
                Target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
                Smile: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>,
                Monitor: <><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
                ArrowDown: <path d="m6 9 6 6 6-6"/>,
                User: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
                PlusCircle: <><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></>,
                Pen: <><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></>,
                Info: <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>,
                Globe: <><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></>,
                Pipette: <><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"/></>
            };
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    {icons[name] || null}
                </svg>
            );
        };

        const HighlightedText = ({ text }) => {
            if (!text) return null;
            const regex = /(\{\{.*?\}\})/g;
            const parts = text.split(regex);
            return (
                <>{parts.map((part, i) => {
                    if (!part) return null;
                    if (part.startsWith('{{') && part.endsWith('}}')) {
                        return <span key={i} className="text-pink-400 font-bold">{part.slice(2, -2)}</span>;
                    }
                    return <span key={i}>{part}</span>;
                })}</>
            );
        };

        const uiText = {
            zh: {
                appTitle: "Gemini Notebook 簡報Prompt生成器 2.0",
                tabGenerator: "生成簡報Prompt",
                tabReference: "Gemini Notebook簡報風格範本",
                step1Title: "1. 簡報基本設定 (調查)",
                pages: "預計簡報頁數 (張)",
                time: "預計報告時間 (分鐘)",
                role: "簡報角色",
                context: "簡報發表場景",
                audience: "目標受眾 (對誰報告)",
                tone: "講者語氣與人設",
                cta: "核心行動呼籲 (CTA)",
                notes: "講者備註 (Speaker Notes)",
                need: "✅ 需要",
                noNeed: "❌ 不需要",
                addition: "補充說明 (自由填寫)",
                phRole: "例如: 資深行銷總監",
                phContext: "請輸入發表場景...",
                phAudience: "請輸入目標受眾...",
                phTone: "請輸入講者語氣...",
                phCta: "請輸入行動呼籲...",
                phAddition: "例如: 請著重介紹產品的 AI 自動化功能...",
                phSlideCount: "例如: 10",
                phTime: "例如: 15",
                step2Title: "2. 簡報目的 / 類型",
                customPurpose: "自訂簡報目的",
                phCustomPurpose: "目的 (例如: 年度總結大會)",
                step3Title: "3. 簡報大綱架構",
                recommend: "推薦",
                customLayout: "自訂大綱邏輯",
                phLayoutName: "架構 (例如: 黃金圈法則)",
                phLayoutDesc: "說明 (例如: Why -> How -> What)",
                step4Title: "4. 建議視覺風格",
                noStyle: "不需要視覺風格",
                customStyle: "自訂視覺風格",
                phStyleName: "名稱 (例如: 復古像素風)",
                phStyleDesc: "說明 (例如: 大量使用霓虹色塊與點陣字體...)",
                outputTitle: "Output Prompt",
                copy: "複製",
                copied: "已複製",
                goToNbLM: "前往 Gemini Notebook 貼上指令",
                goToGemini: "前往 Gemini AI 貼上指令",
                styleInsight: "簡報風格洞察 (Style Insight)",
                stylePromptTitle: "專屬視覺設定指令片語",
                zhPromptHeading: "ZH-TW 繁體中文指令設定",
                enPromptHeading: "EN-US English Prompt Snippet",
                copyStylePrompt: "複製風格提示詞",
                openNbLM: "開啟 NOTEBOOKLM",
                welcomeShare: "歡迎分享您的範例 PDF 與 Prompt，讓此工具可以結合更多的創意 (郵寄至：",
                backToGen: "回到簡報 PROMPT 生成器",
                provider: "▲ 簡報範本提供者：",
                zoomIn: "點擊放大查看投影片氛圍",
                zoomOut: "點擊縮小",
                footerLabel: "學習更多 AI 與簡報技術，歡迎關注 "
            },
            en: {
                appTitle: "Gemini Notebook Prompt Generator 2.0",
                tabGenerator: "Prompt Generator",
                tabReference: "Style Templates",
                step1Title: "1. Basic Settings",
                pages: "Est. Slides (pages)",
                time: "Est. Time (mins)",
                role: "Speaker Role",
                context: "Presentation Context",
                audience: "Target Audience",
                tone: "Speaker Tone",
                cta: "Call to Action (CTA)",
                notes: "Speaker Notes",
                need: "✅ Include",
                noNeed: "❌ Exclude",
                addition: "Additional Notes",
                phRole: "e.g., Senior Marketing Director",
                phContext: "Enter presentation context...",
                phAudience: "Enter target audience...",
                phTone: "Enter speaker tone...",
                phCta: "Enter CTA...",
                phAddition: "e.g., Emphasize the AI automation features...",
                phSlideCount: "e.g., 10",
                phTime: "e.g., 15",
                step2Title: "2. Purpose / Type",
                customPurpose: "Custom Purpose",
                phCustomPurpose: "Purpose (e.g., Annual Review)",
                step3Title: "3. Outline Framework",
                recommend: "Recommended",
                customLayout: "Custom Framework",
                phLayoutName: "Framework (e.g., Golden Circle)",
                phLayoutDesc: "Description (e.g., Why -> How -> What)",
                step4Title: "4. Visual Style",
                noStyle: "No Visual Style",
                customStyle: "Custom Style",
                phStyleName: "Name (e.g., Retro Pixel)",
                phStyleDesc: "Description (e.g., Neon colors, pixel fonts...)",
                outputTitle: "Output Prompt",
                copy: "COPY",
                copied: "COPIED",
                goToNbLM: "Paste to Gemini Notebook",
                goToGemini: "Paste to Gemini AI",
                styleInsight: "Style Insight",
                stylePromptTitle: "Style Prompt Snippets",
                zhPromptHeading: "ZH-TW Prompt Snippet",
                enPromptHeading: "EN-US Prompt Snippet",
                copyStylePrompt: "Copy Style Prompt",
                openNbLM: "Open NOTEBOOKLM",
                welcomeShare: "Share your PDF & Prompts to add more creativity! (Email: ",
                backToGen: "Back to Prompt Generator",
                provider: "▲ Template Provider: ",
                zoomIn: "Click to zoom in",
                zoomOut: "Click to zoom out",
                footerLabel: "Learn more about AI & Presentations, follow "
            },
            ja: {
                appTitle: "Gemini Notebook プロンプト生成器 2.0",
                tabGenerator: "プロンプト生成",
                tabReference: "スタイルテンプレート",
                step1Title: "1. 基本設定",
                pages: "想定スライド数 (枚)",
                time: "想定発表時間 (分)",
                role: "スピーカーの役割",
                context: "発表シーン",
                audience: "ターゲット層",
                tone: "語り口・トーン",
                cta: "行動喚起 (CTA)",
                notes: "スピーカーノート",
                need: "✅ 必要",
                noNeed: "❌ 不要",
                addition: "追加メモ (自由入力)",
                phRole: "例: シニアマーケティングディレクター",
                phContext: "シーンを入力...",
                phAudience: "ターゲットを入力...",
                phTone: "トーンを入力...",
                phCta: "CTAを入力...",
                phAddition: "例: AIの自動化機能を強調...",
                phSlideCount: "例: 10",
                phTime: "例: 15",
                step2Title: "2. プレゼンの目的",
                customPurpose: "カスタム目的",
                phCustomPurpose: "目的 (例: 年次総会)",
                step3Title: "3. 構成フレームワーク",
                recommend: "推奨",
                customLayout: "カスタム構成",
                phLayoutName: "構成 (例: ゴールデンサークル)",
                phLayoutDesc: "説明 (例: Why -> How -> What)",
                step4Title: "4. ビジュアルスタイル",
                noStyle: "スタイルなし",
                customStyle: "カスタムスタイル",
                phStyleName: "名前 (例: レトロピクセル)",
                phStyleDesc: "説明 (例: ネオンカラー、ピクセルフォント...)",
                outputTitle: "出力プロンプト",
                copy: "コピー",
                copied: "コピー完了",
                goToNbLM: "Gemini Notebookに貼り付け",
                goToGemini: "Gemini AIに貼り付け",
                styleInsight: "スタイルの洞察 (Style Insight)",
                stylePromptTitle: "専用ビジュアルプロンプト",
                zhPromptHeading: "ZH-TW 繁体字プロンプト",
                enPromptHeading: "EN-US 英語プロンプト",
                copyStylePrompt: "プロンプトをコピー",
                openNbLM: "NOTEBOOKLMを開く",
                welcomeShare: "より多くのアイデアを追加するためにPDFとプロンプトを共有してください (送信先: ",
                backToGen: "プロンプト生成に戻る",
                provider: "▲ テンプレート提供者：",
                zoomIn: "クリックして拡大",
                zoomOut: "クリックして縮小",
                footerLabel: "AIとプレゼンスキルをもっと学ぶなら "
            },
            ko: {
                appTitle: "Gemini Notebook 프롬프트 생성기 2.0",
                tabGenerator: "프롬프트 생성",
                tabReference: "스타일 템플릿",
                step1Title: "1. 기본 설정",
                pages: "예상 슬라이드 수 (장)",
                time: "예상 발표 시간 (분)",
                role: "발표자 역할",
                context: "발표 상황",
                audience: "대상 청중",
                tone: "발표자 어조",
                cta: "콜 투 액션 (CTA)",
                notes: "발표자 노트",
                need: "✅ 필요",
                noNeed: "❌ 불필요",
                addition: "추가 메모 (자유 입력)",
                phRole: "예: 수석 마케팅 디렉터",
                phContext: "상황 입력...",
                phAudience: "청중 입력...",
                phTone: "어조 입력...",
                phCta: "CTA 입력...",
                phAddition: "예: AI 자동화 기능을 강조...",
                phSlideCount: "예: 10",
                phTime: "예: 15",
                step2Title: "2. 프레젠테이션 목적",
                customPurpose: "맞춤 목적",
                phCustomPurpose: "목적 (예: 연례 검토)",
                step3Title: "3. 구성 프레임워크",
                recommend: "추천",
                customLayout: "맞춤 구성",
                phLayoutName: "프레임워크 (예: 골든 서클)",
                phLayoutDesc: "설명 (예: Why -> How -> What)",
                step4Title: "4. 시각적 스타일",
                noStyle: "스타일 없음",
                customStyle: "맞춤 스타일",
                phStyleName: "이름 (예: 레트로 픽셀)",
                phStyleDesc: "설명 (예: 네온 컬러, 픽셀 폰트...)",
                outputTitle: "출력 프롬프트",
                copy: "복사",
                copied: "복사됨",
                goToNbLM: "Gemini Notebook에 붙여넣기",
                goToGemini: "Gemini AI에 붙여넣기",
                styleInsight: "스타일 인사이트",
                stylePromptTitle: "시각적 설정 프롬프트",
                zhPromptHeading: "ZH-TW 번체 중국어 프롬프트",
                enPromptHeading: "EN-US 영어 프롬프트",
                copyStylePrompt: "스타일 프롬프트 복사",
                openNbLM: "NOTEBOOKLM 열기",
                welcomeShare: "더 많은 아이디어를 위해 PDF 및 프롬프트를 공유해 주세요 (이메일: ",
                backToGen: "프롬프트 생성기로 돌아가기",
                provider: "▲ 템플릿 제공자: ",
                zoomIn: "클릭하여 확대",
                zoomOut: "클릭하여 축소",
                footerLabel: "더 많은 AI 및 프레젠테이션 기술을 배우려면 팔로우하세요 "
            }
        };

        const optionsTranslations = {
            zh: {
                audience: ['潛在客戶與決策者', '內部團隊與主管', '一般大眾與消費者', '學生與學術人員', '專業技術人員', '投資人與股東', '董事會與高階主管', '政府與監管單位', '醫療人員與病患', '法律與合規人員', '媒體與記者', '合作夥伴與供應商', '捐款人與志工', '自訂設定', '不需要設定'],
                context: ['現場提案會議', '線上視訊會議', '大型演講廳', '內部團隊小會', '學校課堂與研討會', '電梯簡報', '學術研討會與論文發表', '產業展覽與攤位', '董事會與股東會議', '網路研討會 (Webinar)', '工作坊與培訓課程', '記者會與發布會', '募資與路演 (Roadshow)', '自訂設定', '不需要設定'],
                tone: ['專業自信且具說服力', '輕鬆幽默且平易近人', '嚴謹客觀且數據驅動', '充滿熱情與激勵性', '溫暖感性且具同理心', '學術嚴謹且引經據典', '正式權威且值得信賴', '簡潔俐落且重點導向', '故事性且引人入勝', '教學循序且深入淺出', '自訂設定', '不需要設定'],
                cta: ['了解痛點並促成合作', '批准預算與專案啟動', '購買產品或服務', '改變觀念或行為', '引起興趣', '促成投資與募資', '簽署合約與達成協議', '報名參加與註冊', '捐款與支持公益', '採納建議與通過提案', '下載與試用產品', '預約諮詢與洽談', '無特定目的', '自訂設定', '不需要設定'],
                role: ['專業顧問', '資深業界專家', '產品經理', '導覽員與解說員', '老師與講師', '學術研究員 / 教授', '律師 / 法務顧問', '財務 / 投資分析師', '醫療 / 健康專業人員', '創業家 / 新創團隊', '工程師 / 技術主管', '業務 / 銷售代表', '行銷 / 品牌經理', '人資 / 培訓講師', '非營利 / 公益倡議者', '自訂角色', '不需要角色']
            },
            en: {
                audience: ['Clients & Decision Makers', 'Internal Team & Managers', 'General Public & Consumers', 'Students & Academics', 'Tech Professionals', 'Investors & Shareholders', 'Board & Executives', 'Government & Regulators', 'Healthcare Staff & Patients', 'Legal & Compliance', 'Media & Press', 'Partners & Suppliers', 'Donors & Volunteers', 'Custom Setting', 'Not Required'],
                context: ['Live Pitch Meeting', 'Online Video Conference', 'Large Lecture Hall', 'Small Team Meeting', 'Classroom & Seminar', 'Elevator Pitch', 'Academic Conference & Paper', 'Trade Show & Booth', 'Board & Shareholder Meeting', 'Webinar', 'Workshop & Training', 'Press Conference & Launch', 'Fundraising & Roadshow', 'Custom Setting', 'Not Required'],
                tone: ['Professional & Persuasive', 'Casual & Friendly', 'Rigorous & Data-driven', 'Passionate & Inspiring', 'Warm & Empathetic', 'Academic & Well-cited', 'Formal & Authoritative', 'Concise & Focused', 'Narrative & Engaging', 'Instructional & Easy to Follow', 'Custom Setting', 'Not Required'],
                cta: ['Understand Pain Points & Cooperate', 'Approve Budget & Start', 'Purchase Product/Service', 'Change Mindset/Behavior', 'Arouse Interest', 'Secure Investment & Funding', 'Sign Contract & Reach Agreement', 'Register & Sign Up', 'Donate & Support Cause', 'Adopt Proposal & Approve', 'Download & Try Product', 'Book Consultation & Meeting', 'No Specific Goal', 'Custom Setting', 'Not Required'],
                role: ['Professional Consultant', 'Senior Industry Expert', 'Product Manager', 'Guide & Explainer', 'Teacher & Lecturer', 'Academic Researcher / Professor', 'Lawyer / Legal Advisor', 'Financial / Investment Analyst', 'Medical / Health Professional', 'Entrepreneur / Startup Founder', 'Engineer / Tech Lead', 'Sales Representative', 'Marketing / Brand Manager', 'HR / Training Instructor', 'Nonprofit / Advocacy Leader', 'Custom Role', 'No Role']
            },
            ja: {
                audience: ['見込み客・意思決定者', '社内チーム・管理者', '一般大衆・消費者', '学生・学術関係者', '技術専門家', '投資家・株主', '取締役会・経営陣', '政府・規制当局', '医療従事者・患者', '法務・コンプライアンス', 'メディア・記者', 'パートナー・取引先', '寄付者・ボランティア', 'カスタム設定', '設定不要'],
                context: ['対面ピッチ会議', 'オンラインビデオ会議', '大規模な講堂', '少人数ミーティング', '教室・セミナー', 'エレベーターピッチ', '学会・論文発表', '展示会・ブース', '取締役会・株主総会', 'ウェビナー', 'ワークショップ・研修', '記者会見・発表会', '資金調達・ロードショー', 'カスタム設定', '設定不要'],
                tone: ['専門的で説得力がある', 'カジュアルで親しみやすい', '厳密・データ主導', '情熱的でインスピレーションを与える', '温かく共感的', '学術的で論拠が明確', 'フォーマルで権威的', '簡潔で要点重視', '物語性があり引き込む', '教育的で分かりやすい', 'カスタム設定', '設定不要'],
                cta: ['課題を理解し協力を促す', '予算承認・開始', '製品・サービスの購入', '考え方や行動の変容', '興味を引く', '投資・資金調達の獲得', '契約締結・合意形成', '参加登録・申込', '寄付・公益支援', '提案採用・承認', '製品のダウンロード・試用', '相談予約・商談', '特定の目的がない', 'カスタム設定', '設定不要'],
                role: ['専門コンサルタント', 'シニア業界エキスパート', 'プロダクトマネージャー', 'ガイド・説明者', '教師・講師', '研究者・教授', '弁護士・法務顧問', '財務・投資アナリスト', '医療・ヘルスケア専門家', '起業家・スタートアップ', 'エンジニア・技術リーダー', '営業担当', 'マーケティング・ブランド担当', '人事・研修講師', '非営利・アドボカシー', 'カスタム設定', '設定不要']
            },
            ko: {
                audience: ['잠재 고객 및 의사 결정자', '내부 팀 및 관리자', '일반 대중 및 소비자', '학생 및 학계', '기술 전문가', '투자자 및 주주', '이사회 및 경영진', '정부 및 규제 기관', '의료진 및 환자', '법률 및 컴플라이언스', '미디어 및 기자', '파트너 및 공급업체', '기부자 및 자원봉사자', '사용자 설정', '설정 필요 없음'],
                context: ['대면 프레젠테이션 회의', '온라인 화상 회의', '대형 강당', '소규모 팀 회의', '강의실 및 세미나', '엘리베이터 피치', '학술 대회 및 논문 발표', '산업 전시회 및 부스', '이사회 및 주주총회', '웨비나 (Webinar)', '워크숍 및 교육 과정', '기자회견 및 발표회', '펀딩 및 로드쇼', '사용자 설정', '설정 필요 없음'],
                tone: ['전문적이고 설득력 있음', '가볍고 친근함', '엄격하고 데이터 중심적', '열정적이고 영감을 줌', '따뜻하고 공감적', '학술적이고 근거가 명확함', '격식 있고 권위 있음', '간결하고 핵심 중심', '스토리텔링으로 몰입감 있음', '교육적이고 이해하기 쉬움', '사용자 설정', '설정 필요 없음'],
                cta: ['문제점 이해 및 협력 촉구', '예산 승인 및 프로젝트 시작', '제품/서비스 구매', '인식/행동 변화', '관심 유발', '투자 및 펀딩 유치', '계약 체결 및 합의 도출', '참가 신청 및 등록', '기부 및 공익 지원', '제안 채택 및 승인', '제품 다운로드 및 체험', '상담 예약 및 미팅', '특정 목적 없음', '사용자 설정', '설정 필요 없음'],
                role: ['전문 컨설턴트', '수석 업계 전문가', '제품 관리자', '가이드 및 해설자', '교사 및 강사', '학술 연구원 / 교수', '변호사 / 법무 자문', '재무 / 투자 분석가', '의료 / 헬스케어 전문가', '창업가 / 스타트업', '엔지니어 / 기술 리더', '영업 담당자', '마케팅 / 브랜드 관리자', '인사 / 교육 강사', '비영리 / 공익 활동가', '사용자 설정', '설정 필요 없음']
            }
        };

        const promptLocales = {
            zh: {
                sysAct: '請擔任簡報架構師與溝通策略專家。你的任務是將我提供的資料轉化為結構化且可執行的簡報大綱。',
                flowTitle: '【任務流程】',
                flow1: '1. 解構內容：分析資料核心目標，提煉 3 到 5 個關鍵訊息。',
                flow2: '2. 敘事框架：採用',
                flow3: '3. 逐頁架構：將關鍵訊息流暢分配至',
                flow3_2: '張投影片中。',
                setResp: '【簡報基本設定】',
                type: '• 簡報類型：',
                aud: '• 目標受眾：',
                ctx: '• 發表場景：',
                tone: '• 講者語氣：',
                cta: '• 行動呼籲：',
                role: '• 簡報角色：',
                note: '• 補充說明：',
                visSuggTitle: '【視覺與排版建議】\n• 建議風格：',
                outFormat: '【輸出格式要求】\n請依據上述設定，直接輸出',
                outFormat2: '張投影片的具體大綱：',
                slPrefix: '[投影片 ',
                sl1: '：封面頁]',
                sl1T: '• 標題：(請填寫引人注目的主標題)',
                sl1S: '• 副標題：(請填寫描述性副標題)',
                visSugg: '• 視覺化建議：',
                spkNote: '• 講者備註：',
                sl1Vis: '(請具體描述畫面與排版)',
                sl1Note: '(請撰寫口語化開場與破冰)',
                sl2: '：破題與議程]',
                sl2T: '• 標題：(請填寫引人入勝的問題或大膽陳述)',
                sl2C: '• 核心內容：(請條列重點)',
                sl2Vis: '(請具體描述畫面)',
                sl2Note: '(請撰寫口語化解說)',
                mid: '(...請依此格式繼續生成中間頁數...)',
                slL1: '：總結與行動呼籲]',
                slL1T: '• 標題：重點回顧與下一步行動',
                slL1C: '• 核心內容：(請重申重點與單一明確的行動呼籲)',
                slL1Vis: '(請具體描述畫面)',
                slL1Note: '(請撰寫充滿渲染力的結尾呼籲)',
                slL: '：感謝與問答]',
                slLT: '• 標題：感謝聆聽',
                slLC: '• 核心內容：Q&A 與聯絡資訊',
                slLVis: '乾淨簡單的背景',
                slLNote: '(請撰寫開放提問的結語)',
                noRoleConst: '【重要限制】：視覺排版與畫面建議中，絕對不要出現任何人物或虛擬角色。'
            },
            en: {
                sysAct: 'Act as a Presentation Prompt Architect and Communication Strategist. Your mission is to transform the provided materials into a structured, actionable presentation outline.',
                flowTitle: '[Task Process]',
                flow1: '1. Deconstruct: Analyze the core objective and extract 3 to 5 key messages.',
                flow2: '2. Framework: Use the ',
                flow3: '3. Outline: Smoothly distribute the key messages across ',
                flow3_2: ' slides.',
                setResp: '[Basic Settings]',
                type: '• Type: ',
                aud: '• Audience: ',
                ctx: '• Context: ',
                tone: '• Tone: ',
                cta: '• CTA: ',
                role: '• Role: ',
                note: '• Notes: ',
                visSuggTitle: '[Visual & Layout Suggestions]\n• Style: ',
                outFormat: '[Output Requirements]\nGenerate the specific outline for ',
                outFormat2: ' slides based on the above settings:',
                slPrefix: '[Slide ',
                sl1: ': Title Slide]',
                sl1T: '• Title: [Compelling Main Title]',
                sl1S: '• Subtitle: [Descriptive Subtitle]',
                visSugg: '• Visual Suggestion: ',
                spkNote: '• Speaker Notes: ',
                sl1Vis: '[Specific visual and layout description]',
                sl1Note: '[Conversational opening]',
                sl2: ': Hook and Agenda]',
                sl2T: '• Title: [Engaging Question or Bold Statement]',
                sl2C: '• Core Content: [Key bullet points]',
                sl2Vis: '[Specific visual description]',
                sl2Note: '[Conversational explanation]',
                mid: '(...Continue generating intermediate slides in this format...)',
                slL1: ': Summary & Call to Action]',
                slL1T: '• Title: Key Takeaways & Next Steps',
                slL1C: '• Core Content: [Reiterate key messages and clear CTA]',
                slL1Vis: '[Specific visual description]',
                slL1Note: '[Powerful closing]',
                slL: ': Thank You & Q&A]',
                slLT: '• Title: Thank You',
                slLC: '• Core Content: Q&A and Contact Info',
                slLVis: 'Clean and simple background',
                slLNote: '[Closing remarks inviting questions]',
                noRoleConst: '[Important]: Do NOT include any characters, guides, or human figures in the visual suggestions.'
            },
            ja: {
                sysAct: 'プレゼンテーション構成の専門家およびコミュニケーション戦略家として行動してください。提供された資料を構造化された実行可能なプレゼン構成案に変換することがあなたの任務です。',
                flowTitle: '【タスクの流れ】',
                flow1: '1. 内容の解体：資料の主要な目的を分析し、3〜5つの重要なメッセージを抽出します。',
                flow2: '2. ストーリー構成：',
                flow3: '3. スライド構成：抽出したメッセージを ',
                flow3_2: ' 枚のスライドにスムーズに割り当てます。',
                setResp: '【プレゼンの基本設定】',
                type: '• プレゼンタイプ：',
                aud: '• ターゲット層：',
                ctx: '• 発表シーン：',
                tone: '• 語り口：',
                cta: '• 行動喚起 (CTA)：',
                role: '• 役割：',
                note: '• 追加メモ：',
                visSuggTitle: '【ビジュアルとレイアウトの提案】\n• 推奨スタイル：',
                outFormat: '【出力フォーマット要件】\n上記の設定に基づき、',
                outFormat2: ' 枚のスライドの具体的な構成を直接出力してください：',
                slPrefix: '[スライド ',
                sl1: '：タイトルスライド]',
                sl1T: '• タイトル：(魅力的なメインタイトルを記入)',
                sl1S: '• サブタイトル：(説明的なサブタイトルを記入)',
                visSugg: '• ビジュアル提案：',
                spkNote: '• スピーカーノート：',
                sl1Vis: '(画面とレイアウトの具体的な説明を記入)',
                sl1Note: '(口語的なオープニングとアイスブレイクを記入)',
                sl2: '：導入とアジェンダ]',
                sl2T: '• タイトル：(魅力的な質問や大胆な主張を記入)',
                sl2C: '• コアコンテンツ：(箇条書きで要点を記入)',
                sl2Vis: '(画面の具体的な説明を記入)',
                sl2Note: '(口語的な説明を記入)',
                mid: '(...このフォーマットに従って中間スライドを生成し続けてください...)',
                slL1: '：まとめと行動喚起]',
                slL1T: '• タイトル：重要なポイントと次のステップ',
                slL1C: '• コアコンテンツ：(重要なメッセージを再確認し、明確なCTAを提示)',
                slL1Vis: '(画面の具体的な説明を記入)',
                slL1Note: '(インパクトのある結びの言葉を記入)',
                slL: '：感謝とQ&A]',
                slLT: '• タイトル：ご清聴ありがとうございました',
                slLC: '• コアコンテンツ：Q&Aと連絡先情報',
                slLVis: 'クリーンでシンプルな背景',
                slLNote: '(質問を促す結びの言葉を記入)',
                noRoleConst: '【重要制限】：ビジュアルや画面の提案において、人物や仮想キャラクターを絶対に含めないでください。'
            },
            ko: {
                sysAct: '프레젠테이션 프롬프트 아키텍트이자 커뮤니케이션 전략가로 활동해 주세요. 제공된 자료를 구조화되고 실행 가능한 프레젠테이션 개요로 변환하는 것이 귀하의 임무입니다.',
                flowTitle: '[작업 프로세스]',
                flow1: '1. 내용 분석: 자료의 핵심 목적을 분석하고 3~5개의 핵심 메시지를 추출합니다.',
                flow2: '2. 내러티브 프레임워크: ',
                flow3: '3. 슬라이드별 구성: 추출한 메시지를 ',
                flow3_2: ' 장의 슬라이드에 자연스럽게 배분합니다.',
                setResp: '[프레젠테이션 기본 설정]',
                type: '• 프레젠테이션 유형: ',
                aud: '• 대상 청중: ',
                ctx: '• 발표 상황: ',
                tone: '• 발표자 어조: ',
                cta: '• 콜 투 액션 (CTA): ',
                role: '• 역할: ',
                note: '• 추가 메모: ',
                visSuggTitle: '[시각적 및 레이아웃 제안]\n• 추천 스타일: ',
                outFormat: '[출력 형식 요구 사항]\n위의 설정에 따라 ',
                outFormat2: ' 장의 슬라이드에 대한 구체적인 개요를 직접 출력해 주세요:',
                slPrefix: '[슬라이드 ',
                sl1: ': 타이틀 슬라이드]',
                sl1T: '• 제목: (매력적인 메인 타이틀 작성)',
                sl1S: '• 부제목: (설명적인 부제목 작성)',
                visSugg: '• 시각적 제안: ',
                spkNote: '• 발표자 노트: ',
                sl1Vis: '(구체적인 화면 및 레이아웃 설명 작성)',
                sl1Note: '(구어체 오프닝 및 아이스브레이킹 작성)',
                sl2: ': 도입 및 아젠다]',
                sl2T: '• 제목: (흥미로운 질문 또는 대담한 주장 작성)',
                sl2C: '• 핵심 내용: (요점 정리)',
                sl2Vis: '(구체적인 화면 설명 작성)',
                sl2Note: '(구어체 설명 작성)',
                mid: '(...이 형식에 따라 중간 슬라이드를 계속 생성해 주세요...)',
                slL1: ': 요약 및 콜 투 액션]',
                slL1T: '• 제목: 핵심 요약 및 다음 단계',
                slL1C: '• 핵심 내용: (핵심 메시지 재확인 및 명확한 CTA 제시)',
                slL1Vis: '(구체적인 화면 설명 작성)',
                slL1Note: '(강렬한 마무리 발언 작성)',
                slL: ': 감사 및 Q&A]',
                slLT: '• 제목: 경청해 주셔서 감사합니다',
                slLC: '• 핵심 내용: Q&A 및 연락처 정보',
                slLVis: '깔끔하고 단순한 배경',
                slLNote: '(질문을 유도하는 마무리 발언 작성)',
                noRoleConst: '[중요 제한]: 시각적 레이아웃 및 화면 제안에 인물이나 가상 캐릭터를 절대 포함하지 마십시오.'
            }
        };

        const uiText2 = {
            zh: {
                tabStyle: "風格與配色",
                tabPdf: "PDF後製（去除NotebookLM Logo）",
                flowSteps: ["生成大綱指令", "到 AI 工具生成大綱", "貼回大綱・選風格配色", "複製到 Gemini Notebook"],
                outlinePromptTitle: "大綱生成指令 (請複製到 Gemini / ChatGPT 等 AI 工具)",
                nextToStyle: "下一步：選擇風格與配色",
                pasteOutlineTitle: "1. 貼上已生成的簡報大綱，可於此處進行大綱的修改",
                phPasteOutline: "請將 AI 工具生成的簡報大綱貼到這裡，系統會自動併入最終指令...",
                outlineEmptyHint: "尚未貼上大綱：最終指令將不包含大綱內容，建議先完成「生成簡報Prompt」分頁的大綱指令步驟。",
                styleSectionTitle: "2. 選擇視覺風格",
                viewTemplates: "檢視風格範本 →",
                paletteSectionTitle: "3. 選擇配色方案",
                noPalette: "不指定配色",
                addToCorp: "加入企業配色",
                added: "已加入",
                corpSectionTitle: "5. 企業配色與品牌識別",
                corpPalettesLabel: "企業配色組合 (可自訂顏色，自動儲存於瀏覽器)",
                corpEmpty: "尚無企業配色。可從上方配色卡點「加入企業配色」，或按「新增配色」自行建立。",
                addPalette: "新增配色",
                deletePalette: "刪除",
                phPaletteName: "配色名稱 (例如: 公司主視覺)",
                logoTitle: "Logo 設定",
                logoPosLabel: "Logo 位置",
                phLogoText: "Logo 文字或描述 (例如: 公司名稱、品牌縮寫)",
                pageNumTitle: "頁碼設定（目前 Gemini Notebook 還無法生成頁碼）",
                pageNumPosLabel: "頁碼位置",
                pageNumFormatLabel: "頁碼格式",
                finalOutputTitle: "最終 Gemini Notebook 指令",
                addStyleFromRef: "將此風格加入生成器",
                useStyleLabel: "是否指定視覺風格",
                mainCharLabel: "是否需要主角導覽員",
                mainCharHint: "指令將引用來源圖片「主角.png」作為導覽角色，請記得在 Gemini Notebook 上傳此圖片。",
                colorDone: "完成",
                eyedropper: "滴管取色（吸取螢幕上的色彩）"
            },
            en: {
                tabStyle: "Style & Colors",
                tabPdf: "PDF Post-processing",
                flowSteps: ["Generate outline prompt", "Create outline in AI tool", "Paste back & pick style", "Copy to Gemini Notebook"],
                outlinePromptTitle: "Outline Prompt (paste into Gemini / ChatGPT, etc.)",
                nextToStyle: "Next: Style & Colors",
                pasteOutlineTitle: "1. Paste Your Generated Outline",
                phPasteOutline: "Paste the outline generated by your AI tool here; it will be merged into the final prompt...",
                outlineEmptyHint: "No outline pasted yet: the final prompt will not include outline content.",
                styleSectionTitle: "2. Choose Visual Style",
                viewTemplates: "View Style Templates →",
                paletteSectionTitle: "3. Choose Color Palette",
                noPalette: "No Palette",
                addToCorp: "Add to Brand Palettes",
                added: "Added",
                corpSectionTitle: "5. Brand Palettes & Identity",
                corpPalettesLabel: "Brand palettes (editable, auto-saved in browser)",
                corpEmpty: "No brand palettes yet. Add one from the cards above or click \"Add Palette\".",
                addPalette: "Add Palette",
                deletePalette: "Delete",
                phPaletteName: "Palette name (e.g., Corporate Identity)",
                logoTitle: "Logo Settings",
                logoPosLabel: "Logo Position",
                phLogoText: "Logo text or description (e.g., company name)",
                pageNumTitle: "Page Numbers (Gemini Notebook cannot currently generate page numbers)",
                pageNumPosLabel: "Position",
                pageNumFormatLabel: "Format",
                finalOutputTitle: "Final Gemini Notebook Prompt",
                addStyleFromRef: "Use This Style in Generator",
                useStyleLabel: "Specify visual style",
                mainCharLabel: "Add a Main Character Guide",
                mainCharHint: "The prompt references the source image \"主角.png\" as the guide — remember to upload it in Gemini Notebook.",
                colorDone: "Done",
                eyedropper: "Eyedropper (pick a color from the screen)"
            },
            ja: {
                tabStyle: "スタイルと配色",
                tabPdf: "PDF後処理",
                flowSteps: ["構成プロンプト生成", "AIツールで大綱を生成", "貼り付け＆スタイル選択", "Gemini Notebookへコピー"],
                outlinePromptTitle: "大綱生成プロンプト (Gemini / ChatGPT などに貼り付け)",
                nextToStyle: "次へ：スタイルと配色",
                pasteOutlineTitle: "1. 生成した大綱を貼り付け",
                phPasteOutline: "AIツールで生成した大綱をここに貼り付けると、最終プロンプトに自動で組み込まれます...",
                outlineEmptyHint: "大綱が未入力です：最終プロンプトに大綱内容は含まれません。",
                styleSectionTitle: "2. ビジュアルスタイルを選択",
                viewTemplates: "スタイルテンプレートを見る →",
                paletteSectionTitle: "3. 配色を選択",
                noPalette: "配色を指定しない",
                addToCorp: "企業配色に追加",
                added: "追加済み",
                corpSectionTitle: "5. 企業配色とブランド設定",
                corpPalettesLabel: "企業配色 (編集可、ブラウザに自動保存)",
                corpEmpty: "企業配色がまだありません。上のカードから追加するか「配色を追加」を押してください。",
                addPalette: "配色を追加",
                deletePalette: "削除",
                phPaletteName: "配色名 (例: コーポレートカラー)",
                logoTitle: "ロゴ設定",
                logoPosLabel: "ロゴ位置",
                phLogoText: "ロゴのテキストまたは説明 (例: 会社名)",
                pageNumTitle: "ページ番号（現在 Gemini Notebook では生成できません）",
                pageNumPosLabel: "位置",
                pageNumFormatLabel: "形式",
                finalOutputTitle: "最終 Gemini Notebook プロンプト",
                addStyleFromRef: "このスタイルを生成器に追加",
                useStyleLabel: "ビジュアルスタイルを指定",
                mainCharLabel: "主役ガイドを追加",
                mainCharHint: "プロンプトはソース画像「主角.png」をガイドとして参照します。Gemini Notebook にアップロードしてください。",
                colorDone: "完了",
                eyedropper: "スポイト（画面から色を取得）"
            },
            ko: {
                tabStyle: "스타일 및 배색",
                tabPdf: "PDF 후처리",
                flowSteps: ["개요 프롬프트 생성", "AI 도구에서 개요 생성", "붙여넣기 & 스타일 선택", "Gemini Notebook에 복사"],
                outlinePromptTitle: "개요 생성 프롬프트 (Gemini / ChatGPT 등에 붙여넣기)",
                nextToStyle: "다음: 스타일 및 배색",
                pasteOutlineTitle: "1. 생성된 개요 붙여넣기",
                phPasteOutline: "AI 도구로 생성한 개요를 여기에 붙여넣으면 최종 프롬프트에 자동으로 포함됩니다...",
                outlineEmptyHint: "개요가 아직 없습니다: 최종 프롬프트에 개요 내용이 포함되지 않습니다.",
                styleSectionTitle: "2. 시각적 스타일 선택",
                viewTemplates: "스타일 템플릿 보기 →",
                paletteSectionTitle: "3. 배색 선택",
                noPalette: "배색 지정 안 함",
                addToCorp: "기업 배색에 추가",
                added: "추가됨",
                corpSectionTitle: "5. 기업 배색 및 브랜드 설정",
                corpPalettesLabel: "기업 배색 (편집 가능, 브라우저에 자동 저장)",
                corpEmpty: "기업 배색이 없습니다. 위 카드에서 추가하거나 \"배색 추가\"를 누르세요.",
                addPalette: "배색 추가",
                deletePalette: "삭제",
                phPaletteName: "배색 이름 (예: 기업 CI)",
                logoTitle: "로고 설정",
                logoPosLabel: "로고 위치",
                phLogoText: "로고 텍스트 또는 설명 (예: 회사명)",
                pageNumTitle: "페이지 번호 (현재 Gemini Notebook에서는 생성할 수 없음)",
                pageNumPosLabel: "위치",
                pageNumFormatLabel: "형식",
                finalOutputTitle: "최종 Gemini Notebook 프롬프트",
                addStyleFromRef: "이 스타일을 생성기에 추가",
                useStyleLabel: "시각적 스타일 지정",
                mainCharLabel: "메인 캐릭터 가이드 추가",
                mainCharHint: "프롬프트는 소스 이미지 \"主角.png\"를 가이드로 참조합니다. Gemini Notebook에 업로드하세요.",
                colorDone: "완료",
                eyedropper: "스포이트 (화면에서 색상 추출)"
            }
        };

        const promptLocales2 = {
            zh: {
                finalIntro: '請擔任專業簡報設計師，依據以下大綱與視覺規範，製作一份風格一致的完整簡報。',
                outlineTitle: '【簡報大綱】',
                styleTitle: '【視覺風格】',
                colorTitle: '【配色規範】',
                colorInstr: '請使用以下五種色彩作為整份簡報的可用配色，由 AI 依內容與視覺層級自行搭配；不預先指定主色、輔色、強調色或背景用途。背景必須另外遵守使用者選擇的背景色',
                colorRoles: ['主色', '輔色', '強調色', '輔助淺色', '背景色'],
                brandTitle: '【版面與品牌識別】',
                logoLine: (pos, txt) => `• Logo：使用來源圖片「Logo.png」，在每一頁投影片的「${pos}」相同位置放上此 Logo；尺寸固定為 150 × 150 像素，X 軸與 Y 軸座標必須在所有頁面完全固定一致${txt ? `（Logo 內容：${txt}）` : ''}，並確保不遮擋任何內文。`,
                pageNumLine: (pos, fmt) => `• 頁碼：請在每一頁投影片的「${pos}」顯示頁碼，格式為「${fmt}」。`,
                posNames: { tl: '左上角', tr: '右上角', bl: '左下角', br: '右下角', bc: '底部置中' },
                fmtNames: { simple: '1、2、3…', total: '目前頁數 / 總頁數', word: '第 1 頁、第 2 頁…' },
                charBlock: '【視覺與角色指令】\n角色身分：使用來源圖片"主角.png"圖片做為本場簡報的導覽員，負責引導觀眾理解內容。\n全域設定：所有投影片皆套用相同的背景風格，並確保"主角"角色在每一張投影片中出現，持續陪伴並帶領觀眾。\n風格連貫性：精確維持角色的原始外觀特徵，整體造型、比例與風格不可變動，所有投影片確保主角一致性。\n畫面位置配置：角色固定安排於畫面一側（左側或右側），並刻意保留充足的文字閱讀區域，完全避免遮擋或干擾簡報內容。\n重點指引互動：在包含圖示、圖表或重點視覺元素的頁面中，角色需展現自信且友善的互動手勢，自然地引導觀眾視線聚焦於指定重點，臉部表情依據標題變動。\n內容解說姿態：於說明、分析或教學型頁面中，角色應呈現親切自然、熱情且生動的姿勢，拉近與觀眾之間的距離，提升理解與信任感。'
            },
            en: {
                finalIntro: 'Act as a professional presentation designer. Create a complete, visually consistent presentation based on the outline and visual guidelines below.',
                outlineTitle: '[Presentation Outline]',
                styleTitle: '[Visual Style]',
                colorTitle: '[Color Guidelines]',
                colorInstr: 'Use these five colors as the available palette throughout the presentation. Let the AI assign them according to content and visual hierarchy; do not preassign primary, secondary, accent, or background roles. The background must separately follow the user-selected background color',
                colorRoles: ['Primary', 'Secondary', 'Accent', 'Light Support', 'Background'],
                brandTitle: '[Layout & Brand Identity]',
                logoLine: (pos, txt) => `• Logo: Use the source image "Logo.png" on every slide at the same "${pos}" position. Fix its size at 150 × 150 pixels, and keep identical X/Y coordinates across all slides${txt ? ` (logo content: ${txt})` : ''}, without covering any content.`,
                pageNumLine: (pos, fmt) => `• Page numbers: Display the page number at the "${pos}" of every slide, formatted as "${fmt}".`,
                posNames: { tl: 'top-left', tr: 'top-right', bl: 'bottom-left', br: 'bottom-right', bc: 'bottom-center' },
                fmtNames: { simple: '1, 2, 3…', total: 'current / total pages', word: 'Page 1, Page 2…' },
                charBlock: '👩‍⚕️ Visual & Character Instructions\n[Character Role]\nUse the source image "主角.png" as the guide for this presentation, responsible for leading the audience through the content.\n[Global Setting]\nApply the same background style to all slides, and ensure the [Main Character] appears on every slide, continuously accompanying and guiding the audience.\n[Style Consistency]\nFaithfully preserve the character\'s original features; the overall design, proportions, and style must not change, maintaining a high level of consistency.\n[Placement]\nPosition the character consistently on one side of the frame (left or right), deliberately reserving ample space for text so it never obstructs or interferes with the presentation content.\n[Guiding Interaction]\nOn slides with icons, charts, or key visual elements, the character should display confident and friendly gestures that naturally guide the viewer\'s attention to the highlighted points, with facial expressions varying according to the title.\n[Explanation Poses]\nOn explanatory, analytical, or instructional slides, the character should adopt warm, natural, enthusiastic, and lively poses to create closeness with the audience and enhance understanding and trust.'
            },
            ja: {
                finalIntro: 'プロのプレゼンデザイナーとして、以下の大綱とビジュアル規範に基づき、一貫したスタイルの完全なプレゼンを作成してください。',
                outlineTitle: '【プレゼン大綱】',
                styleTitle: '【ビジュアルスタイル】',
                colorTitle: '【配色規範】',
                colorInstr: '以下の5色をプレゼン全体で使用可能な配色として扱い、内容と視覚階層に応じてAIが自由に組み合わせてください。メイン、サブ、アクセント、背景などの用途は事前指定しません。背景はユーザーが別途選択した背景色を厳守してください',
                colorRoles: ['メインカラー', 'サブカラー', 'アクセント', 'ライトサポート', '背景色'],
                brandTitle: '【レイアウトとブランド】',
                logoLine: (pos, txt) => `• ロゴ：ソース画像「Logo.png」をすべてのスライドの同じ「${pos}」位置に配置してください。サイズは 150 × 150 ピクセルに固定し、X/Y 座標を全ページで完全に統一してください${txt ? `（ロゴ内容：${txt}）` : ''}。本文を隠さないようにしてください。`,
                pageNumLine: (pos, fmt) => `• ページ番号：すべてのスライドの「${pos}」に「${fmt}」形式でページ番号を表示してください。`,
                posNames: { tl: '左上', tr: '右上', bl: '左下', br: '右下', bc: '下部中央' },
                fmtNames: { simple: '1、2、3…', total: '現在ページ / 総ページ数', word: '1ページ目、2ページ目…' },
                charBlock: '👩‍⚕️ ビジュアル＆キャラクター指示\n【キャラクターの役割】\nソース画像「主角.png」を本プレゼンのガイドとして使用し、観客が内容を理解できるよう導きます。\n【全体設定】\nすべてのスライドに同じ背景スタイルを適用し、【主角】キャラクターが毎ページに登場し、観客に寄り添い導き続けるようにします。\n【スタイルの一貫性】\nキャラクターの元の外観を正確に維持し、全体のデザイン・比率・スタイルを変更せず、高い一貫性を保ちます。\n【配置】\nキャラクターを画面の片側（左または右）に固定し、テキストを読むための十分なスペースを意図的に確保し、内容を遮らないようにします。\n【誘導インタラクション】\nアイコン・図表・重要なビジュアル要素があるページでは、キャラクターは自信に満ちた親しみやすいジェスチャーで観客の視線を重点へ自然に誘導し、表情はタイトルに応じて変化させます。\n【解説ポーズ】\n説明・分析・教育型のページでは、キャラクターは親しみやすく自然で情熱的かつ生き生きとしたポーズをとり、観客との距離を縮め、理解と信頼を高めます。'
            },
            ko: {
                finalIntro: '전문 프레젠테이션 디자이너로서 아래 개요와 시각적 규범에 따라 일관된 스타일의 완전한 프레젠테이션을 제작해 주세요.',
                outlineTitle: '[프레젠테이션 개요]',
                styleTitle: '[시각적 스타일]',
                colorTitle: '[배색 규범]',
                colorInstr: '다음 다섯 가지 색상을 전체 프레젠테이션에서 사용할 수 있는 팔레트로 활용하고, 내용과 시각적 계층에 따라 AI가 자유롭게 배치하세요. 메인, 보조, 강조 또는 배경 용도를 미리 지정하지 않습니다. 배경은 사용자가 별도로 선택한 배경색을 반드시 따라야 합니다',
                colorRoles: ['메인 컬러', '보조 컬러', '강조 컬러', '라이트 서포트', '배경색'],
                brandTitle: '[레이아웃 및 브랜드]',
                logoLine: (pos, txt) => `• 로고: 소스 이미지 "Logo.png"를 모든 슬라이드의 동일한 "${pos}" 위치에 배치하세요. 크기는 150 × 150 픽셀로 고정하고 모든 페이지에서 X/Y 좌표를 완전히 동일하게 유지하세요${txt ? ` (로고 내용: ${txt})` : ''}. 본문을 가리지 않아야 합니다.`,
                pageNumLine: (pos, fmt) => `• 페이지 번호: 모든 슬라이드의 "${pos}"에 "${fmt}" 형식으로 페이지 번호를 표시해 주세요.`,
                posNames: { tl: '왼쪽 상단', tr: '오른쪽 상단', bl: '왼쪽 하단', br: '오른쪽 하단', bc: '하단 중앙' },
                fmtNames: { simple: '1, 2, 3…', total: '현재 / 전체 페이지', word: '1페이지, 2페이지…' },
                charBlock: '👩‍⚕️ 시각 및 캐릭터 지침\n【캐릭터 역할】\n소스 이미지 "主角.png"를 본 프레젠테이션의 가이드로 사용하여 청중이 내용을 이해하도록 안내합니다.\n【전역 설정】\n모든 슬라이드에 동일한 배경 스타일을 적용하고, 【主角】 캐릭터가 매 슬라이드에 등장하여 청중과 함께하며 안내하도록 합니다.\n【스타일 일관성】\n캐릭터의 원래 외형을 정확히 유지하며, 전체 디자인·비율·스타일을 변경하지 않아 높은 일관성을 유지합니다.\n【화면 배치】\n캐릭터를 화면 한쪽(왼쪽 또는 오른쪽)에 고정하고, 텍스트를 읽을 충분한 공간을 의도적으로 확보하여 내용을 가리지 않도록 합니다.\n【핵심 안내 상호작용】\n아이콘·차트·핵심 시각 요소가 있는 페이지에서는 캐릭터가 자신감 있고 친근한 제스처로 청중의 시선을 핵심으로 자연스럽게 유도하며, 표정은 제목에 따라 변합니다.\n【내용 설명 자세】\n설명·분석·교육형 페이지에서는 캐릭터가 친근하고 자연스러우며 열정적이고 생동감 있는 자세를 취해 청중과의 거리를 좁히고 이해와 신뢰를 높입니다.'
            }
        };

        const palettePresets = [
            { id: 'pal-as', name: 'AS 配色', colors: ['#0D5689', '#9FC6BC', '#E8CECC', '#F8E8D4', '#6B7D8D'] },
            { id: 'pal-e01', name: '紫羅蘭夢境與珊瑚', colors: ['#E6E1EC', '#A6A4B4', '#9FBFDD', '#DA8889', '#5C506B'] },
            { id: 'pal-e02', name: '晨霧玫瑰與深海', colors: ['#F5D6D6', '#E8ECF1', '#8EACA9', '#6A7B83', '#B59AAA'] },
            { id: 'pal-e03', name: '質樸暖沙與青藍', colors: ['#F6F3EB', '#D7DFE2', '#9FB0B8', '#78929C', '#B89A78'] },
            { id: 'pal-e04', name: '日落琥珀與陶土', colors: ['#F7F5F0', '#F5D29C', '#E3A87C', '#B58376', '#7D5B52'] },
            { id: 'pal-e05', name: '薰衣草與薄荷微風', colors: ['#A4A6C4', '#C3D2C4', '#FAF6E9', '#EAD6D8', '#718096'] },
            { id: 'pal-e06', name: '醇厚紅茶與灰褐', colors: ['#FAF6F5', '#A14F48', '#8A786F', '#4A413D', '#D3B29F'] },
            { id: 'pal-e07', name: '櫻花暮色與靛藍', colors: ['#FBEFF2', '#A19EBF', '#6E85B2', '#3A4B7C', '#D6A5B1'] },
            { id: 'pal-e08', name: '靜謐夜空與極光', colors: ['#0C1821', '#1B3B6F', '#21A179', '#93E1D8', '#D8C17A'] },
            { id: 'pal-01', name: '企業藍 Corporate Blue', colors: ['#16324F', '#2E6F95', '#F2A900', '#A9D6E5', '#8B5E34'] },
            { id: 'pal-02', name: '沉穩黑金 Black & Gold', colors: ['#171717', '#4A5568', '#D4A72C', '#E8DDB5', '#7B5E2E'] },
            { id: 'pal-03', name: '科技紫 Tech Purple', colors: ['#34205C', '#6C4AB6', '#19B5A5', '#D8C9F2', '#E09F3E'] },
            { id: 'pal-04', name: '森林綠 Forest Green', colors: ['#1F4D3A', '#4D8061', '#D98E32', '#CFE3D4', '#7A5C43'] },
            { id: 'pal-05', name: '活力橘 Vibrant Orange', colors: ['#8F3B1B', '#F2762E', '#177E89', '#FFD2A6', '#5C4B8A'] },
            { id: 'pal-06', name: '莫蘭迪 Morandi', colors: ['#22223B', '#4A4E69', '#9A8C98', '#C9ADA7', '#6B705C'] },
            { id: 'pal-07', name: '海洋藍綠 Ocean Teal', colors: ['#123B5D', '#078C91', '#F4B942', '#A9E1D7', '#D36B4B'] },
            { id: 'pal-08', name: '熱情紅 Passion Red', colors: ['#8E2635', '#D94B4B', '#F0A202', '#F3C6C8', '#6B4E71'] },
            { id: 'pal-09', name: '現代中性 Modern Neutral', colors: ['#27313A', '#66717E', '#C77938', '#D8DDE2', '#8A9A5B'] },
            { id: 'pal-10', name: '大地棕 Earth Tone', colors: ['#5A4438', '#9A6B4F', '#6F826A', '#DFC6A8', '#4F6D7A'] },
            { id: 'pal-11', name: '粉彩夢幻 Pastel Dream', colors: ['#DB7093', '#F9A8D4', '#C4B5FD', '#93C5FD', '#6D7FC7'] },
            { id: 'pal-12', name: '日落活力 Sunset Energy', colors: ['#44305E', '#D95D73', '#F2A541', '#F7C9A9', '#5B8E7D'] },
            { id: 'pal-13', name: '沉穩海軍藍金 Navy & Champagne', colors: ['#FFFFFF', '#17365D', '#C5A253', '#AFCBE3', '#E7B486'] },
            { id: 'pal-14', name: '正式酒紅石墨 Burgundy & Graphite', colors: ['#F7F4EF', '#702F3B', '#343A40', '#B9A58C', '#8393A7'] },
            { id: 'pal-15', name: '正式墨綠古銅 Emerald & Bronze', colors: ['#F4F1E8', '#183F35', '#4F6B62', '#A8834F', '#B9C8C2'] },
            { id: 'pal-16', name: '馬卡龍晴日 Macaron Daylight', colors: ['#F8D7DA', '#FBE5B6', '#CDE8D5', '#CFE3F4', '#DCD4F2'] },
            { id: 'pal-17', name: '馬卡龍甜霧 Macaron Mist', colors: ['#E8C7CF', '#F2D2B6', '#D8E2C4', '#BED7DF', '#D6CEE5'] },
            { id: 'pal-18', name: '低彩度城市霧 Muted City', colors: ['#E7E3DC', '#A8B0B6', '#74828B', '#9EAAA0', '#B89E91'] },
            { id: 'pal-19', name: '低彩度藍灰陶土 Muted Blue & Clay', colors: ['#E9ECEB', '#AABBC4', '#718793', '#C2A398', '#91877E'] }
        ];

        const defaultNewPalette = ['#1F4E79', '#3E7CB1', '#C9A227', '#A3C6E8', '#8B5E34'];

        const hexToLum = (hex) => {
            const h = String(hex || '').replace('#', '');
            const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
            const n = parseInt(v, 16);
            if (isNaN(n)) return 255;
            return 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
        };
        const textOn = (hex) => hexToLum(hex) > 150 ? '#0f172a' : '#ffffff';

        const clampByte = (n) => Math.max(0, Math.min(255, Math.round(Number(n) || 0)));
        const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => clampByte(x).toString(16).padStart(2, '0')).join('').toUpperCase();
        const hexToRgbObj = (hex) => {
            const h = String(hex || '').replace('#', '');
            const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
            if (!/^[0-9a-fA-F]{6}$/.test(v)) return null;
            const n = parseInt(v, 16);
            return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
        };
        const rgbToHsv = (r, g, b) => {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
            let h = 0;
            if (d !== 0) {
                if (max === r) h = ((g - b) / d) % 6;
                else if (max === g) h = (b - r) / d + 2;
                else h = (r - g) / d + 4;
                h *= 60; if (h < 0) h += 360;
            }
            const s = max === 0 ? 0 : d / max;
            return { h, s, v: max };
        };
        const hsvToRgb = (h, s, v) => {
            const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
            let r = 0, g = 0, b = 0;
            if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; }
            else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; }
            else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
            return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
        };

        const ColorPicker = ({ value, onChange, onClose, doneLabel, pickLabel }) => {
            const initRgb = hexToRgbObj(value) || { r: 0, g: 0, b: 0 };
            const [hsv, setHsv] = React.useState(rgbToHsv(initRgb.r, initRgb.g, initRgb.b));
            const areaRef = React.useRef(null);
            const dragRef = React.useRef(false);

            const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
            const rgbR = clampByte(rgb.r), rgbG = clampByte(rgb.g), rgbB = clampByte(rgb.b);
            const hex = rgbToHex(rgbR, rgbG, rgbB);

            const emit = (next) => {
                setHsv(next);
                const c = hsvToRgb(next.h, next.s, next.v);
                onChange(rgbToHex(c.r, c.g, c.b));
            };
            const pickFromEvent = (e) => {
                const rect = areaRef.current.getBoundingClientRect();
                const cx = (e.touches ? e.touches[0].clientX : e.clientX);
                const cy = (e.touches ? e.touches[0].clientY : e.clientY);
                const x = Math.max(0, Math.min(1, (cx - rect.left) / rect.width));
                const y = Math.max(0, Math.min(1, (cy - rect.top) / rect.height));
                emit({ h: hsv.h, s: x, v: 1 - y });
            };
            React.useEffect(() => {
                const move = (e) => { if (dragRef.current) pickFromEvent(e); };
                const up = () => { dragRef.current = false; };
                window.addEventListener('mousemove', move);
                window.addEventListener('mouseup', up);
                return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
            });
            const setFromRgb = (nr, ng, nb) => {
                const nHsv = rgbToHsv(clampByte(nr), clampByte(ng), clampByte(nb));
                emit(nHsv);
            };
            const setFromHex = (str) => {
                const o = hexToRgbObj(str);
                if (o) emit(rgbToHsv(o.r, o.g, o.b));
            };
            const supportsEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;
            const pickFromScreen = async () => {
                if (!supportsEyeDropper) return;
                try {
                    const res = await new window.EyeDropper().open();
                    if (res && res.sRGBHex) setFromHex(res.sRGBHex);
                } catch (e) { /* user cancelled */ }
            };

            const inputCls = "w-full bg-slate-800 border border-slate-600 rounded-md py-1.5 px-2 text-white text-xs text-center font-mono focus:border-pink-300 outline-none";
            const lblCls = "text-[10px] text-slate-400 font-bold text-center mt-0.5";

            return (
                <div className="w-full max-w-[260px]" onClick={e => e.stopPropagation()}>
                    <div
                        ref={areaRef}
                        onMouseDown={(e) => { dragRef.current = true; pickFromEvent(e); }}
                        onTouchStart={(e) => { dragRef.current = true; pickFromEvent(e); }}
                        onTouchMove={(e) => { if (dragRef.current) pickFromEvent(e); }}
                        className="relative w-full h-32 rounded-lg cursor-crosshair mb-3"
                        style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsv.h}, 100%, 50%))` }}
                    >
                        <div className="absolute w-4 h-4 rounded-full border-2 border-white pointer-events-none" style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, transform: 'translate(-50%, -50%)', boxShadow: '0 0 0 1px rgba(0,0,0,0.5)' }}></div>
                    </div>
                    <input
                        type="range" min="0" max="360" value={Math.round(hsv.h)}
                        onChange={(e) => emit({ ...hsv, h: Number(e.target.value) })}
                        className="w-full h-3 rounded-full appearance-none cursor-pointer mb-3"
                        style={{ background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }}
                    />
                    <div className="mb-2">
                        <div className="flex items-center gap-2">
                            {supportsEyeDropper && (
                                <button onClick={pickFromScreen} title={pickLabel || '滴管取色'} className="w-8 h-8 rounded-md border border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-pink-300 text-slate-300 hover:text-pink-300 flex items-center justify-center flex-shrink-0 transition-colors">
                                    <Icon name="Pipette" size={16} />
                                </button>
                            )}
                            <div className="w-8 h-8 rounded-md border border-slate-600 flex-shrink-0" style={{ backgroundColor: hex }}></div>
                            <div className="flex-grow">
                                <input type="text" value={hex} onChange={(e) => setFromHex(e.target.value)} className={inputCls} />
                            </div>
                        </div>
                        <div className={lblCls}>HEX (16進位)</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-1">
                        <div>
                            <input type="number" min="0" max="255" value={rgbR} onChange={(e) => setFromRgb(e.target.value, rgbG, rgbB)} className={inputCls} />
                            <div className={lblCls}>R</div>
                        </div>
                        <div>
                            <input type="number" min="0" max="255" value={rgbG} onChange={(e) => setFromRgb(rgbR, e.target.value, rgbB)} className={inputCls} />
                            <div className={lblCls}>G</div>
                        </div>
                        <div>
                            <input type="number" min="0" max="255" value={rgbB} onChange={(e) => setFromRgb(rgbR, rgbG, e.target.value)} className={inputCls} />
                            <div className={lblCls}>B</div>
                        </div>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="w-full mt-2 py-1.5 bg-pink-300 hover:bg-pink-400 text-slate-900 text-xs font-bold rounded-md transition-colors">{doneLabel || '完成'}</button>
                    )}
                </div>
            );
        };

        const CheckCircle = ({ selected, onClick }) => {
            const interactive = typeof onClick === 'function';
            return (
                <div
                    onClick={interactive ? (e) => { e.stopPropagation(); onClick(e); } : undefined}
                    title={interactive ? '選取' : undefined}
                    className={`absolute bottom-2 right-2 z-20 w-6 h-6 rounded-full flex items-center justify-center transition-all ${interactive ? 'cursor-pointer hover:scale-110' : 'pointer-events-none'} ${selected ? 'bg-pink-300 shadow-md' : 'bg-black/40 border-2 border-white/70'}`}
                >
                    {selected && <Icon name="Check" size={14} className="text-slate-900" />}
                </div>
            );
        };

        const LS_KEY = 'nblm_generator_v10_state';
        const loadSavedState = () => {
            try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { return {}; }
        };

        const referenceData = [
            {
                id: 'ref-015',
                icon: 'Layout',
                title: '白底商務簡約風格',
                category: '白底商務簡約風格',
                generatorShow: true,
                zhPrompt: '北歐極簡商務風格。使用純白色背景、柔和而克制的彩色幾何色塊、高端編輯式版面、簡約北歐美學、柔和插圖、優雅資訊圖表、圓角卡片與現代企業品牌語言。整體呈現乾淨的雜誌感、充足留白、清楚資訊層級與高品質視覺效果。輔助配色可使用 #16324F、#2E6F95、#F2A900、#A9D6E5、#F7FAFC，並維持白底簡潔、專業且易讀。',
                enPrompt: 'Nordic minimalist business presentation style. Use a pure white background, soft and restrained geometric color blocks, premium editorial layouts, minimalist Scandinavian aesthetics, gentle illustrations, elegant infographics, rounded cards, and a modern corporate brand language. Maintain a clean magazine-like composition, generous whitespace, clear information hierarchy, and polished visual quality. Supporting colors may include #16324F, #2E6F95, #F2A900, #A9D6E5, and #F7FAFC while keeping the white-background design clean, professional, and highly readable.',
                jaPrompt: '北欧ミニマルビジネススタイル。純白の背景、柔らかく抑制された幾何学的な色面、上質なエディトリアルレイアウト、北欧のミニマル美学、穏やかなイラスト、洗練されたインフォグラフィック、角丸カード、現代的な企業ブランド表現を使用します。十分な余白、明確な情報階層、清潔な雑誌風レイアウトを維持してください。補助色として #16324F、#2E6F95、#F2A900、#A9D6E5、#F7FAFC を使用できます。',
                koPrompt: '북유럽 미니멀 비즈니스 스타일입니다. 순백색 배경, 부드럽고 절제된 기하학 색상 블록, 고급 편집 레이아웃, 북유럽 미니멀 미학, 부드러운 일러스트, 우아한 인포그래픽, 둥근 카드와 현대적인 기업 브랜드 언어를 사용합니다. 충분한 여백과 명확한 정보 계층, 깨끗한 매거진 구성을 유지하세요. 보조 색상으로 #16324F, #2E6F95, #F2A900, #A9D6E5, #F7FAFC를 사용할 수 있습니다.',
                description: '以純白背景、北歐留白與柔和幾何色塊呈現高階商務內容，兼具現代企業的專業感、編輯美感與清楚易讀的資訊層級。',
                examples: [
                    {
                        name: '範例 1｜北歐極簡商務風',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1ydehFZqCwgrPhncaF06xTeMTFmkkMWv8&sz=w800',
                            'https://drive.google.com/thumbnail?id=12UR0QIiV5fLFNjDQBq9AEvvKVgRfUnL3&sz=w800',
                            'https://drive.google.com/thumbnail?id=1QDJu1V6oyITaFwXaY2PPCpfkWZT12T9W&sz=w800',
                            'https://drive.google.com/thumbnail?id=1vQl6QlEdmeF5efu9CXHmtycxl4xe1MoD&sz=w800',
                            'https://drive.google.com/thumbnail?id=1c1IyC8Bal_yzqrz6jnq9KKQL-Em4GpA6&sz=w800',
                            'https://drive.google.com/thumbnail?id=1luAPpr4gpxHed_IPNBDU4GQeAnh0RMhQ&sz=w800',
                            'https://drive.google.com/thumbnail?id=1jh4xDOzRP_ZjPuhXFXNKuDjbw9ViQ2NN&sz=w800',
                            'https://drive.google.com/thumbnail?id=1o2ezYeD1hXUjEc4NFb7KlBwcLDL_fkVe&sz=w800',
                            'https://drive.google.com/thumbnail?id=1KKnghsu148Rncu2_UM0lvR4RA7NhpFUJ&sz=w800',
                            'https://drive.google.com/thumbnail?id=1ctgqfpw8B2x_9c036yYmeB_3hjGim1YL&sz=w800',
                            'https://drive.google.com/thumbnail?id=1cafGYsDYtAjsZh6stmWrIWqJDcSppkuB&sz=w800',
                            'https://drive.google.com/thumbnail?id=1RTAPoGZaiq-GN2p3OqWMaiIEJLRrEQyR&sz=w800',
                            'https://drive.google.com/thumbnail?id=1_wXemlr3B-2fov_roawttZLY5fTjIQlR&sz=w800',
                            'https://drive.google.com/thumbnail?id=1H5wLeZuuJl2Lrk3MoYJJJ6Q93wE5H50i&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-016',
                icon: 'TrendingUp',
                title: '白底高階財經風格',
                category: '白底高階財經風格',
                generatorShow: true,
                zhPrompt: '【風格】高階商務財經簡報，採用純白背景（#FFFFFF），以深藍色為主色、香檳金為少量點綴，呈現企業年報、董事會簡報及國際顧問公司的專業質感，大量留白，善用「結構化視覺圖形」與「向量資訊圖表」輔助說明，避免過度裝飾。【Typography】全簡報採用一致企業字體。封面與每張投影片主標題使用粗宋體風格（如：思源宋體、Noto Serif TC），封面 34–40pt，內頁 22pt、粗體、深藍色；內文一律使用現代無襯線字體（如：思源黑體、Noto Sans TC）Regular；重要關鍵詞可使用內文字體的 Bold，其餘文字皆不得使用粗體。【版面】四周保留至少 1 公分安全留白。版面預設採用「單欄大圖表」或「左文右圖對比」結構。維持一致的標題位置、留白比例、配色與版面配置，不得因頁面改變設計風格，確保具備專業企業識別。',
                enPrompt: '[Style] Create a premium business and financial presentation on a pure white background (#FFFFFF), using deep navy as the primary color with restrained champagne-gold accents. Convey the polished quality of corporate annual reports, board presentations, and international consulting firms. Use generous whitespace, structured visual diagrams, and vector infographics while avoiding excessive decoration. [Typography] Use one consistent corporate type system throughout. Cover and slide titles use a bold serif style such as Noto Serif TC: 34–40 pt on the cover and 22 pt, bold, deep navy on content slides. Body text uses a modern sans-serif such as Noto Sans TC Regular. Only important keywords may use the body font in Bold; all other text must remain regular. [Layout] Keep at least 1 cm of safe margin on all four sides. Default to either a single-column large-chart layout or a left-text/right-visual comparison layout. Maintain consistent title placement, whitespace ratio, colors, and layout throughout without changing the design style between slides.',
                jaPrompt: '【スタイル】純白背景（#FFFFFF）を使用した上質なビジネス・財務プレゼンテーション。濃紺を主色とし、シャンパンゴールドを少量のアクセントとして使用します。企業年次報告書、取締役会資料、国際コンサルティング会社のような専門的な品質を表現し、十分な余白、構造化された視覚図形、ベクターインフォグラフィックを活用して過度な装飾を避けます。【タイポグラフィ】全体で一貫した企業書体を使用します。表紙と各スライドの主見出しは Noto Serif TC などの太字明朝体とし、表紙は 34～40pt、本文スライドは 22pt・太字・濃紺。本文は Noto Sans TC Regular などの現代的なサンセリフ体を使用し、重要語のみ Bold、その他は太字禁止です。【レイアウト】四辺に最低 1cm の安全余白を確保し、「単一カラムの大型チャート」または「左文・右図の比較」構成を基本とします。タイトル位置、余白比率、配色、レイアウトを全ページで統一してください。',
                koPrompt: '[스타일] 순백색 배경(#FFFFFF)의 고급 비즈니스·재무 프레젠테이션입니다. 진한 네이비를 주색으로 사용하고 샴페인 골드를 소량의 포인트로 활용하여 기업 연차보고서, 이사회 발표, 글로벌 컨설팅 회사와 같은 전문성을 표현합니다. 넉넉한 여백과 구조화된 시각 도형, 벡터 인포그래픽을 활용하고 과도한 장식은 피합니다. [타이포그래피] 전체 프레젠테이션에 일관된 기업 글꼴 체계를 적용합니다. 표지와 각 슬라이드의 주제목은 Noto Serif TC 같은 굵은 명조 계열로, 표지는 34–40pt, 내지는 22pt 굵은 진한 네이비로 설정합니다. 본문은 Noto Sans TC Regular 같은 현대적인 산세리프 글꼴을 사용하며 중요한 키워드만 Bold를 허용하고 나머지는 굵게 표시하지 않습니다. [레이아웃] 네 변에 최소 1cm의 안전 여백을 확보합니다. 단일 열 대형 차트 또는 왼쪽 텍스트·오른쪽 이미지 비교 구성을 기본으로 하며 제목 위치, 여백 비율, 색상과 레이아웃을 모든 페이지에서 일관되게 유지합니다.',
                description: '以純白背景、深藍主色與少量香檳金，結合大型數據圖表、結構化視覺圖形及嚴謹企業字體，呈現董事會與財經年報等級的高階專業感。',
                examples: [
                    {
                        name: '範例 1｜高階商務財經簡報',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1Y7Vw3Ga4SXml5KqHzidHdsnK8EonvIAF&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Xox8zE7IAE8lG1FxL6ySQdZnxvYitMIs&sz=w800',
                            'https://drive.google.com/thumbnail?id=1bRpDs3GleliYe-ss0kuL8EQq-FQkvXE1&sz=w800',
                            'https://drive.google.com/thumbnail?id=1lej1p08uiUtY0701gWBXUMhDvDu6jj0z&sz=w800',
                            'https://drive.google.com/thumbnail?id=1421uLti6QwNv574jObFPCMatQzw5zpXT&sz=w800',
                            'https://drive.google.com/thumbnail?id=1w3rA3kXWozu6dso1t8pb1v_gmjl2qHkt&sz=w800',
                            'https://drive.google.com/thumbnail?id=1m4gzdhpgpV7BX3ZIOO3yuHWaWufV9CIF&sz=w800',
                            'https://drive.google.com/thumbnail?id=1G9eQ5h-0xKf1G70Eb9R893omzxO77uf_&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-0',
                icon: 'Smile',
                title: '手繪日記風格+主角',
                category: '專屬角色導覽',
                generatorShow: true,
                zhPrompt: '🎨 視覺風格設定\n整體採用手繪日記風格，結合彩色鉛筆與蠟筆質感筆觸，搭配細膩可見的紙張紋理背景。畫面充滿可愛的手繪塗鴉元素，線條呈現有機、不對稱的自然感。\n\n整體配色以柔和蠟筆色系為主，營造溫馨、療癒的塗鴉美學，版面配置如同筆記本般親切直覺，傳達友好、溫柔且貼近人心的視覺感受。\n\n👩‍⚕️ 視覺與角色指令\n【角色身分】\n角色為本場簡報的導覽員，一位溫柔、可靠且專業的【主角】，負責引導觀眾理解內容。\n【全域設定】\n所有投影片皆套用相同的背景風格，並確保【主角】角色在每一張投影片中出現，持續陪伴並帶領觀眾。\n【風格連貫性】\n精確維持角色的原始外觀特徵，確保所有畫面皆為一致的 3D 立體畫風，造型、比例與風格不可變動，以維持高度一致性。\n【畫面位置配置】\n角色固定安排於畫面一側（左側或右側），並刻意保留充足的文字閱讀區域，完全避免遮擋或干擾簡報內容。\n【重點指引互動】\n在包含圖示、圖表或重點視覺元素的頁面中，角色需展現自信且友善的互動手勢，自然地引導觀眾視線聚焦於指定重點。\n【內容解說姿態】\n於說明、分析或教學型頁面中，角色應呈現親切自然、熱情且生動的姿勢，拉近與觀眾之間的距離，提升理解與信任感。',
                enPrompt: '🎨 Visual Style\nAdopt a hand-drawn diary-style aesthetic, featuring colored pencil and crayon textures layered over a subtly visible paper-textured background.\n\nThe visuals include cute, hand-drawn doodles with organic, asymmetrical lines, creating a natural and playful feel.\n\nUse a soft crayon color palette to convey a warm, comforting doodle aesthetic. The overall layout should resemble a notebook, delivering a friendly, approachable, and heartfelt visual experience.\n\n👩‍⚕️ Visual & Character Instructions\n[Character Role]\nThe character serves as the presentation guide—a gentle, reliable, and professional [Main Character] who leads the audience through the content.\n[Global Setting]\nApply the designated background consistently across all slides. The [Main Character] must appear on every slide, continuously guiding and accompanying the audience.\n[Style Consistency]\nFaithfully preserve the character’s original features. Ensure a consistent 3D illustrative style across all visuals, with no changes to design, proportions, or appearance.\n[Character Placement]\nPosition the character consistently on one side of the frame (left or right), intentionally leaving ample space for text content. The character must never obstruct or interfere with presentation information.\n[Visual Guidance]\nOn slides containing icons, charts, or key visual elements, the character should display confident and friendly gestures, naturally guiding the viewer’s attention toward the highlighted elements.\n[Content Explanation Poses]\nFor explanatory or analytical slides, the character should adopt warm, engaging, and expressive poses, creating a sense of closeness and enhancing audience understanding and trust.',
                jaPrompt: '🎨 ビジュアルスタイル設定\n全体的に手書き日記スタイルを採用し、色鉛筆とクレヨンの質感を組み合わせ、紙のテクスチャ背景を使用します。かわいい手描きの落書き要素を取り入れ、自然で非対称な線を描きます。\n\n配色は柔らかなパステルカラーを中心に、温かく癒やされる落書きの美学を表現し、ノートのように親しみやすいレイアウトにします。\n\n👩‍⚕️ ビジュアル＆キャラクター指示\n[キャラクターの役割]\nキャラクターはこのプレゼンのガイドであり、優しく信頼できるプロの[Main Character]です。\n[全体設定]\nすべてのスライドに同じ背景を適用し、[Main Character]が常に表示されるようにします。\n[スタイルの一貫性]\nキャラクターの元の外観と3Dスタイルを厳密に維持し、プロポーションやデザインを変更しないでください。\n[配置]\nキャラクターは画面の片側（左または右）に固定し、テキストや情報を絶対に隠さないようにします。\n[視覚的な誘導]\nアイコンやグラフがあるページでは、キャラクターが自信を持ってフレンドリーなジェスチャーで重要な要素を指し示すようにします。\n[説明のポーズ]\n説明や分析のページでは、キャラクターが自然で熱意のあるポーズをとり、視聴者との距離を縮めるようにします。',
                koPrompt: '🎨 시각적 스타일 설정\n전체적으로 손그림 일기 스타일을 채택하고 색연필과 크레용 질감 터치, 눈에 띄는 종이 질감 배경을 결합합니다. 귀여운 손그림 낙서 요소와 자연스럽고 비대칭적인 선을 사용합니다.\n\n전체 배색은 부드러운 파스텔 톤을 사용하여 따뜻하고 힐링되는 낙서 미학을 연출하며, 노트처럼 친숙한 레이아웃을 구성합니다.\n\n👩‍⚕️ 시각 및 캐릭터 지침\n[캐릭터 역할]\n캐릭터는 이 프레젠테이션의 가이드로서 부드럽고 신뢰할 수 있는 전문적인 [Main Character]입니다.\n[전체 설정]\n모든 슬라이드에 동일한 배경을 적용하고 [Main Character]가 모든 슬라이드에 등장하여 청중을 안내하도록 합니다.\n[스타일 일관성]\n캐릭터의 원래 외형 특징을 정확하게 유지하며, 모든 화면에서 일관된 3D 스타일, 비율 및 디자인을 변경 없이 유지합니다.\n[화면 배치]\n캐릭터를 화면 한쪽(왼쪽 또는 오른쪽)에 고정하여 텍스트나 정보를 절대 가리지 않도록 합니다.\n[시각적 안내]\n아이콘, 차트 또는 핵심 요소가 있는 페이지에서는 캐릭터가 자신감 있고 친근한 제스처로 중요한 요소를 가리키도록 합니다.\n[설명 자세]\n설명 및 분석 페이지에서는 캐릭터가 자연스럽고 열정적인 자세를 취해 청중의 이해도와 신뢰감을 높입니다.',
                description: '透過專屬的角色導覽員貫穿全場，搭配手繪塗鴉質感，拉近與觀眾的距離，非常適合需要高度親和力與解說感的服務型簡報。',
                examples: [
                    {
                        name: '範例 1',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1UwzSEcjTcZuU4oICNgeJu4kYviARvznt&sz=w800',
                            'https://drive.google.com/thumbnail?id=17wH-ppIZfdoszRr_iL0i_Iw8UU5Ry19B&sz=w800',
                            'https://drive.google.com/thumbnail?id=1E0UL5vkUcERYzUokAJyp4wjekLc-JVXx&sz=w800',
                            'https://drive.google.com/thumbnail?id=1NNSIPe3xmoNXFS1A7ug6NxAqMee2-hx8&sz=w800',
                            'https://drive.google.com/thumbnail?id=1U3Xwj8BkLZtv5yDzGAe2d4vSTIXQOAFc&sz=w800',
                            'https://drive.google.com/thumbnail?id=1tiUhc2yA5ymnHcfDmfmDlss502Xdr0nY&sz=w800',
                            'https://drive.google.com/thumbnail?id=1HkINj8o5eIQd5zPeaRsqc1_D398HxRjB&sz=w800',
                            'https://drive.google.com/thumbnail?id=1uxUL4V6UdynOfjEbls7G7qXwxuHPEpst&sz=w800',
                            'https://drive.google.com/thumbnail?id=1xyr-dANuP7OjAgXmUyLWTlHBWO_6NLuC&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-001',
                icon: 'Monitor',
                title: '專業企業商務風格',
                category: '高階商務/對外提案',
                generatorShow: true,
                zhPrompt: '請以專業企業商務風格設計簡報，採用深藍、深灰等沉穩配色，搭配清晰的資料圖表、結構化版面與正式排版，展現權威感與可信度。',
                enPrompt: 'Design the presentation in a corporate business style using a professional color palette of navy blue and charcoal gray, with structured layouts, formal typography, clear data charts, and a tone of authority and credibility.',
                jaPrompt: 'プロの企業ビジネススタイルでプレゼンをデザインし、ネイビーやダークグレーなどの落ち着いた配色を使用し、クリアなデータチャート、構造化されたレイアウト、正式なタイポグラフィを組み合わせて、権威と信頼性を表現してください。',
                koPrompt: '전문적인 기업 비즈니스 스타일로 프레젠테이션을 디자인하고, 네이비, 다크 그레이 등 차분한 색상을 사용하며, 명확한 데이터 차트, 구조화된 레이아웃 및 공식적인 타이포그래피를 결합하여 권위와 신뢰성을 표현하세요.',
                description: '採用深藍與深灰等沉穩配色，配合結構化的版面與清晰的資料圖表，能有效提升提案的權威感與專業度，最適合對外正式商務會議。',
                examples: [
                    {
                        name: '範例 1',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1yGvx4-svLR3LMU4d1fOQE5WAVIMCZgea&sz=w800',
                            'https://drive.google.com/thumbnail?id=15SAMztCLoiz2n73DE6SueDNhvcAtixbn&sz=w800',
                            'https://drive.google.com/thumbnail?id=1y8F42UDBYtk-GChwgZ8LMEPokActZUth&sz=w800',
                            'https://drive.google.com/thumbnail?id=1XPB9LfUtrKEafjmGY7EwPidipwx6mBZp&sz=w800',
                            'https://drive.google.com/thumbnail?id=1gGheWMRadn3Xfr5tyuQ9fvyDSmj9mbKy&sz=w800',
                            'https://drive.google.com/thumbnail?id=1E_6CaqvH38iW_sEJNMojcIc0SqS_vkJb&sz=w800',
                            'https://drive.google.com/thumbnail?id=1l2fH9XUo1SCVDO7lKPmDQtXKC-hgEF0R&sz=w800',
                            'https://drive.google.com/thumbnail?id=11hlcaWlRaGQEUOC5uLAF5daT7fmdVqsy&sz=w800',
                            'https://drive.google.com/thumbnail?id=1br-sdnwvMUzbZXhaR2I9GN5A4cJge0eu&sz=w800',
                            'https://drive.google.com/thumbnail?id=1YC0OR22Qbu6McSmgZ82gUIPbYZF1rYfq&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-002',
                icon: 'Sparkles',
                title: '溫馨插畫風格',
                category: '療癒分享/品牌故事',
                generatorShow: true,
                zhPrompt: '溫馨風格插畫，暖色調漸層，柔和的陽光質感，圓潤可愛的線條，奶油色與溫暖橘色系，極簡背景，大量留白空間，溫柔且平易近人，療癒系氛圍。',
                enPrompt: 'Warm and cozy illustration style, warm-toned gradients, soft sunlight texture, rounded and cute lines, cream and warm orange color palette, minimalist background, ample negative space for text, gentle and approachable, healing atmosphere.',
                jaPrompt: '温かみのあるイラストスタイル、暖色系のグラデーション、柔らかな太陽の光の質感、丸みを帯びたかわいい線、クリーム色と温かみのあるオレンジ系の配色、ミニマルな背景、十分な余白、優しくて親しみやすい癒しの雰囲気。',
                koPrompt: '따뜻한 일러스트 스타일, 난색 계열 그라데이션, 부드러운 햇살 질감, 둥글고 귀여운 선, 크림색 및 따뜻한 오렌지 계열 색상, 미니멀한 배경, 넓은 여백, 부드럽고 친근한 힐링 분위기.',
                description: '溫馨的插畫風格搭配暖橘、奶油色調，能大幅降低簡報的冰冷感。極簡背景與大量留白不僅讓畫面視覺舒適，也能讓聽眾感到放鬆與療癒，非常適合軟性主題、生活化商品或品牌故事分享。',
                examples: [
                    {
                        name: '範例 1',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1mF5Bjxt7aHT9qS04xT8xHib7FbPMkvv-&sz=w800',
                            'https://drive.google.com/thumbnail?id=1fJwlOPXFTvd_S8UxowllsEdh6YjpjR_n&sz=w800',
                            'https://drive.google.com/thumbnail?id=1a4-vYvwPJGtccs_GOJkm_R1BLu3Gs-VK&sz=w800',
                            'https://drive.google.com/thumbnail?id=16QdRtxfR3SrklQjnR-fGk3Qbeinbgl1Z&sz=w800',
                            'https://drive.google.com/thumbnail?id=1M7HKNq1jq6doacfkn8qhmk_zsZWi6-yN&sz=w800',
                            'https://drive.google.com/thumbnail?id=1xKNl-bj_0itro3sbAXinu5pVCYtZKJyl&sz=w800',
                            'https://drive.google.com/thumbnail?id=1jM8wulikbe_Rba0w3XZpkdTni7HmD47f&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Iii4qhfMdCiIp6djlxtIUw2BKK57IkXu&sz=w800',
                            'https://drive.google.com/thumbnail?id=1F-YONOIG-efN3MsbhROqqcWyhWPP9ZxO&sz=w800',
                            'https://drive.google.com/thumbnail?id=1gPFnGFQRLet2lv2QEH6EkVoO6j4kOsIF&sz=w800',
                            'https://drive.google.com/thumbnail?id=1UA77JEfLRVH-IhZ-WYd5XIygGVAu--uC&sz=w800',
                            'https://drive.google.com/thumbnail?id=1CB3ez0VgdN13K0-RrlZYCf4aleF6W3bk&sz=w800'
                        ]
                    },
                    {
                        name: '範例 2',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=19leDpP-FyrwYxo2rysQi1V0kd5R5BdUO&sz=w800',
                            'https://drive.google.com/thumbnail?id=1KLJynU3DWgNV2zSacbx5jGhgyA_9P7LW&sz=w800',
                            'https://drive.google.com/thumbnail?id=1CY3_i16b_tnETL6GNgzsfxnT3uuxH7Ve&sz=w800',
                            'https://drive.google.com/thumbnail?id=1OVONflthfL4n5bbv_j_Cdu6xPCPc2OfU&sz=w800',
                            'https://drive.google.com/thumbnail?id=1hOcMjORVGJtMDltAYokpgV1nok9s6ghg&sz=w800',
                            'https://drive.google.com/thumbnail?id=1MPgAa73ZLItTfJl8wsQ6k00EYIRXLlr8&sz=w800',
                            'https://drive.google.com/thumbnail?id=1LhK4mFylgXXsbm8AdQZYNKQ6WgRUdcPn&sz=w800',
                            'https://drive.google.com/thumbnail?id=15_SN1Wt1678oKrEeag2S0U07ws0KnRsP&sz=w800',
                            'https://drive.google.com/thumbnail?id=1ZeBn5jfNlkF-EAddaOtdPwXpfv_uAmX4&sz=w800',
                            'https://drive.google.com/thumbnail?id=1cF_M88Q0QcpHxCfTUJffeOGbO4z1PBt2&sz=w800',
                            'https://drive.google.com/thumbnail?id=1C9e3eZuN4HnBpV9ah9nVRKvAOjXC8JqH&sz=w800'
                        ]
                    },
                    {
                        name: '範例 3',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1rI2CP5jNkjRjNkojmOCRlMpErDSwu7Hk&sz=w800',
                            'https://drive.google.com/thumbnail?id=1tgySl-WhPAo-IJxuvAHwDNvNtCCIkiPA&sz=w800',
                            'https://drive.google.com/thumbnail?id=1K_d3J_IT1YCKMQHSHssQn0-H_gSZZdci&sz=w800',
                            'https://drive.google.com/thumbnail?id=1VTdZoTe2rgi4DrYxdXVTv9kb4GwIteX2&sz=w800',
                            'https://drive.google.com/thumbnail?id=1_1MYph0MfhLB5_HR3v1uCLlnDcrZjCBL&sz=w800',
                            'https://drive.google.com/thumbnail?id=1S4TbvT8QOObQ-nICxXgsRgOcUbsg-cxl&sz=w800',
                            'https://drive.google.com/thumbnail?id=1eX7r2LoAaHcSUjl5QPdoe89YnzQhDuur&sz=w800',
                            'https://drive.google.com/thumbnail?id=1KdfYtLEzeljmpmKU-t4s0Jw1ZfRtHXMl&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Zm7XnUb4YnneaRnwJEBmC1QvWOn84XSk&sz=w800',
                            'https://drive.google.com/thumbnail?id=1gr2-SG-EsFLl56OkHNYg_YDdyixFfCVl&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Qg8k0gozlHkTblBbZeB2okrBV7_ntyMr&sz=w800',
                            'https://drive.google.com/thumbnail?id=12G6VD6OsTcJ4zoKtkKzLqEti3zgK-RMQ&sz=w800',
                            'https://drive.google.com/thumbnail?id=1zHF7EoKpQJwOEQZY3_AzcgzaLLEvBkoh&sz=w800',
                            'https://drive.google.com/thumbnail?id=1UX6TJbKdJyX3zWwyXEZgHBLGx8bT-bCH&sz=w800',
                            'https://drive.google.com/thumbnail?id=1V_cQt-wIo1t73rijdM5a-_jk7Y8hP5a2&sz=w800'
                        ]
                    },
                    {
                        name: '範例 4',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1ye9jO1o_ayNtqqP7t5Yv5YWLZGG7W689&sz=w800',
                            'https://drive.google.com/thumbnail?id=10YPRBu5XTijgw4w5EnSlq3CYCsAJBLv_&sz=w800',
                            'https://drive.google.com/thumbnail?id=1aJ5WgeuaCYXocxstEarJLunrhtXf_7ZL&sz=w800',
                            'https://drive.google.com/thumbnail?id=1cAeRj_sjvyE6Nj97HRrvHFy2vqPpSZk7&sz=w800',
                            'https://drive.google.com/thumbnail?id=1chiN9troQasEQCJbA26YncIYIliFtuB1&sz=w800',
                            'https://drive.google.com/thumbnail?id=1MamvVMVX3ioFRtoap9ZJRGaz6EDE2YVB&sz=w800',
                            'https://drive.google.com/thumbnail?id=1IeziADK77ON4MAv_wL8Fc_YHpJluVinP&sz=w800',
                            'https://drive.google.com/thumbnail?id=1xf1FUf3YhejCB4ADAhWfwXSwknzlEGnR&sz=w800',
                            'https://drive.google.com/thumbnail?id=1SJ9C4oQHW_0SeR0vxUZ4pE_iKUkGGqJf&sz=w800',
                            'https://drive.google.com/thumbnail?id=1aFx4WzQhpDNkHQ0RjtAPYrr1-n18W8Ng&sz=w800',
                            'https://drive.google.com/thumbnail?id=1aFTcsfsE05_TSZLyLYMUFdLWfnpPuaIU&sz=w800',
                            'https://drive.google.com/thumbnail?id=1XBjhXwv7Xt2aqa5Q39KK0v2_CwXH_rCe&sz=w800',
                            'https://drive.google.com/thumbnail?id=1pqmjlLsu8myyh-4Wk1A9oWxwhSkrh8O_&sz=w800',
                            'https://drive.google.com/thumbnail?id=1_hlHuktReT2twfWRphEdELYUg71ZhaJp&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-006',
                icon: 'Layout',
                title: '高對比度極簡風格',
                category: '數據分析/專業簡報',
                generatorShow: true,
                zhPrompt: '高對比度極簡風格，大面積色塊切割，穩重的深藍色與溫暖的金黃色對比，純淨背景，無雜訊，專業醫療視覺感，清晰的邊界，強調易讀性與功能性。',
                enPrompt: 'High-contrast minimalist style, large geometric color blocks, sophisticated navy blue and warm golden yellow contrast, clean background, noise-free, professional medical visual, sharp edges, emphasizing readability and functionality.',
                jaPrompt: '高コントラストのミニマルスタイル、大きなカラーブロックの分割、落ち着いたネイビーブルーと温かみのあるゴールデンイエローのコントラスト、クリーンな背景、ノイズなし、プロの医療的なビジュアル、シャープなエッジ、可読性と機能性を強調。',
                koPrompt: '고대비 미니멀리즘 스타일, 대형 색상 블록 분할, 차분한 네이비 블루와 따뜻한 골든 옐로우의 대비, 깔끔한 배경, 노이즈 없음, 전문적인 의료 시각 효과, 선명한 경계, 가독성과 기능성 강조.',
                description: '大膽的高對比配色與大面積色塊切割，不僅能在視覺上快速抓住眼球，還能確保重點數據與文字的易讀性，非常適合數據分析與邏輯推演。',
                examples: [
                    {
                        name: '範例 1',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1VDJHOw8VZcfK4_BtjAPCMKmkjhfyh09t&sz=w800',
                            'https://drive.google.com/thumbnail?id=13QYi5TFCX-arM_pu5UlJ3X_jCeUOsdr1&sz=w800',
                            'https://drive.google.com/thumbnail?id=1HdY2eZPBupUBm3l_4TuE8J_-fzERtW1o&sz=w800',
                            'https://drive.google.com/thumbnail?id=1rOHfP_qfDe5BO7TOz6ZDTZTXXQ80mM2w&sz=w800',
                            'https://drive.google.com/thumbnail?id=1-2asNoKyY_GSnb_pPVurOlkM3RK_RDAt&sz=w800',
                            'https://drive.google.com/thumbnail?id=1MgXYGveCBrVO7kll-zipjQSUq9C2yxg3&sz=w800',
                            'https://drive.google.com/thumbnail?id=1c3VGIUtoun9gkFU_9xWBb--qNaSyyuB_&sz=w800',
                            'https://drive.google.com/thumbnail?id=1cf-LGGfJzOvk3o4jArWtf5gt4XEjleBJ&sz=w800',
                            'https://drive.google.com/thumbnail?id=18cOwex-Pb4QVzSmVHUMy-A5cULJmrmc8&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Qn_vuIGkW-rZfyjYeVVZFObtpGwV8P0g&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-008',
                icon: 'User',
                title: '2.5D 等距視角風格+主角',
                category: '專屬角色導覽',
                generatorShow: true,
                zhPrompt: '【簡報呈現風格】\n整體採用 2.5D 等距視角風格，呈現微縮模型般的精緻質感。畫面以清新、簡約的色塊構成，搭配柔和自然的環境光影，營造高品質的 3D 模型視覺效果。整體風格強調秩序感與專業度，並適度加入可愛的小圖示元素，使畫面在專業之餘保有親和力。\n\n👩‍⚕️ 視覺與角色指令\n【背景設定】\n所有投影片皆使用指定的背景，並保持一致性。\n【角色身分】\n角色為本場簡報的專業【主角】，負責引導與說明整體演示內容。\n【全域角色規則】\n【主角】角色需出現在每一張幻燈片中，作為視覺引導與陪伴角色。\n【角色表現要求】\n在包含圖示、重點標示或視覺元素的投影片中，角色需呈現自信姿態，並以手勢指向指定圖示，引導觀眾視線。在介紹或分析內容的頁面中，角色需展現熱情、自然的介紹或解說姿勢，提升內容的理解度與親切感。\n【畫面配置與一致性】\n角色請固定放置於畫面一側（左側或右側），避免遮擋任何文字或資訊區塊。請完整保留角色的原始外觀特徵，確保角色比例、造型與立體風格在所有投影片中維持高度一致。',
                enPrompt: '【Presentation Style】\nUse a 2.5D isometric perspective with a miniature model-like appearance. The visuals should feature clean, minimal color blocks combined with soft environmental lighting to create a high-quality 3D model look. The overall style should convey a strong sense of order and professionalism, while incorporating subtle cute icon elements to enhance approachability.\n\n👩‍⚕️ Visual & Character Instructions\n[Background]\nApply the designated background consistently across all slides.\n[Character Role]\nThe character is a professional [Main Character] serving as the guide for the entire presentation.\n[Global Character Rule]\nThe [Main Character] must appear on every slide, acting as a visual guide throughout the presentation.\n[Character Performance Guidelines]\nOn slides featuring icons, highlights, or visual elements, the character should display a confident pose and gesture toward specific icons to guide viewer attention. On slides focused on content introduction or analysis, the character should adopt warm, engaging poses suitable for explanation or presentation.\n[Layout & Consistency]\nPosition the character on one side of the slide (left or right) to ensure all text and information remain fully readable. Preserve the character’s original features at all times, maintaining consistent proportions, appearance, and 3D visual style across all slides.',
                jaPrompt: '【プレゼンのスタイル】\n全体に 2.5D アイソメトリック（等角投影）スタイルを採用し、ミニチュアモデルのような精巧な質感を表現します。クリーンでシンプルなカラーブロックと柔らかな自然光を組み合わせ、高品質な3Dモデルの視覚効果を作り出します。秩序と専門性を強調しつつ、適度にかわいいアイコン要素を加えます。\n\n👩‍⚕️ ビジュアル＆キャラクター指示\n[背景設定]\nすべてのスライドで指定された背景を一貫して使用します。\n[キャラクターの役割]\nキャラクターはこのプレゼンの専門的な[Main Character]であり、内容全体をガイドします。\n[グローバルルール]\n[Main Character] は、プレゼン全体を通して視覚的なガイドとしてすべてのスライドに登場します。\n[パフォーマンスの要件]\nアイコンや重要な視覚要素があるスライドでは、キャラクターは自信に満ちたポーズをとり、特定のアイコンを指し示します。説明のページでは、温かく魅力的なポーズをとります。\n[レイアウトと一貫性]\n文字や情報が完全に読めるように、キャラクターをスライドの片側（左または右）に配置します。すべてのスライドでキャラクターの比率、外観、3Dスタイルを一貫して維持します。',
                koPrompt: '【프레젠테이션 스타일】\n전체적으로 2.5D 아이소메트릭(등각 투영) 스타일을 채택하여 미니어처 모델 같은 정교한 질감을 표현합니다. 깔끔하고 미니멀한 색상 블록과 부드러운 자연광을 결합하여 고품질 3D 모델 시각 효과를 만듭니다. 질서감과 전문성을 강조하면서도 귀여운 아이콘 요소를 적절히 추가합니다.\n\n👩‍⚕️ 시각 및 캐릭터 지침\n[배경 설정]\n모든 슬라이드에 지정된 배경을 일관되게 사용합니다.\n[캐릭터 역할]\n캐릭터는 이 프레젠테이션의 전문적인 [Main Character]로서 전체 내용을 안내하고 설명합니다.\n[전역 캐릭터 규칙]\n[Main Character]는 모든 슬라이드에 등장하여 시각적 가이드 역할을 합니다.\n[캐릭터 표현 요구 사항]\n아이콘이나 주요 시각적 요소가 포함된 슬라이드에서는 캐릭터가 자신감 있는 자세를 취하고 특정 아이콘을 가리켜 시선을 유도합니다. 내용 소개나 분석 페이지에서는 자연스럽고 열정적인 설명 자세를 취합니다.\n[화면 배치 및 일관성]\n캐릭터를 화면 한쪽(왼쪽 또는 오른쪽)에 고정 배치하여 텍스트나 정보 블록을 가리지 않도록 합니다. 모든 슬라이드에서 캐릭터의 원래 외형, 비율 및 3D 스타일을 일관되게 유지합니다.',
                description: '獨特的 2.5D 等距視角帶來微縮模型的精緻感，搭配立體的主角導覽，讓簡報不僅專業，更增添了豐富的空間感與科技感。',
                examples: [
                    {
                        name: '範例 1',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1XSJtPTtwXuJ5lR9Np8fXmXJ272FPRsu3&sz=w800',
                            'https://drive.google.com/thumbnail?id=1kZSE3zPbV9hUIHLhwNpi-b8SJvogG2YA&sz=w800',
                            'https://drive.google.com/thumbnail?id=1lbB82dzJi-M3Rwd5rtMy3eUaWxNyoUe_&sz=w800',
                            'https://drive.google.com/thumbnail?id=1W7aFyU_4DcmC8ZDaeoUnNgT1u-NwbtVt&sz=w800',
                            'https://drive.google.com/thumbnail?id=1jjGup-sp_FF47nOb19vSwfC0h6sFhxx6&sz=w800',
                            'https://drive.google.com/thumbnail?id=1SIHdB749Zipx-Ek7tpnR__GGeOvtb5QM&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Mxha6JjEDh0L-NHiC4NPM4eIoPgjPG_N&sz=w800',
                            'https://drive.google.com/thumbnail?id=1HlSygwfoqcMY2UPFVShmPJnBfVVZ1moa&sz=w800',
                            'https://drive.google.com/thumbnail?id=1T46bNkHKiowIuS__ItRx2F_5syMhaURx&sz=w800'
                        ]
                    },
                    {
                        name: '範例 2',
                        provider: 'YAO',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1432mBIdMiTU4IteWIisacxEQkwRNMEOz&sz=w800',
                            'https://drive.google.com/thumbnail?id=1MF8ZNqi873PhQ7bgpIDrTi7NYo71rUr5&sz=w800',
                            'https://drive.google.com/thumbnail?id=1hKb7qDALkWE8A8ZW9TGA12cWJwCwwPdK&sz=w800',
                            'https://drive.google.com/thumbnail?id=1UQ93Oev9VC37AIXYukSwCPpB_KzbKaYt&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Tpx6IuCWWcKE1qu4Kmh2al873eaMszOl&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Qahmw9ZKDgDLFkiaxsvlHZiQJczrSnXf&sz=w800',
                            'https://drive.google.com/thumbnail?id=1E1Gf6qStPfXCG715j7NexzBuARzfpd3c&sz=w800',
                            'https://drive.google.com/thumbnail?id=1xfjPM4_kAuHrWCEoVHB-a59zYj78_izZ&sz=w800',
                            'https://drive.google.com/thumbnail?id=1LdeCZ5lVSe1mbxZCno2Sd-qrsxlSmSrg&sz=w800',
                            'https://drive.google.com/thumbnail?id=1rdVtCkKFrlibhQOdbmEqVjaVKxNy0J98&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-009',
                icon: 'Monitor',
                title: '3D 奶油 UI 科技風格',
                category: '數據分析/新創科技',
                generatorShow: true,
                zhPrompt: '投影片背景，3D 奶油 UI 科技風格。厚實、圓潤的抽象 3D 元素輕柔地漂浮在溫暖的粉彩背景上。光滑的黏土紋理結合光澤塑膠。友善且平易近人的科技感。',
                enPrompt: 'Slide background, 3D buttery UI tech style. Thick, rounded abstract 3D elements gently floating on a warm pastel background. Smooth clay texture combined with glossy plastic. Friendly and approachable tech vibe.',
                jaPrompt: 'スライドの背景、3D バターUI テクノロジースタイル。厚みがあり、丸みを帯びた抽象的な3D要素が、温かみのあるパステルカラーの背景に優しく浮かんでいます。滑らかな粘土の質感と光沢のあるプラスチック。親しみやすくアプローチしやすいハイテク感。',
                koPrompt: '슬라이드 배경, 3D 버터 UI 테크 스타일. 두껍고 둥근 추상적인 3D 요소가 따뜻한 파스텔 배경 위에 부드럽게 떠 있습니다. 매끄러운 점토 질감과 광택 있는 플라스틱의 결합. 친근하고 다가가기 쉬운 하이텍 느낌.',
                description: '圓潤厚實的 3D UI 元素搭配溫暖粉彩背景，完美中和了科技的冰冷感，呈現出時下最流行、友善且平易近人的新創科技風格。',
                examples: [
                    {
                        name: '範例 1',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1KbBh7H6wRtsdtBvnh5UZ4aey3RT-M4xW&sz=w800',
                            'https://drive.google.com/thumbnail?id=16Bs4_Tg7Swj8HXAAsshamS5eNJquj63f&sz=w800',
                            'https://drive.google.com/thumbnail?id=1BrJDOOeTUOZO-iVSfSTAjCZRre2OvUQv&sz=w800',
                            'https://drive.google.com/thumbnail?id=1D0kiepzL6bgnxfJTCzahpSGMqoV0T7CA&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Dyq5zEujR3W4hXFl3leAQGo9DLqdRfbe&sz=w800',
                            'https://drive.google.com/thumbnail?id=1ohE-Z0CufmBEDTHxsjIX_nduZjRK-ur5&sz=w800',
                            'https://drive.google.com/thumbnail?id=1wm4jp20YRnCjypqoLSwzCHahGFQrvcpa&sz=w800',
                            'https://drive.google.com/thumbnail?id=1lmQ_iiRwYVPd42DfsoWpSAbdpBGWl9qO&sz=w800',
                            'https://drive.google.com/thumbnail?id=1aIQV25y9t4hnbetkacinj0Gm4k9AY0ST&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-010',
                icon: 'BookOpen',
                title: '雜誌編輯風格',
                category: '行銷企劃/品牌故事',
                generatorShow: true,
                zhPrompt: '請以高端雜誌編輯風格設計簡報，採用大膽的版面構圖、強烈的字體層次對比、全幅圖片與精緻的文字排版，如同翻閱一本質感雜誌。',
                enPrompt: 'Design the presentation in a magazine editorial style with bold layouts, strong typographic hierarchy, full-bleed imagery, and refined text composition, as if flipping through a high-end publication.',
                jaPrompt: '高級雑誌のエディトリアルスタイルでプレゼンをデザインし、大胆なレイアウト構成、強いタイポグラフィの階層コントラスト、フルブリード画像、洗練されたテキスト構成を使用し、まるで上質な雑誌をめくるような感覚にしてください。',
                koPrompt: '고급 잡지 편집 스타일로 프레젠테이션을 디자인하고, 대담한 레이아웃 구성, 강력한 타이포그래피 계층 대비, 전체 출혈 이미지 및 정교한 텍스트 구성을 사용하여 마치 고급 잡지를 넘기는 듯한 느낌을 줍니다.',
                description: '如同翻閱高端雜誌般的大膽構圖與強烈字體對比，讓每張投影片都成為一幅藝術品，特別適合時尚、生活風格與品牌形象塑造。',
                examples: [
                    {
                        name: '範例 1',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1VJ9d5rj7HO77nstNCRTaM1x7o9vX1kC0&sz=w800',
                            'https://drive.google.com/thumbnail?id=1x9VoPMx3Cl02vfLtxgTSOZ80P1nra4Xk&sz=w800',
                            'https://drive.google.com/thumbnail?id=1DxJ_cCkg31S2SS_t9p1XqvO-agAprP8I&sz=w800',
                            'https://drive.google.com/thumbnail?id=13I_fdtwPcawiWtjS6go891Fbb9U2cKma&sz=w800',
                            'https://drive.google.com/thumbnail?id=1BM1gkoFln-Ey3Dlh1OY4lBjUP5yVt8dU&sz=w800',
                            'https://drive.google.com/thumbnail?id=1CvlaJvi15JaoLs0EinzHCF2pdgqvdv05&sz=w800',
                            'https://drive.google.com/thumbnail?id=1TGqwq1VcPjeTI33uT9bAZWecFmVwa_d3&sz=w800',
                            'https://drive.google.com/thumbnail?id=18V4cyXzwrDHv1ALQs0PA3js_nazmqDns&sz=w800',
                            'https://drive.google.com/thumbnail?id=1fvpaSt4xBGocNSVIU8IxXejeXf_xgIFX&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-011',
                icon: 'Smile',
                title: '扁平化插畫風格',
                category: '活潑分享/行銷企劃',
                generatorShow: true,
                zhPrompt: '請以扁平化插畫風格設計簡報，使用色彩鮮明的扁平向量插圖、圓角圖形與活潑配色，整體風格友善親切，適合輕鬆的主題呈現。',
                enPrompt: 'Design the presentation in a flat illustration style with colorful flat vector graphics, rounded shapes, and a vibrant palette. The overall tone should be friendly, approachable, and suitable for casual topics.',
                jaPrompt: 'フラットイラストスタイルでプレゼンをデザインし、鮮やかな色のフラットベクターイラスト、角丸の図形、活発な配色を使用してください。全体的なトーンは親しみやすく、カジュアルなテーマのプレゼンに適しています。',
                koPrompt: '플랫 일러스트 스타일로 프레젠테이션을 디자인하고, 생생한 색상의 플랫 벡터 일러스트, 둥근 모서리 도형 및 활기찬 배색을 사용하세요. 전체적인 분위기는 친근하고 캐주얼한 주제 발표에 적합합니다.',
                description: '使用色彩鮮明的扁平向量插圖與活潑配色，整體風格友善親切，適合輕鬆的行銷或企劃簡報。',
                examples: [
                    {
                        name: '範例 1',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=16itVljg9hN7K2Rdg3LtzLNJHTqTqAj2s&sz=w800',
                            'https://drive.google.com/thumbnail?id=1moDOMdExCqf0k_SLly46q_q5urD5tTWi&sz=w800',
                            'https://drive.google.com/thumbnail?id=1_pMDPn-YXpxY-anHV6uQYxOVFVmhQudj&sz=w800',
                            'https://drive.google.com/thumbnail?id=1J8qTStBQCR5b49gQ8ZUpMMgUsGNuYok6&sz=w800',
                            'https://drive.google.com/thumbnail?id=1_CnVvo-85QTSZkSEj4bIvX3e-XrqfTWj&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Yt9-5N3X--zgkPuv1X6Kz1NbEXxpLEw2&sz=w800',
                            'https://drive.google.com/thumbnail?id=1KAzvcbM3Edd9KshxhWwa4xIk4HSblYKf&sz=w800',
                            'https://drive.google.com/thumbnail?id=1UkZ8qPCXjDEaCcWPw72xLd4aGNL5Byfp&sz=w800',
                            'https://drive.google.com/thumbnail?id=1nRpVxlUC2ee9SywfceSmA2yNDwaB7mS-&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-012',
                icon: 'Layout',
                title: '北歐簡約插畫風格',
                category: '高階商務/現代設計',
                generatorShow: true,
                zhPrompt: '北歐簡約插畫風格，無輪廓線設計，平滑的大色塊，粉彩配色，現代感十足，視覺焦點集中，大量留白適合排版，優雅且具設計感。',
                enPrompt: 'Scandinavian minimalist illustration, borderless design, smooth flat color shapes, pastel aesthetic, modern and sleek, focused visual composition, plenty of white space for typography, elegant and artistic.',
                jaPrompt: '北欧のミニマルイラストスタイル、アウトラインのないデザイン、滑らかな大きなカラーブロック、パステルカラー、非常にモダン、視覚的な焦点の集中、タイポグラフィのための十分な余白、エレガントで芸術的。',
                koPrompt: '북유럽 미니멀 일러스트 스타일, 윤곽선 없는 디자인, 매끄러운 대형 색상 블록, 파스텔 배색, 현대적인 감각, 집중된 시각적 초점, 타이포그래피를 위한 넓은 여백, 우아하고 디자인 감각이 뛰어남.',
                description: '北歐簡約插畫搭配無輪廓線與粉彩配色，極具現代感與優雅設計，大量留白非常適合高端排版。',
                examples: [
                    {
                        name: '範例 1',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1ZVte7XnHE7GcKy1ICWg9CBlKyOqTjHa3&sz=w800',
                            'https://drive.google.com/thumbnail?id=10bbhgGdJsx3abZDfYoQpsXG6OQ4VXFT2&sz=w800',
                            'https://drive.google.com/thumbnail?id=1c6cOFhmRz6_rJOMZANpceNRt81EmwLEd&sz=w800',
                            'https://drive.google.com/thumbnail?id=1uShraVaaG9sFRDxMZwQ_A47iKxl0-eQj&sz=w800',
                            'https://drive.google.com/thumbnail?id=1i8a7oZG2oEyCD0ppLaWYCSsGHh74u9xR&sz=w800',
                            'https://drive.google.com/thumbnail?id=1sRkrBt9P2zmsJ_UdncgNxyCnud1Om5ZY&sz=w800',
                            'https://drive.google.com/thumbnail?id=1rHY47r3lKkAH1uYceT7-DfGv_T9PcpDz&sz=w800',
                            'https://drive.google.com/thumbnail?id=1-YmR7-F-nkVNsry6YBQGhSpkr00ylkyE&sz=w800',
                            'https://drive.google.com/thumbnail?id=12FxMQcAXfTEchQipEPsDSiaWSwYePkNi&sz=w800',
                            'https://drive.google.com/thumbnail?id=1aX0wOPALiGyo7bBBlMHFHPagKVV76y66&sz=w800',
                            'https://drive.google.com/thumbnail?id=1tp05Sa6Kt9MQaJBsPSLrANYzZeY--5yB&sz=w800',
                            'https://drive.google.com/thumbnail?id=1c9JhLLoz6-ZcUP6QCzheh1glGhCUsn14&sz=w800',
                            'https://drive.google.com/thumbnail?id=1dDhfB5NfgAyUsF4Vsq_pU0lE8kp6BRhc&sz=w800',
                            'https://drive.google.com/thumbnail?id=1I_4aLxt7AaExXCt1xvlMeNvO6TSGRWfJ&sz=w800',
                            'https://drive.google.com/thumbnail?id=1rCAVQcs0uG0_ZyaeOODzpvv4qrkYezz7&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-013',
                icon: 'Monitor',
                title: '漸層玻璃擬態風格',
                category: '科技前沿/現代設計',
                generatorShow: true,
                zhPrompt: '請以玻璃擬態風格設計簡報，使用半透明毛玻璃效果的卡片、柔和的多彩漸層背景、細微的邊框光暈與模糊效果，呈現現代感與層次感。',
                enPrompt: 'Design the presentation in a glassmorphism style with frosted-glass translucent cards, soft multi-color gradient backgrounds, subtle border glows, and blur effects to convey a modern, layered aesthetic.',
                jaPrompt: 'グラスモーフィズム（Glassmorphism）スタイルでプレゼンをデザインし、すりガラスのような半透明のカード、柔らかなマルチカラーのグラデーション背景、微妙な境界線の発光とぼかし効果を使用して、モダンでレイヤー感のある美学を表現してください。',
                koPrompt: '글래스모피즘(Glassmorphism) 스타일로 프레젠테이션을 디자인하고, 반투명한 불투명 유리 효과 카드, 부드러운 다색 그라데이션 배경, 미세한 테두리 후광 및 흐림 효과를 사용하여 현대적이고 입체적인 느낌을 표현하세요.',
                description: '以玻璃擬態 (Glassmorphism) 為核心，結合半透明卡片與柔和的多彩漸層，為簡報帶來強烈的現代感與豐富的視覺層次。',
                examples: [
                    {
                        name: '範例 1',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1fgk7eW2r08ueoyDx9tsuTb0mpr935HYg&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Z9kbvjzsdlhtdp3wT6aRwOFtxBwRguEG&sz=w800',
                            'https://drive.google.com/thumbnail?id=15YoVmm4VpTq8VTx-gsEQCoKikBjKwgzC&sz=w800',
                            'https://drive.google.com/thumbnail?id=1E5lIJeXWur-6yWWxcipAA21nL44Fw63e&sz=w800',
                            'https://drive.google.com/thumbnail?id=1ZqHehiu4jRfslQNPotgrgpc99bYY0k80&sz=w800',
                            'https://drive.google.com/thumbnail?id=1IqXegq0F1y6FZLGq7YTCZP9tHI4h5HTE&sz=w800',
                            'https://drive.google.com/thumbnail?id=1BP6dx7lQMuf-F1tAmNY7jG7v0_hxvesw&sz=w800',
                            'https://drive.google.com/thumbnail?id=1LyjJRxU-5pKxfreTyhWeTKXAuv-zWYf2&sz=w800',
                            'https://drive.google.com/thumbnail?id=1EJRsIaOikNd8S11X8BcruJm8_9hSFfxP&sz=w800',
                            'https://drive.google.com/thumbnail?id=1c7KRhXBDXgRHaqcuHzTxfz4EDVUxWvyR&sz=w800'
                        ]
                    }
                ]
            },
            {
                id: 'ref-014',
                icon: 'User',
                title: '教育型遊戲UI風格+主角',
                category: '教育培訓/遊戲化',
                generatorShow: true,
                zhPrompt: '【整體視覺風格】\n高品質的 3D 等距視角（Isometric）遊戲 UI 設計，專為教育型簡報投影片打造。 畫面採用深色科技感背景，搭配鮮明的電光藍、螢光綠與亮橘色螢光配色，營造未來感與高辨識度的視覺效果。\n\n【遊戲化介面元素】\n畫面中可包含多種遊戲化 UI 元素，例如：發光效果的生命值條（HP Bar）、能量水晶或能量核心、懸浮式的未來感全像投影螢幕（Holographic UI）。所有元素需具備立體層次與科技線條感，但構圖保持清爽、不雜亂。\n\n【風格定位】\n整體風格為「遊戲化冒險（Gamified Adventure）」，在專業教育簡報的基礎上，加入遊戲世界的探索感與趣味性。 視覺語言結合流暢的科技線條與親切的 3D 卡通角色風格，達到「專業但不嚴肅、好玩但不幼稚」的平衡。\n\n👩‍⚕️ 視覺與角色指令\n【角色與一致性規範】\n角色造型需保持高度一致性，外觀、比例與 3D 風格在所有頁面中不得改變。\n【主角】角色需出現在每一張投影片中，作為引導與陪伴角色。\n角色位置固定於畫面一側（左側或右側），不得遮擋任何重要文字或資訊。\n\n【角色動作與互動】\n每一頁角色皆需展現自信、專業的姿態。\n角色動作需根據投影片內容調整，例如：指向重點資訊、數據或 UI 元素；介紹、說明或分析內容時的引導姿勢。\n角色動作需與該頁投影片的重點資訊形成視覺呼應。\n\n【畫面品質要求】\n高解析度、清晰銳利、構圖簡潔，整體畫面層次分明，確保資訊閱讀性與視覺吸引力兼具。',
                enPrompt: '【Overall Visual Style】\nA high-quality 3D isometric game UI design, created specifically for educational presentation slides. The scene features a dark, futuristic tech background combined with vibrant neon electric blue, fluorescent green, and bright orange color accents, delivering a strong sci-fi and high-contrast visual impact.\n\n【Gamified UI Elements】\nThe interface may include various game-inspired elements, such as: Glowing HP bars (health indicators), Energy crystals or power cores, Floating futuristic holographic projection screens. All elements should have clear depth and sleek technological lines, while maintaining a clean and uncluttered composition.\n\n【Style Direction】\nThe overall style follows a “Gamified Adventure” theme—professional yet engaging—blending educational clarity with the excitement of a game world. Visuals combine smooth, futuristic line work with a friendly 3D cartoon character style, achieving a balance that feels fun without becoming childish.\n\n👩‍⚕️ Visual & Character Instructions\n【Character Consistency Rules】\nThe character must remain fully consistent across all slides, with no changes to appearance, proportions, or 3D rendering style.\nThe [Main Character] must appear on every slide, acting as a guide throughout the presentation.\nPosition the character on one side of the layout (left or right), ensuring no important text or information is obstructed.\n\n【Character Actions & Interaction】\nOn every slide, the character should display confident and professional poses.\nCharacter gestures should align with the slide content, such as: Pointing toward key information, data, or UI elements; Guiding, explaining, or analyzing content.\nEach pose should visually reinforce the main message of the slide.\n\n【Quality Requirements】\nHigh resolution, sharp details, and a clean composition are required. The design should clearly separate visual layers while maintaining excellent readability and strong visual appeal.',
                jaPrompt: '【全体的なビジュアルスタイル】\n教育プレゼンテーション用に作られた高品質な 3D アイソメトリック（等角投影）ゲーム UI デザイン。暗いSF的な背景に、ネオンブルー、蛍光グリーン、明るいオレンジのアクセントを組み合わせ、未来的な視覚効果をもたらします。\n\n【ゲーム化されたUI要素】\n光るHPバー、エネルギークリスタル、浮かぶホログラム画面など、さまざまなゲーム要素を含めることができます。構成はすっきりと整理してください。\n\n【スタイルの方向性】\n全体的なスタイルは「ゲーム化された冒険（Gamified Adventure）」をテーマにし、プロフェッショナルでありながら楽しく、子供っぽくならないバランスを保ちます。\n\n👩‍⚕️ ビジュアル＆キャラクター指示\n[キャラクターの一貫性]\nキャラクターはすべてのスライドで完全に一貫しており、外観、比率、3Dレンダリングスタイルに変更はありません。\n[Main Character]はすべてのスライドにガイドとして表示されます。\n文字や情報を隠さないように、キャラクターをレイアウトの片側（left or right）に配置します。\n\n[アクションとインタラクション]\nすべてのスライドで、キャラクターは自信に満ちたプロらしいポーズをとるべきです。\nキャラクターのジェスチャーは、スライドの重要な情報を指し示すなど、内容と一致している必要があります。\n\n[品質要件]\n高解像度、シャープなディテール、クリーンな構成が求められます。',
                koPrompt: '【전체 시각적 스타일】\n교육용 프레젠테이션 슬라이드를 위해 특별히 제작된 고품질 3D 아이소메트릭(Isometric) 게임 UI 디자인. 어두운 첨단 기술 배경에 네온 일렉트릭 블루, 형광 그린, 밝은 오렌지 색상을 조합하여 강렬한 SF 시각적 효과를 제공합니다.\n\n【게이미피케이션 UI 요소】\n빛나는 HP 바, 에너지 크리스탈 또는 코어, 떠 있는 미래형 홀로그램 화면 등 다양한 게임 요소가 포함될 수 있습니다. 모든 요소는 입체감과 기술적인 선을 갖추면서도 깔끔한 구성을 유지해야 합니다.\n\n【스타일 방향성】\n전체 스타일은 "게임화된 모험(Gamified Adventure)" 테마를 따르며, 전문적이면서도 흥미롭고 유치하지 않은 완벽한 균형을 이룹니다.\n\n👩‍⚕️ 시각 및 캐릭터 지침\n[캐릭터 일관성 규칙]\n캐릭터는 모든 슬라이드에서 외형, 비율, 3D 렌더링 스타일이 전혀 변하지 않고 일관되게 유지되어야 합니다.\n[Main Character]는 프레젠테이션 내내 가이드로 모든 슬라이드에 등장해야 합니다.\n텍스트나 정보가 가려지지 않도록 레이아웃의 한쪽(왼쪽 또는 오른쪽)에 캐릭터를 배치합니다.\n\n[캐릭터 액션 및 상호작용]\n모든 슬라이드에서 캐릭터는 자신감 있고 전문적인 자세를 취해야 합니다.\n핵심 정보를 가리키거나 내용을 설명하는 등 슬라이드 내용과 일치하는 제스처를 취해야 합니다.\n\n[품질 요구 사항]\n고해상도, 선명한 디테일, 깔끔한 구성이 필요합니다. 가독성과 시각적 매력을 모두 확보해야 합니다.',
                description: '結合高品質的 3D 等距視角與遊戲化 UI 元素，並有專屬角色導覽，讓教育或培訓類簡報「專業但不嚴肅、好玩但不幼稚」。',
                examples: [
                    {
                        name: '範例 1',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1c8103FPIRoQPXMxho6I8ROa9YoOgN8Mc&sz=w800',
                            'https://drive.google.com/thumbnail?id=1q2MIWo57SA6_l9jZfhrgCOXXH_c5cA4H&sz=w800',
                            'https://drive.google.com/thumbnail?id=1zaphaqOEZx1XdvgFlixfi78fwgPjcKU5&sz=w800',
                            'https://drive.google.com/thumbnail?id=1fpd-B2_nXkF3Ab1Ibb_D_Vwc5-o3Rpe5&sz=w800',
                            'https://drive.google.com/thumbnail?id=1k_jazpHzjCS1t-N6atsonwhyjpM-qJ8o&sz=w800',
                            'https://drive.google.com/thumbnail?id=1d9ddrBxefOVgNo9nz165Kz4uFaqqKijZ&sz=w800',
                            'https://drive.google.com/thumbnail?id=1BTqVcwW8J21vZXRzi_4YhYu8quLBJv2v&sz=w800',
                            'https://drive.google.com/thumbnail?id=1Mn1qsvflwxofFACiocQJZPnbPGawwGTH&sz=w800',
                            'https://drive.google.com/thumbnail?id=1m9h7HoFYikZhwltqOMmIfit-cvK4Nv0A&sz=w800',
                            'https://drive.google.com/thumbnail?id=1ANBl1XMuLRNYk134DjHn92eiDDj2yW3M&sz=w800',
                            'https://drive.google.com/thumbnail?id=1eucDqrY89i7rEeLPma4h7eOprrmuB8z3&sz=w800',
                            'https://drive.google.com/thumbnail?id=1mUC3mVxUsjTnXmt_DbWKgBUNyYcm8fNB&sz=w800',
                            'https://drive.google.com/thumbnail?id=1o5cFFRuy7I3Nxx0dHNSqmtpxU8pRZvhV&sz=w800'
                        ]
                    },
                    {
                        name: '範例 2',
                        provider: 'Meiko',
                        slides: [
                            'https://drive.google.com/thumbnail?id=1402dHGFbvTVtt3jG_-vcd_60FCgUYqXd&sz=w800',
                            'https://drive.google.com/thumbnail?id=1vExePZWJ5iKEab1M-wB7dsYyZfx84rSC&sz=w800',
                            'https://drive.google.com/thumbnail?id=1dLtqW6_xk-PkL6BCo04UrKoKAbMoviX7&sz=w800',
                            'https://drive.google.com/thumbnail?id=1VjQAIgPLqrAvjRM4QWxlOdqB2Pmkwb9L&sz=w800',
                            'https://drive.google.com/thumbnail?id=1zTMvb_BYzIxK82wGKyscnjKWyiIZBntm&sz=w800',
                            'https://drive.google.com/thumbnail?id=1QwnxJ9eQdbCvxiX5Bnbq8al1ze-3Y4lV&sz=w800',
                            'https://drive.google.com/thumbnail?id=1rJLcZ9EW1mWIToxzYsRmmXVoi9I8ptdF&sz=w800',
                            'https://drive.google.com/thumbnail?id=1h8b7IYKhLocoZ4o3NE7KLYxbADzyClaA&sz=w800',
                            'https://drive.google.com/thumbnail?id=1swMXzx9upeZCeIggUHBFfWjw4-xeWmKS&sz=w800',
                            'https://drive.google.com/thumbnail?id=1t38bShE7AtU6bw0evg-xfpgjUlAJMOe8&sz=w800'
                        ]
                    }
                ]
            }
        ];

        const PdfTools = ({ language = 'zh' }) => {
            const P = (zh, en, ja = zh, ko = zh) => language === 'en' ? en : language === 'ja' ? ja : language === 'ko' ? ko : zh;
            const pdfInputRef = React.useRef(null);
            const eraseRenderRequestRef = React.useRef(0);
            const [pdfDoc, setPdfDoc] = useState(null);
            const [fileName, setFileName] = useState('');
            const [pages, setPages] = useState([]);
            const [selected, setSelected] = useState([]);
            const [cropBottom, setCropBottom] = useState(false);
            const [cropBottomCm, setCropBottomCm] = useState(0.7);
            const [eraseLogo, setEraseLogo] = useState(false);
            const [eraseRegions, setEraseRegions] = useState({});
            const [drawingRegion, setDrawingRegion] = useState(null);
            const [eraseEditorPage, setEraseEditorPage] = useState(null);
            const [eraseEditorUrl, setEraseEditorUrl] = useState('');
            const [eraseEditorLoading, setEraseEditorLoading] = useState(false);
            const [eraseAllApplied, setEraseAllApplied] = useState(false);
            const [exportType, setExportType] = useState('images');
            const [imageFormat, setImageFormat] = useState('png');
            const [sizeMode, setSizeMode] = useState('normal');
            const [imagePackaging, setImagePackaging] = useState('direct');
            const [overlayLogoImage, setOverlayLogoImage] = useState(null);
            const [overlayLogoUrl, setOverlayLogoUrl] = useState('');
            const [overlayLogoPos, setOverlayLogoPos] = useState('tr');
            const [overlayLogoSizeMm, setOverlayLogoSizeMm] = useState(15);
            const [overlayLogoMarginX, setOverlayLogoMarginX] = useState(8);
            const [overlayLogoMarginY, setOverlayLogoMarginY] = useState(8);
            const [overlayLogoText, setOverlayLogoText] = useState('');
            const [overlayLogoTextSize, setOverlayLogoTextSize] = useState(14);
            const [overlayLogoTextColor, setOverlayLogoTextColor] = useState('#334155');
            const [addPageNumbers, setAddPageNumbers] = useState(false);
            const [postPageNumPos, setPostPageNumPos] = useState('br');
            const [postPageNumFormat, setPostPageNumFormat] = useState('total');
            const [postPageNumSize, setPostPageNumSize] = useState(11);
            const [postPageNumColor, setPostPageNumColor] = useState('#334155');
            const [postPageNumStart, setPostPageNumStart] = useState(1);
            const [skipCoverNumber, setSkipCoverNumber] = useState(true);
            const [busy, setBusy] = useState(false);
            const [status, setStatus] = useState('');
            const [showPptxNotice, setShowPptxNotice] = useState(false);

            useEffect(() => {
                if (window.pdfjsLib) window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            }, []);

            useEffect(() => {
                if (!eraseEditorPage && !showPptxNotice) return;
                const previousOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                return () => { document.body.style.overflow = previousOverflow; };
            }, [eraseEditorPage, showPptxNotice]);

            const eraseNotebookLogo = (canvas, region) => {
                const ctx = canvas.getContext('2d');
                const w = canvas.width, h = canvas.height;
                const target = region || { x: .918, y: .965, w: .082, h: .035 };
                const x = Math.max(0, Math.min(w - 2, Math.floor(w * target.x)));
                const y = Math.max(0, Math.min(h - 2, Math.floor(h * target.y)));
                const rw = Math.max(2, Math.min(w - x, Math.floor(w * target.w)));
                const rh = Math.max(2, Math.min(h - y, Math.floor(h * target.h)));
                if (rw < 2 || rh < 2) return;
                const gap = Math.max(2, Math.ceil(Math.min(w, h) * .008));
                const makePatch = (sx, sy) => {
                    const candidate = document.createElement('canvas');
                    candidate.width = rw; candidate.height = rh;
                    candidate.getContext('2d').drawImage(canvas, sx, sy, rw, rh, 0, 0, rw, rh);
                    return candidate;
                };
                // 同時建立上方與左方候選背景；彩色色帶通常應沿水平方向延伸，白底則兩者都可自然銜接。
                const abovePatch = makePatch(Math.min(w - rw, x), Math.max(0, y - rh - gap));
                const leftPatch = makePatch(Math.max(0, x - rw - gap), Math.min(h - rh, y));
                const seamScore = candidate => {
                    const cctx = candidate.getContext('2d');
                    const top = cctx.getImageData(0, 0, rw, 1).data;
                    const left = cctx.getImageData(0, 0, 1, rh).data;
                    const pageTop = ctx.getImageData(x, Math.max(0, y - 1), rw, 1).data;
                    const pageLeft = ctx.getImageData(Math.max(0, x - 1), y, 1, rh).data;
                    let score = 0;
                    for (let i = 0; i < top.length; i += 8) score += Math.abs(top[i] - pageTop[i]) + Math.abs(top[i+1] - pageTop[i+1]) + Math.abs(top[i+2] - pageTop[i+2]);
                    for (let i = 0; i < left.length; i += 8) score += Math.abs(left[i] - pageLeft[i]) + Math.abs(left[i+1] - pageLeft[i+1]) + Math.abs(left[i+2] - pageLeft[i+2]);
                    return score;
                };
                const patch = seamScore(leftPatch) <= seamScore(abovePatch) ? leftPatch : abovePatch;
                // 羽化左右與上緣，避免補繪區形成可見方框。
                ctx.save();
                ctx.beginPath();
                const feather = Math.max(2, Math.floor(Math.min(rw, rh) * .35));
                ctx.rect(x + feather, y, Math.max(0, rw - feather), rh);
                ctx.rect(x, y + feather, feather, Math.max(0, rh - feather));
                ctx.clip();
                ctx.drawImage(patch, x, y);
                ctx.restore();
                for (let i = 0; i < feather; i++) {
                    const alpha = (i + 1) / feather;
                    ctx.globalAlpha = alpha;
                    ctx.drawImage(patch, i, 0, 1, rh, x + i, y, 1, rh);
                    ctx.drawImage(patch, 0, i, rw, 1, x, y + i, rw, 1);
                }
                ctx.globalAlpha = 1;
                patch.width = patch.height = 1;
                if (abovePatch !== patch) abovePatch.width = abovePatch.height = 1;
                if (leftPatch !== patch) leftPatch.width = leftPatch.height = 1;
            };

            const renderPage = async (doc, number, scale = 0.32, crop = false, erase = false, eraseRegion = null) => {
                const page = await doc.getPage(number);
                const viewport = page.getViewport({ scale });
                const cropPx = crop ? Math.min(viewport.height - 1, (Math.max(0, Number(cropBottomCm) || 0) / 2.54) * 72 * scale) : 0;
                const canvas = document.createElement('canvas');
                canvas.width = Math.ceil(viewport.width);
                canvas.height = Math.max(1, Math.ceil(viewport.height - cropPx));
                const ctx = canvas.getContext('2d');
                await page.render({ canvasContext: ctx, viewport }).promise;
                if (erase && !crop) eraseNotebookLogo(canvas, eraseRegion);
                return { canvas, width: viewport.width, height: viewport.height - cropPx, landscape: viewport.width >= viewport.height };
            };

            const canvasToBlob = (canvas, mime, quality) => new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error(P('無法建立影像檔','Unable to create the image file'))), mime, quality));
            const loadScriptOnce = (src) => new Promise((resolve, reject) => {
                const found = document.querySelector(`script[src="${src}"]`);
                if (found && window.jspdf && window.jspdf.jsPDF) { resolve(); return; }
                const script = found || document.createElement('script');
                const timer = setTimeout(() => reject(new Error(P('jsPDF 載入逾時，請確認網路連線','jsPDF timed out. Please check your internet connection.'))), 15000);
                script.onload = () => { clearTimeout(timer); resolve(); };
                script.onerror = () => { clearTimeout(timer); reject(new Error(P('無法載入 PDF 匯出元件','Unable to load the PDF export component'))); };
                if (!found) { script.src = src; document.head.appendChild(script); }
            });

            const canvasToSizedBlob = async (source, mime, maxBytes) => {
                const quality = mime === 'image/jpeg' ? .9 : undefined;
                if (!maxBytes) return canvasToBlob(source, mime, quality);
                let work = source;
                let ownsWork = false;
                let blob = await canvasToBlob(work, mime, quality);
                for (let attempt = 0; blob.size > maxBytes && attempt < 9; attempt++) {
                    const ratio = Math.max(.5, Math.min(.9, Math.sqrt(maxBytes / blob.size) * .94));
                    const resized = document.createElement('canvas');
                    resized.width = Math.max(320, Math.floor(work.width * ratio));
                    resized.height = Math.max(180, Math.floor(work.height * ratio));
                    const rctx = resized.getContext('2d');
                    rctx.imageSmoothingEnabled = true;
                    rctx.imageSmoothingQuality = 'high';
                    rctx.drawImage(work, 0, 0, resized.width, resized.height);
                    if (ownsWork) work.width = work.height = 1;
                    work = resized; ownsWork = true;
                    blob = await canvasToBlob(work, mime, quality);
                }
                if (ownsWork) work.width = work.height = 1;
                return blob;
            };

            const loadPdf = async (event) => {
                const files = Array.from(event.target.files || []);
                if (!files.length) return;
                if (files.some(file => /\.pptx?$/i.test(file.name))) {
                    setShowPptxNotice(true);
                    event.target.value = '';
                    return;
                }
                const pdfFiles = files.filter(file => /\.pdf$/i.test(file.name) || file.type === 'application/pdf');
                setBusy(true); setStatus(P('正在讀取並建立縮圖…','Reading PDF and creating thumbnails…'));
                try {
                    const rendered = [];
                    let globalNumber = 1;
                    let firstDoc = null;
                    for (const file of pdfFiles) {
                        const bytes = new Uint8Array(await file.arrayBuffer());
                        const doc = await window.pdfjsLib.getDocument({ data: bytes }).promise;
                        if (!firstDoc) firstDoc = doc;
                        for (let n = 1; n <= doc.numPages; n++) {
                            const r = await renderPage(doc, n);
                            rendered.push({
                                number: globalNumber++,
                                sourcePage: n,
                                sourceName: file.name.replace(/\.pdf$/i, ''),
                                doc,
                                url: r.canvas.toDataURL('image/jpeg', .72),
                                landscape: r.landscape,
                                widthPt: r.width / .32,
                                heightPt: r.height / .32
                            });
                        }
                    }
                    if (!rendered.length) throw new Error(P('沒有可讀取的 PDF','No readable PDF was found'));
                    setPdfDoc(firstDoc);
                    setFileName(pdfFiles.length > 1 ? P('合併簡報','Merged presentation') : pdfFiles[0].name.replace(/\.pdf$/i, ''));
                    setPages(rendered);
                    setSelected(rendered.map(p => p.number));
                    setEraseRegions({});
                    setStatus(P(`已載入 ${pdfFiles.length} 個 PDF，共 ${rendered.length} 頁`,`${pdfFiles.length} PDF file(s) loaded, ${rendered.length} pages total`));
                } catch (error) { setStatus(P('PDF 讀取失敗，請確認檔案未加密或損壞。','Could not read the PDF. Make sure it is not encrypted or damaged.')); }
                finally { setBusy(false); event.target.value = ''; }
            };

            const togglePage = n => setSelected(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n].sort((a,b) => a-b));
            const selectAll = () => setSelected(selected.length === pages.length ? [] : pages.map(p => p.number));
            const getPageByNumber = number => pages.find(page => page.number === number);
            const downloadBlob = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1500); };

            const clearAllSlides = (openPicker = false) => {
                const loadedDocs = [...new Set(pages.map(page => page.doc).filter(Boolean))];
                setPdfDoc(null);
                setFileName('');
                setPages([]);
                setSelected([]);
                setEraseRegions({});
                setDrawingRegion(null);
                setEraseEditorPage(null);
                setEraseEditorUrl('');
                setEraseAllApplied(false);
                setStatus('');
                loadedDocs.forEach(doc => {
                    try {
                        const result = doc.destroy && doc.destroy();
                        if (result && result.catch) result.catch(() => {});
                    } catch (error) {}
                });
                if (openPicker) setTimeout(() => pdfInputRef.current && pdfInputRef.current.click(), 0);
            };

            const pointerPosition = event => {
                const rect = event.currentTarget.getBoundingClientRect();
                return {
                    x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
                    y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
                };
            };

            const beginEraseRegion = (event, pageNumber) => {
                if (!eraseLogo) return;
                event.preventDefault();
                event.stopPropagation();
                setEraseAllApplied(false);
                event.currentTarget.setPointerCapture(event.pointerId);
                const point = pointerPosition(event);
                setDrawingRegion({ pageNumber, startX: point.x, startY: point.y, x: point.x, y: point.y, w: 0, h: 0 });
            };

            const updateEraseRegion = event => {
                if (!drawingRegion) return;
                event.preventDefault();
                event.stopPropagation();
                const point = pointerPosition(event);
                setDrawingRegion(current => current ? {
                    ...current,
                    x: Math.min(current.startX, point.x),
                    y: Math.min(current.startY, point.y),
                    w: Math.abs(point.x - current.startX),
                    h: Math.abs(point.y - current.startY)
                } : null);
            };

            const finishEraseRegion = event => {
                if (!drawingRegion) return;
                event.preventDefault();
                event.stopPropagation();
                if (drawingRegion.w > .005 && drawingRegion.h > .005) {
                    setEraseRegions(current => ({
                        ...current,
                        [drawingRegion.pageNumber]: {
                            x: drawingRegion.x,
                            y: drawingRegion.y,
                            w: drawingRegion.w,
                            h: drawingRegion.h
                        }
                    }));
                }
                setDrawingRegion(null);
            };

            const openEraseEditor = async page => {
                if (!page) return;
                const requestId = ++eraseRenderRequestRef.current;
                setDrawingRegion(null);
                setEraseAllApplied(false);
                setEraseEditorPage(page);
                setEraseEditorUrl(page.url);
                setEraseEditorLoading(true);
                try {
                    const rendered = await renderPage(page.doc, page.sourcePage, 1.5, false, false);
                    if (requestId === eraseRenderRequestRef.current) setEraseEditorUrl(rendered.canvas.toDataURL('image/png'));
                    rendered.canvas.width = rendered.canvas.height = 1;
                } catch (error) {
                    if (requestId === eraseRenderRequestRef.current) setEraseEditorUrl(page.url);
                } finally {
                    if (requestId === eraseRenderRequestRef.current) setEraseEditorLoading(false);
                }
            };

            const moveEraseEditor = direction => {
                if (!eraseEditorPage || !pages.length) return;
                const currentIndex = pages.findIndex(page => page.number === eraseEditorPage.number);
                const nextIndex = Math.max(0, Math.min(pages.length - 1, currentIndex + direction));
                openEraseEditor(pages[nextIndex]);
            };

            const applyEraseRegionToAll = () => {
                if (!activeEraseRegion) return;
                const sharedRegion = {
                    x: activeEraseRegion.x,
                    y: activeEraseRegion.y,
                    w: activeEraseRegion.w,
                    h: activeEraseRegion.h
                };
                setEraseRegions(Object.fromEntries(pages.map(page => [page.number, { ...sharedRegion }])));
                setEraseAllApplied(true);
                setStatus(P(`已將框選範圍套用到全部 ${pages.length} 頁。`,`The selected area was applied to all ${pages.length} pages.`));
            };

            const loadOverlayLogo = event => {
                const file = event.target.files && event.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                    const img = new Image();
                    img.onload = () => { setOverlayLogoImage(img); setOverlayLogoUrl(reader.result); setStatus(P('Logo 已載入，匯出時會套用至所有選取頁。','Logo loaded and will be applied to all selected pages.')); };
                    img.onerror = () => setStatus(P('Logo 圖片讀取失敗。','Could not read the logo image.'));
                    img.src = reader.result;
                };
                reader.readAsDataURL(file);
                event.target.value = '';
            };

            const applyPostProcessing = (canvas, sourcePageNumber, numberedIndex, numberedTotal, scale) => {
                const ctx = canvas.getContext('2d');
                const mmPx = mm => (Number(mm) || 0) / 25.4 * 72 * scale;
                let imageLogoHeight = 0;
                if (overlayLogoImage) {
                    const logoW = Math.max(1, mmPx(overlayLogoSizeMm));
                    const logoH = logoW * overlayLogoImage.naturalHeight / overlayLogoImage.naturalWidth;
                    imageLogoHeight = logoH;
                    const mx = mmPx(overlayLogoMarginX), my = mmPx(overlayLogoMarginY);
                    const x = overlayLogoPos.endsWith('r') ? canvas.width - mx - logoW : mx;
                    const y = overlayLogoPos.startsWith('b') ? canvas.height - my - logoH : my;
                    ctx.drawImage(overlayLogoImage, x, y, logoW, logoH);
                }
                if (overlayLogoText.trim()) {
                    const mx = mmPx(overlayLogoMarginX), my = mmPx(overlayLogoMarginY);
                    const gap = mmPx(2);
                    const isRight = overlayLogoPos.endsWith('r');
                    const isBottom = overlayLogoPos.startsWith('b');
                    ctx.save();
                    ctx.fillStyle = overlayLogoTextColor;
                    ctx.font = `600 ${Math.max(6, Number(overlayLogoTextSize || 14)) * scale}px "Noto Sans TC", Arial, sans-serif`;
                    ctx.textAlign = isRight ? 'right' : 'left';
                    ctx.textBaseline = isBottom ? 'bottom' : 'top';
                    const x = isRight ? canvas.width - mx : mx;
                    const y = isBottom ? canvas.height - my - (imageLogoHeight ? imageLogoHeight + gap : 0) : my + (imageLogoHeight ? imageLogoHeight + gap : 0);
                    ctx.fillText(overlayLogoText.trim(), x, y);
                    ctx.restore();
                }
                if (addPageNumbers && !(skipCoverNumber && sourcePageNumber === 1) && numberedIndex >= 0) {
                    const number = Number(postPageNumStart || 1) + numberedIndex;
                    const label = postPageNumFormat === 'total'
                        ? `${number} / ${Number(postPageNumStart || 1) + numberedTotal - 1}`
                        : postPageNumFormat === 'word'
                            ? (language === 'en' ? `Page ${number}` : `第 ${number} 頁`)
                            : postPageNumFormat === 'fullword'
                                ? (language === 'en' ? `Page ${number} / ${numberedTotal}` : `第 ${number} 頁 / 共 ${numberedTotal} 頁`)
                                : String(number);
                    const margin = mmPx(postPageNumPos === 'watermark' ? 2 : 8);
                    ctx.save();
                    ctx.fillStyle = postPageNumColor;
                    ctx.font = `${Math.max(6, Number(postPageNumSize) || 11) * scale}px "Noto Sans TC", Arial, sans-serif`;
                    ctx.textBaseline = 'bottom';
                    ctx.textAlign = postPageNumPos === 'bc' ? 'center' : postPageNumPos === 'bl' ? 'left' : 'right';
                    const x = postPageNumPos === 'bc' ? canvas.width / 2 : postPageNumPos === 'bl' ? margin : canvas.width - margin;
                    ctx.fillText(label, x, canvas.height - margin);
                    ctx.restore();
                }
            };

            const getLogoPreviewStyle = page => {
                if (!overlayLogoImage || !page.widthPt || !page.heightPt) return {};
                const pageWidthMm = page.widthPt / 72 * 25.4;
                const pageHeightMm = page.heightPt / 72 * 25.4;
                const style = {
                    width: `${Math.min(45, Math.max(1, Number(overlayLogoSizeMm || 15) / pageWidthMm * 100))}%`,
                    height: 'auto',
                    pointerEvents: 'none'
                };
                const xPct = Math.max(0, Number(overlayLogoMarginX || 0) / pageWidthMm * 100);
                const yPct = Math.max(0, Number(overlayLogoMarginY || 0) / pageHeightMm * 100);
                if (overlayLogoPos.endsWith('r')) style.right = `${xPct}%`; else style.left = `${xPct}%`;
                if (overlayLogoPos.startsWith('b')) style.bottom = `${yPct}%`; else style.top = `${yPct}%`;
                return style;
            };

            const getTextLogoPreviewStyle = page => {
                if (!page.widthPt || !page.heightPt) return {};
                const pageWidthMm = page.widthPt / 72 * 25.4;
                const pageHeightMm = page.heightPt / 72 * 25.4;
                const xPct = Math.max(0, Number(overlayLogoMarginX || 0) / pageWidthMm * 100);
                const yPct = Math.max(0, Number(overlayLogoMarginY || 0) / pageHeightMm * 100);
                const style = {
                    color: overlayLogoTextColor,
                    fontSize: `${Math.max(7, Math.min(18, Number(overlayLogoTextSize || 14) * .55))}px`,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    textShadow: '0 1px 2px rgba(255,255,255,.7)'
                };
                if (overlayLogoPos.endsWith('r')) style.right = `${xPct}%`; else style.left = `${xPct}%`;
                if (overlayLogoPos.startsWith('b')) style.bottom = `${yPct}%`; else style.top = `${yPct}%`;
                if (overlayLogoUrl) {
                    const logoHeightPct = Math.min(45, Math.max(1, Number(overlayLogoSizeMm || 15) / pageHeightMm * 100));
                    if (overlayLogoPos.startsWith('b')) style.bottom = `calc(${yPct + logoHeightPct}% + 3px)`;
                    else style.top = `calc(${yPct + logoHeightPct}% + 3px)`;
                }
                return style;
            };

            const exportFiles = async () => {
                if (!pdfDoc || !selected.length) { setStatus(P('請至少選擇一張投影片。','Select at least one page.')); return; }
                setBusy(true); setStatus(P('正在產生匯出檔案…','Creating export files…'));
                try {
                    const numberedPages = selected.filter(n => !(skipCoverNumber && n === 1));
                    if (exportType === 'images') {
                        const zip = imagePackaging === 'zip' ? new JSZip() : null;
                        const maxBytes = sizeMode === 'medium' ? 1.5 * 1024 * 1024 : sizeMode === 'low' ? 800 * 1024 : null;
                        for (const n of selected) {
                            const pageItem = getPageByNumber(n);
                            if (!pageItem) continue;
                            const r = await renderPage(pageItem.doc, pageItem.sourcePage, 2, cropBottom, eraseLogo && !!eraseRegions[n], eraseRegions[n]);
                            applyPostProcessing(r.canvas, n, numberedPages.indexOf(n), numberedPages.length, 2);
                            const mime = imageFormat === 'png' ? 'image/png' : 'image/jpeg';
                            const blob = await canvasToSizedBlob(r.canvas, mime, maxBytes);
                            const imageName = `${fileName || 'slide'}-${String(n).padStart(3, '0')}.${imageFormat}`;
                            if (zip) zip.file(imageName, blob);
                            else downloadBlob(blob, imageName);
                            r.canvas.width = r.canvas.height = 1;
                        }
                        if (zip) {
                            const blob = await zip.generateAsync({ type: 'blob' });
                            downloadBlob(blob, `${fileName || 'slides'}-${imageFormat}.zip`);
                        }
                    } else {
                        if (!window.jspdf || !window.jspdf.jsPDF) {
                            await loadScriptOnce('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
                        }
                        const jsPDF = window.jspdf && window.jspdf.jsPDF;
                        if (!jsPDF) throw new Error('jsPDF 元件尚未載入，請重新整理頁面後再試');
                        let out = null;
                        for (const n of selected) {
                            const pageItem = getPageByNumber(n);
                            if (!pageItem) continue;
                            // 1.35 倍足以維持投影片清晰度，且大幅降低多頁匯出記憶體峰值。
                            const pdfScale = 1.35;
                            const r = await renderPage(pageItem.doc, pageItem.sourcePage, pdfScale, cropBottom, eraseLogo && !!eraseRegions[n], eraseRegions[n]);
                            applyPostProcessing(r.canvas, n, numberedPages.indexOf(n), numberedPages.length, pdfScale);
                            const pageW = r.width / pdfScale, pageH = r.height / pdfScale;
                            const orientation = r.width >= r.height ? 'landscape' : 'portrait';
                            if (!out) out = new jsPDF({ orientation, unit: 'pt', format: [pageW, pageH], compress: true, putOnlyUsedFonts: true });
                            else out.addPage([pageW, pageH], orientation);
                            const jpegBlob = await canvasToBlob(r.canvas, 'image/jpeg', .9);
                            const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
                            out.addImage(jpegBytes, 'JPEG', 0, 0, pageW, pageH, undefined, 'FAST');
                            r.canvas.width = r.canvas.height = 1;
                        }
                        out.save(`${fileName || 'selected-pages'}.pdf`);
                    }
                    setStatus(language === 'en'
                        ? `Done: exported ${selected.length} page(s)${cropBottom ? ` and cropped ${Number(cropBottomCm) || 0} cm from the bottom` : eraseLogo ? ` with custom erase areas applied to ${selected.filter(n => eraseRegions[n]).length} page(s)` : ''}${overlayLogoImage || overlayLogoText.trim() ? ', with a custom logo' : ''}${addPageNumbers ? ', with page numbers' : ''}.`
                        : `完成：已匯出 ${selected.length} 頁${cropBottom ? `，並裁除下方約 ${Number(cropBottomCm) || 0} 公分` : eraseLogo ? `，已抹除 ${selected.filter(n => eraseRegions[n]).length} 頁的自訂框選範圍` : ''}${overlayLogoImage || overlayLogoText.trim() ? '，已加入自訂 Logo' : ''}${addPageNumbers ? '，已加入頁碼' : ''}。`);
                } catch (error) { console.error(error); setStatus(language === 'en' ? `Export failed: ${error && error.message ? error.message : 'try exporting fewer pages'}.` : `匯出失敗：${error && error.message ? error.message : '請嘗試減少頁數'}。`); }
                finally { setBusy(false); }
            };

            const activeEraseRegion = eraseEditorPage
                ? (drawingRegion && drawingRegion.pageNumber === eraseEditorPage.number ? drawingRegion : eraseRegions[eraseEditorPage.number])
                : null;

            return <div className="animate-in pb-10 space-y-6">
                {showPptxNotice && ReactDOM.createPortal(<div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-labelledby="pptx-notice-title">
                    <div className="w-full max-w-md rounded-2xl border border-pink-300/40 bg-slate-900 p-6 shadow-2xl">
                        <div className="w-12 h-12 rounded-xl bg-pink-300/15 text-pink-300 flex items-center justify-center mb-4"><Icon name="FileText" size={25} /></div>
                        <h3 id="pptx-notice-title" className="text-lg font-black text-white mb-2">{P('請先將 PPTX 另存為 PDF','Please save the PPTX as a PDF first')}</h3>
                        <p className="text-sm leading-relaxed text-slate-300">{P('為了完整保留字型、圖表與版面，這個工具不會上傳或直接轉換 PPTX。請在 PowerPoint 選擇「檔案 → 另存新檔／匯出 → PDF」，再回來選擇轉好的 PDF。','To preserve fonts, charts, and layout, this tool does not upload or convert PPTX files. In PowerPoint, choose File → Save As / Export → PDF, then select the exported PDF here.')}</p>
                        <div className="mt-6 flex gap-3">
                            <button onClick={()=>setShowPptxNotice(false)} className="flex-1 py-3 rounded-xl border border-slate-600 text-slate-300 font-bold hover:bg-slate-800">{P('稍後處理','Later')}</button>
                            <button onClick={()=>{setShowPptxNotice(false);setTimeout(()=>pdfInputRef.current && pdfInputRef.current.click(),0);}} className="flex-1 py-3 rounded-xl bg-pink-300 text-slate-900 font-black hover:bg-pink-200">{P('重新選擇 PDF','Choose PDF again')}</button>
                        </div>
                    </div>
                </div>, document.body)}
                {eraseEditorPage && ReactDOM.createPortal(<div className="fixed inset-0 z-[110] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true" aria-labelledby="erase-editor-title">
                    <div className="w-full max-w-6xl max-h-full rounded-2xl border border-pink-300/40 bg-slate-900 shadow-2xl flex flex-col overflow-hidden">
                        <div className="px-5 py-4 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h3 id="erase-editor-title" className="font-black text-white">{P('框選要抹除的範圍','Select the area to erase')}</h3>
                                <p className="text-xs text-slate-400 mt-1">{P(`第 ${eraseEditorPage.number} 頁`, `Page ${eraseEditorPage.number}`)} · {P('在大圖上按住並拖曳，再次框選可重新設定','Drag over the large preview; drag again to replace the selection')}{eraseEditorLoading ? P(' · 正在載入高解析度預覽…',' · Loading high-resolution preview…') : P(' · 高解析度預覽',' · High-resolution preview')}</p>
                            </div>
                            <button onClick={()=>{setEraseEditorPage(null);setDrawingRegion(null);}} className="px-4 py-2 rounded-lg border border-slate-600 text-sm font-bold text-slate-300 hover:bg-slate-800">{P('關閉','Close')}</button>
                        </div>
                        <div className="flex-1 min-h-0 overflow-auto p-4 md:p-6 bg-slate-950 flex items-center justify-center">
                            <div
                                className="relative cursor-crosshair touch-none select-none shadow-2xl"
                                style={{
                                    aspectRatio: `${eraseEditorPage.widthPt} / ${eraseEditorPage.heightPt}`,
                                    width: `min(100%, calc(72vh * ${eraseEditorPage.widthPt / eraseEditorPage.heightPt}))`
                                }}
                                onPointerDown={event => beginEraseRegion(event, eraseEditorPage.number)}
                                onPointerMove={updateEraseRegion}
                                onPointerUp={finishEraseRegion}
                                onPointerCancel={() => setDrawingRegion(null)}
                            >
                                <img src={eraseEditorUrl || eraseEditorPage.url} draggable="false" className={`block w-full h-full object-contain bg-white pointer-events-none ${eraseEditorLoading ? 'opacity-70' : ''}`} />
                                {activeEraseRegion && <span className="absolute border-2 border-pink-400 bg-pink-300/25 pointer-events-none shadow-[0_0_0_9999px_rgba(2,6,23,.28)]" style={{ left: `${activeEraseRegion.x * 100}%`, top: `${activeEraseRegion.y * 100}%`, width: `${activeEraseRegion.w * 100}%`, height: `${activeEraseRegion.h * 100}%` }} />}
                            </div>
                        </div>
                        <div className="px-5 py-4 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex gap-2">
                                <button disabled={eraseEditorPage.number === pages[0]?.number} onClick={()=>moveEraseEditor(-1)} className="px-4 py-2 rounded-lg border border-slate-600 text-xs font-bold disabled:opacity-30">{P('上一頁','Previous')}</button>
                                <button disabled={eraseEditorPage.number === pages[pages.length-1]?.number} onClick={()=>moveEraseEditor(1)} className="px-4 py-2 rounded-lg border border-slate-600 text-xs font-bold disabled:opacity-30">{P('下一頁','Next')}</button>
                            </div>
                            {eraseAllApplied && <div className="order-last sm:order-none w-full sm:w-auto rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-200 flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-emerald-300 text-slate-900 flex items-center justify-center">✓</span>{P(`已套用到全部 ${pages.length} 頁`,`Applied to all ${pages.length} pages`)}</div>}
                            <div className="flex gap-2">
                                <button onClick={()=>{setEraseRegions(current=>{const next={...current};delete next[eraseEditorPage.number];return next;});setEraseAllApplied(false);}} className="px-4 py-2 rounded-lg border border-red-400/30 text-xs font-bold text-red-300">{P('清除此頁範圍','Clear this page')}</button>
                                <button disabled={!activeEraseRegion} onClick={applyEraseRegionToAll} className={`px-4 py-2 rounded-lg border text-xs font-bold disabled:opacity-30 ${eraseAllApplied ? 'bg-emerald-300 border-emerald-300 text-slate-900' : 'border-pink-300/40 text-pink-200'}`}>{eraseAllApplied ? P(`✓ 已套用全部 ${pages.length} 頁`,`✓ Applied to all ${pages.length} pages`) : P('套用此範圍到所有頁','Apply area to all pages')}</button>
                                <button onClick={()=>{setEraseEditorPage(null);setDrawingRegion(null);}} className="px-5 py-2 rounded-lg bg-pink-300 text-slate-900 text-xs font-black">{P('完成框選','Done')}</button>
                            </div>
                        </div>
                    </div>
                </div>, document.body)}
                <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-lg font-black text-white mb-2">{P('PDF後製（去除NotebookLM Logo）','PDF Post-processing (Remove NotebookLM Logo)')}</h2>
                    <p className="text-sm text-slate-400 mb-5">{P('PDF 僅在目前瀏覽器中處理。可一次上傳多個 PDF 合併、分頁、自訂裁切或框選抹除，再加入自訂 Logo、頁碼並匯出圖片或 PDF。','PDF files are processed only in this browser. Upload and merge multiple PDFs, select pages, crop or erase an area, then add a custom logo or page numbers and export as images or PDF.')}</p>
                    <label className="min-h-[130px] border-2 border-dashed border-slate-600 hover:border-pink-300 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer bg-slate-900/40 transition-colors">
                        <Icon name="FileText" size={30} className="text-pink-300"/><span className="font-bold">{busy ? P('處理中…','Processing…') : P('點此選擇 PDF 檔案（可複選合併）','Choose PDF files (select multiple to merge)')}</span>
                        <input ref={pdfInputRef} type="file" accept="application/pdf,.pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,.pptx,.ppt" multiple onChange={loadPdf} disabled={busy} className="hidden" />
                    </label>
                </div>
                {pages.length > 0 && <>
                    <div className="bg-slate-800/40 border border-slate-700/60 p-5 rounded-2xl flex flex-wrap gap-3 items-center justify-between">
                        <div><div className="font-bold text-white">{fileName}.pdf</div><div className="text-xs text-slate-400 mt-1">{P(`已選 ${selected.length} / ${pages.length} 頁`,`${selected.length} / ${pages.length} pages selected`)}</div></div>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={()=>clearAllSlides(true)} className="px-4 py-2 rounded-lg border border-red-400/40 bg-red-400/10 text-red-200 hover:bg-red-400/20 text-sm font-bold flex items-center gap-2"><Icon name="RotateCcw" size={15} />{P('清除並重新上傳','Clear & upload again')}</button>
                            <button onClick={selectAll} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-bold">{selected.length === pages.length ? P('取消全選','Deselect all') : P('全選','Select all')}</button>
                            <div className="flex items-center rounded-lg border border-slate-600 bg-slate-900 overflow-hidden">
                                <button onClick={() => { setCropBottom(!cropBottom); if (!cropBottom) setEraseLogo(false); }} className={`px-4 py-2 text-sm font-bold ${cropBottom ? 'bg-pink-300 text-slate-900' : 'text-slate-300'}`}>{cropBottom ? P('✓ 已顯示裁切線','✓ Crop line shown') : P('啟用裁切線','Enable crop line')}</button>
                                <input type="number" min="0.1" max="10" step="0.1" value={cropBottomCm} onFocus={()=>{setCropBottom(true);setEraseLogo(false);}} onChange={e=>{setCropBottomCm(e.target.value);setCropBottom(true);setEraseLogo(false);}} className="w-16 bg-slate-950 border-l border-slate-600 px-2 py-2 text-sm text-center" />
                                <span className="px-2 text-xs text-slate-400">{P('公分','cm')}</span>
                            </div>
                            <button onClick={() => {
                                const enabling = !eraseLogo;
                                setEraseLogo(enabling);
                                if (enabling) {
                                    setCropBottom(false);
                                    openEraseEditor(pages.find(page => selected.includes(page.number)) || pages[0]);
                                } else {
                                    setEraseEditorPage(null);
                                }
                                setDrawingRegion(null);
                            }} className={`px-4 py-2 rounded-lg border text-sm font-bold ${eraseLogo ? 'bg-pink-300 text-slate-900 border-pink-300' : 'bg-slate-900 text-slate-300 border-slate-600'}`}>{eraseLogo ? P('✓ 框選抹除範圍','✓ Erase area selected') : P('自行框選抹除範圍','Select area to erase')}</button>
                        </div>
                        {eraseLogo && <div className="w-full mt-1 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 flex items-start gap-2">
                            <Icon name="Info" size={16} className="text-amber-300 mt-0.5 flex-shrink-0" />
                            <p className="text-xs leading-relaxed text-amber-100"><span className="font-black">{P('操作方式：','How to use: ')}</span>{P('點選縮圖會開啟高解析度大型預覽，再於大圖上拖曳框選。每頁可設定不同範圍，也可將同一範圍套用到所有頁；未框選的頁面不會執行抹除。白色或單純背景效果最佳，複雜背景仍可能留下些微痕跡。','Click a thumbnail to open a high-resolution preview, then drag over the area to erase. Set a different area per page or apply one area to every page. Pages without a selected area will not be erased. Simple or white backgrounds work best.')}</p>
                        </div>}
                        {cropBottom && <div className="w-full mt-1 rounded-xl border border-pink-300/30 bg-pink-300/10 px-4 py-3 flex items-start gap-2">
                            <Icon name="Scissors" size={16} className="text-pink-300 mt-0.5 flex-shrink-0" />
                            <p className="text-xs leading-relaxed text-pink-100"><span className="font-black">{P('裁切參考線：','Crop guide: ')}</span>{P('縮圖下方的紅色虛線是實際裁切邊界，虛線以下會被移除；調整公分數時，參考線會依投影片實際尺寸即時移動。','The red dashed line near the bottom of each thumbnail is the crop boundary. Everything below it will be removed, and the guide updates as you change the value.')}</p>
                        </div>}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {pages.map(p => {
                            const region = drawingRegion && drawingRegion.pageNumber === p.number ? drawingRegion : eraseRegions[p.number];
                            const pageHeightMm = p.heightPt / 72 * 25.4;
                            // 使用者輸入單位為公分；PDF 頁面高度為毫米，因此需先乘以 10 再換算百分比。
                            const cropPct = cropBottom ? Math.min(95, Math.max(0, ((Number(cropBottomCm) || 0) * 10) / pageHeightMm * 100)) : 0;
                            return <div key={p.number} role="button" tabIndex="0" onClick={() => eraseLogo ? openEraseEditor(p) : togglePage(p.number)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') eraseLogo ? openEraseEditor(p) : togglePage(p.number); }} className={`pdf-thumb text-left rounded-xl overflow-hidden border-2 bg-slate-900 transition-all ${selected.includes(p.number) ? 'border-pink-300 shadow-[0_0_14px_rgba(249,168,212,.25)]' : 'border-slate-700 opacity-60'}`}>
                            <div className={`${p.landscape ? 'aspect-video' : 'aspect-[3/4]'} bg-slate-950 flex items-center justify-center overflow-hidden relative`}>
                                <div
                                    className={`relative max-w-full max-h-full ${eraseLogo ? 'cursor-zoom-in' : ''}`}
                                    style={{ aspectRatio: `${p.widthPt} / ${p.heightPt}`, width: p.landscape ? '100%' : 'auto', height: p.landscape ? 'auto' : '100%' }}
                                >
                                    <img src={p.url} draggable="false" className="block w-full h-full object-contain select-none" />
                                    {cropBottom && cropPct > 0 && <>
                                        <div className="absolute inset-x-0 bottom-0 bg-rose-400/25 pointer-events-none z-10" style={{ height: `${Math.max(cropPct, .8)}%` }}></div>
                                        <div className="absolute inset-x-0 pointer-events-none z-[60]" style={{
                                            bottom: `${cropPct}%`,
                                            height: '1px',
                                            backgroundImage: 'repeating-linear-gradient(90deg, #ff1744 0 8px, transparent 8px 13px)',
                                            filter: 'drop-shadow(0 1px 0 rgba(0,0,0,.65))'
                                        }}></div>
                                    </>}
                                    {overlayLogoUrl && <img src={overlayLogoUrl} style={getLogoPreviewStyle(p)} className="absolute object-contain drop-shadow-sm" />}
                                    {overlayLogoText.trim() && <span style={getTextLogoPreviewStyle(p)} className="absolute">{overlayLogoText.trim()}</span>}
                                    {eraseLogo && region && <span className="absolute border-2 border-pink-400 bg-pink-300/20 pointer-events-none" style={{ left: `${region.x * 100}%`, top: `${region.y * 100}%`, width: `${region.w * 100}%`, height: `${region.h * 100}%` }} />}
                                </div>
                            </div>
                            <div className="px-3 py-2 text-xs font-bold flex items-center justify-between gap-2">
                                <span className="min-w-0">{P(`第 ${p.number} 頁`, `Page ${p.number}`)} · {p.landscape ? P('橫向','Landscape') : P('直向','Portrait')}{p.sourceName ? ` · ${p.sourceName}` : ''}</span>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    {cropBottom && <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/15 border border-red-400/40 text-red-200 font-bold whitespace-nowrap">{P('裁切','Crop')} {Number(cropBottomCm) || 0} cm</span>}
                                    {eraseLogo && <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${eraseRegions[p.number] ? 'bg-pink-300 text-slate-900' : 'bg-slate-700 text-slate-300'}`}>{eraseRegions[p.number] ? P('✓ 已框選','✓ Area set') : P('點圖框選','Click to select')}</span>}
                                    <button type="button" aria-label={language === 'en' ? `${selected.includes(p.number) ? 'Deselect' : 'Select'} page ${p.number}` : `${selected.includes(p.number) ? '取消選取' : '選取'}第 ${p.number} 頁`} onClick={event=>{event.preventDefault();event.stopPropagation();togglePage(p.number);}} className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${selected.includes(p.number) ? 'bg-pink-300 border-pink-300 text-slate-900' : 'bg-slate-950 border-slate-600 text-transparent'}`}>✓</button>
                                </div>
                            </div>
                        </div>;
                        })}
                    </div>
                    <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl space-y-6">
                        <h3 className="font-black text-pink-300">{P('加入自訂 Logo 與頁碼','Add Custom Logo & Page Numbers')}</h3>
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-3"><div><div className="font-bold text-sm">{P('自訂 Logo','Custom Logo')}</div><div className="text-xs text-slate-500 mt-1">{P('建議透明背景 PNG，套用至所有選取頁','A transparent PNG is recommended; applied to all selected pages')}</div></div>{overlayLogoUrl && <img src={overlayLogoUrl} className="w-14 h-14 object-contain bg-white rounded-lg p-1" />}</div>
                                <label className="block text-center py-3 rounded-lg border-2 border-dashed border-slate-600 hover:border-pink-300 cursor-pointer text-sm font-bold text-slate-300">{overlayLogoImage?P('更換 Logo 圖片','Replace logo image'):P('上傳 Logo 圖片','Upload logo image')}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={loadOverlayLogo} className="hidden" /></label>
                                <div>
                                    <label className="text-xs text-slate-400 block mb-1">{P('Logo 文字（可單獨使用，或與圖片一起使用）','Logo text (use alone or with an image)')}</label>
                                    <input type="text" value={overlayLogoText} onChange={e=>setOverlayLogoText(e.target.value)} placeholder={P('例如：公司名稱、品牌縮寫','e.g. company name or brand initials')} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm" />
                                </div>
                                {(overlayLogoImage || overlayLogoText.trim()) && <div className="grid grid-cols-2 gap-3">
                                    <div><label className="text-xs text-slate-400 block mb-1">{P('固定位置','Position')}</label><select value={overlayLogoPos} onChange={e=>setOverlayLogoPos(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm"><option value="tl">{P('左上角','Top left')}</option><option value="tr">{P('右上角','Top right')}</option><option value="bl">{P('左下角','Bottom left')}</option><option value="br">{P('右下角','Bottom right')}</option></select></div>
                                    {overlayLogoImage && <div><label className="text-xs text-slate-400 block mb-1">{P('圖片寬度（mm）','Image width (mm)')}</label><input type="number" min="3" max="80" step="1" value={overlayLogoSizeMm} onChange={e=>setOverlayLogoSizeMm(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm" /></div>}
                                    {overlayLogoText.trim() && <div><label className="text-xs text-slate-400 block mb-1">{P('文字大小（pt）','Text size (pt)')}</label><input type="number" min="6" max="72" value={overlayLogoTextSize} onChange={e=>setOverlayLogoTextSize(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm" /></div>}
                                    {overlayLogoText.trim() && <div><label className="text-xs text-slate-400 block mb-1">{P('文字顏色','Text color')}</label><input type="color" value={overlayLogoTextColor} onChange={e=>setOverlayLogoTextColor(e.target.value)} className="w-full h-10 bg-slate-900 border border-slate-600 rounded-lg p-1" /></div>}
                                    <div><label className="text-xs text-slate-400 block mb-1">{P('水平邊距（mm）','Horizontal margin (mm)')}</label><input type="number" min="0" max="50" step="1" value={overlayLogoMarginX} onChange={e=>setOverlayLogoMarginX(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm" /></div>
                                    <div><label className="text-xs text-slate-400 block mb-1">{P('垂直邊距（mm）','Vertical margin (mm)')}</label><input type="number" min="0" max="50" step="1" value={overlayLogoMarginY} onChange={e=>setOverlayLogoMarginY(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm" /></div>
                                    <button onClick={()=>{setOverlayLogoImage(null);setOverlayLogoUrl('');setOverlayLogoText('');}} className="col-span-2 py-2 text-xs font-bold text-red-300 border border-red-400/30 rounded-lg hover:bg-red-400/10">{P('清除圖片與文字 Logo','Clear image and text logo')}</button>
                                </div>}
                            </div>
                            <div className="space-y-4 lg:border-l lg:border-slate-700 lg:pl-6">
                                <div className="flex items-center justify-between"><div><div className="font-bold text-sm">{P('加入頁碼','Add page numbers')}</div><div className="text-xs text-slate-500 mt-1">{P('由工具實際寫入，不依賴 AI 生成','Written directly by this tool, not generated by AI')}</div></div><button onClick={()=>setAddPageNumbers(!addPageNumbers)} className={`px-4 py-2 rounded-lg border text-xs font-bold ${addPageNumbers?'bg-pink-300 text-slate-900 border-pink-300':'bg-slate-900 text-slate-400 border-slate-600'}`}>{addPageNumbers?P('✓ 已啟用','✓ Enabled'):P('未啟用','Disabled')}</button></div>
                                {addPageNumbers && <div className="grid grid-cols-2 gap-3">
                                    <div><label className="text-xs text-slate-400 block mb-1">{P('位置','Position')}</label><select value={postPageNumPos} onChange={e=>setPostPageNumPos(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm"><option value="bl">{P('左下角','Bottom left')}</option><option value="bc">{P('底部置中','Bottom center')}</option><option value="br">{P('右下角','Bottom right')}</option><option value="watermark">{P('原 Logo 位置（右下角貼邊）','Original logo position (bottom-right edge)')}</option></select></div>
                                    <div><label className="text-xs text-slate-400 block mb-1">{P('格式','Format')}</label><select value={postPageNumFormat} onChange={e=>setPostPageNumFormat(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm"><option value="simple">1, 2, 3</option><option value="total">{P('1 / 總頁數','1 / Total')}</option><option value="word">{P('第 1 頁','Page 1')}</option><option value="fullword">{P('第 1 頁 / 共 10 頁','Page 1 / 10')}</option></select></div>
                                    <div><label className="text-xs text-slate-400 block mb-1">{P('起始頁碼','Starting number')}</label><input type="number" min="1" value={postPageNumStart} onChange={e=>setPostPageNumStart(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm" /></div>
                                    <div><label className="text-xs text-slate-400 block mb-1">{P('字體大小（pt）','Font size (pt)')}</label><input type="number" min="6" max="36" value={postPageNumSize} onChange={e=>setPostPageNumSize(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm" /></div>
                                    <div><label className="text-xs text-slate-400 block mb-1">{P('文字顏色','Text color')}</label><input type="color" value={postPageNumColor} onChange={e=>setPostPageNumColor(e.target.value)} className="w-full h-10 bg-slate-900 border border-slate-600 rounded-lg p-1" /></div>
                                    <button onClick={()=>setSkipCoverNumber(!skipCoverNumber)} className={`self-end h-10 rounded-lg border text-xs font-bold ${skipCoverNumber?'bg-slate-700 border-slate-600 text-white':'bg-pink-300/15 border-pink-300 text-pink-300'}`}>{P('封面是否需要頁碼：','Cover page number: ')}{skipCoverNumber?P('不需要','No'):P('需要','Yes')}</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl space-y-5">
                        <h3 className="font-black text-pink-300">{P('匯出設定','Export Settings')}</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div><label className="text-xs font-bold text-slate-400 block mb-2">{P('匯出類型','Export type')}</label><select value={exportType} onChange={e=>setExportType(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3"><option value="images">{P('圖檔','Images')}</option><option value="pdf">PDF</option></select></div>
                            {exportType === 'images' && <>
                                <div><label className="text-xs font-bold text-slate-400 block mb-2">{P('下載方式','Download method')}</label><select value={imagePackaging} onChange={e=>setImagePackaging(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3"><option value="direct">{P('直接下載（不打包壓縮）','Direct download (no ZIP)')}</option><option value="zip">{P('ZIP 壓縮檔','ZIP archive')}</option></select></div>
                                <div><label className="text-xs font-bold text-slate-400 block mb-2">{P('圖檔格式','Image format')}</label><select value={imageFormat} onChange={e=>setImageFormat(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3"><option value="png">PNG</option><option value="jpg">JPG</option></select></div>
                                <div><label className="text-xs font-bold text-slate-400 block mb-2">{P('圖片大小','Image size')}</label><select value={sizeMode} onChange={e=>setSizeMode(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3"><option value="normal">{P('正常大小（不限制）','Original size (no limit)')}</option><option value="medium">{P('中品質（每張最多約 1.5MB）','Medium quality (up to ~1.5 MB each)')}</option><option value="low">{P('低品質（每張最多約 800KB）','Low quality (up to ~800 KB each)')}</option></select></div>
                            </>}
                        </div>
                        {exportType === 'images' && imagePackaging === 'direct' && selected.length > 1 && <p className="text-xs text-amber-200 bg-amber-400/10 border border-amber-400/25 rounded-lg px-3 py-2">{P('直接下載多張圖片時，瀏覽器可能會詢問是否允許下載多個檔案；若希望只下載一個檔案，請改選 ZIP 壓縮檔。','When downloading multiple images directly, your browser may ask for permission to download multiple files. Choose ZIP if you prefer a single download.')}</p>}
                        <button disabled={busy || !selected.length} onClick={exportFiles} className="w-full py-4 rounded-xl bg-pink-300 hover:bg-pink-400 disabled:opacity-40 text-slate-900 font-black">{busy ? P('正在處理…','Processing…') : P(`匯出選取的 ${selected.length} 頁`,`Export ${selected.length} selected pages`)}</button>
                        {status && <p className="text-sm text-slate-300 text-center">{status}</p>}
                    </div>
                </>}
            </div>;
        };

        const App = () => {
            const [activeTab, setActiveTab] = useState('generator');
            const [language, setLanguage] = useState('zh');
            const [totalViews, setTotalViews] = useState(null);

            useEffect(() => {
                let cancelled = false;
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 8000);
                const alreadyCounted = sessionStorage.getItem(VIEW_SESSION_KEY) === '1';
                const rpcName = alreadyCounted ? 'get_gemini_notebook_views' : 'increment_gemini_notebook_views';

                fetch(`${SUPABASE_PROJECT_URL}/rest/v1/rpc/${rpcName}`, {
                    method: alreadyCounted ? 'GET' : 'POST',
                    headers: {
                        apikey: SUPABASE_PUBLISHABLE_KEY,
                        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: alreadyCounted ? undefined : '{}',
                    signal: controller.signal
                })
                    .then(response => {
                        if (!response.ok) throw new Error(`View counter request failed (${response.status})`);
                        return response.json();
                    })
                    .then(count => {
                        if (!alreadyCounted) sessionStorage.setItem(VIEW_SESSION_KEY, '1');
                        const value = Number(count);
                        if (!cancelled && Number.isFinite(value)) setTotalViews(value);
                    })
                    .catch(() => {
                        // The counter stays hidden if the service is unavailable.
                    })
                    .finally(() => clearTimeout(timeout));

                return () => {
                    cancelled = true;
                    clearTimeout(timeout);
                    controller.abort();
                };
            }, []);
            
            const t = { ...uiText.zh, ...uiText2.zh, ...(uiText[language] || {}), ...(uiText2[language] || {}) };
            const A = (zh, en, ja = zh, ko = zh) => language === 'en' ? en : language === 'ja' ? ja : language === 'ko' ? ko : zh;
            const pl2 = promptLocales2[language] || promptLocales2.zh;
            const opts = optionsTranslations[language] || optionsTranslations.zh;
            const baseOpts = optionsTranslations.zh;

            const [needType, setNeedType] = useState('pitch');
            const [selectedStyle, setSelectedStyle] = useState('ref-001');
            const [selectedLayout, setSelectedLayout] = useState('lay-1');
            
            const [slideCount, setSlideCount] = useState('10');
            const [targetAudience, setTargetAudience] = useState('潛在客戶與決策者');
            const [customTargetAudience, setCustomTargetAudience] = useState('');
            const [presentationTime, setPresentationTime] = useState('15');
            const [context, setContext] = useState('現場提案會議');
            const [customContext, setCustomContext] = useState('');
            const [speakerTone, setSpeakerTone] = useState('專業自信且具說服力');
            const [customSpeakerTone, setCustomSpeakerTone] = useState('');
            const [callToAction, setCallToAction] = useState('了解痛點並促成合作');
            const [customCallToAction, setCustomCallToAction] = useState('');
            const [roleType, setRoleType] = useState('不需要角色');
            const [customRole, setCustomRole] = useState('');
            const [includeSpeakerNotes, setIncludeSpeakerNotes] = useState('yes');
            const [needVisualStyle, setNeedVisualStyle] = useState(true);
            const [additionalNotes, setAdditionalNotes] = useState('');

            const [customNeedType, setCustomNeedType] = useState('');
            const [customStyleName, setCustomStyleName] = useState('');
            const [customStyleDesc, setCustomStyleDesc] = useState('');
            const [customLayoutName, setCustomLayoutName] = useState('');
            const [customLayoutDesc, setCustomLayoutDesc] = useState('');

            const [refStyle, setRefStyle] = useState('ref-001');
            const [activeExampleIndex, setActiveExampleIndex] = useState(0);
            const [activeSlideIndex, setActiveSlideIndex] = useState(0);
            const [isZoomed, setIsZoomed] = useState(false);
            const [copiedType, setCopiedType] = useState(null);

            const [pastedOutline, setPastedOutline] = useState('');
            const [useMainCharacter, setUseMainCharacter] = useState(false);
            const [keepMargins, setKeepMargins] = useState(false);
            const [selectedPalette, setSelectedPalette] = useState('none');
            const [palettePriority, setPalettePriority] = useState(null);
            const [showPaletteConflict, setShowPaletteConflict] = useState(false);
            const [resolvedPaletteConflictKey, setResolvedPaletteConflictKey] = useState('');
            const [hasUserChosenStyle, setHasUserChosenStyle] = useState(false);
            const [backgroundChoice, setBackgroundChoice] = useState('auto');
            const [dataVisualMode, setDataVisualMode] = useState('auto');
            const [chartDensity, setChartDensity] = useState('medium');
            const [chartTypeMode, setChartTypeMode] = useState('auto');
            const [showChartValues, setShowChartValues] = useState(true);
            const [showDataSource, setShowDataSource] = useState(true);
            const [preserveDataUnits, setPreserveDataUnits] = useState(true);
            const [customPalettes, setCustomPalettes] = useState([]);
            const [useLogo, setUseLogo] = useState(false);
            const [logoText, setLogoText] = useState('');
            const [logoPos, setLogoPos] = useState('tr');
            const [usePageNum, setUsePageNum] = useState(true);
            const [pageNumPos, setPageNumPos] = useState('br');
            const [pageNumFormat, setPageNumFormat] = useState('total');
            const [addedPaletteId, setAddedPaletteId] = useState(null);
            const [editingColor, setEditingColor] = useState(null);
            const [hydrated, setHydrated] = useState(false);

            useEffect(() => {
                const s = loadSavedState();
                const apply = {
                    language: setLanguage, needType: setNeedType, selectedStyle: setSelectedStyle, selectedLayout: setSelectedLayout,
                    slideCount: setSlideCount, targetAudience: setTargetAudience, customTargetAudience: setCustomTargetAudience,
                    presentationTime: setPresentationTime, context: setContext, customContext: setCustomContext,
                    speakerTone: setSpeakerTone, customSpeakerTone: setCustomSpeakerTone, callToAction: setCallToAction,
                    customCallToAction: setCustomCallToAction, roleType: setRoleType, customRole: setCustomRole,
                    includeSpeakerNotes: setIncludeSpeakerNotes, needVisualStyle: setNeedVisualStyle, additionalNotes: setAdditionalNotes,
                    customNeedType: setCustomNeedType, customStyleName: setCustomStyleName, customStyleDesc: setCustomStyleDesc,
                    customLayoutName: setCustomLayoutName, customLayoutDesc: setCustomLayoutDesc,
                    pastedOutline: setPastedOutline, useMainCharacter: setUseMainCharacter, keepMargins: setKeepMargins, selectedPalette: setSelectedPalette, backgroundChoice: setBackgroundChoice,
                    dataVisualMode: setDataVisualMode, chartDensity: setChartDensity, chartTypeMode: setChartTypeMode, showChartValues: setShowChartValues, showDataSource: setShowDataSource, preserveDataUnits: setPreserveDataUnits, customPalettes: setCustomPalettes,
                    useLogo: setUseLogo, logoText: setLogoText, logoPos: setLogoPos,
                    usePageNum: setUsePageNum, pageNumPos: setPageNumPos, pageNumFormat: setPageNumFormat
                };
                Object.keys(apply).forEach(k => { if (s[k] !== undefined) apply[k](s[k]); });
                setHydrated(true);
            }, []);

            useEffect(() => {
                if (!hydrated) return;
                localStorage.setItem(LS_KEY, JSON.stringify({
                    language, needType, selectedStyle, selectedLayout, slideCount, targetAudience, customTargetAudience,
                    presentationTime, context, customContext, speakerTone, customSpeakerTone, callToAction, customCallToAction,
                    roleType, customRole, includeSpeakerNotes, needVisualStyle, additionalNotes, customNeedType,
                    customStyleName, customStyleDesc, customLayoutName, customLayoutDesc, pastedOutline, useMainCharacter, keepMargins, selectedPalette, backgroundChoice,
                    dataVisualMode, chartDensity, chartTypeMode, showChartValues, showDataSource, preserveDataUnits,
                    customPalettes, useLogo, logoText, logoPos, usePageNum, pageNumPos, pageNumFormat
                }));
            });

            const addCustomPalette = (base) => {
                const p = {
                    id: 'cp-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
                    name: base ? base.name : '',
                    colors: base ? [...base.colors] : [...defaultNewPalette]
                };
                setCustomPalettes(prev => [...prev, p]);
                return p.id;
            };
            const updateCustomPaletteName = (id, name) => setCustomPalettes(prev => prev.map(p => p.id === id ? { ...p, name } : p));
            const updateCustomPaletteColor = (id, idx, val) => setCustomPalettes(prev => prev.map(p => p.id === id ? { ...p, colors: p.colors.map((c, i) => i === idx ? val : c) } : p));
            const removeCustomPalette = (id) => {
                setCustomPalettes(prev => prev.filter(p => p.id !== id));
                if (selectedPalette === id) setSelectedPalette('none');
            };
            const handleAddToCorp = (preset) => {
                addCustomPalette(preset);
                setAddedPaletteId(preset.id);
                setTimeout(() => setAddedPaletteId(null), 1600);
            };

            const meikoLogoRemote = "https://rain-galley-248.notion.site/image/attachment%3A1a4404e1-e6b1-4f29-a495-123224c6135a%3AMeiko_logo.png?table=block&id=2c04c228-35e5-80d2-b534-f270fb01613d&spaceId=cf48a189-fd68-4fe6-a35c-bf6538001b35&width=770&userId=&cache=v2";
        const meikoLogo = "./assets/images/Meiko_logo.png";
            const notebookLMLogoRemote = "https://raw.githubusercontent.com/meikochang/my-web-assets/refs/heads/main/images/notebooklm.png";
        const notebookLMLogo = "./assets/images/notebooklm.png";
            const accentBg = "bg-pink-300";

            const needCategories = [
                { id: 'pitch', label: {zh:'商業提案 (Pitch Deck)', en:'Pitch Deck', ja:'ビジネスピッチ', ko:'비즈니스 제안'}, icon: 'Zap', recommendStyle: 'ref-001', recommendLayout: 'lay-1' },
                { id: 'education', label: {zh:'教育與員工培訓', en:'Education & Training', ja:'教育・従業員研修', ko:'교육 및 직원 교육'}, icon: 'BookOpen', recommendStyle: 'ref-0', recommendLayout: 'lay-4' },
                { id: 'report', label: {zh:'專案與進度報告', en:'Status Report', ja:'プロジェクト進捗報告', ko:'프로젝트 진행 보고'}, icon: 'FileText', recommendStyle: 'ref-001', recommendLayout: 'lay-3' },
                { id: 'launch', label: {zh:'產品發表會', en:'Product Launch', ja:'製品発表会', ko:'제품 출시'}, icon: 'Sparkles', recommendStyle: 'ref-009', recommendLayout: 'lay-2' },
                { id: 'data', label: {zh:'數據與成效分析', en:'Data & Analysis', ja:'データと成果分析', ko:'데이터 및 성과 분석'}, icon: 'BarChart3', recommendStyle: 'ref-006', recommendLayout: 'lay-5' },
                { id: 'marketing', label: {zh:'行銷企劃與發想', en:'Marketing Campaign', ja:'マーケティング企画', ko:'마케팅 기획'}, icon: 'Share2', recommendStyle: 'ref-002', recommendLayout: 'lay-2' },
                { id: 'academic', label: {zh:'學術研究 / 論文發表', en:'Academic / Research', ja:'学術・論文発表', ko:'학술 / 논문 발표'}, icon: 'BookOpen', recommendStyle: 'ref-012', recommendLayout: 'lay-4' },
                { id: 'finance', label: {zh:'財務 / 投資簡報', en:'Finance / Investment', ja:'財務・投資', ko:'재무 / 투자'}, icon: 'BarChart3', recommendStyle: 'ref-001', recommendLayout: 'lay-5' },
                { id: 'proposal', label: {zh:'企劃提案 / 標案', en:'Proposal / Bid', ja:'企画提案・入札', ko:'기획 제안 / 입찰'}, icon: 'FileText', recommendStyle: 'ref-001', recommendLayout: 'lay-1' },
                { id: 'brand', label: {zh:'品牌故事 / 公司介紹', en:'Brand Story / Company', ja:'ブランド・会社紹介', ko:'브랜드 스토리 / 회사 소개'}, icon: 'Sparkles', recommendStyle: 'ref-010', recommendLayout: 'lay-2' },
                { id: 'healthcare', label: {zh:'醫療 / 衛教簡報', en:'Healthcare / Education', ja:'医療・健康教育', ko:'의료 / 건강 교육'}, icon: 'Smile', recommendStyle: 'ref-002', recommendLayout: 'lay-1' },
                { id: 'annual', label: {zh:'年度回顧 / 成果報告', en:'Annual Review / Results', ja:'年次レビュー・成果', ko:'연간 검토 / 성과'}, icon: 'History', recommendStyle: 'ref-006', recommendLayout: 'lay-3' },
            ];

            const layoutCategories = [
                { id: 'lay-1', label: {zh:'問題與解決方案', en:'Problem & Solution', ja:'課題と解決策', ko:'문제와 해결책'}, icon: 'Network', desc: {zh:'提出痛點帶出解方，適合提案。', en:'Raise pain points & provide solutions.', ja:'課題を提示し解決策を導く。', ko:'문제점 제시 후 해결책 도출.'} },
                { id: 'lay-2', label: {zh:'起承轉合 (故事法)', en:'Storytelling Arc', ja:'起承転結 (ストーリー)', ko:'기승전결 (스토리텔링)'}, icon: 'GitCommit', desc: {zh:'引人入勝，適合行銷與品牌故事。', en:'Engaging flow for marketing/branding.', ja:'マーケティングやブランドストーリーに。', ko:'마케팅 및 브랜드 스토리에 적합.'} },
                { id: 'lay-3', label: {zh:'時間軸演進', en:'Timeline / Evolution', ja:'タイムライン', ko:'타임라인 진행'}, icon: 'History', desc: {zh:'適合回顧歷史、專案進度或規劃。', en:'Best for history, progress, or roadmaps.', ja:'歴史やロードマップの振り返りに。', ko:'역사, 진행 상황 검토에 적합.'} },
                { id: 'lay-4', label: {zh:'金字塔原則 (SCQA)', en:'Pyramid Principle (SCQA)', ja:'ピラミッド原則 (SCQA)', ko:'피라미드 원칙 (SCQA)'}, icon: 'Layout', desc: {zh:'情境、複雜性、問題、答案。', en:'Situation, Complication, Question, Answer.', ja:'状況、複雑化、疑問、答え。', ko:'상황, 복잡성, 질문, 답변.'} },
                { id: 'lay-5', label: {zh:'結論與數據先行', en:'Conclusion & Data First', ja:'結論・データ先行', ko:'결론 및 데이터 우선'}, icon: 'BarChart3', desc: {zh:'先講結論再用數據支撐，適合主管報告。', en:'Conclusion first, supported by data.', ja:'結論を先に述べ、データで裏付ける。', ko:'결론부터 말하고 데이터로 뒷받침.'} },
                { id: 'lay-6', label: {zh:'黃金圈法則 (Why-How-What)', en:'Golden Circle', ja:'ゴールデンサークル', ko:'골든 서클'}, icon: 'Target', desc: {zh:'從理念出發，先講為什麼再到做什麼。', en:'Start with Why, then How and What.', ja:'なぜ→どうやって→何を、の順で語る。', ko:'왜→어떻게→무엇을 순으로 전달.'} },
                { id: 'lay-7', label: {zh:'英雄旅程 (故事行銷)', en:"Hero's Journey", ja:'ヒーローズジャーニー', ko:'영웅의 여정'}, icon: 'Sparkles', desc: {zh:'主角遇挑戰、蛻變、成功，感染力強。', en:'Challenge, transformation, triumph.', ja:'挑戦・変化・成功で共感を生む。', ko:'도전·변화·성공으로 공감 유도.'} },
                { id: 'lay-8', label: {zh:'PREP 論點法', en:'PREP Method', ja:'PREP法', ko:'PREP 기법'}, icon: 'Layout', desc: {zh:'重點、理由、實例、重申，論述清晰。', en:'Point, Reason, Example, Point.', ja:'結論・理由・具体例・結論。', ko:'요점·이유·사례·요점.'} },
                { id: 'lay-9', label: {zh:'比較與對比 (Before/After)', en:'Compare & Contrast', ja:'比較・対比', ko:'비교와 대조'}, icon: 'GitCommit', desc: {zh:'透過前後或競品對比凸顯價值。', en:'Highlight value via before/after.', ja:'前後や競合比較で価値を強調。', ko:'전후·경쟁 비교로 가치 부각.'} },
                { id: 'lay-10', label: {zh:'5W1H 全面解析', en:'5W1H Analysis', ja:'5W1H分析', ko:'5W1H 분석'}, icon: 'Network', desc: {zh:'從人事時地物與方法全面拆解。', en:'Who, What, When, Where, Why, How.', ja:'誰・何・いつ・どこ・なぜ・どう。', ko:'누가·무엇·언제·어디·왜·어떻게.'} },
                { id: 'lay-11', label: {zh:'FAB 特色利益法', en:'FAB (Sales)', ja:'FAB (セールス)', ko:'FAB (세일즈)'}, icon: 'Zap', desc: {zh:'特色、優勢、利益，適合銷售說服。', en:'Features, Advantages, Benefits.', ja:'特徴・利点・便益で説得。', ko:'특징·장점·이점으로 설득.'} },
                { id: 'lay-12', label: {zh:'STAR 案例法', en:'STAR (Case)', ja:'STAR (事例)', ko:'STAR (사례)'}, icon: 'History', desc: {zh:'情境、任務、行動、成果，適合案例分享。', en:'Situation, Task, Action, Result.', ja:'状況・課題・行動・結果。', ko:'상황·과제·행동·결과.'} },
            ];

            const stylesTranslation = {
                'ref-015': { title: {zh: '白底商務簡約風格', en:'White Minimal Business', ja:'白背景ミニマルビジネス', ko:'화이트 미니멀 비즈니스'}, category: {zh: '白底商務簡約風格', en:'White Business Minimalism', ja:'白背景ビジネスミニマル', ko:'화이트 비즈니스 미니멀'} },
                'ref-016': { title: {zh: '白底高階財經風格', en:'Premium White Financial', ja:'白背景ハイエンド財務', ko:'화이트 고급 재무'}, category: {zh: '白底高階財經風格', en:'Executive Finance', ja:'エグゼクティブ財務', ko:'고급 재무 프레젠테이션'} },
                'ref-0': { title: {zh: '手繪日記風格+主角', en:'Hand-drawn Diary + Character', ja:'手書き日記 + キャラクター', ko:'손그림 일기 + 캐릭터'}, category: {zh: '專屬角色導覽', en:'Character Guide', ja:'専用キャラクターガイド', ko:'전용 캐릭터 가이드'} },
                'ref-001': { title: {zh: '專業企業商務風格', en:'Professional Corporate', ja:'プロの企業ビジネス', ko:'전문 기업 비즈니스'}, category: {zh: '高階商務/對外提案', en:'High-end Business', ja:'ハイエンドビジネス', ko:'고급 비즈니스'} },
                'ref-002': { title: {zh: '溫馨插畫風格', en:'Cozy Illustration', ja:'温かみのあるイラスト', ko:'따뜻한 일러스트'}, category: {zh: '療癒分享/品牌故事', en:'Brand Story', ja:'癒し/ブランドストーリー', ko:'브랜드 스토리'} },
                'ref-006': { title: {zh: '高對比度極簡風格', en:'High-contrast Minimalist', ja:'高コントラストのミニマル', ko:'고대비 미니멀리즘'}, category: {zh: '數據分析/專業簡報', en:'Data Analysis', ja:'データ分析/専門的', ko:'데이터 분석/전문적'} },
                'ref-008': { title: {zh: '2.5D 等距視角風格+主角', en:'2.5D Isometric + Character', ja:'2.5D アイソメトリック + キャラ', ko:'2.5D 아이소메트릭 + 캐릭터'}, category: {zh: '專屬角色導覽', en:'Character Guide', ja:'専用キャラクターガイド', ko:'전용 캐릭터 가이드'} },
                'ref-009': { title: {zh: '3D 奶油 UI 科技風格', en:'3D Butter UI Tech', ja:'3D バターUI', ko:'3D 버터 UI 테크'}, category: {zh: '數據分析/新創科技', en:'Startup Tech', ja:'新興テクノロジー', ko:'스타트업 테크'} },
                'ref-010': { title: {zh: '雜誌編輯風格', en:'Magazine Editorial', ja:'雑誌エディトリアル', ko:'잡지 편집'}, category: {zh: '行銷企劃/品牌故事', en:'Marketing/Brand', ja:'マーケティング/ブランド', ko:'마케팅/브랜드'} },
                'ref-011': { title: {zh: '扁平化插畫風格', en:'Flat Illustration', ja:'フラットイラスト', ko:'플랫 일러스트'}, category: {zh: '活潑分享/行銷企劃', en:'Casual/Marketing', ja:'カジュアル/マーケティング', ko:'캐주얼/마케팅'} },
                'ref-012': { title: {zh: '北歐簡約插畫風格', en:'Nordic Minimalist', ja:'北欧のミニマル', ko:'북유럽 미니멀リズト'}, category: {zh: '高階商務/現代設計', en:'Modern Design', ja:'モダンデザイン', ko:'모던 디자인'} },
                'ref-013': { title: {zh: '漸層玻璃擬態風格', en:'Glassmorphism', ja:'グラスモーフィズム', ko:'글래스모피즘'}, category: {zh: '科技前沿/現代設計', en:'Modern Tech', ja:'最先端技術/モダン', ko:'첨단 기술/모던'} },
                'ref-014': { title: {zh: '教育型遊戲UI風格+主角', en:'Edu Game UI + Character', ja:'教育ゲームUI + キャラ', ko:'교육용 게임 UI + 캐릭터'}, category: {zh: '教育培訓/遊戲化', en:'Education/Gamification', ja:'教育研修/ゲーミフィケーション', ko:'교육/게이미피케이션'} },
            };

            const activeRefStyle = referenceData.find(d => d.id === refStyle) || referenceData[0];
            
            const safeExampleIndex = (activeRefStyle.examples && activeExampleIndex < activeRefStyle.examples.length) ? activeExampleIndex : 0;
            const currentExample = activeRefStyle.examples ? activeRefStyle.examples[safeExampleIndex] : null;
            const safeSlideIndex = (currentExample && currentExample.slides && activeSlideIndex < currentExample.slides.length) ? activeSlideIndex : 0;

            useEffect(() => {
                referenceData.forEach(style => {
                    if (style.generatorShow !== false && style.examples && style.examples.length > 0) {
                        const firstSlide = style.examples[0].slides[0];
                        if (firstSlide) {
                            const img = new Image(); img.src = firstSlide;
                            const thumb = new Image(); thumb.src = firstSlide.replace('sz=w800', 'sz=w200');
                        }
                    }
                });
            }, []);

            const handleStyleHover = (styleId) => {
                const targetStyle = referenceData.find(d => d.id === styleId);
                if (targetStyle && targetStyle.examples && targetStyle.examples.length > 0) {
                    targetStyle.examples[0].slides.forEach(slide => {
                        const thumb = new Image(); thumb.src = slide.replace('sz=w800', 'sz=w200');
                        const img = new Image(); img.src = slide;
                    });
                }
            };

            const handleExampleHover = (ex) => {
                if (ex && ex.slides) {
                    ex.slides.forEach(slide => {
                        const thumb = new Image(); thumb.src = slide.replace('sz=w800', 'sz=w200');
                        const img = new Image(); img.src = slide;
                    });
                }
            };

            const handleCopy = async (text, id) => {
                try {
                    await navigator.clipboard.writeText(text);
                    setCopiedType(id);
                    setTimeout(() => setCopiedType(null), 2000);
                } catch (err) {
                    const textArea = document.createElement("textarea");
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    setCopiedType(id);
                    setTimeout(() => setCopiedType(null), 2000);
                    document.body.removeChild(textArea);
                }
            };

            const handleNeedTypeSelect = (id) => {
                setNeedType(id);
                const category = needCategories.find(c => c.id === id);
                if (category) {
                    setSelectedStyle(category.recommendStyle);
                    setSelectedLayout(category.recommendLayout);
                }
            };

            const getPromptText = (lg) => {
                const L = promptLocales[lg];
                const uiL = uiText[lg];
                const optL = optionsTranslations[lg];

                const getOpt = (cat, val, customVal) => {
                    if (val === '不需要設定' || val === '不需要角色') return '';
                    if (val === '自訂設定' || val === '自訂角色') return customVal || uiL[`ph${cat.charAt(0).toUpperCase() + cat.slice(1)}`];
                    const idx = baseOpts[cat].indexOf(val);
                    return idx !== -1 ? optL[cat][idx] : val;
                };

                const actAudience = getOpt('audience', targetAudience, customTargetAudience);
                const actContext = getOpt('context', context, customContext);
                const actTone = getOpt('tone', speakerTone, customSpeakerTone);
                const actCTA = getOpt('cta', callToAction, customCallToAction);
                const actRole = getOpt('role', roleType, customRole);
                const isNoRole = roleType === '不需要角色';

                const actNeedType = needType === 'custom' ? (customNeedType || uiL.phCustomPurpose) : (needCategories.find(c => c.id === needType)?.label[lg] || '');
                const actLayout = selectedLayout === 'custom' ? (customLayoutName || uiL.phLayoutName) : (layoutCategories.find(l => l.id === selectedLayout)?.label[lg] || '');
                const actLayoutDesc = selectedLayout === 'custom' ? customLayoutDesc : (layoutCategories.find(l => l.id === selectedLayout)?.desc[lg] || '');
                
                const parsedSlideCount = parseInt(slideCount, 10);
                const validSlideCount = isNaN(parsedSlideCount) || parsedSlideCount < 4 ? 10 : parsedSlideCount;

                const audLine = actAudience ? `\n${L.aud}{{${actAudience}}}` : '';
                const ctxLine = actContext ? `\n${L.ctx}{{${actContext}}}` : '';
                const toneLine = actTone ? `\n${L.tone}{{${actTone}}}` : '';
                const ctaLine = actCTA ? `\n${L.cta}{{${actCTA}}}` : '';
                const roleLine = isNoRole ? '' : `\n${L.role}{{${actRole}}}`;
                const notesLine = additionalNotes ? `\n${L.note}{{${additionalNotes}}}` : '';
                const layoutDescLine = actLayoutDesc ? ` (${actLayoutDesc})` : '';

                const spkNote = (desc) => includeSpeakerNotes === 'yes' ? `\n${L.spkNote}${desc}` : '';
                const contentOnlyRules = {
                    zh: '【內容限定規則】\n本階段僅生成簡報大綱與文字內容。禁止提供或加入任何視覺風格、配色、背景、圖片、插圖、圖示、圖表外觀、人物、角色、Logo、版面配置、排版或畫面描述建議。所有視覺規範將於後續階段另外設定。',
                    en: '[Content-Only Rule]\nAt this stage, generate only the presentation outline and written content. Do not provide or include any suggestions about visual style, colors, backgrounds, images, illustrations, icons, chart appearance, people, characters, logos, layout, typography, or screen composition. All visual specifications will be added separately later.',
                    ja: '【内容限定ルール】\nこの段階では、プレゼンの大綱と文章内容のみを生成してください。ビジュアルスタイル、配色、背景、画像、イラスト、アイコン、グラフの外観、人物、キャラクター、ロゴ、レイアウト、組版、画面構成に関する提案を一切含めないでください。すべてのビジュアル規範は後の段階で別途設定します。',
                    ko: '[콘텐츠 전용 규칙]\n이 단계에서는 프레젠테이션 개요와 텍스트 내용만 생성하세요. 시각 스타일, 색상, 배경, 이미지, 일러스트, 아이콘, 차트 외형, 인물, 캐릭터, 로고, 레이아웃, 타이포그래피 또는 화면 구성에 관한 제안을 포함하지 마세요. 모든 시각 규칙은 이후 단계에서 별도로 설정합니다.'
                };

                return `${L.sysAct}

${L.flowTitle}
${L.flow1}
${L.flow2}「{{${actLayout}}}」${layoutDescLine}。
${L.flow3} {{${validSlideCount}}} ${L.flow3_2}

${L.setResp}
${L.type}{{${actNeedType}}}${audLine}${ctxLine}${toneLine}${ctaLine}${roleLine}${notesLine}

${contentOnlyRules[lg] || contentOnlyRules.zh}

${L.outFormat} {{${validSlideCount}}} ${L.outFormat2}

${L.slPrefix}1${L.sl1}
${L.sl1T}
${L.sl1S}${spkNote(L.sl1Note)}

${L.slPrefix}2${L.sl2}
${L.sl2T}
${L.sl2C}${spkNote(L.sl2Note)}

${L.mid}

${L.slPrefix}${validSlideCount - 1}${L.slL1}
${L.slL1T}
${L.slL1C}${spkNote(L.slL1Note)}

${L.slPrefix}${validSlideCount}${L.slL}
${L.slLT}
${L.slLC}${spkNote(L.slLNote)}`;
            };

            const resolveRoleFor = (lg) => {
                if (roleType === '不需要角色') return null;
                if (roleType === '自訂角色') return customRole || (uiText[lg] || uiText.zh).phRole;
                const idx = optionsTranslations.zh.role.indexOf(roleType);
                return idx !== -1 ? (optionsTranslations[lg] || optionsTranslations.zh).role[idx] : roleType;
            };

            const getActivePalette = () => {
                if (selectedPalette === 'none') return null;
                return palettePresets.find(p => p.id === selectedPalette) || customPalettes.find(p => p.id === selectedPalette) || null;
            };

            const getRawSelectedStylePrompt = (lg = 'zh') => {
                if (!needVisualStyle || selectedStyle === 'none') return '';
                if (selectedStyle === 'strict-business') return getStrictBusinessPrompt(lg);
                if (selectedStyle === 'custom') return customStyleDesc || '';
                const ref = referenceData.find(item => item.id === selectedStyle);
                return ref ? (ref[`${lg}Prompt`] || ref.enPrompt || ref.zhPrompt || '') : '';
            };

            const styleHasColorCodes = () => /#[0-9A-Fa-f]{6}\b/.test(getRawSelectedStylePrompt('zh'));
            const currentPaletteConflictKey = () => `${selectedStyle}|${selectedPalette}`;
            const stripTemplateColorCodeSentences = text => String(text || '')
                .replace(/[^。！？.!?\n]*#[0-9A-Fa-f]{6}\b[^。！？.!?\n]*[。！？.!?]?/g, '')
                .replace(/\n{3,}/g, '\n\n')
                .trim();

            useEffect(() => {
                if (!showPaletteConflict) return;
                const previousOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                return () => { document.body.style.overflow = previousOverflow; };
            }, [showPaletteConflict]);

            const resolvePaletteConflict = priority => {
                setPalettePriority(priority);
                setResolvedPaletteConflictKey(currentPaletteConflictKey());
                setShowPaletteConflict(false);
            };

            const handleStyleSelection = styleId => {
                const nextStyle = styleId === 'strict-business'
                    ? getStrictBusinessPrompt('zh')
                    : styleId === 'custom'
                        ? customStyleDesc
                        : (referenceData.find(item => item.id === styleId)?.zhPrompt || '');
                setSelectedStyle(styleId);
                setHasUserChosenStyle(true);
                setShowPaletteConflict(false);
                if (selectedPalette !== 'none' && /#[0-9A-Fa-f]{6}\b/.test(nextStyle)) {
                    // 使用者先選配色、後選範本時，以最後選擇的範本配色為主，不額外打斷操作。
                    setPalettePriority('template');
                    setResolvedPaletteConflictKey(`${styleId}|${selectedPalette}`);
                } else {
                    setPalettePriority(null);
                    setResolvedPaletteConflictKey('');
                }
            };

            const handlePaletteSelection = paletteId => {
                setSelectedPalette(paletteId);
                setShowPaletteConflict(false);
                if (paletteId === 'none') {
                    setPalettePriority(null);
                    setResolvedPaletteConflictKey('');
                    return;
                }
                const key = `${selectedStyle}|${paletteId}`;
                if (!styleHasColorCodes()) {
                    setPalettePriority('custom');
                    setResolvedPaletteConflictKey(key);
                    return;
                }
                if (hasUserChosenStyle) {
                    setPalettePriority(null);
                    setResolvedPaletteConflictKey('');
                    setShowPaletteConflict(true);
                } else {
                    // 沒有親自選過範本時，單獨選配色不詢問，直接採用自選配色。
                    setPalettePriority('custom');
                    setResolvedPaletteConflictKey(key);
                }
            };

            const getStrictBusinessPrompt = (lg) => {
                return `【風格】 高階商務財經簡報，採用純白背景（#FFFFFF），以深藍色為主色、香檳金為少量點綴，呈現企業年報、董事會簡報及國際顧問公司的專業質感，大量留白，善用「結構化視覺圖形」與「向量資訊圖表」輔助說明，避免過度裝飾。 【Typography】 全簡報採用一致企業字體。封面與每張投影片主標題使用粗宋體風格（如：思源宋體、Noto Serif TC），封面34–40pt，內頁22pt、粗體、深藍色；內文一律使用現代無襯線字體（如：思源黑體、Noto Sans TC）Regular；重要關鍵詞可使用內文字體的Bold，其餘文字皆不得使用粗體。 【版面】 四周保留至少1公分安全留白。版面預設採用「單欄大圖表」或「左文右圖對比」結構。維持一致的標題位置、留白比例、配色與版面配置，不得因頁面改變設計風格，確保具備專業企業識別。`;
            };

            const normalizeFinalPromptLayout = text => String(text || '')
                // Unify standalone square-bracket headings without touching inline placeholders.
                .replace(/(^|\n)\s*\[([^\]\n]+)\][ \t]*/g, '$1【$2】\n')
                // The character block previously used an emoji heading while other blocks used brackets.
                .replace(/(^|\n)\s*👩‍⚕️\s*([^\n]+)\s*(?=\n|$)/g, '$1【$2】')
                // Split known inline style headings onto their own line.
                .replace(/\s*(【(?:風格|Typography|版面)】)\s*/g, '\n\n$1\n')
                // Every existing heading uses one line; its content starts on the following line.
                .replace(/(^|\n)\s*(【[^】\n]+】)[ \t]+/g, '$1$2\n')
                .replace(/[ \t]+\n/g, '\n')
                .replace(/\n{3,}/g, '\n\n')
                .trim();

            const getFinalPromptText = (lg) => {
                const L = promptLocales[lg] || promptLocales.zh;
                const L2 = promptLocales2[lg] || promptLocales2.zh;
                const isEn = lg === 'en';
                const parts = [L2.finalIntro];

                if (pastedOutline.trim()) parts.push(`${L2.outlineTitle}\n${pastedOutline.trim()}`);

                if (needVisualStyle && selectedStyle !== 'none') {
                    let styleName = '';
                    let stylePrompt = '';
                    if (selectedStyle === 'strict-business') {
                        styleName = lg === 'zh' ? '商務嚴格要求風格' : lg === 'ja' ? '厳格なビジネススタイル' : lg === 'ko' ? '엄격한 비즈니스 스타일' : 'Strict Business Style';
                        stylePrompt = getStrictBusinessPrompt(lg);
                    } else if (selectedStyle === 'custom') {
                        styleName = customStyleName;
                        stylePrompt = customStyleDesc;
                    } else {
                        const ref = referenceData.find(d => d.id === selectedStyle);
                        styleName = stylesTranslation[selectedStyle]?.title[lg] || '';
                        stylePrompt = ref ? (ref[`${lg}Prompt`] || ref.enPrompt || ref.zhPrompt) : '';
                        const role = resolveRoleFor(lg);
                        if (!role) {
                            stylePrompt = stylePrompt.replace(/👩‍⚕️[\s\S]*/, L.noRoleConst).replace(/\[Character Role\][\s\S]*/, L.noRoleConst);
                        } else {
                            stylePrompt = stylePrompt.replace(/【主角】/g, role).replace(/\[主角\]/g, role).replace(/\[Main Character\]/gi, role);
                        }
                    }
                    if (palettePriority === 'custom' && resolvedPaletteConflictKey === currentPaletteConflictKey()) {
                        stylePrompt = stripTemplateColorCodeSentences(stylePrompt);
                    }
                    if (styleName || stylePrompt) {
                        parts.push(`${L2.styleTitle}\n${styleName ? `${styleName}\n` : ''}${stylePrompt}`.trim());
                    }
                }

                if (needVisualStyle && useMainCharacter) {
                    parts.push(L2.charBlock);
                }

                const pal = getActivePalette();
                const keepTemplatePalette = palettePriority === 'template' && resolvedPaletteConflictKey === currentPaletteConflictKey();
                if (pal && !keepTemplatePalette) {
                    const nameTag = pal.name ? (isEn ? ` (${pal.name})` : `（${pal.name}）`) : '';
                    const colorLines = pal.colors.map(c => `• ${String(c).toUpperCase()}`).join('\n');
                    parts.push(`${L2.colorTitle}\n${L2.colorInstr}${nameTag}${isEn ? ':' : '：'}\n${colorLines}`);
                }

                const bgNames = {
                    zh: { white:'白色', black:'黑色', ivory:'米白色', gray:'淺灰色', auto:'由配色專家依內容與所選配色自動配置' },
                    en: { white:'white', black:'black', ivory:'ivory', gray:'light gray', auto:'automatically chosen by a color expert according to the content and selected palette' },
                    ja: { white:'白', black:'黒', ivory:'アイボリー', gray:'ライトグレー', auto:'内容と選択した配色に合わせて専門家が自動設定' },
                    ko: { white:'흰색', black:'검정', ivory:'아이보리', gray:'연한 회색', auto:'내용과 선택한 팔레트에 맞춰 전문가가 자동 설정' }
                };
                const bgLabels = { zh:'【背景色】', en:'【Background Color】', ja:'【背景色】', ko:'【배경색】' };
                const templateAutoBackground = { zh:'依範本配色自動配置', en:'automatically chosen from the template palette', ja:'テンプレートの配色に合わせて自動設定', ko:'템플릿 팔레트에 맞춰 자동 설정' };
                const backgroundLabel = keepTemplatePalette && backgroundChoice === 'auto'
                    ? (templateAutoBackground[lg] || templateAutoBackground.zh)
                    : (bgNames[lg] || bgNames.zh)[backgroundChoice];
                parts.push(`${bgLabels[lg] || bgLabels.zh}\n${backgroundLabel}`);
                const fontWeightRules = {
                    zh:'【全域字重規範】只有主標題、次標題與需要特別醒目的關鍵文字可以使用粗體。除此之外，所有內文、段落、說明文字、圖表標籤、註解、頁尾與一般項目文字一律使用正常字重（Regular），不得使用粗體或半粗體。',
                    en:'[Global Font-Weight Rule] Bold may be used only for main titles, subtitles, and specifically highlighted key text. All other body copy, paragraphs, explanatory text, chart labels, annotations, footers, and ordinary list items must use Regular weight—never Bold or Semi-Bold.',
                    ja:'【全体の文字ウェイト規則】太字を使用できるのは、主タイトル、サブタイトル、特に強調する重要語句のみです。それ以外の本文、段落、説明文、グラフラベル、注釈、フッター、通常の項目はすべてRegularを使用し、BoldやSemi-Boldを使用しないでください。',
                    ko:'[전체 글꼴 굵기 규칙] 굵은 글씨는 주제목, 부제목 및 특별히 강조할 핵심 문구에만 사용할 수 있습니다. 그 외 본문, 단락, 설명, 차트 레이블, 주석, 바닥글 및 일반 항목은 모두 Regular 굵기를 사용하며 Bold 또는 Semi-Bold를 사용하지 마세요.'
                };
                parts.push(fontWeightRules[lg] || fontWeightRules.zh);
                if (dataVisualMode !== 'none') {
                    const modeNames = {
                        zh:{auto:'依內容自動判斷',charts:'優先使用圖表',tables:'優先使用表格',both:'圖表與表格並用'},
                        en:{auto:'decide automatically from content',charts:'prioritize charts',tables:'prioritize tables',both:'use both charts and tables'},
                        ja:{auto:'内容に応じて自動判断',charts:'グラフを優先',tables:'表を優先',both:'グラフと表を併用'},
                        ko:{auto:'내용에 따라 자동 판단',charts:'차트 우선',tables:'표 우선',both:'차트와 표 병행'}
                    };
                    const densityNames = {zh:{low:'少量',medium:'適中',high:'大量'},en:{low:'low',medium:'moderate',high:'high'},ja:{low:'少量',medium:'適度',high:'多め'},ko:{low:'적게',medium:'보통',high:'많이'}};
                    const typeNames = {zh:{auto:'由 AI 選擇合適類型',basic:'僅使用長條圖、折線圖、圓餅圖與表格'},en:{auto:'let AI choose the appropriate type',basic:'use only bar, line, pie charts and tables'},ja:{auto:'AIが適切な種類を選択',basic:'棒・折れ線・円グラフと表のみ'},ko:{auto:'AI가 적합한 유형 선택',basic:'막대·선·원형 차트와 표만 사용'}};
                    const chartRules = {
                        zh:`【資料視覺化與表格規範】\n• 呈現方式：${modeNames.zh[dataVisualMode]}；圖表密度：${densityNames.zh[chartDensity]}；圖表類型：${typeNames.zh[chartTypeMode]}。\n• 比較型數據優先使用長條圖；時間趨勢使用折線圖；組成比例才可使用圓餅圖或環形圖；多欄位精確數值使用表格；流程內容使用流程圖。\n• 嚴禁捏造來源或大綱未提供的數字，不得為了製作圖表而虛構資料。\n• 圖表使用所選五色配色自行分配，背景嚴格遵守指定背景色。\n• ${showChartValues?'顯示重要數值標籤。':'非必要不顯示數值標籤。'} ${showDataSource?'有來源資料時必須標示資料來源。':'不強制顯示資料來源。'} ${preserveDataUnits?'完整保留原始單位與小數精度。':'可依閱讀性簡化單位。'}\n• 避免 3D 圖表、過多格線、裝飾性圖例與難以閱讀的標籤；除重要數字外，圖表與表格文字一律使用 Regular。`,
                        en:`[Data Visualization & Table Rules]\n• Mode: ${modeNames.en[dataVisualMode]}; density: ${densityNames.en[chartDensity]}; chart types: ${typeNames.en[chartTypeMode]}.\n• Use bar charts for comparisons, line charts for time trends, pie/donut charts only for composition, tables for precise multi-column values, and flowcharts for processes.\n• Never invent numbers absent from the source or outline. Use the selected five-color palette and strictly follow the selected background.\n• ${showChartValues?'Show important value labels.':'Omit nonessential value labels.'} ${showDataSource?'Show the source whenever available.':'Source display is optional.'} ${preserveDataUnits?'Preserve original units and precision.':'Units may be simplified for readability.'}\n• Avoid 3D charts, excessive gridlines and decorative legends. Use Regular weight except for key figures.`,
                        ja:`【データ可視化・表の規範】\n• 表現方法：${modeNames.ja[dataVisualMode]}、密度：${densityNames.ja[chartDensity]}、種類：${typeNames.ja[chartTypeMode]}。\n• 比較は棒グラフ、時系列は折れ線、構成比のみ円・ドーナツ、正確な多列数値は表、プロセスはフローチャートを使用します。\n• 出典や大綱にない数値を捏造しないでください。選択した5色と指定背景を厳守します。\n• ${showChartValues?'重要数値ラベルを表示。':'不要な数値ラベルは省略。'} ${showDataSource?'出典がある場合は必ず表示。':'出典表示は任意。'} ${preserveDataUnits?'元の単位と精度を保持。':'読みやすさに応じて単位を簡略化可能。'}\n• 3Dグラフ、過剰なグリッド線、装飾的な凡例を避け、重要数値以外はRegularを使用します。`,
                        ko:`[데이터 시각화 및 표 규칙]\n• 표현 방식: ${modeNames.ko[dataVisualMode]}, 밀도: ${densityNames.ko[chartDensity]}, 유형: ${typeNames.ko[chartTypeMode]}.\n• 비교는 막대, 시간 추세는 선, 구성 비율만 원형/도넛, 정확한 다열 수치는 표, 프로세스는 흐름도를 사용합니다.\n• 출처나 개요에 없는 숫자를 만들지 마세요. 선택한 5색 팔레트와 지정 배경을 엄격히 따릅니다.\n• ${showChartValues?'중요 수치 레이블 표시.':'불필요한 수치 레이블 생략.'} ${showDataSource?'출처가 있으면 반드시 표시.':'출처 표시는 선택 사항.'} ${preserveDataUnits?'원래 단위와 정밀도 유지.':'가독성을 위해 단위 단순화 가능.'}\n• 3D 차트, 과도한 격자선 및 장식 범례를 피하고 핵심 숫자 외에는 Regular를 사용합니다.`
                    };
                    let chartRuleText = chartRules[lg] || chartRules.zh;
                    if (keepTemplatePalette) {
                        chartRuleText = chartRuleText
                            .replace('所選五色配色', '範本內的配色')
                            .replace('the selected five-color palette', 'the template palette')
                            .replace('選択した5色', 'テンプレート内の配色')
                            .replace('선택한 5색 팔레트', '템플릿 팔레트');
                    }
                    parts.push(chartRuleText);
                }
                if (keepMargins) {
                    const marginLines = {
                        zh:'【安全留白】生成的投影片四個邊界各保留 1 公分安全留白，此區域內不要顯示任何文字。',
                        en:'[Safe Margins] Keep a 1 cm safe margin on all four edges of every generated slide; do not display any text in this area.',
                        ja:'【安全マージン】すべてのスライドの四辺に1cmの余白を確保し、その領域には文字を表示しないでください。',
                        ko:'[안전 여백] 모든 슬라이드의 네 가장자리에 1cm 여백을 두고 해당 영역에는 텍스트를 표시하지 마세요.'
                    };
                    parts.push(marginLines[lg] || marginLines.zh);
                }

                return normalizeFinalPromptLayout(parts.join('\n\n'));
            };

            const renderFinalPrompt = text => String(text || '')
                .split(/(【[^】\n]+】)/g)
                .map((part, index) => /^【[^】\n]+】$/.test(part)
                    ? <span key={index} className="text-pink-300 font-black">{part}</span>
                    : part);

            const promptHeaders = {
                zh: "ZH-TW 繁體中文",
                en: "EN-US English",
                ja: "JA-JP 日本語",
                ko: "KO-KR 한국어"
            };

            return (
                <div className="min-h-screen flex flex-col">
                    {showPaletteConflict && ReactDOM.createPortal(
                        <div className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-labelledby="palette-conflict-title">
                            <div className="w-full max-w-lg rounded-2xl border border-pink-300/40 bg-slate-900 p-6 shadow-2xl">
                                <div className="w-12 h-12 rounded-xl bg-pink-300/15 text-pink-300 flex items-center justify-center mb-4"><Icon name="Palette" size={25} /></div>
                                <h2 id="palette-conflict-title" className="text-xl font-black text-white mb-2">{A('要使用哪一組配色？','Which color palette should be used?')}</h2>
                                <p className="text-sm leading-relaxed text-slate-300">{A('目前選擇的簡報範本本身含有色碼，同時又選擇了另一組配色。請選擇最終指令要保留哪一組，避免 AI 收到互相重疊的顏色要求。','The selected template already contains color codes, and you have also selected another palette. Choose which palette to keep so the AI receives only one set of color instructions.')}</p>
                                <div className="mt-5 space-y-3">
                                    <button onClick={()=>resolvePaletteConflict('template')} className="w-full rounded-xl border border-slate-600 bg-slate-800/70 p-4 text-left hover:border-pink-300 transition-colors">
                                        <span className="block font-black text-white">{A('以範本配色為主','Use template palette')}</span>
                                        <span className="block text-xs text-slate-400 mt-1">{A('保留範本內的色碼，移除自選配色指令。','Keep the template color codes and remove the selected palette instructions.')}</span>
                                    </button>
                                    <button onClick={()=>resolvePaletteConflict('custom')} className="w-full rounded-xl border border-pink-300/50 bg-pink-300/10 p-4 text-left hover:bg-pink-300/15 transition-colors">
                                        <span className="block font-black text-pink-200">{A('以自選配色為主','Use selected palette')}</span>
                                        <span className="block text-xs text-slate-300 mt-1">{A('保留目前選擇的五色配色，移除範本 Prompt 中含色碼的配色句子。','Keep the selected five-color palette and remove color-code instructions from the template prompt.')}</span>
                                    </button>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-4">{A('之後若更換範本或配色，系統會再次詢問。','You will be asked again if you change the template or palette.')}</p>
                            </div>
                        </div>,
                        document.body
                    )}
                    <div className="max-w-[1200px] mx-auto w-full px-4 py-6 flex-grow">
                        
                        {}
                        <header className="mb-3 bg-slate-800/40 p-5 md:p-6 rounded-2xl border border-slate-700/50 flex flex-col gap-6 shadow-xl backdrop-blur-md">
                            <div className="flex flex-row justify-between items-start gap-4">
                                <div className="flex flex-col items-start justify-center min-w-0">
                                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] leading-tight font-black tracking-wide text-white flex items-center gap-3 md:gap-4">
                                        <img
                                            src={notebookLMLogo} onError={(e) => { if (!e.currentTarget.dataset.retried) { e.currentTarget.dataset.retried = "1"; e.currentTarget.src = notebookLMLogoRemote; } }}
                                            alt="Gemini Notebook Logo"
                                            className="w-10 h-10 md:w-12 md:h-12 lg:w-[54px] lg:h-[54px] rounded-xl shadow-lg object-contain bg-slate-900 border border-slate-700 p-0.5 flex-shrink-0"
                                        />
                                        <span className="whitespace-nowrap">{t.appTitle}</span>
                                    </h1>
                                    <div className="mt-4 flex items-center gap-3">
                                        <img src={meikoLogo} onError={(e) => { if (!e.currentTarget.dataset.retried) { e.currentTarget.dataset.retried = "1"; e.currentTarget.src = meikoLogoRemote; } }} alt="Meiko Logo" className="w-8 h-8 rounded-full border-2 border-slate-600 shadow-sm flex-shrink-0" />
                                        <div className="text-xs uppercase tracking-widest font-bold text-slate-400">
                                            <a href="https://www.youtube.com/@meiko1" target="_blank" className="hover:text-pink-300 transition-colors">{A('Meiko微課頻道','Meiko Micro-Learning Channel')}</a>
                                            <span className="mx-2 text-slate-600">|</span>
                                            <span className="text-pink-300 uppercase">Presentation Assistant</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative flex-shrink-0">
                                    <Icon name="Globe" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <select
                                        value={language}
                                        onChange={e => setLanguage(e.target.value)}
                                        className="appearance-none bg-slate-900/80 border border-slate-700 hover:border-pink-300 text-slate-300 text-[13px] font-bold py-2 pl-10 pr-9 rounded-xl transition-all outline-none cursor-pointer shadow-md focus:ring-1 focus:ring-pink-300/50"
                                    >
                                        <option value="zh">繁體中文</option>
                                        <option value="en">English</option>
                                        <option value="ja">日本語</option>
                                        <option value="ko">한국어</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                        <Icon name="ArrowDown" size={14} />
                                    </div>
                                </div>
                            </div>

                        </header>

                        <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md">
                            <div className="flex justify-center py-2.5">
                                <div className="flex bg-slate-900/95 p-1.5 rounded-xl border border-slate-700 shadow-[0_8px_20px_rgba(0,0,0,0.5)] w-full sm:w-auto justify-center">
                                    <button onClick={() => setActiveTab('generator')} className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'generator' ? 'bg-pink-300 text-slate-900 shadow-md' : 'text-slate-400 hover:text-pink-300'}`}>
                                        {t.tabGenerator}
                                    </button>
                                    <button onClick={() => setActiveTab('style')} className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'style' ? 'bg-pink-300 text-slate-900 shadow-md' : 'text-slate-400 hover:text-pink-300'}`}>
                                        {t.tabStyle}
                                    </button>
                                    <button onClick={() => setActiveTab('reference')} className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'reference' ? 'bg-pink-300 text-slate-900 shadow-md' : 'text-slate-400 hover:text-pink-300'}`}>
                                        {t.tabReference}
                                    </button>
                                    <button onClick={() => setActiveTab('pdf')} className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'pdf' ? 'bg-pink-300 text-slate-900 shadow-md' : 'text-slate-400 hover:text-pink-300'}`}>
                                        {t.tabPdf}
                                    </button>
                                </div>
                            </div>
                            <div className="h-px bg-slate-700/70"></div>
                        </div>

                        <div className="mt-5 mb-8 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[11px] md:text-xs font-bold tracking-wider">
                            {t.flowSteps.map((s, i) => {
                                const active = (i === 0 && activeTab === 'generator') || ((i === 2 || i === 3) && activeTab === 'style');
                                return (
                                    <React.Fragment key={i}>
                                        {i > 0 && <span className="text-slate-600">›</span>}
                                        <span className="inline-flex items-center gap-1.5">
                                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] leading-none flex-shrink-0 ${active ? 'border-pink-300 text-pink-300' : 'border-slate-600 text-slate-500'}`}>{i + 1}</span>
                                            <span className={active ? 'text-pink-300' : 'text-slate-500'}>{s}</span>
                                        </span>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {}
                        {activeTab === 'generator' ? (
                            <div className="flex flex-col gap-6 animate-in">
                                <div className="flex flex-col gap-6">
                                    {/* Step 1: 基本設定 */}
                                    <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm w-full transition-all hover:border-pink-300/30">
                                        <h2 className="text-sm font-black text-pink-300 mb-5 uppercase tracking-[0.2em] border-b border-slate-700/80 pb-3 flex items-center gap-2">
                                            {t.step1Title}
                                        </h2>
                                        
                                        <div className="flex flex-col gap-6">
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                                                <div>
                                                    <label className="text-sm font-bold text-slate-300 mb-2.5 block">{t.pages}</label>
                                                    <div className="relative">
                                                        <Icon name="Layers" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                        <input type="number" value={slideCount} onChange={e => setSlideCount(e.target.value)} className="w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2.5 pl-10 pr-3 text-white text-sm focus:border-pink-300 outline-none transition-all focus:ring-1 focus:ring-pink-300/50" placeholder={t.phSlideCount} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-bold text-slate-300 mb-2.5 block">{t.time}</label>
                                                    <div className="relative">
                                                        <Icon name="History" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                        <input type="number" value={presentationTime} onChange={e => setPresentationTime(e.target.value)} className="w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2.5 pl-10 pr-3 text-white text-sm focus:border-pink-300 outline-none transition-all focus:ring-1 focus:ring-pink-300/50" placeholder={t.phTime} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-bold text-slate-300 mb-2.5 block">{t.role}</label>
                                                    <div className="relative">
                                                        <Icon name="User" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                        <select value={roleType} onChange={e => setRoleType(e.target.value)} className="w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2.5 pl-10 pr-8 text-white text-sm focus:border-pink-300 outline-none transition-all focus:ring-1 focus:ring-pink-300/50 appearance-none cursor-pointer">
                                                            {baseOpts.role.map((zhVal, idx) => <option key={zhVal} value={zhVal}>{opts.role[idx]}</option>)}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                                            <Icon name="ArrowDown" size={14} />
                                                        </div>
                                                    </div>
                                                    {roleType === '自訂角色' && (
                                                        <input type="text" value={customRole} onChange={e => setCustomRole(e.target.value)} className="mt-2 w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2 px-3 text-white text-sm focus:border-pink-300 outline-none transition-all" placeholder={t.phRole} />
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="text-sm font-bold text-slate-300 mb-2.5 block">{t.context}</label>
                                                    <div className="relative">
                                                        <Icon name="Monitor" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                        <select value={context} onChange={e => setContext(e.target.value)} className="w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2.5 pl-10 pr-8 text-white text-sm focus:border-pink-300 outline-none transition-all focus:ring-1 focus:ring-pink-300/50 appearance-none cursor-pointer">
                                                            {baseOpts.context.map((zhVal, idx) => <option key={zhVal} value={zhVal}>{opts.context[idx]}</option>)}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                                            <Icon name="ArrowDown" size={14} />
                                                        </div>
                                                    </div>
                                                    {context === '自訂設定' && (
                                                        <input type="text" value={customContext} onChange={e => setCustomContext(e.target.value)} placeholder={t.phContext} className="mt-2 w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2 px-3 text-white text-sm focus:border-pink-300 outline-none transition-all" />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                <div>
                                                    <label className="text-sm font-bold text-slate-300 mb-2.5 block">{t.audience}</label>
                                                    <div className="relative">
                                                        <Icon name="Network" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                        <select value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2.5 pl-10 pr-8 text-white text-sm focus:border-pink-300 outline-none transition-all focus:ring-1 focus:ring-pink-300/50 appearance-none cursor-pointer">
                                                            {baseOpts.audience.map((zhVal, idx) => <option key={zhVal} value={zhVal}>{opts.audience[idx]}</option>)}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                                            <Icon name="ArrowDown" size={14} />
                                                        </div>
                                                    </div>
                                                    {targetAudience === '自訂設定' && (
                                                        <input type="text" value={customTargetAudience} onChange={e => setCustomTargetAudience(e.target.value)} placeholder={t.phAudience} className="mt-2 w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2 px-3 text-white text-sm focus:border-pink-300 outline-none transition-all" />
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="text-sm font-bold text-slate-300 mb-2.5 block">{t.tone}</label>
                                                    <div className="relative">
                                                        <Icon name="Smile" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                        <select value={speakerTone} onChange={e => setSpeakerTone(e.target.value)} className="w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2.5 pl-10 pr-8 text-white text-sm focus:border-pink-300 outline-none transition-all focus:ring-1 focus:ring-pink-300/50 appearance-none cursor-pointer">
                                                            {baseOpts.tone.map((zhVal, idx) => <option key={zhVal} value={zhVal}>{opts.tone[idx]}</option>)}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                                            <Icon name="ArrowDown" size={14} />
                                                        </div>
                                                    </div>
                                                    {speakerTone === '自訂設定' && (
                                                        <input type="text" value={customSpeakerTone} onChange={e => setCustomSpeakerTone(e.target.value)} placeholder={t.phTone} className="mt-2 w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2 px-3 text-white text-sm focus:border-pink-300 outline-none transition-all" />
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="text-sm font-bold text-slate-300 mb-2.5 block">{t.cta}</label>
                                                    <div className="relative">
                                                        <Icon name="Target" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                        <select value={callToAction} onChange={e => setCallToAction(e.target.value)} className="w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2.5 pl-10 pr-8 text-white text-sm focus:border-pink-300 outline-none transition-all focus:ring-1 focus:ring-pink-300/50 appearance-none cursor-pointer">
                                                            {baseOpts.cta.map((zhVal, idx) => <option key={zhVal} value={zhVal}>{opts.cta[idx]}</option>)}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                                            <Icon name="ArrowDown" size={14} />
                                                        </div>
                                                    </div>
                                                    {callToAction === '自訂設定' && (
                                                        <input type="text" value={customCallToAction} onChange={e => setCustomCallToAction(e.target.value)} placeholder={t.phCta} className="mt-2 w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2 px-3 text-white text-sm focus:border-pink-300 outline-none transition-all" />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                <div className="md:col-span-1">
                                                    <label className="text-sm font-bold text-slate-300 mb-2.5 block">{t.notes}</label>
                                                    <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-700 shadow-inner">
                                                        <button onClick={() => setIncludeSpeakerNotes('yes')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${includeSpeakerNotes === 'yes' ? 'bg-pink-400 text-slate-900 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                                                            {t.need}
                                                        </button>
                                                        <button onClick={() => setIncludeSpeakerNotes('no')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${includeSpeakerNotes === 'no' ? 'bg-slate-700 text-white shadow-md border border-slate-600' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                                                            {t.noNeed}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="text-sm font-bold text-slate-300 mb-2.5 block">{t.addition}</label>
                                                    <div className="relative h-full flex flex-col justify-start">
                                                        <Icon name="PlusCircle" size={16} className="absolute left-3.5 top-[13px] text-slate-400" />
                                                        <input type="text" value={additionalNotes} onChange={e => setAdditionalNotes(e.target.value)} className="w-full min-h-[42px] bg-slate-900/60 border border-slate-600 rounded-lg py-2 pl-10 pr-3 text-white text-sm focus:border-pink-300 outline-none transition-all focus:ring-1 focus:ring-pink-300/50" placeholder={t.phAddition} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                        {/* Step 2: 需求 / 簡報類型 */}
                                        <div className="bg-slate-800/40 border border-slate-700/60 p-5 rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:border-pink-300/30">
                                            <h2 className="text-sm font-black text-pink-300 mb-4 uppercase tracking-[0.2em] border-b border-slate-700/80 pb-2 flex items-center gap-2">
                                                {t.step2Title}
                                            </h2>
                                            <div className="space-y-2">
                                                {needCategories.map(c => (
                                                    <button 
                                                        key={c.id} 
                                                        onClick={() => handleNeedTypeSelect(c.id)}
                                                        className={`w-full text-left p-3.5 rounded-xl transition-all border ${needType === c.id ? 'bg-pink-300/15 border-pink-300 text-pink-300 shadow-sm' : 'bg-slate-900/40 border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className={needType === c.id ? 'text-pink-300' : 'text-slate-500'}><Icon name={c.icon} size={18}/></span>
                                                            <span className="font-bold text-sm">{c.label[language]}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                                <button 
                                                    onClick={() => setNeedType('custom')} 
                                                    className={`w-full text-left p-3.5 rounded-xl transition-all border ${needType === 'custom' ? 'bg-pink-300/15 border-pink-300 text-pink-300 shadow-sm' : 'bg-slate-900/40 border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className={needType === 'custom' ? 'text-pink-300' : 'text-slate-500'}><Icon name="Pen" size={18}/></span>
                                                        <span className="font-bold text-sm">{t.customPurpose}</span>
                                                    </div>
                                                </button>
                                                {needType === 'custom' && (
                                                    <div className="mt-3 p-3 bg-slate-900/50 rounded-xl border border-slate-700">
                                                        <input type="text" value={customNeedType} onChange={e => setCustomNeedType(e.target.value)} placeholder={t.phCustomPurpose} className="w-full bg-slate-800/80 border border-slate-600 rounded-lg py-2.5 px-3 text-white text-sm focus:border-pink-300 outline-none transition-all" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Step 3: 簡報大綱架構 */}
                                        <div className="bg-slate-800/40 border border-slate-700/60 p-5 rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:border-pink-300/30">
                                            <h2 className="text-sm font-black text-pink-300 mb-4 uppercase tracking-[0.2em] border-b border-slate-700/80 pb-2 flex items-center gap-2">
                                                {t.step3Title}
                                            </h2>
                                            <div className="space-y-2">
                                                {layoutCategories.map(l => {
                                                    const isRec = needCategories.find(n => n.id === needType)?.recommendLayout === l.id;
                                                    return (
                                                        <button 
                                                            key={l.id} 
                                                            onClick={() => setSelectedLayout(l.id)} 
                                                            className={`w-full text-left p-3.5 rounded-xl transition-all border relative ${selectedLayout === l.id ? 'bg-pink-300/15 border-pink-300 text-pink-300 shadow-sm' : 'bg-slate-900/40 border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span className={selectedLayout === l.id ? 'text-pink-300' : 'text-slate-500'}><Icon name={l.icon} size={18}/></span>
                                                                <span className="font-bold text-sm pr-6">{l.label[language]}</span>
                                                            </div>
                                                            {isRec && <div className="absolute top-2.5 right-2 px-1.5 py-0.5 bg-pink-300 text-slate-900 text-[10px] font-black rounded uppercase shadow-sm">{t.recommend}</div>}
                                                        </button>
                                                    );
                                                })}
                                                <button 
                                                    onClick={() => setSelectedLayout('custom')} 
                                                    className={`w-full text-left p-3.5 rounded-xl transition-all border ${selectedLayout === 'custom' ? 'bg-pink-300/15 border-pink-300 text-pink-300 shadow-sm' : 'bg-slate-900/40 border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className={selectedLayout === 'custom' ? 'text-pink-300' : 'text-slate-500'}><Icon name="Pen" size={18}/></span>
                                                        <span className="font-bold text-sm">{t.customLayout}</span>
                                                    </div>
                                                </button>
                                                {selectedLayout === 'custom' && (
                                                    <div className="mt-3 space-y-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700">
                                                        <input type="text" value={customLayoutName} onChange={e => setCustomLayoutName(e.target.value)} placeholder={t.phLayoutName} className="w-full bg-slate-800/80 border border-slate-600 rounded-lg py-2.5 px-3 text-white text-sm focus:border-pink-300 outline-none transition-all" />
                                                        <textarea value={customLayoutDesc} onChange={e => setCustomLayoutDesc(e.target.value)} placeholder={t.phLayoutDesc} className="w-full bg-slate-800/80 border border-slate-600 rounded-lg py-2.5 px-3 text-white text-sm focus:border-pink-300 outline-none transition-all min-h-[60px] custom-scrollbar"></textarea>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {}
                                <div className="w-full bg-slate-800/80 border border-slate-600 p-6 rounded-2xl shadow-2xl flex flex-col relative overflow-hidden">
                                    <h3 className="text-white font-black text-sm mb-6 flex items-center gap-2 uppercase tracking-wide">
                                        <Icon name="Zap" size={18} className="text-pink-300" /> {t.outlinePromptTitle}
                                    </h3>
                                    
                                    <div className="space-y-4 w-full">
                                        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-700/80">
                                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
                                                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{promptHeaders[language]}</span>
                                                <button onClick={() => handleCopy(getPromptText(language).replace(/\{\{(.*?)\}\}/g, '$1'), 'copy-primary')} className="bg-pink-300 hover:bg-pink-400 text-slate-900 text-sm font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors shadow-sm active:scale-95">
                                                    {copiedType === 'copy-primary' ? <Icon name="Check" size={14}/> : <Icon name="Copy" size={14}/>} {copiedType === 'copy-primary' ? t.copied : t.copy}
                                                </button>
                                            </div>
                                            <p className="text-slate-200 text-[15px] leading-relaxed whitespace-pre-wrap"><HighlightedText text={getPromptText(language)} /></p>
                                        </div>

                                        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-700/80">
                                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
                                                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{promptHeaders['en']}</span>
                                                <button onClick={() => handleCopy(getPromptText('en').replace(/\{\{(.*?)\}\}/g, '$1'), 'copy-en')} className="bg-pink-300 hover:bg-pink-400 text-slate-900 text-sm font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors shadow-sm active:scale-95">
                                                    {copiedType === 'copy-en' ? <Icon name="Check" size={14}/> : <Icon name="Copy" size={14}/>} {copiedType === 'copy-en' ? "COPIED" : "COPY"}
                                                </button>
                                            </div>
                                            <p className="text-slate-400 text-[15px] leading-relaxed font-mono whitespace-pre-wrap"><HighlightedText text={getPromptText('en')} /></p>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-col sm:flex-row gap-4 flex-shrink-0">
                                        <a href="https://notebooklm.google.com/" target="_blank" className="flex-1 py-4 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 text-center">
                                            <Icon name="Sparkles" size={18} /> {t.goToNbLM}
                                        </a>
                                        <button onClick={() => setActiveTab('style')} className="flex-1 py-4 bg-pink-300 hover:bg-pink-400 text-slate-900 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 text-center">
                                            <Icon name="Wand2" size={18} /> {t.nextToStyle}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : activeTab === 'style' ? (
                            <div className="flex flex-col gap-6 animate-in">
                                {/* 貼上大綱 */}
                                <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:border-pink-300/30">
                                    <h2 className="text-sm font-black text-pink-300 mb-5 uppercase tracking-[0.2em] border-b border-slate-700/80 pb-3">{t.pasteOutlineTitle}</h2>
                                    <textarea value={pastedOutline} onChange={e => setPastedOutline(e.target.value)} placeholder={t.phPasteOutline} className="w-full bg-slate-900/60 border border-slate-600 rounded-lg py-3 px-4 text-white text-sm focus:border-pink-300 outline-none transition-all min-h-[180px] custom-scrollbar leading-relaxed"></textarea>
                                    {!pastedOutline.trim() && (
                                        <p className="mt-2 text-xs text-amber-300/80 flex items-center gap-1.5"><Icon name="Info" size={14} /> {t.outlineEmptyHint}</p>
                                    )}
                                </div>

                                {/* 視覺風格 */}
                                <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:border-pink-300/30">
                                    <h2 className="text-sm font-black text-pink-300 mb-5 uppercase tracking-[0.2em] border-b border-slate-700/80 pb-3 flex items-center justify-between gap-3">
                                        <span>{t.styleSectionTitle}</span>
                                        <button onClick={() => setActiveTab('reference')} className="text-xs text-slate-400 hover:text-pink-300 font-bold tracking-normal transition-colors">{t.viewTemplates}</button>
                                    </h2>
                                    <div className="mb-4 flex flex-col sm:flex-row gap-4">
                                        <div className="w-full sm:max-w-xs">
                                            <label className="text-sm font-bold text-slate-300 mb-2.5 block">{t.useStyleLabel}</label>
                                            <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-700 shadow-inner">
                                                <button onClick={() => setNeedVisualStyle(true)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${needVisualStyle ? 'bg-pink-400 text-slate-900 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>{t.need}</button>
                                                <button onClick={() => setNeedVisualStyle(false)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!needVisualStyle ? 'bg-slate-700 text-white shadow-md border border-slate-600' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>{t.noNeed}</button>
                                            </div>
                                        </div>
                                        <div className={`w-full sm:max-w-xs transition-all ${!needVisualStyle ? 'opacity-30 pointer-events-none' : ''}`}>
                                            <label className="text-sm font-bold text-slate-300 mb-2.5 block flex items-center gap-1.5"><Icon name="User" size={14} className="text-pink-300" /> {t.mainCharLabel}</label>
                                            <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-700 shadow-inner">
                                                <button onClick={() => setUseMainCharacter(true)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${useMainCharacter ? 'bg-pink-400 text-slate-900 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>{t.need}</button>
                                                <button onClick={() => setUseMainCharacter(false)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!useMainCharacter ? 'bg-slate-700 text-white shadow-md border border-slate-600' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>{t.noNeed}</button>
                                            </div>
                                        </div>
                                        <div className="w-full sm:max-w-xs">
                                            <label className="text-sm font-bold text-slate-300 mb-2.5 block flex items-center gap-1.5"><Icon name="Layout" size={14} className="text-pink-300" /> {A('是否要留邊','Keep safe margins?')}</label>
                                            <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-700 shadow-inner">
                                                <button onClick={() => setKeepMargins(true)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${keepMargins ? 'bg-pink-400 text-slate-900 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>{t.need}</button>
                                                <button onClick={() => setKeepMargins(false)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!keepMargins ? 'bg-slate-700 text-white shadow-md border border-slate-600' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>{t.noNeed}</button>
                                            </div>
                                        </div>
                                    </div>
                                    {needVisualStyle && useMainCharacter && (
                                        <div className="mb-4 bg-pink-300/10 border border-pink-300/20 p-3 rounded-xl flex items-start gap-2">
                                            <Icon name="Info" size={16} className="text-pink-300 mt-0.5 flex-shrink-0" />
                                            <p className="text-slate-300 text-xs leading-relaxed">{t.mainCharHint}</p>
                                        </div>
                                    )}
                                    <div className={`transition-all duration-300 ${!needVisualStyle ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {referenceData.filter(d => d.generatorShow !== false).map(d => {
                                                const thumb = d.examples && d.examples[0] && d.examples[0].slides[0];
                                                return (
                                                    <button key={d.id} onClick={() => handleStyleSelection(d.id)} className={`text-left rounded-xl overflow-hidden border-2 transition-all group ${selectedStyle === d.id ? 'border-pink-300 shadow-[0_0_15px_rgba(249,168,212,0.3)]' : 'border-slate-700 hover:border-slate-500'}`}>
                                                        <div className="aspect-video bg-slate-950/60 overflow-hidden relative">
                                                            {thumb && <img src={getSlideAssetUrl(thumb)} onError={(e) => { if (!e.currentTarget.dataset.retried) { e.currentTarget.dataset.retried = '1'; e.currentTarget.src = thumb.replace('sz=w800', 'sz=w400'); } }} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={d.title} />}
                                                            <CheckCircle selected={selectedStyle === d.id} />
                                                        </div>
                                                        <div className="p-2.5 bg-slate-900/60">
                                                            <div className={`text-xs font-bold ${selectedStyle === d.id ? 'text-pink-300' : 'text-slate-200'}`}>{stylesTranslation[d.id]?.title[language] || d.title}</div>
                                                            <div className="text-[10px] text-slate-500 mt-0.5">{stylesTranslation[d.id]?.category[language] || d.category}</div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                            <button onClick={() => handleStyleSelection('strict-business')} className={`text-left rounded-xl overflow-hidden border-2 transition-all flex flex-col ${selectedStyle === 'strict-business' ? 'border-pink-300 shadow-[0_0_15px_rgba(249,168,212,0.3)]' : 'border-slate-700 hover:border-slate-500'}`}>
                                                <div className="aspect-video bg-gradient-to-br from-[#16324F] via-[#244B6B] to-[#0D5689] flex items-center justify-center w-full relative overflow-hidden">
                                                    <div className="absolute inset-3 border border-white/20 rounded-lg"></div>
                                                    <div className="text-center relative"><Icon name="Layout" size={30} className="text-white mx-auto mb-2" /><span className="text-[10px] font-black tracking-[0.18em] text-white">STRICT BUSINESS</span></div>
                                                    <CheckCircle selected={selectedStyle === 'strict-business'} />
                                                </div>
                                                <div className="p-2.5 bg-slate-900/60 flex-grow w-full">
                                                    <div className={`text-xs font-bold ${selectedStyle === 'strict-business' ? 'text-pink-300' : 'text-slate-200'}`}>{A('商務嚴格要求風格','Strict Business Style')}</div>
                                                    <div className="text-[10px] text-slate-500 mt-0.5">{A('固定背景與標題規格','Fixed background and title specifications')}</div>
                                                </div>
                                            </button>
                                            <button onClick={() => handleStyleSelection('custom')} className={`text-left rounded-xl overflow-hidden border-2 transition-all flex flex-col ${selectedStyle === 'custom' ? 'border-pink-300 shadow-[0_0_15px_rgba(249,168,212,0.3)]' : 'border-slate-700 hover:border-slate-500'}`}>
                                                <div className="aspect-video bg-slate-900/80 flex items-center justify-center w-full relative">
                                                    <Icon name="Pen" size={26} className={selectedStyle === 'custom' ? 'text-pink-300' : 'text-slate-500'} />
                                                    <CheckCircle selected={selectedStyle === 'custom'} />
                                                </div>
                                                <div className="p-2.5 bg-slate-900/60 flex-grow w-full">
                                                    <div className={`text-xs font-bold ${selectedStyle === 'custom' ? 'text-pink-300' : 'text-slate-200'}`}>{t.customStyle}</div>
                                                </div>
                                            </button>
                                        </div>
                                        {selectedStyle === 'custom' && (
                                            <div className="mt-4 space-y-3 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                                <input type="text" value={customStyleName} onChange={e => setCustomStyleName(e.target.value)} placeholder={t.phStyleName} className="w-full bg-slate-800/80 border border-slate-600 rounded-lg py-2.5 px-3 text-white text-sm focus:border-pink-300 outline-none transition-all" />
                                                <textarea value={customStyleDesc} onChange={e => setCustomStyleDesc(e.target.value)} placeholder={t.phStyleDesc} className="w-full bg-slate-800/80 border border-slate-600 rounded-lg py-2.5 px-3 text-white text-sm focus:border-pink-300 outline-none transition-all min-h-[80px] custom-scrollbar"></textarea>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 配色方案 */}
                                <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:border-pink-300/30">
                                    <h2 className="text-sm font-black text-pink-300 mb-5 uppercase tracking-[0.2em] border-b border-slate-700/80 pb-3">{t.paletteSectionTitle}</h2>
                                    <div className="mb-5">
                                        <label className="text-sm font-bold text-slate-300 mb-2.5 block">{A('投影片背景顏色','Slide background color')}</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                            {[['white',A('白','White')],['black',A('黑','Black')],['ivory',A('米白','Ivory')],['gray',A('淺灰','Light gray')],['auto',A('自動配置','Automatic')]].map(([id,label]) => <button key={id} onClick={() => setBackgroundChoice(id)} className={`py-2.5 px-2 rounded-lg border text-xs font-bold transition-all ${backgroundChoice === id ? 'bg-pink-300/15 border-pink-300 text-pink-300' : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'}`}>{label}</button>)}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">{A('背景色會獨立寫入指令；「自動配置」會要求依內容與所選五色配色決定。','The background is written separately into the prompt. Automatic lets AI choose based on the content and selected five-color palette.')}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <button onClick={() => handlePaletteSelection('none')} className={`rounded-xl border-2 p-4 text-left transition-all flex items-center justify-center min-h-[110px] ${selectedPalette === 'none' ? 'border-pink-300 bg-pink-300/10 text-pink-300' : 'border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-500'}`}>
                                            <span className="font-bold text-sm">{t.noPalette}</span>
                                        </button>
                                        {palettePresets.map(p => (
                                            <div key={p.id} className={`rounded-xl border-2 overflow-hidden transition-all ${selectedPalette === p.id ? 'border-pink-300 shadow-[0_0_15px_rgba(249,168,212,0.3)]' : 'border-slate-700 hover:border-slate-500'}`}>
                                                <button onClick={() => handlePaletteSelection(p.id)} className="w-full text-left">
                                                    <div className="flex justify-between items-center px-3 py-2 bg-slate-900/60">
                                                        <span className={`text-xs font-bold ${selectedPalette === p.id ? 'text-pink-300' : 'text-slate-200'}`}>{p.name}</span>
                                                    </div>
                                                    <div className="flex h-14 relative">
                                                        {p.colors.map((c, i) => (
                                                            <div key={i} className="flex-1 flex items-end justify-center pb-1" style={{ backgroundColor: c }}>
                                                                <span className="text-[9px] font-mono font-bold" style={{ color: textOn(c) }}>{c.toUpperCase()}</span>
                                                            </div>
                                                        ))}
                                                        <CheckCircle selected={selectedPalette === p.id} />
                                                    </div>
                                                </button>
                                                <button onClick={() => handleAddToCorp(p)} className="w-full py-1.5 bg-slate-900/80 text-[11px] font-bold text-slate-400 hover:text-pink-300 transition-colors flex items-center justify-center gap-1">
                                                    {addedPaletteId === p.id ? <><Icon name="Check" size={12} /> {t.added}</> : <><Icon name="PlusCircle" size={12} /> {t.addToCorp}</>}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 資料視覺化與表格 */}
                                <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:border-pink-300/30">
                                    <h2 className="text-sm font-black text-pink-300 mb-5 uppercase tracking-[0.2em] border-b border-slate-700/80 pb-3">4. {A('資料視覺化與表格','Data Visualization & Tables')}</h2>
                                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-5">
                                        {[['none',A('不指定','Not specified')],['auto',A('AI 自動判斷','Let AI decide')],['charts',A('優先使用圖表','Prefer charts')],['tables',A('優先使用表格','Prefer tables')],['both',A('圖表與表格並用','Use charts & tables')]].map(([id,label]) => <button key={id} onClick={() => setDataVisualMode(id)} className={`py-3 px-2 rounded-lg border text-xs font-bold transition-all ${dataVisualMode === id ? 'bg-pink-300/15 border-pink-300 text-pink-300' : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'}`}>{label}</button>)}
                                    </div>
                                    {dataVisualMode !== 'none' && <div className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div><label className="text-xs font-bold text-slate-400 block mb-2">{A('圖表密度','Chart density')}</label><select value={chartDensity} onChange={e=>setChartDensity(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm"><option value="low">{A('少量，只在必要頁面使用','Low — only where necessary')}</option><option value="medium">{A('適中，重要資料優先','Medium — prioritize key data')}</option><option value="high">{A('大量，盡可能視覺化資料','High — visualize whenever possible')}</option></select></div>
                                            <div><label className="text-xs font-bold text-slate-400 block mb-2">{A('圖表類型','Chart types')}</label><select value={chartTypeMode} onChange={e=>setChartTypeMode(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm"><option value="auto">{A('由 AI 選擇合適類型','Let AI choose the best type')}</option><option value="basic">{A('僅使用基本圖表與表格','Basic charts and tables only')}</option></select></div>
                                        </div>
                                        <div className="grid sm:grid-cols-3 gap-3">
                                            {[[showChartValues,setShowChartValues,A('顯示重要數值標籤','Show key value labels')],[showDataSource,setShowDataSource,A('有資料時標示來源','Show source when available')],[preserveDataUnits,setPreserveDataUnits,A('保留原始單位與精度','Preserve units and precision')]].map(([value,setter,label]) => <button key={label} onClick={()=>setter(!value)} className={`py-3 px-3 rounded-lg border text-xs font-bold transition-all ${value ? 'bg-pink-300/15 border-pink-300 text-pink-300' : 'bg-slate-900/60 border-slate-700 text-slate-400'}`}>{value?'✓ ':''}{label}</button>)}
                                        </div>
                                        <p className="text-xs text-slate-500">{A('系統會禁止捏造數據，並依比較、趨勢、比例、精確數值或流程內容，自動選擇長條圖、折線圖、圓餅圖、表格或流程圖。','The system prevents fabricated data and selects bar, line, pie, table, or flowchart formats based on comparisons, trends, proportions, precise values, or processes.')}</p>
                                    </div>}
                                </div>

                                {/* 企業配色與品牌識別 */}
                                <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:border-pink-300/30">
                                    <h2 className="text-sm font-black text-pink-300 mb-5 uppercase tracking-[0.2em] border-b border-slate-700/80 pb-3">{t.corpSectionTitle}</h2>

                                    <label className="text-sm font-bold text-slate-300 mb-3 block">{t.corpPalettesLabel}</label>
                                    {customPalettes.length === 0 && (
                                        <p className="text-xs text-slate-500 mb-3">{t.corpEmpty}</p>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                        {customPalettes.map(p => (
                                            <div key={p.id} className={`rounded-xl border-2 overflow-hidden transition-all ${selectedPalette === p.id ? 'border-pink-300 shadow-[0_0_15px_rgba(249,168,212,0.3)]' : 'border-slate-700 hover:border-slate-500'}`}>
                                                <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/60">
                                                    <input type="text" value={p.name} onChange={e => updateCustomPaletteName(p.id, e.target.value)} placeholder={t.phPaletteName} className="flex-grow min-w-0 bg-transparent border-b border-slate-700 focus:border-pink-300 text-xs font-bold text-slate-200 py-1 outline-none transition-all" />
                                                    <button onClick={() => removeCustomPalette(p.id)} className="flex-shrink-0 text-[10px] font-bold text-slate-500 hover:text-red-400 transition-colors">{t.deletePalette}</button>
                                                </div>
                                                <div className="flex h-16 relative">
                                                    {p.colors.map((c, i) => {
                                                        const isEditing = editingColor && editingColor.pid === p.id && editingColor.idx === i;
                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => setEditingColor(isEditing ? null : { pid: p.id, idx: i })}
                                                                className={`flex-1 relative cursor-pointer flex flex-col items-center justify-end pb-1 transition-all ${isEditing ? 'ring-2 ring-inset ring-white z-10' : ''}`}
                                                                style={{ backgroundColor: c }}
                                                                title={String(c).toUpperCase()}
                                                            >
                                                                <span className="text-[9px] font-mono font-bold pointer-events-none" style={{ color: textOn(c) }}>{String(c).toUpperCase()}</span>
                                                            </button>
                                                        );
                                                    })}
                                                    <CheckCircle selected={selectedPalette === p.id} onClick={() => handlePaletteSelection(p.id)} />
                                                </div>
                                                {editingColor && editingColor.pid === p.id && (
                                                    <div className="p-3 bg-slate-900/90 border-t border-slate-700 flex justify-center">
                                                        <ColorPicker
                                                            value={p.colors[editingColor.idx]}
                                                            onChange={(nc) => updateCustomPaletteColor(p.id, editingColor.idx, nc)}
                                                            onClose={() => setEditingColor(null)}
                                                            doneLabel={t.colorDone}
                                                            pickLabel={t.eyedropper}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <button onClick={() => addCustomPalette(null)} className="rounded-xl border-2 border-dashed border-slate-700 hover:border-pink-300 text-slate-500 hover:text-pink-300 transition-all min-h-[100px] flex flex-col items-center justify-center gap-2 text-sm font-bold">
                                            <Icon name="PlusCircle" size={20} /> {t.addPalette}
                                        </button>
                                    </div>

                                </div>

                                {/* 最終指令輸出 */}
                                <div className="w-full bg-slate-800/80 border border-slate-600 p-6 rounded-2xl shadow-2xl flex flex-col relative overflow-hidden">
                                    <h3 className="text-white font-black text-sm mb-6 flex items-center gap-2 uppercase tracking-wide">
                                        <Icon name="Zap" size={18} className="text-pink-300" /> {t.finalOutputTitle}
                                    </h3>
                                    <div className="space-y-4 w-full">
                                        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-700/80">
                                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
                                                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{promptHeaders[language]}</span>
                                                <button onClick={() => handleCopy(getFinalPromptText(language), 'copy-final')} className="bg-pink-300 hover:bg-pink-400 text-slate-900 text-sm font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors shadow-sm active:scale-95">
                                                    {copiedType === 'copy-final' ? <Icon name="Check" size={14}/> : <Icon name="Copy" size={14}/>} {copiedType === 'copy-final' ? t.copied : t.copy}
                                                </button>
                                            </div>
                                            <p className="text-slate-200 text-[15px] leading-relaxed whitespace-pre-wrap">{renderFinalPrompt(getFinalPromptText(language))}</p>
                                        </div>
                                    </div>
                                    <div className="mt-5 flex flex-col sm:flex-row gap-4 flex-shrink-0">
                                        <a href="https://notebooklm.google.com/" target="_blank" className="flex-1 py-4 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 text-center">
                                            <Icon name="Sparkles" size={18} /> {t.goToNbLM}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : activeTab === 'pdf' ? (
                            <PdfTools language={language} />
                        ) : (
                            <div className="animate-in pb-10">
                                <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-5xl mx-auto">
                                    {referenceData.filter(d => d.generatorShow !== false).map(d => (
                                        <button 
                                            key={d.id} 
                                            onMouseEnter={() => handleStyleHover(d.id)}
                                            onClick={() => { 
                                                setRefStyle(d.id); 
                                                setIsZoomed(false); 
                                                setActiveExampleIndex(0);
                                                setActiveSlideIndex(0);
                                            }}
                                            className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${refStyle === d.id ? 'bg-pink-400 border-pink-300 text-slate-900 shadow-[0_0_15px_rgba(249,168,212,0.4)] scale-105 z-10' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                                        >
                                            <Icon name={d.icon} size={16} className={`flex-shrink-0 ${refStyle === d.id ? 'text-slate-900' : 'text-slate-500'}`} />
                                            <span>{stylesTranslation[d.id]?.title[language] || d.title.split(' (')[0]}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="max-w-5xl mx-auto bg-slate-800/60 border border-slate-700 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-md">
                                    <div className="mb-6 border-l-4 border-pink-300 pl-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                       <div>
                                         <h3 className="text-3xl font-black text-white tracking-tight uppercase italic flex items-center gap-3">
                                            {stylesTranslation[activeRefStyle.id]?.title[language] || activeRefStyle.title.split(' (')[0]}
                                         </h3>
                                       </div>
                                       <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
                                         <div className="text-xs text-slate-400 font-bold uppercase tracking-widest bg-slate-950/60 px-4 py-1.5 rounded-full border border-slate-700">
                                           {stylesTranslation[activeRefStyle.id]?.category[language] || activeRefStyle.category}
                                         </div>
                                         <button onClick={() => { handleStyleSelection(activeRefStyle.id); setNeedVisualStyle(true); setActiveTab('style'); }} className="text-xs font-black uppercase tracking-widest bg-pink-300 hover:bg-pink-400 text-slate-900 px-4 py-1.5 rounded-full transition-all active:scale-95 flex items-center gap-1.5 shadow-md">
                                           <Icon name="PlusCircle" size={14} /> {t.addStyleFromRef}
                                         </button>
                                       </div>
                                    </div>

                                    {activeRefStyle.examples && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {activeRefStyle.examples.map((ex, idx) => (
                                                <button
                                                    key={idx}
                                                    onMouseEnter={() => handleExampleHover(ex)}
                                                    onClick={() => { setActiveExampleIndex(idx); setActiveSlideIndex(0); setIsZoomed(false); }}
                                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${safeExampleIndex === idx ? 'bg-pink-300 text-slate-900 shadow-md' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-pink-300 hover:border-pink-300/50'}`}
                                                >
                                                    {ex.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {currentExample && currentExample.slides ? (
                                        <div className="relative mb-10 bg-slate-900/80 p-5 rounded-2xl border border-slate-700/80 shadow-inner">
                                            <div className="flex flex-col md:flex-row gap-4 lg:gap-5">
                                                <div className="flex-grow flex flex-col min-w-0">
                                                    <div className="w-full bg-slate-950/40 rounded-xl border border-slate-700/50 overflow-hidden relative shadow-lg aspect-video">
                                                        {currentExample.slides.map((slide, idx) => (
                                                            <img 
                                                                key={idx}
                                                                src={getSlideAssetUrl(slide)} onError={(e) => { if (!e.currentTarget.dataset.retried) { e.currentTarget.dataset.retried = "1"; e.currentTarget.src = slide; } }}
                                                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${safeSlideIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
                                                                alt={`Preview Slide ${idx + 1}`} 
                                                                loading={idx === 0 ? "eager" : "lazy"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="text-right mt-2 pr-1 text-[11px] md:text-xs font-bold text-white tracking-wider">
                                                        {t.provider}{currentExample.provider || 'Meiko'}
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-36 lg:w-40 flex-shrink-0 relative">
                                                    <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto custom-scrollbar md:pr-2 py-1 md:absolute md:inset-0 h-[100px] md:h-auto">
                                                        {currentExample.slides.map((slide, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                onClick={() => setActiveSlideIndex(idx)} 
                                                                className={`cursor-pointer rounded-lg border-2 transition-all aspect-video flex-shrink-0 overflow-hidden relative group ${safeSlideIndex === idx ? 'border-pink-300 opacity-100 shadow-[0_0_15px_rgba(249,168,212,0.4)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                                            >
                                                                <img src={getSlideAssetUrl(slide)} onError={(e) => { if (!e.currentTarget.dataset.retried) { e.currentTarget.dataset.retried = '1'; e.currentTarget.src = slide.replace('sz=w800', 'sz=w200'); } }} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={`Thumbnail ${idx+1}`} />
                                                                <div className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-mono shadow-sm">P.{idx+1}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative mb-10 flex flex-col">
                                            <div className="flex justify-center mb-3">
                                                <button onClick={() => setIsZoomed(!isZoomed)} className="flex items-center gap-2 text-xs font-black text-pink-300/60 uppercase tracking-widest hover:text-pink-300 transition-all">
                                                    {isZoomed ? <><Icon name="ZoomOut" size={14}/> {t.zoomOut}</> : <><Icon name="ZoomIn" size={14}/> {t.zoomIn}</>}
                                                </button>
                                            </div>
                                            <div onClick={() => setIsZoomed(!isZoomed)} className={`relative cursor-pointer transition-all duration-700 bg-slate-950/40 rounded-2xl overflow-hidden border border-slate-700/50 aspect-video ${isZoomed ? 'scale-110 shadow-2xl z-40 border-pink-300/30' : 'shadow-lg hover:border-pink-300/20'}`}>
                                                <img src={currentExample ? currentExample.img : activeRefStyle.img} className={`w-full h-full object-cover transition-all duration-700 ${isZoomed ? 'opacity-100' : 'opacity-80'}`} alt="preview" />
                                            </div>
                                            <div className="text-right mt-2 pr-1 text-[11px] md:text-xs font-bold text-white tracking-wider">
                                                {t.provider}{currentExample?.provider || activeRefStyle.provider || 'Meiko'}
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-pink-300/10 border border-pink-300/20 p-5 md:p-6 rounded-xl mb-10">
                                       <h4 className="text-pink-300 font-black uppercase text-xs tracking-[0.2em] mb-3 pb-2 border-b border-pink-300/20">{t.styleInsight}</h4>
                                       <p className="text-slate-200 text-sm md:text-base leading-relaxed font-light">{activeRefStyle.description}</p>
                                    </div>

                                    {}
                                    <div className="space-y-6 md:space-y-8">
                                        <div className="flex items-center gap-4">
                                            <h4 className="text-lg md:text-xl font-black text-white italic tracking-tight uppercase">{t.stylePromptTitle}</h4>
                                            <div className="flex-grow h-px bg-slate-700"></div>
                                        </div>
                                        
                                        <div className="bg-slate-950/80 p-6 md:p-8 rounded-2xl border border-slate-700 space-y-6 md:space-y-8 shadow-inner">
                                            <div>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{promptHeaders[language]}</p>
                                                </div>
                                                <p className="text-slate-200 text-[15px] leading-relaxed whitespace-pre-wrap"><HighlightedText text={activeRefStyle[`${language}Prompt`] || activeRefStyle.zhPrompt} /></p>
                                            </div>
                                            
                                            <div className="h-px bg-slate-800 w-full"></div>
                                            
                                            <div>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                                                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{t.enPromptHeading}</p>
                                                </div>
                                                <p className="text-slate-400 text-[15px] leading-relaxed font-mono whitespace-pre-wrap"><HighlightedText text={activeRefStyle.enPrompt} /></p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                                            <button onClick={() => handleCopy(`${activeRefStyle[`${language}Prompt`] || activeRefStyle.zhPrompt}\n\n${activeRefStyle.enPrompt}`, 'ref-copy')} className={`flex-1 py-3.5 rounded-xl font-black text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${copiedType === 'ref-copy' ? 'bg-pink-400 text-slate-900 shadow-lg' : 'bg-slate-100 text-slate-900 hover:bg-white'}`}>
                                                {copiedType === 'ref-copy' ? <Icon name="Check" size={18}/> : <Icon name="Copy" size={18}/>}
                                                {copiedType === 'ref-copy' ? t.copied : t.copyStylePrompt}
                                            </button>
                                            <a 
                                                href="https://notebooklm.google.com/" 
                                                target="_blank" 
                                                className={`flex-1 py-3.5 bg-pink-300 hover:bg-pink-400 text-slate-900 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95`}
                                            >
                                                <Icon name="Sparkles" size={18} /> {t.openNbLM}
                                            </a>
                                        </div>

                                        <div className="mt-4 md:mt-6 bg-slate-900/60 border border-slate-700/80 p-4 rounded-xl flex items-start gap-3 shadow-inner">
                                            <Icon name="Info" size={18} className="text-pink-300 mt-0.5 flex-shrink-0" />
                                            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                                                {t.welcomeShare}<a href="mailto:meikoedux@gmail.com" className="text-pink-300 hover:text-pink-400 transition-colors underline underline-offset-2">meikoedux@gmail.com</a>)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-slate-700 flex justify-center">
                                        <button onClick={() => setActiveTab('generator')} className="text-slate-500 hover:text-pink-300 text-sm font-bold flex items-center gap-2 tracking-[0.3em] transition-all">
                                            <Icon name="Wand2" size={18} /> {t.backToGen}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {}
                    <footer className="w-full mt-10 pt-10 pb-12 border-t border-slate-800/50 bg-black/60 backdrop-blur-md">
                        <div className="max-w-[1200px] mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
                                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                    <a href="https://www.youtube.com/@meiko1" target="_blank" className="bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-bold px-8 py-3.5 rounded-full transition-all shadow-md flex items-center gap-2 w-fit">
                                        <span>MEIKO微課頻道</span>
                                        <Icon name="Youtube" size={16}/> 
                                    </a>
                                </div>
                                <div className="text-center md:text-right">
                                    <div className="text-xs font-black text-slate-400 mb-1.5 uppercase tracking-widest">© 2026 Meiko 微課頻道 | Gemini Notebook Presentation Lab</div>
                                    <p className="text-xs text-slate-500">
                                        {t.footerLabel} <a href="https://www.youtube.com/@meiko1" target="_blank" className="text-pink-300 font-bold underline hover:text-pink-400">【Meiko微課頻道】</a>
                                    </p>
                                    {totalViews !== null && <div className="mt-5 flex justify-center md:justify-end">
                                        <div className="inline-flex items-center rounded-full border border-slate-600/80 bg-slate-950/80 px-4 py-2 text-[11px] md:text-xs font-bold text-slate-300">
                                            <span className="text-pink-300 mr-1.5">◉</span>
                                            {A('累積瀏覽次數','Total views','累計閲覧数','누적 조회수')} {totalViews.toLocaleString(language === 'zh' ? 'zh-TW' : language)}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <div className="h-[3px] bg-slate-900 w-full rounded-full overflow-hidden opacity-40">
                                <div className={`h-full ${accentBg} w-1/3`}></div>
                            </div>
                        </div>
                    </footer>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    