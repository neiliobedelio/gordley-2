import os
import glob
import re

def update_html_files():
    base_dir = '/Users/neil/gordley-2'
    
    # Files to process
    html_files = []
    for root, dirs, files in os.walk(base_dir):
        if 'node_modules' in root or '.git' in root or '.gemini' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
                
    # Regex to match the header and mobile menu
    header_pattern = re.compile(r'(<!-- Header -->\s*)?<header.*?id="navbar".*?</header>\s*(<!-- Mobile Menu Overlay -->\s*)?<div[^>]*id="mobile-menu"[^>]*>.*?</div>', re.DOTALL)
    
    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        if header_pattern.search(content):
            content = header_pattern.sub('<site-header></site-header>', content)
            modified = True
            
        # Add script tag
        is_nested = '/case-studies/' in file_path
        script_path = '../../js/header-component.js' if is_nested else 'js/header-component.js'
        main_js_path = '../../js/main.js' if is_nested else 'js/main.js'
        
        script_tag = f'<script src="{script_path}"></script>\n    <script src="{main_js_path}"></script>'
        if f'<script src="{script_path}"></script>' not in content and f'<script src="{main_js_path}"></script>' in content:
            content = content.replace(f'<script src="{main_js_path}"></script>', script_tag)
            modified = True
            
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {file_path}')

if __name__ == "__main__":
    update_html_files()
