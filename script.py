import re

# Update cardiology HTML
html_path = 'c:/Users/Veer/Desktop/office/NHS_LP_NEW/cardiology-treatment/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<a class=\"text-link\" href=\"#book\">.*?</a>', '', content)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Update nephrology HTML (just in case)
html_path2 = 'c:/Users/Veer/Desktop/office/NHS_LP_NEW/nephrology-treatment/index.html'
with open(html_path2, 'r', encoding='utf-8') as f:
    content2 = f.read()

content2 = re.sub(r'<a class=\"text-link\" href=\"#book\">.*?</a>', '', content2)

with open(html_path2, 'w', encoding='utf-8') as f:
    f.write(content2)

# Update CSS
css_path = 'c:/Users/Veer/Desktop/office/NHS_LP_NEW/assets/specialty.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

css = re.sub(r'grid-template-columns:repeat\([0-9]+,minmax\(0,1fr\)\)', r'grid-template-columns:repeat(2,minmax(0,1fr))', css)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print('Done')
