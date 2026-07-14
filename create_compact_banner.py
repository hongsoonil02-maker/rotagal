"""
로타갈(Rotagal) 광고 배너 - 프로페셔널 리디자인
600x250 사이즈 - 농민신문/축산신문 Dynamic QR Code Banner
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import qrcode
import os
import math

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'public', 'ad_banner')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# === 컬러 팔레트 ===
C_DARK_GREEN = (6, 78, 59)
C_GREEN = (5, 150, 105)
C_GREEN_MID = (16, 185, 129)
C_GOLD = (212, 175, 55)
C_GOLD_BRIGHT = (255, 215, 0)
C_WHITE = (255, 255, 255)
C_BLACK = (20, 20, 20)
C_DARK = (30, 30, 30)
C_GRAY = (100, 100, 100)
C_LIGHT_BG = (245, 250, 247)
C_EU_BLUE = (0, 51, 153)
C_EU_STAR = (255, 204, 0)

# 로타갈 로고 그라데이션 (첨부 이미지 기반)
C_LOGO_TOP = (130, 210, 80)
C_LOGO_BOT = (50, 140, 50)

FONT_DIR = "C:\\Windows\\Fonts"

def get_font(name, size):
    paths = [os.path.join(FONT_DIR, name), os.path.join(FONT_DIR, name.lower())]
    for fp in paths:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except:
                pass
    try:
        return ImageFont.truetype(os.path.join(FONT_DIR, "arial.ttf"), size)
    except:
        return ImageFont.load_default()

# 폰트
f_title = get_font("malgunbd.ttf", 24)
f_highlight = get_font("malgunbd.ttf", 20)
f_logo_kr = get_font("malgunbd.ttf", 40)
f_logo_reg = get_font("arialbd.ttf", 16)
f_eu_small = get_font("arial.ttf", 11)
f_eu_large = get_font("arialbd.ttf", 28)
f_qr_label = get_font("malgun.ttf", 11)
f_sub = get_font("malgun.ttf", 13)

def create_qr(url, size=130):
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=10, border=2)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color=C_DARK_GREEN, back_color=C_WHITE)
    return img.resize((size, size), Image.LANCZOS)

def draw_star(draw, cx, cy, outer_r, inner_r, fill):
    pts = []
    for i in range(10):
        angle = math.radians(i * 36 - 90)
        r = outer_r if i % 2 == 0 else inner_r
        pts.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    draw.polygon(pts, fill=fill)

def create_eu_gmp_badge():
    """EU GMP 배지 - 첨부 이미지와 동일하게"""
    w, h = 175, 48
    img = Image.new('RGBA', (w, h), (255, 255, 255, 0))
    d = ImageDraw.Draw(img)
    
    # EU 발
    fw, fh = 36, 30
    fx, fy = 5, (h - fh) // 2
    d.rectangle([(fx, fy), (fx+fw, fy+fh)], fill=C_EU_BLUE)
    
    # 별 12개
    cx, cy = fx + fw//2, fy + fh//2
    for i in range(12):
        angle = math.radians(i * 30 - 90)
        sx, sy = cx + 10 * math.cos(angle), cy + 10 * math.sin(angle)
        draw_star(d, sx, sy, 2.2, 1.0, C_EU_STAR)
    
    # EUROPEAN UNION
    d.text((48, 6), "EUROPEAN UNION", fill=C_BLACK, font=f_eu_small)
    # GMP
    d.text((48, 20), "GMP", fill=C_BLACK, font=f_eu_large)
    
    return img

def create_rotagal_logo():
    """로타갈 로고 - 첨부 이미지와 동일하게 (그린 그라데이션 + 흰 텍스트)"""
    w, h = 155, 48
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # 수직 그라데이션 (위: 연한 그린, 아래: 진한 그린)
    for y in range(h):
        ratio = y / h
        r = int(C_LOGO_TOP[0] + (C_LOGO_BOT[0] - C_LOGO_TOP[0]) * ratio)
        g = int(C_LOGO_TOP[1] + (C_LOGO_BOT[1] - C_LOGO_TOP[1]) * ratio)
        b = int(C_LOGO_TOP[2] + (C_LOGO_BOT[2] - C_LOGO_TOP[2]) * ratio)
        d.line([(0, y), (w, y)], fill=(r, g, b, 255))
    
    # 둥근 모서리 마스크
    mask = Image.new('L', (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle([(0, 0), (w-1, h-1)], radius=6, fill=255)
    img.putalpha(mask)
    
    # 로타갈 텍스트 (흰색)
    d.text((10, 2), "로타갈", fill=(255, 255, 255, 255), font=f_logo_kr)
    # ® 마크
    d.text((w - 24, 4), "®", fill=(255, 255, 255, 255), font=f_logo_reg)
    
    return img

def create_banner():
    W, H = 600, 250
    
    # 배경 (미세 그라데이션)
    img = Image.new('RGB', (W, H), C_LIGHT_BG)
    d = ImageDraw.Draw(img)
    for y in range(H):
        ratio = y / H
        r = int(245 + (255 - 245) * ratio * 0.3)
        g = int(250 + (255 - 250) * ratio * 0.3)
        b = int(247 + (255 - 247) * ratio * 0.3)
        d.line([(0, y), (W, y)], fill=(r, g, b))
    
    # === 상단 액센트 바 ===
    d.rectangle([(0, 0), (W, 2)], fill=C_GOLD_BRIGHT)
    d.rectangle([(0, 2), (W, 5)], fill=C_DARK_GREEN)
    
    # === 좌측 콘텐츠 ===
    lx = 16
    
    # 1. EU GMP 배지
    eu_badge = create_eu_gmp_badge()
    img.paste(eu_badge, (lx, 12), eu_badge)
    
    # 구분선
    d.line([(lx, 68), (W - 180, 68)], fill=(220, 220, 220), width=1)
    
    # 2. 메인 타이틀
    ty = 76
    d.text((lx, ty), "송아지 폐사율 감소의 핵심", fill=C_BLACK, font=f_title)
    
    # 3. 강조 텍스트
    hy = ty + 30
    d.text((lx, hy), "설사예방 3종(로타,코로나,대장균) 혼합 백신", fill=C_GREEN, font=f_highlight)
    
    # 4. 로타갈 로고
    rt_logo = create_rotagal_logo()
    img.paste(rt_logo, (lx, hy + 28), rt_logo)
    
    # === 우측 QR 카드 ===
    qr_size = 135
    qr_x = W - qr_size - 20
    qr_y = 55
    
    # 카드 배경 (흰색 + 부드러운 그림자)
    pad = 10
    cx1, cy1 = qr_x - pad, qr_y - pad
    cx2, cy2 = qr_x + qr_size + pad, qr_y + qr_size + pad + 28
    
    # 그림자 레이어
    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle(
        [(cx1 + 3, cy1 + 3), (cx2 + 3, cy2 + 3)],
        radius=10, fill=(0, 0, 0, 25)
    )
    img.paste(shadow, (0, 0), shadow)
    
    # 카드 본체
    d.rounded_rectangle(
        [(cx1, cy1), (cx2, cy2)],
        radius=10, fill=C_WHITE, outline=C_GREEN_MID, width=2
    )
    
    # QR 코드
    qr_img = create_qr("https://hongsoonil02-maker.github.io/rotagal/", qr_size)
    img.paste(qr_img, (qr_x, qr_y))
    
    # QR 라벨
    d.text((qr_x + 8, qr_y + qr_size + 8), "QR로 자세히 보기", fill=C_DARK_GREEN, font=f_qr_label)
    
    # === 하단 액센트 바 ===
    d.rectangle([(0, H - 5), (W, H - 3)], fill=C_GOLD_BRIGHT)
    d.rectangle([(0, H - 3), (W, H)], fill=C_DARK_GREEN)
    
    # 저장
    path = os.path.join(OUTPUT_DIR, 'rotagal_banner_600x250.png')
    img.save(path, 'PNG', quality=95)
    print(f"✅ 배너 생성 완료: {path}")
    return path

if __name__ == '__main__':
    print("🎨 로타갈 광고 배너 리디자인...")
    create_banner()
    print("🎉 완료!")
