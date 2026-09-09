#!/usr/bin/env python3
import re
import os
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    jsx_path = os.path.join(root_dir, 'app.jsx')
    if not os.path.exists(jsx_path):
        jsx_path = '/tmp/decrypted_source.jsx'
    
    with open(jsx_path, 'r', encoding='utf-8') as f:
        code = f.read()

    drive_ids = sorted(list(set(re.findall(r'https://drive\.google\.com/thumbnail\?id=([A-Za-z0-9_\-]+)&sz=w800', code))))
    print(f"Found {len(drive_ids)} unique Google Drive thumbnails.")

    thumb_dir = os.path.join(root_dir, 'assets', 'thumbnails')
    os.makedirs(thumb_dir, exist_ok=True)

    def download_thumb(file_id):
        dest = os.path.join(thumb_dir, f"{file_id}.jpg")
        if os.path.exists(dest) and os.path.getsize(dest) > 1000:
            return file_id, True, "Already exists"
        url = f"https://drive.google.com/thumbnail?id={file_id}&sz=w800"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = resp.read()
                if len(data) > 500:
                    with open(dest, 'wb') as f:
                        f.write(data)
                    return file_id, True, f"OK ({len(data)} bytes)"
                else:
                    return file_id, False, f"Too small ({len(data)} bytes)"
        except Exception as e:
            return file_id, False, str(e)

    success_count = 0
    with ThreadPoolExecutor(max_workers=16) as executor:
        futures = {executor.submit(download_thumb, fid): fid for fid in drive_ids}
        for future in as_completed(futures):
            fid, ok, msg = future.result()
            if ok:
                success_count += 1
            else:
                print(f"Failed {fid}: {msg}")

    print(f"Finished: {success_count}/{len(drive_ids)} downloaded to {thumb_dir}")

if __name__ == '__main__':
    main()
