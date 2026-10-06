import re

css_path = 'c:/Users/Veer/Desktop/office/NHS_LP_NEW/assets/specialty.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Base
css = css.replace('.specialty-page .services{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;border:0;background:none;overflow:visible}', 
                  '.specialty-page .services{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;border:0;background:none;overflow:visible}')

# 1100px
css = css.replace('.specialty-page .services{grid-template-columns:repeat(2,minmax(0,1fr))}.specialty-visit-strip', 
                  '.specialty-page .services{grid-template-columns:repeat(3,minmax(0,1fr))}.specialty-visit-strip')

# We'll leave the 600px one as repeat(2,minmax(0,1fr)) 
# Wait, let me double check the 1100px replace context
# In the log it was: .specialty-page .services{grid-template-columns:repeat(2,minmax(0,1fr))}.specialty-visit-strip{flex-wrap:wrap}

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print('Done')
