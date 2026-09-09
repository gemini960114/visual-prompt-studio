const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;
const SUPABASE_PROJECT_URL = 'https://kwnrkmaoqeyaappnoiwh.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_8yiNskpmUht5dGpmd7SrlQ_R03KtJeB';
const VIEW_SESSION_KEY = 'gemini-notebook-view-counted';
const Icon = ({
  name,
  size = 18,
  className = ""
}) => {
  const icons = {
    Copy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M8 17.7c0 .3.2.5.5.5h8c.3 0 .5-.5.5-.5V9c0-.3-.2-.5-.5-.5h-8c-.3 0-.5.2-.5.5v8.7Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 12c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-6Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 8h14"
    })),
    ExternalLink: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "15 3 21 3 21 9"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "10",
      x2: "21",
      y1: "14",
      y2: "3"
    })),
    Layout: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      width: "18",
      height: "18",
      x: "3",
      y: "3",
      rx: "2",
      ry: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 9h18M9 21V9"
    })),
    Sparkles: /*#__PURE__*/React.createElement("path", {
      d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
    }),
    Check: /*#__PURE__*/React.createElement("path", {
      d: "M20 6 9 17l-5-5"
    }),
    Wand2: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m14 7 3 3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 6v4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 14v4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 2v2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 8H3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 16h-4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M11 3H9"
    })),
    ZoomIn: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      x2: "16.65",
      y1: "21",
      y2: "16.65"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "11",
      x2: "11",
      y1: "8",
      y2: "14"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      x2: "14",
      y1: "11",
      y2: "11"
    })),
    ZoomOut: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      x2: "16.65",
      y1: "21",
      y2: "16.65"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      x2: "14",
      y1: "11",
      y2: "11"
    })),
    BarChart3: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 3v18h18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18 17V9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13 17V5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 17v-3"
    })),
    FileText: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "14 2 14 8 20 8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      x2: "8",
      y1: "13",
      y2: "13"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      x2: "8",
      y1: "17",
      y2: "17"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "10",
      x2: "8",
      y1: "9",
      y2: "9"
    })),
    Download: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "7 10 12 15 17 10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      x2: "12",
      y1: "15",
      y2: "3"
    })),
    Image: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      width: "18",
      height: "18",
      x: "3",
      y: "3",
      rx: "2",
      ry: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "9",
      r: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
    })),
    Grid3X3: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      width: "18",
      height: "18",
      x: "3",
      y: "3",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 9h18M3 15h18M9 3v18M15 3v18"
    })),
    Palette: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "13.5",
      cy: "6.5",
      r: ".5",
      fill: "currentColor"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17.5",
      cy: "10.5",
      r: ".5",
      fill: "currentColor"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "8.5",
      cy: "7.5",
      r: ".5",
      fill: "currentColor"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "6.5",
      cy: "12.5",
      r: ".5",
      fill: "currentColor"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
    })),
    Pipette: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "m2 22 1-1h3l9-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 21v-3l9-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"
    })),
    Globe: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M2 12h20"
    })),
    Terminal: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
      points: "4 17 10 11 4 5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      x2: "20",
      y1: "19",
      y2: "19"
    })),
    Sliders: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "4",
      x2: "4",
      y1: "21",
      y2: "14"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      x2: "4",
      y1: "10",
      y2: "3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      x2: "12",
      y1: "21",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      x2: "12",
      y1: "8",
      y2: "3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "20",
      x2: "20",
      y1: "21",
      y2: "16"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "20",
      x2: "20",
      y1: "12",
      y2: "3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "1",
      x2: "7",
      y1: "14",
      y2: "14"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "9",
      x2: "15",
      y1: "8",
      y2: "8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "17",
      x2: "23",
      y1: "16",
      y2: "16"
    })),
    Layers: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 2 7 12 12 22 7 12 2"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "2 17 12 22 22 17"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "2 12 12 17 22 12"
    })),
    Smile: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 14s1.5 2 4 2 4-2 4-2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "9",
      y1: "9",
      x2: "9.01",
      y2: "9"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "15",
      y1: "9",
      x2: "15.01",
      y2: "9"
    })),
    ChevronRight: /*#__PURE__*/React.createElement("path", {
      d: "m9 18 6-6-6-6"
    }),
    Info: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 16v-4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 8h.01"
    })),
    Youtube: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, icons[name] || null);
};
const hexToLum = hex => {
  const h = hex.replace('#', '');
  const v = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  if (isNaN(v)) return 1;
  return (0.299 * (v >> 16 & 255) + 0.587 * (v >> 8 & 255) + 0.114 * (v & 255)) / 255;
};
const clampByte = n => Math.max(0, Math.min(255, Math.round(n)));
const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => clampByte(x).toString(16).padStart(2, '0')).join('').toUpperCase();
const hexToRgbObj = hex => {
  const h = hex.replace('#', '');
  const v = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  if (isNaN(v)) return {
    r: 128,
    g: 128,
    b: 128
  };
  return {
    r: v >> 16 & 255,
    g: v >> 8 & 255,
    b: v & 255
  };
};
const rgbToHsv = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + 6) % 6;else if (max === g) h = (b - r) / d + 2;else h = (r - g) / d + 4;
    h *= 60;
  }
  const s = max === 0 ? 0 : d / max;
  return {
    h,
    s,
    v: max
  };
};
const hsvToRgb = (h, s, v) => {
  const c = v * s,
    x = c * (1 - Math.abs(h / 60 % 2 - 1)),
    m = v - c;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  return {
    r: clampByte((r + m) * 255),
    g: clampByte((g + m) * 255),
    b: clampByte((b + m) * 255)
  };
};
const ColorPicker = ({
  value,
  onChange,
  onClose
}) => {
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
  const handleAreaPointer = e => {
    if (!areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setSat(x);
    setVal(1 - y);
    emit(hue, x, 1 - y);
  };
  const onAreaDown = e => {
    dragRef.current = 'area';
    handleAreaPointer(e);
    const onMove = ev => {
      if (dragRef.current === 'area') handleAreaPointer(ev);
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
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
        setHue(hsv.h);
        setSat(hsv.s);
        setVal(hsv.v);
        onChange(result.sRGBHex.toUpperCase());
      }
    } catch (e) {}
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "absolute z-50 mt-2 p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-60 text-xs select-none"
  }, /*#__PURE__*/React.createElement("div", {
    ref: areaRef,
    onPointerDown: onAreaDown,
    className: "relative w-full h-32 rounded-lg cursor-crosshair overflow-hidden mb-3",
    style: {
      backgroundColor: `hsl(${hue}, 100%, 50%)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-white to-transparent"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-black to-transparent"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute w-3.5 h-3.5 rounded-full border-2 border-white shadow -translate-x-1/2 -translate-y-1/2 pointer-events-none",
    style: {
      left: `${sat * 100}%`,
      top: `${(1 - val) * 100}%`,
      backgroundColor: hex
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "360",
    value: hue,
    onChange: e => {
      const h = Number(e.target.value);
      setHue(h);
      emit(h, sat, val);
    },
    className: "w-full h-3 rounded-lg appearance-none cursor-pointer",
    style: {
      background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, window.EyeDropper && /*#__PURE__*/React.createElement("button", {
    onClick: handleEyeDropper,
    title: "\u6EF4\u7BA1\u5438\u8272",
    className: "p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Pipette",
    size: 14
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: hex,
    onChange: e => {
      const valStr = e.target.value;
      if (/^#[0-9A-Fa-f]{6}$/.test(valStr)) {
        const c = hexToRgbObj(valStr);
        const hsv = rgbToHsv(c.r, c.g, c.b);
        setHue(hsv.h);
        setSat(hsv.s);
        setVal(hsv.v);
        onChange(valStr.toUpperCase());
      }
    },
    className: "flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center font-mono text-white text-xs font-bold"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "px-2.5 py-1 bg-pink-400 hover:bg-pink-300 text-slate-950 font-bold rounded"
  }, "\u78BA\u5B9A")));
};
const palettePresets = [{
  id: 'morandi',
  name: '莫蘭迪雅緻',
  colors: ['#5B7065', '#8C9A8E', '#C4B7A6', '#D9D0C7', '#4A5859']
}, {
  id: 'macaron',
  name: '馬卡龍甜彩',
  colors: ['#FFB5C5', '#B5EAD7', '#C7CEEA', '#FFDAC1', '#E2F0CB']
}, {
  id: 'tech-blue',
  name: '未來科技藍',
  colors: ['#0A192F', '#172A45', '#303C55', '#64FFDA', '#CCD6F6']
}, {
  id: 'neon-dark',
  name: '賽博霓虹黑',
  colors: ['#121212', '#FF007F', '#00F0FF', '#FFE600', '#7000FF']
}, {
  id: 'minimal-bw',
  name: '極簡黑白灰',
  colors: ['#1A1A1A', '#333333', '#777777', '#CCCCCC', '#F8F9FA']
}, {
  id: 'warm-earth',
  name: '溫暖大地秋',
  colors: ['#3D2B1F', '#8C5A3C', '#C48B5E', '#D9B48F', '#F4EAE1']
}, {
  id: 'nordic-fresh',
  name: '北歐清新綠',
  colors: ['#1C312E', '#3D5A50', '#839D8E', '#BAD1C2', '#F2F7F4']
}, {
  id: 'classic-business',
  name: '經典海軍商務',
  colors: ['#16324F', '#2E6F95', '#F2A900', '#A9D6E5', '#F7FAFC']
}, {
  id: 'sunset-orange',
  name: '日落夕陽暖橙',
  colors: ['#4A154B', '#9E2A2B', '#E07A5F', '#F4A261', '#FBF8F5']
}];

// Metadata for Baoyu Skills
const xhsStyles = [{
  id: "notion",
  name: "Notion 簡約手繪",
  name_en: "Notion Minimal Line",
  desc: "簡約黑色線條手繪、高質感白底或淡米色、黑白灰加單一強調色，適合知識卡片與 SaaS。",
  img: "./assets/screenshots/xhs-images-styles/notion.webp"
}, {
  id: "cute",
  name: "可愛療癒卡通",
  name_en: "Cute & Cozy Cartoon",
  desc: "圓潤線條、粉嫩配色、親切可愛的角色插圖，社群親和力第一。",
  img: "./assets/screenshots/xhs-images-styles/cute.webp"
}, {
  id: "fresh",
  name: "清新草木手繪",
  name_en: "Fresh Botanical",
  desc: "清新自然、淡綠與原木色系、柔和水彩與手繪插圖，適合生活、健康主題。",
  img: "./assets/screenshots/xhs-images-styles/fresh.webp"
}, {
  id: "warm",
  name: "溫暖溫馨繪本",
  name_en: "Warm Storybook",
  desc: "溫暖手繪風、大地暖色調、細膩光影，適合心理勵志、個人成長。",
  img: "./assets/screenshots/xhs-images-styles/warm.webp"
}, {
  id: "minimal",
  name: "極簡商務現代",
  name_en: "Modern Minimalist",
  desc: "充足留白、精煉幾何圖形、高對比文字排版，適合專業商務與高管簡報。",
  img: "./assets/screenshots/xhs-images-styles/minimal.webp"
}, {
  id: "retro",
  name: "復古紙質版畫",
  name_en: "Retro Printmaking",
  desc: "美式復古插畫、半色調網點 (Halftone)、泛黃紙張紋理，懷舊感滿分。",
  img: "./assets/screenshots/xhs-images-styles/retro.webp"
}, {
  id: "pop",
  name: "波普普普潮流",
  name_en: "Pop Art Modern",
  desc: "高飽和撞色、粗黑描邊、動態標籤元素，搶眼度極高。",
  img: "./assets/screenshots/xhs-images-styles/pop.webp"
}, {
  id: "bold",
  name: "強烈對比漫畫",
  name_en: "Bold Graphic Comic",
  desc: "漫畫網點、黑白高對比、強烈視覺張力與動態感。",
  img: "./assets/screenshots/xhs-images-styles/bold.webp"
}, {
  id: "chalkboard",
  name: "彩色黑板粉筆",
  name_en: "Chalkboard Tutorial",
  desc: "黑板底色、彩色粉筆質感手寫標註、教學拆解感強。",
  img: "./assets/screenshots/xhs-images-styles/chalkboard.webp"
}];
const xhsLayouts = [{
  id: "dense",
  name: "密集乾貨知識卡",
  name_en: "Dense Knowledge",
  desc: "容納 5-8 個重點，結構分明、資訊量大，最受社群收藏的乾貨排版。",
  img: "./assets/screenshots/xhs-images-layouts/dense.webp"
}, {
  id: "list",
  name: "條列要點清單卡",
  name_en: "Key Points List",
  desc: "4-7 項清晰編號清單、搭配圖示標籤，易讀性極高。",
  img: "./assets/screenshots/xhs-images-layouts/list.webp"
}, {
  id: "comparison",
  name: "雙欄對照比較卡",
  name_en: "Comparison Matrix",
  desc: "左右分欄對比、優缺點或正確/錯誤對比，視覺衝擊力強。",
  img: "./assets/screenshots/xhs-images-layouts/comparison.webp"
}, {
  id: "flow",
  name: "步驟流程教學卡",
  name_en: "Step-by-Step Flow",
  desc: "3-6 步順序箭頭導引、新手指南與工作流的最佳展示方式。",
  img: "./assets/screenshots/xhs-images-layouts/flow.webp"
}, {
  id: "balanced",
  name: "圖文平衡標準卡",
  name_en: "Balanced Card",
  desc: "3-4 個重點、圖文各半、閱讀體驗舒適流暢。",
  img: "./assets/screenshots/xhs-images-layouts/balanced.webp"
}, {
  id: "sparse",
  name: "大字金句封面卡",
  name_en: "Sparse Cover Quote",
  desc: "1-2 個核心金句或大標題，視覺穿透力強，適合作為第 1 張封面小卡。",
  img: "./assets/screenshots/xhs-images-layouts/sparse.webp"
}];
const infographicStyles = [{
  id: "craft-handmade",
  name: "手作紙藝插畫",
  name_en: "Craft Handmade",
  desc: "手繪拼貼、剪紙質感、溫暖人情味與工藝美學（預設首選）。",
  img: "./assets/screenshots/infographic-styles/craft-handmade.webp"
}, {
  id: "claymation",
  name: "3D 黏土定格動畫",
  name_en: "3D Claymation",
  desc: "立體黏土人偶與物件、柔和陰影、定格動畫童趣質感。",
  img: "./assets/screenshots/infographic-styles/claymation.webp"
}, {
  id: "kawaii",
  name: "日系卡哇伊",
  name_en: "Kawaii Cute",
  desc: "日系萌系插畫、粉嫩色彩、圓潤造型，吸引年輕族群。",
  img: "./assets/screenshots/infographic-styles/kawaii.webp"
}, {
  id: "storybook-watercolor",
  name: "童話繪本水彩",
  name_en: "Storybook Watercolor",
  desc: "柔和渲染水彩、童話手繪筆觸、自然溫暖又富有藝術氣息。",
  img: "./assets/screenshots/infographic-styles/storybook-watercolor.webp"
}, {
  id: "chalkboard",
  name: "彩色黑板粉筆",
  name_en: "Chalkboard Guide",
  desc: "深色黑板底色、多彩粉筆手繪圖解、教學與知識解說感極佳。",
  img: "./assets/screenshots/infographic-styles/chalkboard.webp"
}, {
  id: "cyberpunk-neon",
  name: "賽博霓虹未來感",
  name_en: "Cyberpunk Neon",
  desc: "深黑科技底、發光霓虹線條、暗夜高對比，適合前沿科技與 Web3。",
  img: "./assets/screenshots/infographic-styles/cyberpunk-neon.webp"
}, {
  id: "bold-graphic",
  name: "美漫波普網點",
  name_en: "Bold Graphic Comic",
  desc: "經典漫畫風格、半色調網點、粗獷輪廓線與強烈對比色。",
  img: "./assets/screenshots/infographic-styles/bold-graphic.webp"
}, {
  id: "aged-academia",
  name: "復古科學素描",
  name_en: "Aged Academia",
  desc: "泛黃牛皮紙、達文西式精密鋼筆手繪、古典學術探索感。",
  img: "./assets/screenshots/infographic-styles/aged-academia.webp"
}, {
  id: "corporate-memphis",
  name: "科技大廠扁平風",
  name_en: "Corporate Memphis",
  desc: "當代科技巨頭最愛的扁平幾何人物、鮮明色塊、專業友善。",
  img: "./assets/screenshots/infographic-styles/corporate-memphis.webp"
}, {
  id: "technical-schematic",
  name: "工程藍圖透視",
  name_en: "Technical Schematic",
  desc: "等距 3D 視角、精確架構藍圖、硬核科技與系統拆解必備。",
  img: "./assets/screenshots/infographic-styles/technical-schematic.webp"
}, {
  id: "origami",
  name: "幾何折紙立體",
  name_en: "Origami Papercraft",
  desc: "多邊形折紙造型、銳利光影刻面、現代幾何設計感。",
  img: "./assets/screenshots/infographic-styles/origami.webp"
}, {
  id: "pixel-art",
  name: "復古像素點陣",
  name_en: "Pixel Art 8-Bit",
  desc: "8-bit 懷舊遊戲像素畫、geek 感強烈、有趣耐看。",
  img: "./assets/screenshots/infographic-styles/pixel-art.webp"
}, {
  id: "ui-wireframe",
  name: "UI 界面線框圖",
  name_en: "UI Wireframe",
  desc: "灰階線框原型、乾淨卡片元件、產品經理與設計師最愛。",
  img: "./assets/screenshots/infographic-styles/ui-wireframe.webp"
}, {
  id: "subway-map",
  name: "地鐵拓撲線路圖",
  name_en: "Subway Transit Map",
  desc: "倫敦地鐵風格拓撲圖、彩色線路節點、流程網絡極佳展示法。",
  img: "./assets/screenshots/infographic-styles/subway-map.webp"
}, {
  id: "ikea-manual",
  name: "IKEA 組裝說明書風",
  name_en: "IKEA Assembly Manual",
  desc: "極簡黑白線條、零文字直覺裝配圖解、幽默而直觀。",
  img: "./assets/screenshots/infographic-styles/ikea-manual.webp"
}, {
  id: "knolling",
  name: "物件俯拍平鋪",
  name_en: "Knolling Overhead",
  desc: "將所有零組件90度直角整齊排列俯瞰、強迫症極度舒適。",
  img: "./assets/screenshots/infographic-styles/knolling.webp"
}, {
  id: "lego-brick",
  name: "樂高積木拼砌",
  name_en: "Lego Brick World",
  desc: "繽紛積木塊拼接出的知識模型、寓教於樂。",
  img: "./assets/screenshots/infographic-styles/lego-brick.webp"
}];
const infographicLayouts = [{
  id: "bento-grid",
  name: "便當盒網格佈局",
  name_en: "Bento Grid",
  desc: "Apple 發表會最愛的多區塊卡片組合，適合多主題綜觀。",
  img: "./assets/screenshots/infographic-layouts/grid-cards.webp"
}, {
  id: "funnel",
  name: "轉化與篩選漏斗",
  name_en: "Conversion Funnel",
  desc: "層層遞進篩選、流量轉化、用戶旅程各階段數據分析。",
  img: "./assets/screenshots/infographic-layouts/funnel.webp"
}, {
  id: "pyramid",
  name: "層級金字塔",
  name_en: "Hierarchy Pyramid",
  desc: "馬斯洛需求、知識體系層次、底層基石至頂層目標。",
  img: "./assets/screenshots/infographic-layouts/pyramid.webp"
}, {
  id: "timeline-horizontal",
  name: "水平時間軸里程碑",
  name_en: "Timeline Roadmap",
  desc: "歷史演進、產品發佈路線圖、專案階段發展歷程。",
  img: "./assets/screenshots/infographic-layouts/timeline-horizontal.webp"
}, {
  id: "journey-path",
  "name": "曲折旅程道路圖",
  name_en: "Journey Path",
  desc: "蜿蜒公路貫穿各個里程碑關卡、探險地圖式展示。",
  img: "./assets/screenshots/infographic-layouts/journey-path.webp"
}, {
  id: "mind-map",
  name: "思維導圖發散樹",
  name_en: "Mind Map Radial",
  desc: "核心概念輻射發散、腦力激盪與知識分支體系梳理。",
  img: "./assets/screenshots/infographic-layouts/mind-map.webp"
}, {
  id: "bridge",
  name: "跨越鴻溝問題橋",
  name_en: "Problem-Solution Bridge",
  desc: "左岸現狀困境 ➜ 橋樑解決之道 ➜ 右岸理想願景。",
  img: "./assets/screenshots/infographic-layouts/bridge.webp"
}, {
  id: "do-dont",
  name: "正確與錯誤對照",
  name_en: "Do vs Don't Table",
  desc: "綠勾正確示範 vs 紅叉錯誤雷區、教學指導一目了然。",
  img: "./assets/screenshots/infographic-layouts/do-dont.webp"
}, {
  id: "comparison-table",
  name: "多維度矩陣對比表",
  name_en: "Comparison Table",
  desc: "多方案、競品特性、規格參數橫向對決。",
  img: "./assets/screenshots/infographic-layouts/comparison-table.webp"
}, {
  id: "layers-stack",
  name: "分層架構技術棧",
  name_en: "Tech Layers Stack",
  desc: "底層基礎設施 ➜ 中間件 ➜ 應用層 ➜ 用戶介面。",
  img: "./assets/screenshots/infographic-layouts/layers-stack.webp"
}, {
  id: "iceberg",
  name: "冰山可見與隱藏模型",
  name_en: "Iceberg Model",
  desc: "水面上表象 vs 水面下龐大的根本原因與技術細節。",
  img: "./assets/screenshots/infographic-layouts/iceberg.webp"
}, {
  id: "circular-flow",
  name: "循環閉環生態圈",
  name_en: "Circular Ecosystem",
  desc: "飛輪效應、PDCA 循環、生命週期可持續流轉。",
  img: "./assets/screenshots/infographic-layouts/circular-flow.webp"
}, {
  id: "priority-quadrants",
  name: "四象限優先級矩陣",
  name_en: "Priority Quadrants",
  desc: "緊急 vs 重要、成本 vs 收益、四象限決策指南。",
  img: "./assets/screenshots/infographic-layouts/priority-quadrants.webp"
}, {
  id: "fishbone",
  name: "因果分析魚骨圖",
  name_en: "Fishbone Cause & Effect",
  desc: "品質管理、根因追蹤、問題拆解成各大支柱骨架。",
  img: "./assets/screenshots/infographic-layouts/fishbone.webp"
}, {
  id: "tree-hierarchy",
  name: "組織架構分類樹",
  name_en: "Tree Hierarchy",
  desc: "自頂向下層級架構、團隊部門與分類目錄樹。",
  img: "./assets/screenshots/infographic-layouts/tree-hierarchy.webp"
}, {
  id: "venn",
  name: "概念重疊韋恩圖",
  name_en: "Venn Diagram",
  desc: "兩者或三者交集、甜蜜點（Sweet Spot）發現法。",
  img: "./assets/screenshots/infographic-layouts/venn.webp"
}, {
  id: "scale-balance",
  name: "天平權衡利弊圖",
  name_en: "Balance Scale",
  desc: "天平兩側稱重、風險與機會、成本與價值的理性衡量。",
  img: "./assets/screenshots/infographic-layouts/scale-balance.webp"
}, {
  id: "equation",
  name: "公式拆解與輸入輸出",
  name_en: "Visual Equation",
  desc: "A + B + C = 成功結果，直觀圖解價值公式。",
  img: "./assets/screenshots/infographic-layouts/equation.webp"
}, {
  id: "feature-list",
  name: "產品特點幾何列表",
  name_en: "Feature Showcase",
  desc: "核心亮點圖示化、產品優勢與規格展示卡片。",
  img: "./assets/screenshots/infographic-layouts/feature-list.webp"
}, {
  id: "nested-circles",
  name: "影響力同心圓",
  name_en: "Nested Circles",
  desc: "由核心向外擴散的層層影響圈層（黃金圈法則）。",
  img: "./assets/screenshots/infographic-layouts/nested-circles.webp"
}];
const coverStyles = [{
  id: "typography",
  name: "大字體排版海報",
  name_en: "Bold Typography",
  desc: "強大的字體層級、大膽的主標題、現代網格排版，宣傳海報首選。",
  img: "./assets/screenshots/cover-image-styles/bold-editorial.webp"
}, {
  id: "minimal",
  name: "北歐簡約高質感",
  name_en: "Nordic Minimalist",
  desc: "純淨背景、講究留白、優雅幾何色塊與精緻線條，適合高階商務。",
  img: "./assets/screenshots/cover-image-styles/minimal.webp"
}, {
  id: "notion",
  name: "Notion 知識手繪風",
  name_en: "Notion Line Art",
  desc: "知性簡約手繪插圖、黑白線稿加點綴色、科技與生產力最愛。",
  img: "./assets/screenshots/cover-image-styles/notion.webp"
}, {
  id: "dark-atmospheric",
  name: "暗黑大氣科技海報",
  name_en: "Dark Atmospheric",
  desc: "深色背景、微光粒子、高對比電影質感、氣勢磅礡。",
  img: "./assets/screenshots/cover-image-styles/dark-atmospheric.webp"
}, {
  id: "blueprint",
  name: "工程藍圖科技海報",
  name_en: "Blueprint Architecture",
  desc: "工程藍底白線、精密幾何格線、架構與技術發表會大作。",
  img: "./assets/screenshots/cover-image-styles/blueprint.webp"
}, {
  id: "vector-illustration",
  name: "精緻扁平向量插畫",
  name_en: "Vector Illustration",
  desc: "現代向量插畫、豐富細節、友善而富有活力、適合品牌行銷。",
  img: "./assets/screenshots/cover-image-styles/vector-illustration.webp"
}, {
  id: "watercolor",
  name: "唯美藝術水彩",
  name_en: "Artistic Watercolor",
  desc: "優雅水彩暈染、手感藝術、人文與生活風格封面首選。",
  img: "./assets/screenshots/cover-image-styles/watercolor.webp"
}, {
  id: "chalkboard",
  name: "粉筆黑板手繪",
  name_en: "Chalkboard Concept",
  desc: "黑板底紋、彩色手寫粉筆字、教學活動與講座海報。",
  img: "./assets/screenshots/cover-image-styles/chalkboard.webp"
}, {
  id: "retro",
  name: "復古美式版畫",
  name_en: "Retro Vintage",
  desc: "做舊質感、復古配色、經典廣告海報韻味。",
  img: "./assets/screenshots/cover-image-styles/retro.webp"
}, {
  id: "pixel-art",
  name: "8-Bit 像素懷舊",
  name_en: "Pixel Art 8-Bit",
  desc: "像素復古風格、遊戲感與開發者文化氛圍十足。",
  img: "./assets/screenshots/cover-image-styles/pixel-art.webp"
}];
const App = () => {
  const [mode, setMode] = useState('xhs'); // 'xhs' | 'infographic' | 'cover'
  const [subTab, setSubTab] = useState('style'); // 'style' | 'layout' | 'gallery'
  const [language, setLanguage] = useState('zh');
  const [totalViews, setTotalViews] = useState(null);

  // Form States
  const [topic, setTopic] = useState('自媒體高說服力視覺小卡設計指南');
  const [subtitle, setSubtitle] = useState('掌握黃金佈局與吸睛色彩，LINE 推播開信率提升 300%');
  const [content, setContent] = useState('1. 明確核心觀點與大標題吸引眼球\n2. 限制單卡重點在 3-4 個以內避免認知過載\n3. 採用高對比調色盤確保手機端清晰易讀\n4. 搭配具象化插圖與步驟箭頭引導視覺流\n5. 尾頁設置強烈行動召喚 (CTA)');
  const [cardCount, setCardCount] = useState(5);
  const [aspectRatio, setAspectRatio] = useState('1:1');

  // Selections
  const [selectedXhsStyle, setSelectedXhsStyle] = useState('notion');
  const [selectedXhsLayout, setSelectedXhsLayout] = useState('list');
  const [selectedInfoStyle, setSelectedInfoStyle] = useState('craft-handmade');
  const [selectedInfoLayout, setSelectedInfoLayout] = useState('bento-grid');
  const [selectedCoverStyle, setSelectedCoverStyle] = useState('typography');
  const [coverType, setCoverType] = useState('hero');
  const [coverRendering, setCoverRendering] = useState('flat-vector');
  const [coverTextLevel, setCoverTextLevel] = useState('title-subtitle');
  const [coverMood, setCoverMood] = useState('balanced');

  // Palette
  const [palette, setPalette] = useState(palettePresets[1].colors); // Macaron default
  const [editingColorIdx, setEditingColorIdx] = useState(null);

  // Modal & Feedback
  const [copied, setCopied] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  // Auto-update aspect ratio when mode changes
  const handleModeChange = newMode => {
    setMode(newMode);
    if (newMode === 'xhs') setAspectRatio('1:1');else if (newMode === 'infographic') setAspectRatio('9:16');else if (newMode === 'cover') setAspectRatio('1:1');
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
    }).then(r => r.json()).then(c => {
      if (!alreadyCounted) sessionStorage.setItem(VIEW_SESSION_KEY, '1');
      if (Number.isFinite(Number(c))) setTotalViews(Number(c));
    }).catch(() => {});
  }, []);

  // Generate CLI command
  const generatedCli = useMemo(() => {
    const cleanTopic = topic.replace(/"/g, '\\"');
    if (mode === 'xhs') {
      return `/baoyu-xhs-images "${cleanTopic}" --style ${selectedXhsStyle} --layout ${selectedXhsLayout} --count ${cardCount} --aspect ${aspectRatio}`;
    } else if (mode === 'infographic') {
      return `/baoyu-infographic "${cleanTopic}" --layout ${selectedInfoLayout} --style ${selectedInfoStyle} --aspect ${aspectRatio}`;
    } else {
      return `/baoyu-cover-image "${cleanTopic}" --type ${coverType} --style ${selectedCoverStyle} --rendering ${coverRendering} --text ${coverTextLevel} --mood ${coverMood} --aspect ${aspectRatio}`;
    }
  }, [mode, topic, selectedXhsStyle, selectedXhsLayout, cardCount, aspectRatio, selectedInfoLayout, selectedInfoStyle, coverType, selectedCoverStyle, coverRendering, coverTextLevel, coverMood]);

  // Generate structured full Prompt
  const generatedPrompt = useMemo(() => {
    const palHex = palette.join(', ');
    if (mode === 'xhs') {
      const st = xhsStyles.find(s => s.id === selectedXhsStyle) || xhsStyles[0];
      const lay = xhsLayouts.find(l => l.id === selectedXhsLayout) || xhsLayouts[0];
      return `### 🎯 任務目標：LINE 小卡 / 社群知識圖卡系列生成
你是一位精通小紅書、LINE 官方帳號輪播小卡與社群知識圖文的頂級視覺設計專家。
請依據以下參數與文案，為主題「${topic}」規劃一套共 ${cardCount} 張的系列圖卡視覺規格與生圖提示詞：

### 📐 規格設定
- **視覺風格 (Style)**：${st.name} (${st.id}) - ${st.desc}
- **版面佈局 (Layout)**：${lay.name} (${lay.id}) - ${lay.desc}
- **卡片長寬比 (Aspect Ratio)**：${aspectRatio}（${aspectRatio === '1:1' ? 'LINE 官方帳號標準 1:1 方形圖卡 / 輪播小卡' : '3:4 直式社群圖卡'}）
- **指定調色盤代碼 (Palette)**：${palHex}
- **系列卡片張數**：共 ${cardCount} 張連續圖卡

### 📝 核心文案內容
${content}

### 🎨 各頁視覺與分鏡規劃
1. **P.1 [封面小卡]**：以強烈大標題「${topic}」為視覺主導，副標為「${subtitle}」，搭配核心概念插圖，邊框乾淨，留白適中。
2. **P.2 ~ P.${cardCount - 1} [內容小卡]**：採用 ${lay.name} 佈局，每頁展示 1-2 個核心要點，搭配清爽條列標籤、微插圖與高對比重要字詞。
3. **P.${cardCount} [結尾行動卡]**：統整全篇要點金句，並加上「收藏、轉發分享、點擊連結領取完整懶人包」之清晰 Call To Action (CTA)。

### 🖼️ AI 生圖提示詞 (Midjourney / Flux / Gemini / 通義萬相)
Prompt: A cohesive social media infographic card series of ${cardCount} cards for "${topic}", aesthetic style is ${st.id} with ${st.desc}, layout structure follows ${lay.id}, crisp typography, clean spacing, soothing background, harmonious color palette: ${palHex}, ultra-high quality, 8k resolution, aspect ratio ${aspectRatio}. --ar ${aspectRatio.replace(':', ':')}`;
    } else if (mode === 'infographic') {
      const st = infographicStyles.find(s => s.id === selectedInfoStyle) || infographicStyles[0];
      const lay = infographicLayouts.find(l => l.id === selectedInfoLayout) || infographicLayouts[0];
      return `### 🎯 任務目標：高密度知識資訊圖表 / 宣傳海報生成
你是一位世界級的資訊設計總監（Information Architecture & Data Visualization Designer）。
請依據以下結構規格，為主題「${topic}」設計一張架構嚴謹、一圖看懂的超高清視覺化資訊海報：

### 📐 規格設定
- **資訊結構佈局 (Layout)**：${lay.name} (${lay.id}) - ${lay.desc}
- **視覺美學風格 (Style)**：${st.name} (${st.id}) - ${st.desc}
- **海報比例 (Aspect Ratio)**：${aspectRatio}（${aspectRatio === '9:16' ? '手機直式全螢幕海報' : '直式高密度印刷圖表'}）
- **專業配色方案 (Palette)**：${palHex}

### 📝 核心主題與結構內容
主題：${topic}
核心摘要：${subtitle}
詳細內容與數據：
${content}

### 🏛️ 海報板塊分區指南
1. **頂部 Header**：震撼醒目的主標題「${topic}」，一句話金句副標「${subtitle}」，主題象徵圖騰。
2. **主體 Body**：完整體現 ${lay.name} 結構，透過模組化卡片、關聯箭頭、流程節點與資料可視化圖表清晰呈現所有知識點。
3. **底部 Footer**：權威資料來源出處、總結金句、版權標籤與行動引導。

### 🖼️ AI 生圖提示詞 (Midjourney / Flux / Gemini / 通義萬相)
Prompt: High-density information visualization poster about "${topic}", organized in ${lay.id} structure, rendered in ${st.id} artistic style, featuring clear typographic hierarchy, detailed structural diagrams, clean infographic iconography, balanced composition, palette: ${palHex}, 8k resolution, crisp vector-like clarity, aspect ratio ${aspectRatio}. --ar ${aspectRatio.replace(':', ':')}`;
    } else {
      const st = coverStyles.find(s => s.id === selectedCoverStyle) || coverStyles[0];
      return `### 🎯 任務目標：主視覺宣傳海報 / LINE 大封面生成
你是一位知名品牌視覺海報與廣告主視覺藝術總監。
請依據以下 5 維度客製化規格，為「${topic}」打造一張極具衝擊力與高級感的宣傳封面海報：

### 📐 5 維度定制規格
- **構圖類型 (Type)**：${coverType}
- **渲染手法 (Rendering)**：${coverRendering}
- **視覺風格預設 (Style)**：${st.name} (${st.id}) - ${st.desc}
- **文字排版層級 (Text Level)**：${coverTextLevel}
- **氛圍基調 (Mood)**：${coverMood}
- **尺寸長寬比 (Aspect Ratio)**：${aspectRatio}（${aspectRatio === '1:1' ? 'LINE 官方帳號 1:1 單圖推播 / 方形海報' : '寬幅宣傳看板'}）
- **專用色調 (Palette)**：${palHex}

### 📝 文案與排版資訊
主標題：「${topic}」
副標題：「${subtitle}」
說明內容：${content}

### 🖼️ AI 生圖提示詞 (Midjourney / Flux / Gemini / 通義萬相)
Prompt: Masterpiece promotional cover poster for "${topic}", ${coverType} composition with ${coverRendering} rendering, aesthetic style ${st.id}, ${coverMood} atmosphere, typography clearly reads "${topic}" with subtitle "${subtitle}", sophisticated color palette ${palHex}, dramatic cinematic lighting, perfect editorial layout, 8k resolution, award-winning graphic design, aspect ratio ${aspectRatio}. --ar ${aspectRatio.replace(':', ':')}`;
    }
  }, [mode, topic, subtitle, content, cardCount, aspectRatio, selectedXhsStyle, selectedXhsLayout, selectedInfoStyle, selectedInfoLayout, selectedCoverStyle, coverType, coverRendering, coverTextLevel, coverMood, palette]);
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'cli') {
        setCopiedCli(true);
        setTimeout(() => setCopiedCli(false), 2000);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };
  const exportMarkdown = () => {
    const blob = new Blob([generatedPrompt], {
      type: 'text/markdown;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mode}-${topic.slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const exportPdf = () => {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      alert('PDF 函式庫尚未載入完成，請稍候重試');
      return;
    }
    const doc = new window.jspdf.jsPDF();
    doc.setFontSize(16);
    doc.text(`Baoyu Visual Prompt Specification - ${mode}`, 14, 20);
    doc.setFontSize(11);
    doc.text(`Topic: ${topic}`, 14, 30);
    doc.text(`Ratio: ${aspectRatio} | Colors: ${palette.join(', ')}`, 14, 38);
    doc.text(`CLI Command:`, 14, 48);
    doc.setFontSize(9);
    doc.text(generatedCli, 14, 55, {
      maxWidth: 180
    });
    doc.setFontSize(11);
    doc.text(`Full Generation Prompt:`, 14, 70);
    doc.setFontSize(8);
    const splitText = doc.splitTextToSize(generatedPrompt, 180);
    doc.text(splitText, 14, 78);
    doc.save(`${mode}-${topic.slice(0, 8)}.pdf`);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-slate-950 text-slate-100 font-sans pb-16"
  }, /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 shadow-lg shadow-pink-500/10"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Wand2",
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-black tracking-tight text-white flex items-center gap-2"
  }, "Baoyu Visual Studio", /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-pink-400/20 text-pink-300 border border-pink-400/30"
  }, "v2.1")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "\u5BF6\u7389\u8996\u89BA\u6D77\u5831 \xD7 LINE \u5716\u5361 \xD7 \u8CC7\u8A0A\u5716\u8868 Prompt \u751F\u6210\u5668"))), /*#__PURE__*/React.createElement("div", {
    className: "flex bg-slate-900 border border-slate-800 p-1 rounded-xl"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleModeChange('xhs'),
    className: `flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'xhs' ? 'bg-pink-400 text-slate-950 shadow-md shadow-pink-400/20' : 'text-slate-400 hover:text-white'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Layers",
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "baoyu-xhs-images (\u793E\u7FA4\u5C0F\u5361)")), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleModeChange('infographic'),
    className: `flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'infographic' ? 'bg-pink-400 text-slate-950 shadow-md shadow-pink-400/20' : 'text-slate-400 hover:text-white'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "BarChart3",
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "baoyu-infographic (\u8CC7\u8A0A\u6D77\u5831)")), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleModeChange('cover'),
    className: `flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'cover' ? 'bg-pink-400 text-slate-950 shadow-md shadow-pink-400/20' : 'text-slate-400 hover:text-white'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Image",
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "baoyu-cover-image (\u4E3B\u8996\u89BA\u5C01\u9762)"))))), /*#__PURE__*/React.createElement("main", {
    className: "max-w-7xl mx-auto px-4 md:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6"
  }, /*#__PURE__*/React.createElement("section", {
    className: "lg:col-span-5 flex flex-col gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-sm font-bold text-slate-200 mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Sliders",
    size: 16,
    className: "text-pink-300"
  }), /*#__PURE__*/React.createElement("span", null, "\u4E3B\u984C\u8207\u6838\u5FC3\u5167\u5BB9\u8A2D\u5B9A")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-bold text-slate-300 mb-1"
  }, "\u4E3B\u6A19\u984C / \u6D3B\u52D5\u4E3B\u984C"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: topic,
    onChange: e => setTopic(e.target.value),
    placeholder: "\u4F8B\u5982\uFF1A\u81EA\u5A92\u9AD4\u7206\u6B3E\u9078\u984C 5 \u5927\u6CD5\u5247",
    className: "w-full bg-slate-950 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-white font-medium focus:border-pink-400 focus:outline-none transition-all"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-bold text-slate-300 mb-1"
  }, "\u526F\u6A19\u984C / \u6838\u5FC3\u4E00\u53E5\u8A71\u7D50\u8AD6"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: subtitle,
    onChange: e => setSubtitle(e.target.value),
    placeholder: "\u4F8B\u5982\uFF1A\u7CBE\u6E96\u6293\u4F4F\u8B80\u8005\u75DB\u9EDE\uFF0CLINE \u958B\u4FE1\u7387\u72C2\u98C6 300%",
    className: "w-full bg-slate-950 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-white font-medium focus:border-pink-400 focus:outline-none transition-all"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-bold text-slate-300 mb-1"
  }, "\u8A73\u7D30\u689D\u5217\u5167\u6587\u6216\u6587\u6848\u8349\u7A3F"), /*#__PURE__*/React.createElement("textarea", {
    rows: 4,
    value: content,
    onChange: e => setContent(e.target.value),
    placeholder: "\u8CBC\u4E0A\u4F60\u7684\u6587\u6848\u6BB5\u843D\u6216\u689D\u5217\u91CD\u9EDE...",
    className: "w-full bg-slate-950 border border-slate-700/70 rounded-xl p-3 text-slate-200 font-mono text-xs leading-relaxed focus:border-pink-400 focus:outline-none custom-scrollbar"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-bold text-slate-300 mb-1.5"
  }, "\u5C3A\u5BF8\u6BD4\u4F8B (Aspect Ratio)"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-2"
  }, ['1:1', '9:16', '3:4', '16:9'].map(ratio => /*#__PURE__*/React.createElement("button", {
    key: ratio,
    onClick: () => setAspectRatio(ratio),
    className: `py-2 rounded-xl text-xs font-bold border transition-all ${aspectRatio === ratio ? 'border-pink-400 bg-pink-400/10 text-pink-300 shadow-sm' : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'}`
  }, ratio, /*#__PURE__*/React.createElement("span", {
    className: "block text-[10px] font-normal text-slate-500 mt-0.5"
  }, ratio === '1:1' ? 'LINE小卡' : ratio === '9:16' ? '手機直海報' : ratio === '3:4' ? '直式圖卡' : '橫幅海報'))))), mode === 'xhs' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "font-bold text-slate-300"
  }, "\u7CFB\u5217\u5361\u7247\u5F35\u6578"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-pink-300 font-bold"
  }, cardCount, " \u5F35\u5C0F\u5361")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "1",
    max: "10",
    value: cardCount,
    onChange: e => setCardCount(Number(e.target.value)),
    className: "w-full accent-pink-400 cursor-pointer"
  })), mode === 'cover' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 pt-1"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-bold text-slate-300 mb-1"
  }, "\u69CB\u5716\u985E\u578B (Type)"), /*#__PURE__*/React.createElement("select", {
    value: coverType,
    onChange: e => setCoverType(e.target.value),
    className: "w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
  }, /*#__PURE__*/React.createElement("option", {
    value: "hero"
  }, "Hero \u82F1\u96C4\u4E3B\u5716"), /*#__PURE__*/React.createElement("option", {
    value: "typography"
  }, "Typography \u5927\u5B57\u9AD4\u6392\u7248"), /*#__PURE__*/React.createElement("option", {
    value: "conceptual"
  }, "Conceptual \u6982\u5FF5\u96B1\u55BB"), /*#__PURE__*/React.createElement("option", {
    value: "minimal"
  }, "Minimal \u6975\u7C21\u7559\u767D"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block font-bold text-slate-300 mb-1"
  }, "\u6C1B\u570D (Mood)"), /*#__PURE__*/React.createElement("select", {
    value: coverMood,
    onChange: e => setCoverMood(e.target.value),
    className: "w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
  }, /*#__PURE__*/React.createElement("option", {
    value: "balanced"
  }, "Balanced \u5747\u8861"), /*#__PURE__*/React.createElement("option", {
    value: "bold"
  }, "Bold \u5F37\u70C8\u9AD8\u5C0D\u6BD4"), /*#__PURE__*/React.createElement("option", {
    value: "subtle"
  }, "Subtle \u4F4E\u8ABF\u96C5\u81F4")))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl relative"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-sm font-bold text-slate-200 mb-3 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Palette",
    size: 16,
    className: "text-pink-300"
  }), /*#__PURE__*/React.createElement("span", null, "\u8ABF\u8272\u76E4\u8207\u8272\u5F69\u81EA\u8A02 (\u9EDE\u64CA\u8272\u584A\u8ABF\u8272)"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-5 gap-2 mb-4"
  }, palette.map((color, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "relative"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditingColorIdx(editingColorIdx === idx ? null : idx),
    className: "w-full h-12 rounded-xl shadow-md border border-white/10 flex flex-col items-center justify-end pb-1 transition-transform hover:scale-105 active:scale-95",
    style: {
      backgroundColor: color
    },
    title: `點擊調色：${color}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-mono font-black px-1 rounded",
    style: {
      color: hexToLum(color) > 0.5 ? '#000' : '#fff'
    }
  }, color)), editingColorIdx === idx && /*#__PURE__*/React.createElement(ColorPicker, {
    value: color,
    onChange: newHex => {
      const np = [...palette];
      np[idx] = newHex;
      setPalette(np);
    },
    onClose: () => setEditingColorIdx(null)
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] font-bold text-slate-400 mb-2"
  }, "\u8A2D\u8A08\u5E2B\u7CBE\u9078\u8272\u7968\u5957\u7528\uFF1A"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, palettePresets.map(preset => /*#__PURE__*/React.createElement("button", {
    key: preset.id,
    onClick: () => setPalette(preset.colors),
    className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 text-xs transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex -space-x-1"
  }, preset.colors.slice(0, 3).map((c, ci) => /*#__PURE__*/React.createElement("span", {
    key: ci,
    className: "w-2.5 h-2.5 rounded-full border border-slate-900",
    style: {
      backgroundColor: c
    }
  }))), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-300 text-[11px]"
  }, preset.name))))))), /*#__PURE__*/React.createElement("section", {
    className: "lg:col-span-7 flex flex-col gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4 border-b border-slate-800 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSubTab('style'),
    className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subTab === 'style' ? 'bg-slate-800 text-pink-300 border border-pink-400/30' : 'text-slate-400 hover:text-white'}`
  }, "\u8996\u89BA\u98A8\u683C (Styles)"), mode !== 'cover' && /*#__PURE__*/React.createElement("button", {
    onClick: () => setSubTab('layout'),
    className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subTab === 'layout' ? 'bg-slate-800 text-pink-300 border border-pink-400/30' : 'text-slate-400 hover:text-white'}`
  }, "\u7248\u9762\u4F48\u5C40 (Layouts)")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400 font-mono"
  }, mode === 'xhs' ? '9 種風格 × 6 種佈局' : mode === 'infographic' ? '17 種風格 × 20 種結構' : '10 種經典封面海報風格')), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar"
  }, (mode === 'xhs' ? subTab === 'style' ? xhsStyles : xhsLayouts : mode === 'infographic' ? subTab === 'style' ? infographicStyles : infographicLayouts : coverStyles).map(item => {
    const isSelected = mode === 'xhs' ? subTab === 'style' ? selectedXhsStyle === item.id : selectedXhsLayout === item.id : mode === 'infographic' ? subTab === 'style' ? selectedInfoStyle === item.id : selectedInfoLayout === item.id : selectedCoverStyle === item.id;
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      onClick: () => {
        if (mode === 'xhs') {
          if (subTab === 'style') setSelectedXhsStyle(item.id);else setSelectedXhsLayout(item.id);
        } else if (mode === 'infographic') {
          if (subTab === 'style') setSelectedInfoStyle(item.id);else setSelectedInfoLayout(item.id);
        } else {
          setSelectedCoverStyle(item.id);
        }
      },
      className: `cursor-pointer rounded-xl overflow-hidden border-2 transition-all group relative bg-slate-950/80 flex flex-col ${isSelected ? 'border-pink-400 shadow-[0_0_15px_rgba(249,168,212,0.3)] ring-1 ring-pink-400' : 'border-slate-800 hover:border-slate-600'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "aspect-video relative overflow-hidden bg-slate-900"
    }, /*#__PURE__*/React.createElement("img", {
      src: item.img,
      alt: item.name,
      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
      loading: "lazy"
    }), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        setZoomImage(item);
      },
      className: "absolute top-1.5 right-1.5 p-1 rounded-md bg-black/70 text-white hover:text-pink-300 transition-colors",
      title: "\u653E\u5927\u9810\u89BD"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "ZoomIn",
      size: 13
    })), isSelected && /*#__PURE__*/React.createElement("div", {
      className: "absolute top-1.5 left-1.5 bg-pink-400 text-slate-950 p-0.5 rounded-full shadow"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "Check",
      size: 12
    }))), /*#__PURE__*/React.createElement("div", {
      className: "p-2.5 flex-1 flex flex-col justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: `text-xs font-bold ${isSelected ? 'text-pink-300' : 'text-slate-200'}`
    }, item.name), /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-slate-500 font-mono"
    }, item.id)), /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] text-slate-400 line-clamp-2 mt-1"
    }, item.desc)));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-white tracking-wide"
  }, "\u5373\u6642 Prompt \u7DE8\u8B6F\u8F38\u51FA")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => copyToClipboard(generatedCli, 'cli'),
    className: "px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Terminal",
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, copiedCli ? '已複製指令！' : '複製 CLI 指令')), /*#__PURE__*/React.createElement("button", {
    onClick: () => copyToClipboard(generatedPrompt, 'prompt'),
    className: "px-3.5 py-1.5 rounded-lg bg-pink-400 hover:bg-pink-300 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-pink-400/20 transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: copied ? 'Check' : 'Copy',
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, copied ? '已複製 Prompt！' : '複製完整 Prompt')))), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-pink-300 flex items-center justify-between overflow-x-auto custom-scrollbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "truncate pr-3 select-all"
  }, generatedCli)), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("pre", {
    className: "bg-slate-950/80 border border-slate-800/60 rounded-xl p-4 text-xs font-mono text-slate-300 leading-relaxed max-h-[300px] overflow-y-auto whitespace-pre-wrap custom-scrollbar select-text"
  }, generatedPrompt)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-500 font-mono"
  }, "\u9069\u7528\u65BC\uFF1AClaude Code / Codex / Midjourney / Gemini / \u963F\u91CC\u901A\u7FA9\u842C\u76F8"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: exportMarkdown,
    className: "px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 text-xs font-bold flex items-center gap-1 transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "FileText",
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, "\u4E0B\u8F09 Markdown")), /*#__PURE__*/React.createElement("button", {
    onClick: exportPdf,
    className: "px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 text-xs font-bold flex items-center gap-1 transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Download",
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, "\u532F\u51FA PDF \u4F01\u5283\u66F8"))))))), zoomImage && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in",
    onClick: () => setZoomImage(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-b border-slate-800 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-sm text-white"
  }, zoomImage.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 font-mono"
  }, zoomImage.id)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setZoomImage(null),
    className: "text-slate-400 hover:text-white text-lg font-bold p-1"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 max-h-[70vh] flex items-center justify-center bg-slate-950 overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: zoomImage.img,
    alt: zoomImage.name,
    className: "max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-slate-300 max-w-md"
  }, zoomImage.desc), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (mode === 'xhs') {
        if (subTab === 'style') setSelectedXhsStyle(zoomImage.id);else setSelectedXhsLayout(zoomImage.id);
      } else if (mode === 'infographic') {
        if (subTab === 'style') setSelectedInfoStyle(zoomImage.id);else setSelectedInfoLayout(zoomImage.id);
      } else {
        setSelectedCoverStyle(zoomImage.id);
      }
      setZoomImage(null);
    },
    className: "px-4 py-2 rounded-xl bg-pink-400 hover:bg-pink-300 text-slate-950 font-black"
  }, "\u5957\u7528\u6B64\u98A8\u683C / \u4F48\u5C40")))), /*#__PURE__*/React.createElement("footer", {
    className: "w-full mt-16 pt-10 pb-12 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/JimLiu/baoyu-skills",
    target: "_blank",
    className: "hover:text-pink-300 font-bold transition-colors"
  }, "GitHub: JimLiu/baoyu-skills"), /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("a", {
    href: "https://www.youtube.com/@meiko1",
    target: "_blank",
    className: "hover:text-pink-300 font-bold transition-colors flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("span", null, "Meiko\u5FAE\u8AB2\u983B\u9053"), /*#__PURE__*/React.createElement(Icon, {
    name: "Youtube",
    size: 14
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-right font-mono"
  }, /*#__PURE__*/React.createElement("span", null, "Baoyu Visual Prompt Studio \xA9 2026"), totalViews !== null && /*#__PURE__*/React.createElement("span", {
    className: "ml-3 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-bold"
  }, "\u25C9 \u7D2F\u7A4D\u8A2A\u554F ", totalViews.toLocaleString())))));
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));