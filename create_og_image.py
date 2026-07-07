from PIL import Image, ImageDraw, ImageFont
import os

# OG Image size: 1200x630
width, height = 1200, 630
img = Image.new('RGB', (width, height), '#064e3b')  # Dark emerald background
draw = ImageDraw.Draw(img)

# Try to find Korean fonts
font_paths = [
    'C:/Windows/Fonts/malgunbd.ttf',  # Malgun Gothic Bold
    'C:/Windows/Fonts/malgun.ttf',    # Malgun Gothic
    'C:/Windows/Fonts/gulim.ttc',     # Gulim
    'C:/Windows/Fonts/batang.ttc',    # Batang
]

def get_font(size, bold=True):
    for fp in font_paths:
        if os.path.exists(fp):
            if bold and 'bd' in fp.lower():
                return ImageFont.truetype(fp, size)
            elif not bold:
                return ImageFont.truetype(fp, size)
    return ImageFont.load_default()

font_title = get_font(48, bold=True)
font_subtitle = get_font(28, bold=True)
font_small = get_font(20, bold=False)
font_badge = get_font(18, bold=True)
font_brand = get_font(36, bold=True)

# Background gradient effect - top darker, bottom slightly lighter
for y in range(height):
    ratio = y / height
    r = int(6 + ratio * 10)
    g = int(78 + ratio * 30)
    b = int(59 + ratio * 20)
    draw.line([(0, y), (width, y)], fill=(r, g, b))

# Top accent bar (gold)
draw.rectangle([(0, 0), (width, 8)], fill='#FFD700')

# EU GMP Badge area (top-left)
draw.rounded_rectangle([(30, 25), (200, 95)], radius=10, fill='#1a1a2e', outline='#FFD700', width=2)
draw.text((45, 35), 'EUROPEAN UNION', fill='#FFD700', font=font_badge)
draw.text((75, 58), 'GMP', fill='white', font=get_font(28, bold=True))

# Brand name (top-right)
draw.text((820, 35), '로타갈', fill='#FFD700', font=get_font(42, bold=True))
draw.text((1020, 45), '®', fill='#FFD700', font=get_font(20, bold=True))
draw.text((820, 72), 'ROTAGAL', fill='white', font=get_font(18, bold=True))

# Main headline - pain point
draw.text((60, 130), '송아지 설사로', fill='white', font=font_title)
draw.text((60, 185), '매년 수십억 손실?', fill='#FF6B6B', font=font_title)

# Solution text
draw.text((60, 270), '임신우 분만 전 단 1회 접종으로', fill='#90EE90', font=font_subtitle)
draw.text((60, 310), '로타·코로나·대장균 완벽 예방!', fill='white', font=font_subtitle)

# Key features with checkmarks
features = [
    '✓ 3종 혼합백신 (로타바이러스 + 코로나 + 대장균 K99)',
    '✓ 국내 발생 82% G6P5 혈청형 완벽 방어',
    '✓ EU GMP 인증 · 유럽 오리지널 품질',
    '✓ 24개월 넉넉한 유통기한',
]

y_pos = 380
for feature in features:
    draw.text((60, y_pos), feature, fill='#E0FFE0', font=font_small)
    y_pos += 38

# Bottom CTA bar
draw.rectangle([(0, 560), (width, 630)], fill='#FFD700')
draw.text((60, 575), '한우 농가의 든든한 파트너', fill='#064e3b', font=get_font(28, bold=True))
draw.text((500, 580), 'hongsoonil02-maker.github.io/rotagal/', fill='#064e3b', font=get_font(18, bold=False))

# Decorative elements - right side vaccine bottle silhouette
draw.rounded_rectangle([(900, 150), (1150, 530)], radius=20, fill='#0a3d2e', outline='#2d8a5e', width=3)
draw.text((940, 200), 'ROTAGAL', fill='#FFD700', font=get_font(24, bold=True))
draw.text((940, 240), '송아지 설사병', fill='white', font=get_font(18, bold=True))
draw.text((940, 270), '3종 혼합백신', fill='white', font=get_font(18, bold=True))
draw.text((940, 320), '3mL', fill='#90EE90', font=get_font(36, bold=True))
draw.text((940, 370), '근육접종', fill='white', font=get_font(16, bold=False))
draw.text((940, 410), '원샷', fill='#FFD700', font=get_font(28, bold=True))
draw.text((940, 450), '1회 접종', fill='white', font=get_font(16, bold=False))

# Save
output_path = os.path.join('public', 'rotagal_og_new.jpg')
img.save(output_path, 'JPEG', quality=95)
print(f'OG image saved to {output_path}')
print(f'Image size: {img.size}')
