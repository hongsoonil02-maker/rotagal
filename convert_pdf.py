import os
import shutil
import subprocess
import sys

src_pdf = "로타갈 광고-A4 변경(최종).pdf"
dst_pdf = os.path.join("public", "rotagal_leaflet.pdf")

if os.path.exists(src_pdf):
    shutil.copyfile(src_pdf, dst_pdf)
    print(f"Copied '{src_pdf}' to '{dst_pdf}'")
else:
    print(f"Error: Source '{src_pdf}' not found!")

try:
    import fitz  # PyMuPDF
except ImportError:
    print("Installing pymupdf...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pymupdf", "-q"])
    import fitz

print("Converting PDF to high-resolution image...")
doc = fitz.open(dst_pdf)
page = doc.load_page(0)
pix = page.get_pixmap(dpi=200)

out_og = os.path.join("public", "rotagal_og.jpg")
out_prod = os.path.join("public", "rotagal_product.jpg")

pix.save(out_og)
pix.save(out_prod)
print(f"Successfully generated '{out_og}' and '{out_prod}'!")
