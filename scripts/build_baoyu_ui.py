import os
import json

# Let's inspect the original app.jsx to extract reusable utility components (Icon, ColorPicker, etc.)
with open('/home/ubuntu/github/notebooklm/app.jsx', 'r', encoding='utf-8') as f:
    orig_code = f.read()

print("Original code length:", len(orig_code))
