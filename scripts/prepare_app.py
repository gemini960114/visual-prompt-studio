#!/usr/bin/env python3
import os
import re

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    raw_path = os.path.join(root, 'app.raw.jsx')
    with open(raw_path, 'r', encoding='utf-8') as f:
        code = f.read()

    # Add helper function
    top_helper = '''
        const getSlideAssetUrl = (url) => {
            if (!url || typeof url !== 'string') return url;
            const m = url.match(/id=([A-Za-z0-9_-]+)/);
            if (m) {
                return './assets/thumbnails/' + m[1] + '.jpg';
            }
            return url;
        };
'''
    code = code.replace(
        "const VIEW_SESSION_KEY = 'gemini-notebook-view-counted';",
        "const VIEW_SESSION_KEY = 'gemini-notebook-view-counted';\n" + top_helper,
        1
    )

    # Logo replacements
    m_meiko = re.search(r'const meikoLogo = ["\'](https://[^"\']+)["\'];', code)
    if m_meiko:
        remote_meiko = m_meiko.group(1)
        code = code.replace(
            m_meiko.group(0),
            f'const meikoLogoRemote = "{remote_meiko}";\n        const meikoLogo = "./assets/images/Meiko_logo.png";',
            1
        )

    m_nb = re.search(r'const notebookLMLogo = ["\'](https://[^"\']+)["\'];', code)
    if m_nb:
        remote_nb = m_nb.group(1)
        code = code.replace(
            m_nb.group(0),
            f'const notebookLMLogoRemote = "{remote_nb}";\n        const notebookLMLogo = "./assets/images/notebooklm.png";',
            1
        )

    code = code.replace(
        'src={notebookLMLogo}',
        'src={notebookLMLogo} onError={(e) => { if (!e.currentTarget.dataset.retried) { e.currentTarget.dataset.retried = "1"; e.currentTarget.src = notebookLMLogoRemote; } }}'
    )

    code = code.replace(
        'src={meikoLogo} alt="Meiko Logo"',
        'src={meikoLogo} onError={(e) => { if (!e.currentTarget.dataset.retried) { e.currentTarget.dataset.retried = "1"; e.currentTarget.src = meikoLogoRemote; } }} alt="Meiko Logo"'
    )

    code = code.replace(
        "src={thumb.replace('sz=w800', 'sz=w400')}",
        "src={getSlideAssetUrl(thumb)} onError={(e) => { if (!e.currentTarget.dataset.retried) { e.currentTarget.dataset.retried = '1'; e.currentTarget.src = thumb.replace('sz=w800', 'sz=w400'); } }}"
    )

    code = code.replace(
        "src={slide.replace('sz=w800', 'sz=w200')}",
        "src={getSlideAssetUrl(slide)} onError={(e) => { if (!e.currentTarget.dataset.retried) { e.currentTarget.dataset.retried = '1'; e.currentTarget.src = slide.replace('sz=w800', 'sz=w200'); } }}"
    )

    code = re.sub(
        r'src=\{slide\}\s*\n\s*className=\{`absolute inset-0',
        r'src={getSlideAssetUrl(slide)} onError={(e) => { if (!e.currentTarget.dataset.retried) { e.currentTarget.dataset.retried = "1"; e.currentTarget.src = slide; } }}\n                                                                className={`absolute inset-0',
        code
    )

    app_jsx_path = os.path.join(root, 'app.jsx')
    with open(app_jsx_path, 'w', encoding='utf-8') as f:
        f.write(code)

    print(f"app.jsx successfully generated at {app_jsx_path}, size: {len(code)}")

if __name__ == '__main__':
    main()
