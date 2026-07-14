"""
로타갈(Rotagal) 광고 배너 생성 스크립트
농민신문/축산신문 Dynamic QR Code Banner 광고용
- PNG 배너 (웹/디지털 광고용)
- PDF 배너 (인쇄 광고용)
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import qrcode
import os
import math

# === 설정 ===
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'public', 'ad_banner')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 색상 정의
EMERALD_DARK = (6, 78, 59)       # #064e3b
EMERALD = (5, 150, 105)          # #059669
EMERALD_LIGHT = (209, 250, 229)  # #d1fae5
GOLD = (255, 215, 0)             # #FFD700
GOLD_DARK = (180, 150, 0)
WHITE = (255, 255, 255)
BLACK = (30, 30, 30)
RED_ACCENT = (220, 38, 38)
GRAY_LIGHT = (245, 245, 245)
GRAY = (100, 100, 100)

# 폰트 경로 (Windows 기본 폰트)
FONT_DIR = "C:\\Windows\\Fonts"

def get_font(name, size):
    """폰트 로드 (fallback 포함)"""
    font_paths = [
        os.path.join(FONT_DIR, name),
        os.path.join(FONT_DIR, name.lower()),
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                return ImageFont.truetype(fp, size)
            except:
                pass
    # fallback
    try:
        return ImageFont.truetype(os.path.join(FONT_DIR, "arial.ttf"), size)
    except:
        return ImageFont.load_default()

# 폰트 로드
font_bold_large = get_font("malgunbd.ttc", 72)      # 맑은 고딕 Bold
font_bold = get_font("malgunbd.ttc", 48)
font_bold_sm = get_font("malgunbd.ttc", 36)
font_regular = get_font("malgun.ttc", 32)
font_regular_sm = get_font("malgun.ttc", 24)
font_regular_xs = get_font("malgun.ttc", 18)
font_en = get_font("arialbd.ttf", 40)
font_en_sm = get_font("arial.ttf", 28)
font_en_xs = get_font("arial.ttf", 20)

# === QR 코드 생성 ===
def create_qr_code(url, size=300):
    """QR 코드 생성"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color=EMERALD_DARK, back_color=WHITE)
    qr_img = qr_img.resize((size, size), Image.LANCZOS)
    return qr_img

# === 배너 배경 그라데이션 ===
def create_gradient_bg(width, height, color_top, color_bottom):
    """수직 그라데이션 배경 생성"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    for y in range(height):
        ratio = y / height
        r = int(color_top[0] + (color_bottom[0] - color_top[0]) * ratio)
        g = int(color_top[1] + (color_bottom[1] - color_top[1]) * ratio)
        b = int(color_top[2] + (color_bottom[2] - color_top[2]) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return img

def create_radial_gradient_bg(width, height, center_color, edge_color):
    """방사형 그라데이션 배경"""
    img = Image.new('RGB', (width, height))
    cx, cy = width // 2, height // 2
    max_dist = math.sqrt(cx**2 + cy**2)
    for y in range(height):
        for x in range(width):
            dist = math.sqrt((x - cx)**2 + (y - cy)**2)
            ratio = min(dist / max_dist, 1.0)
            r = int(center_color[0] + (edge_color[0] - center_color[0]) * ratio)
            g = int(center_color[1] + (edge_color[1] - center_color[1]) * ratio)
            b = int(center_color[2] + (edge_color[2] - center_color[2]) * ratio)
            img.putpixel((x, y), (r, g, b))
    return img

# === 장식 요소 ===
def draw_rounded_rect(draw, xy, radius, fill=None, outline=None, width=1):
    """둥근 사각형 그리기"""
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)

def draw_gold_border(draw, xy, radius=20, border_width=4):
    """금색 테두리 그리기"""
    x1, y1, x2, y2 = xy
    # 외곽 금색
    draw.rounded_rectangle(
        (x1 - border_width, y1 - border_width, x2 + border_width, y2 + border_width),
        radius=radius + border_width,
        fill=GOLD
    )
    # 내부
    draw.rounded_rectangle(
        (x1, y1, x2, y2),
        radius=radius,
        fill=EMERALD_DARK
    )

# ========================================
# PNG 배너 생성 (1200x630 - SNS/웹 광고 표준)
# ========================================
def create_png_banner():
    W, H = 1200, 630
    img = create_gradient_bg(W, H, (240, 253, 244), (255, 255, 255))
    draw = ImageDraw.Draw(img)

    # 상단 장식 라인
    draw.rectangle([(0, 0), (W, 8)], fill=EMERALD_DARK)
    draw.rectangle([(0, 8), (W, 12)], fill=GOLD)

    # === EU GMP 배지 영역 (상단) ===
    badge_y = 30
    draw_rounded_rect(draw, (40, badge_y, 380, badge_y + 50), 25, fill=EMERALD_DARK)
    draw.text((60, badge_y + 8), "★ EUROPEAN UNION GMP CERTIFIED ★", fill=GOLD, font=font_en_xs)

    # === 메인 타이틀 ===
    title_y = 110
    draw.text((60, title_y), "송아지 폐사율 감소의 핵심", fill=BLACK, font=font_bold)

    # 강조 텍스트
    highlight_y = title_y + 80
    draw.text((60, highlight_y), "설사예방 3종 혼합 백신", fill=EMERALD, font=font_bold_large)

    # 브랜드명
    brand_y = highlight_y + 85
    draw.text((60, brand_y), "로타갈", fill=EMERALD_DARK, font=font_bold_large)
    draw.text((280, brand_y + 10), "Rotagal", fill=EMERALD, font=font_en)

    # === 서브 설명 ===
    desc_y = brand_y + 90
    desc_lines = [
        "한우 농가의 든든한 파트너",
        "치명적인 송아지 설사병으로부터",
        "농가의 소중한 자산과 수익을 완벽하게 지켜드립니다.",
    ]
    for i, line in enumerate(desc_lines):
        draw.text((65, desc_y + i * 36), line, fill=GRAY, font=font_regular_sm)

    # === 핵심 특징 박스 ===
    feature_y = desc_y + 130
    features = [
        ("🛡️", "3종 혼합백신", "로타·코로나·대장균"),
        ("🏆", "EU GMP 인증", "유럽 최고 품질"),
        ("💉", "원샷 접종", "분만 전 1회 접종"),
    ]
    box_w = 340
    box_h = 70
    gap = 15
    start_x = 60
    for i, (icon, title, desc) in enumerate(features):
        x = start_x + i * (box_w + gap)
        draw_rounded_rect(draw, (x, feature_y, x + box_w, feature_y + box_h), 15, fill=WHITE, outline=EMERALD_LIGHT, width=2)
        draw.text((x + 15, feature_y + 8), icon, fill=BLACK, font=font_regular)
        draw.text((x + 55, feature_y + 5), title, fill=EMERALD_DARK, font=font_bold_sm)
        draw.text((x + 55, feature_y + 38), desc, fill=GRAY, font=font_regular_xs)

    # === QR 코드 영역 (우측) ===
    qr_size = 200
    qr_x = W - qr_size - 60
    qr_y = 100

    # QR 배경 박스
    draw_rounded_rect(draw, (qr_x - 20, qr_y - 20, qr_x + qr_size + 20, qr_y + qr_size + 80), 20, fill=WHITE, outline=EMERALD, width=3)

    # QR 코드
    qr_img = create_qr_code("https://hongsoonil02-maker.github.io/rotagal/", qr_size)
    img.paste(qr_img, (qr_x, qr_y))

    # QR 아래 텍스트
    draw.text((qr_x - 10, qr_y + qr_size + 10), "QR코드로", fill=EMERALD_DARK, font=font_bold_sm)
    draw.text((qr_x - 10, qr_y + qr_size + 45), "자세히 보기 →", fill=EMERALD, font=font_bold_sm)

    # === 하단 CTA 바 ===
    cta_y = H - 70
    draw.rectangle([(0, cta_y), (W, H)], fill=EMERALD_DARK)
    draw.rectangle([(0, cta_y), (W, cta_y + 4)], fill=GOLD)
    draw.text((60, cta_y + 15), "📞 지역 총판 다이렉트 문의  |  www.rotagal.kr", fill=WHITE, font=font_regular_sm)

    # === 로고 영역 (하단 좌측) ===
    # Pharmagal 로고 텍스트 (이미지 대신 텍스트로)
    draw.text((60, cta_y - 50), "PHARMAGAL-BIO  |  로타갈 Rotagal", fill=EMERALD_DARK, font=font_regular_sm)

    # 저장
    png_path = os.path.join(OUTPUT_DIR, 'rotagal_ad_banner.png')
    img.save(png_path, 'PNG', quality=95)
    print(f"✅ PNG 배너 생성 완료: {png_path}")
    return png_path

# ========================================
# PNG 배너 생성 (세로형 - 모바일/인쇄용 1080x1920)
# ========================================
def create_png_banner_vertical():
    W, H = 1080, 1920
    img = create_gradient_bg(W, H, (240, 253, 244), (255, 255, 255))
    draw = ImageDraw.Draw(img)

    # 상단 장식
    draw.rectangle([(0, 0), (W, 12)], fill=EMERALD_DARK)
    draw.rectangle([(0, 12), (W, 18)], fill=GOLD)

    # === EU GMP 배지 ===
    badge_y = 40
    draw_rounded_rect(draw, (60, badge_y, 600, badge_y + 70), 35, fill=EMERALD_DARK)
    draw.text((90, badge_y + 12), "★ EUROPEAN UNION GMP CERTIFIED ★", fill=GOLD, font=font_en_sm)

    # === 메인 타이틀 ===
    title_y = 150
    draw.text((60, title_y), "송아지 폐사율", fill=BLACK, font=font_bold)
    draw.text((60, title_y + 60), "감소의 핵심", fill=BLACK, font=font_bold)

    highlight_y = title_y + 150
    draw.text((60, highlight_y), "설사예방 3종", fill=EMERALD, font=font_bold_large)
    draw.text((60, highlight_y + 80), "혼합 백신", fill=EMERALD, font=font_bold_large)

    brand_y = highlight_y + 180
    draw.text((60, brand_y), "로타갈", fill=EMERALD_DARK, font=font_bold_large)
    draw.text((320, brand_y + 15), "Rotagal", fill=EMERALD, font=font_en)

    # === 서브 설명 ===
    desc_y = brand_y + 110
    desc_lines = [
        "한우 농가의 든든한 파트너.",
        "치명적인 송아지 설사병으로부터",
        "농가의 소중한 자산과 수익을",
        "완벽하게 지켜드립니다.",
    ]
    for i, line in enumerate(desc_lines):
        draw.text((70, desc_y + i * 50), line, fill=GRAY, font=font_regular)

    # === 핵심 특징 박스들 ===
    feature_y = desc_y + 250
    features = [
        ("️ 3종 혼합백신", "로타바이러스 · 코로나바이러스 · 대장균 K99", "송아지 설사병 3대 원인체 완벽 차단"),
        ("🏆 EU GMP 인증", "유럽 연합 최고 등급 품질 인증", "유럽 오리지널 보비젠 동일 처방"),
        (" 원샷 접종", "분만 전 3~12주 1회 접종", "노동력 및 비용 절감"),
        ("❄️ 콜드체인 직수입", "2℃~8℃ 정온 유지 직수입", "24개월 넉한 유통기한"),
    ]

    for i, (title, sub, desc) in enumerate(features):
        y = feature_y + i * 160
        draw_rounded_rect(draw, (60, y, W - 60, y + 140), 20, fill=WHITE, outline=EMERALD_LIGHT, width=3)
        draw.text((90, y + 15), title, fill=EMERALD_DARK, font=font_bold_sm)
        draw.text((90, y + 60), sub, fill=BLACK, font=font_regular_sm)
        draw.text((90, y + 95), desc, fill=GRAY, font=font_regular_xs)

    # === QR 코드 ===
    qr_size = 350
    qr_x = (W - qr_size) // 2
    qr_y = feature_y + len(features) * 160 + 60

    draw_rounded_rect(draw, (qr_x - 30, qr_y - 30, qr_x + qr_size + 30, qr_y + qr_size + 120), 30, fill=WHITE, outline=EMERALD, width=4)
    qr_img = create_qr_code("https://hongsoonil02-maker.github.io/rotagal/", qr_size)
    img.paste(qr_img, (qr_x, qr_y))

    draw.text((qr_x + 30, qr_y + qr_size + 15), "QR코드를 스캔하여", fill=EMERALD_DARK, font=font_bold_sm)
    draw.text((qr_x + 30, qr_y + qr_size + 60), "자세한 정보를 확인하세요", fill=EMERALD, font=font_bold_sm)

    # === 하단 CTA ===
    cta_y = H - 120
    draw.rectangle([(0, cta_y), (W, H)], fill=EMERALD_DARK)
    draw.rectangle([(0, cta_y), (W, cta_y + 6)], fill=GOLD)
    draw.text((60, cta_y + 20), "📞 지역 총판 다이렉트 문의", fill=WHITE, font=font_bold_sm)
    draw.text((60, cta_y + 65), "www.rotagal.kr  |  PHARMAGAL-BIO", fill=GOLD, font=font_regular_sm)

    # 저장
    png_path = os.path.join(OUTPUT_DIR, 'rotagal_ad_banner_vertical.png')
    img.save(png_path, 'PNG', quality=95)
    print(f"✅ PNG 세로 배너 생성 완료: {png_path}")
    return png_path

# ========================================
# PDF 배너 생성 (인쇄용 A4 가로)
# ========================================
def create_pdf_banner():
    from reportlab.lib.pagesizes import A4, landscape
    from reportlab.lib.units import mm, cm
    from reportlab.lib.colors import HexColor, white, black
    from reportlab.pdfgen import canvas
    from reportlab.lib.enums import TA_CENTER, TA_LEFT
    from reportlab.platypus import Paragraph
    import io

    pdf_path = os.path.join(OUTPUT_DIR, 'rotagal_ad_banner.pdf')
    width, height = landscape(A4)  # 가로 A4

    c = canvas.Canvas(pdf_path, pagesize=(width, height))

    # === 배경 ===
    # 그라데이션 효과 (수직)
    for i in range(int(height)):
        ratio = i / height
        r = 0.94 + (1.0 - 0.94) * ratio
        g = 0.99 + (1.0 - 0.99) * ratio
        b = 0.96 + (1.0 - 0.96) * ratio
        c.setFillColorRGB(r, g, b)
        c.rect(0, height - i - 1, width, 1, fill=1, stroke=0)

    # 상단 장식 라인
    c.setFillColor(HexColor('#064e3b'))
    c.rect(0, height - 8, width, 8, fill=1, stroke=0)
    c.setFillColor(HexColor('#FFD700'))
    c.rect(0, height - 12, width, 4, fill=1, stroke=0)

    # === EU GMP 배지 ===
    badge_x = 30 * mm
    badge_y = height - 55 * mm
    badge_w = 120 * mm
    badge_h = 18 * mm

    c.setFillColor(HexColor('#064e3b'))
    c.roundRect(badge_x, badge_y, badge_w, badge_h, 8 * mm, fill=1, stroke=0)
    c.setFillColor(HexColor('#FFD700'))
    c.setFont("Helvetica-Bold", 11)
    c.drawString(badge_x + 8 * mm, badge_y + 6 * mm, "★ EUROPEAN UNION GMP CERTIFIED ★")

    # === 메인 타이틀 ===
    title_x = 30 * mm
    title_y = height - 80 * mm

    c.setFillColor(HexColor('#1e1e1e'))
    c.setFont("Helvetica-Bold", 28)
    c.drawString(title_x, title_y, "송아지 폐사율 감소의 핵심")

    # 강조 텍스트
    highlight_y = title_y - 35 * mm
    c.setFillColor(HexColor('#059669'))
    c.setFont("Helvetica-Bold", 42)
    c.drawString(title_x, highlight_y, "설사예방 3종 혼합 백신 로타갈")

    # 브랜드명
    brand_y = highlight_y - 25 * mm
    c.setFillColor(HexColor('#064e3b'))
    c.setFont("Helvetica-Bold", 36)
    c.drawString(title_x, brand_y, "로타갈")
    c.setFillColor(HexColor('#059669'))
    c.setFont("Helvetica-Bold", 28)
    c.drawString(title_x + 75 * mm, brand_y + 5 * mm, "Rotagal")

    # === 서브 설명 ===
    desc_y = brand_y - 20 * mm
    c.setFillColor(HexColor('#646464'))
    c.setFont("Helvetica", 14)
    desc_lines = [
        "한우 농가의 든든한 파트너.",
        "치명적인 송아지 설사병으로부터 농가의 소중한 자산과 수익을",
        "완벽하게 지켜드립니다.",
    ]
    for i, line in enumerate(desc_lines):
        c.drawString(title_x + 3 * mm, desc_y - i * 7 * mm, line)

    # === 핵심 특징 박스 ===
    feature_y = desc_y - 55 * mm
    features = [
        ("️  3종 혼합백신", "로타·코로나·대장균 완벽 차단"),
        ("🏆  EU GMP 인증", "유럽 최고 등급 품질 인증"),
        ("💉  원샷 접종", "분만 전 1회 접종으로 비용 절감"),
    ]

    box_w = 95 * mm
    box_h = 22 * mm
    gap = 8 * mm
    start_x = 30 * mm

    for i, (title, desc) in enumerate(features):
        x = start_x + i * (box_w + gap)
        c.setFillColor(white)
        c.setStrokeColor(HexColor('#d1fae5'))
        c.setLineWidth(2)
        c.roundRect(x, feature_y, box_w, box_h, 5 * mm, fill=1, stroke=1)

        c.setFillColor(HexColor('#064e3b'))
        c.setFont("Helvetica-Bold", 13)
        c.drawString(x + 4 * mm, feature_y + 12 * mm, title)
        c.setFillColor(HexColor('#646464'))
        c.setFont("Helvetica", 10)
        c.drawString(x + 4 * mm, feature_y + 5 * mm, desc)

    # === QR 코드 ===
    qr_size = 55 * mm
    qr_x = width - qr_size - 35 * mm
    qr_y = height - 170 * mm

    # QR 배경
    c.setFillColor(white)
    c.setStrokeColor(HexColor('#059669'))
    c.setLineWidth(3)
    c.roundRect(qr_x - 5 * mm, qr_y - 5 * mm, qr_size + 10 * mm, qr_size + 30 * mm, 8 * mm, fill=1, stroke=1)

    # QR 코드 이미지 삽입
    qr_img_path = os.path.join(OUTPUT_DIR, 'qr_temp.png')
    qr_img = create_qr_code("https://hongsoonil02-maker.github.io/rotagal/", 400)
    qr_img.save(qr_img_path, 'PNG')
    c.drawImage(qr_img_path, qr_x, qr_y, width=qr_size, height=qr_size)

    c.setFillColor(HexColor('#064e3b'))
    c.setFont("Helvetica-Bold", 12)
    c.drawString(qr_x, qr_y - 12 * mm, "QR코드로 자세히 보기 →")

    # === 하단 CTA 바 ===
    cta_h = 25 * mm
    c.setFillColor(HexColor('#064e3b'))
    c.rect(0, 0, width, cta_h, fill=1, stroke=0)
    c.setFillColor(HexColor('#FFD700'))
    c.rect(0, cta_h, width, 2 * mm, fill=1, stroke=0)

    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(30 * mm, 10 * mm, "📞  지역 총판 다이렉트 문의  |  www.rotagal.kr  |  PHARMAGAL-BIO")

    # === 로고 텍스트 ===
    c.setFillColor(HexColor('#064e3b'))
    c.setFont("Helvetica-Bold", 11)
    c.drawString(30 * mm, cta_h + 8 * mm, "PHARMAGAL-BIO  |  로타갈 Rotagal  |  EU GMP 공식인증")

    c.save()

    # 임시 QR 파일 삭제
    if os.path.exists(qr_img_path):
        os.remove(qr_img_path)

    print(f"✅ PDF 배너 생성 완료: {pdf_path}")
    return pdf_path

# ========================================
# 실행
# ========================================
if __name__ == '__main__':
    print("🎨 로타갈 광고 배너 생성 시작...")
    print("=" * 50)

    create_png_banner()
    create_png_banner_vertical()
    create_pdf_banner()

    print("=" * 50)
    print("🎉 모든 배너 생성 완료!")
    print(f"📁 출력 폴더: {OUTPUT_DIR}")
