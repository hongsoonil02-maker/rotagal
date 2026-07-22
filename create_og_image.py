from PIL import Image, ImageDraw, ImageFont
import os

# OG Image size: 1200x630
width, height = 1200, 630
# Background: Rich Dark Green with strong contrast
img = Image.new('RGB', (width, height), '#063826') 
draw = ImageDraw.Draw(img)

# Font paths
font_paths = [
    'C:/Windows/Fonts/malgunbd.ttf',  # Malgun Gothic Bold
    'C:/Windows/Fonts/malgun.ttf',    # Malgun Gothic
]

def get_font(size, bold=True):
    for fp in font_paths:
        if os.path.exists(fp):
            if bold and 'bd' in fp.lower():
                return ImageFont.truetype(fp, size)
            elif not bold and 'bd' not in fp.lower():
                return ImageFont.truetype(fp, size)
    return ImageFont.load_default()

font_header_tag = get_font(26, bold=True)
font_hero_big = get_font(52, bold=True)
font_hero_accent = get_font(56, bold=True)
font_desc = get_font(32, bold=True)
font_bullet = get_font(28, bold=True)
font_badge = get_font(24, bold=True)

# 1. Top border accent bar
draw.rectangle([(0, 0), (width, 14)], fill='#FFE600')

# 2. Header Badges / Branding
# Left Badge: EU GMP 인증
draw.rounded_rectangle([(40, 35), (250, 85)], radius=12, fill='#1e293b', outline='#FFE600', width=3)
draw.text((60, 46), 'EU GMP 인증', fill='#FFE600', font=font_header_tag)

# Right Badge: 브랜드명
draw.text((850, 42), '로타갈 (ROTAGAL)', fill='#FFFFFF', font=get_font(30, bold=True))

# 3. Left Column: Core Value Proposition (Big & Bold for High Readability)
# Headline Block
draw.text((40, 115), '송아지 설사병 예방', fill='#A7F3D0', font=font_desc)
draw.text((40, 165), '어미소 단 1회 접종!', fill='#FFE600', font=font_hero_accent)

# Key Selling Points Box (High contrast container)
draw.rounded_rectangle([(40, 255), (750, 530)], radius=20, fill='#04271a', outline='#10B981', width=3)

bullets = [
    ('[특장점] 마리당 1만원 이상 약값 절감!', '#FFFFFF'),
    ('[3종방어] 로타 · 코로나 · 대장균 예방', '#FFE600'),
    ('[원샷접종] 2회 접종 번거로움 제로!', '#A7F3D0'),
    ('[임상검증] 국내 수의과대학 임상 통과', '#FFFFFF'),
]

y_start = 280
for text, color in bullets:
    draw.text((70, y_start), text, fill=color, font=font_bullet)
    y_start += 58

# 4. Right Column: High visual punchy badge/card for "1회 접종 원샷"
card_left, card_right = 790, 1160
card_center_x = (card_left + card_right) // 2

draw.rounded_rectangle([(card_left, 115), (card_right, 530)], radius=24, fill='#FFE600', outline='#FFFFFF', width=4)

# Content inside Yellow Card (Centered & Extra Bold)
font_card_sub = get_font(28, bold=True)
font_card_oneshot = get_font(32, bold=True)
font_card_huge = get_font(74, bold=True)
font_card_mid = get_font(44, bold=True)
font_price = get_font(32, bold=True)

# 1) 한우농가 강력추천
draw.text((card_center_x, 160), '한우농가 강력추천', fill='#063826', font=font_card_sub, anchor='mm')
draw.line([(card_left + 35, 195), (card_right - 35, 195)], fill='#063826', width=3)

# 2) 원샷(One-Shot)
draw.text((card_center_x, 235), '원샷(One-Shot)', fill='#B45309', font=font_card_oneshot, anchor='mm')

# 3) 단 1회
draw.text((card_center_x, 310), '단 1회', fill='#063826', font=font_card_huge, anchor='mm')

# 4) 접종백신
draw.text((card_center_x, 395), '접종백신', fill='#063826', font=font_card_mid, anchor='mm')

# 5) 가격 알약 버튼 (Centered)
pill_left, pill_right = card_left + 30, card_right - 30
draw.rounded_rectangle([(pill_left, 445), (pill_right, 505)], radius=14, fill='#063826')
draw.text((card_center_x, 475), '1회 19,800원', fill='#FFE600', font=font_price, anchor='mm')

# 5. Bottom Call-To-Action Footer Bar
draw.rectangle([(0, 550), (width, height)], fill='#1E293B')
draw.text((40, 570), '(주)한국아그로 공식 브랜드 홈페이지', fill='#FFFFFF', font=get_font(26, bold=True))
draw.text((720, 572), 'hongsoonil02-maker.github.io/rotagal/', fill='#38BDF8', font=get_font(22, bold=True))

# Save
output_path = os.path.join('public', 'rotagal_og_new.jpg')
img.save(output_path, 'JPEG', quality=98)
print(f'OG image successfully saved to {output_path}')

