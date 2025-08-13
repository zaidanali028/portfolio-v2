from PIL import Image, ImageDraw, ImageFont
import math
import os

# Canvas size
size = 64
img = Image.new("RGBA", (size, size), (12, 18, 36, 255))  # Deep space blue
draw = ImageDraw.Draw(img)

# 🌟 Radial glow: "Shine"
for r in range(60, 0, -1):
    alpha = int(80 * (r / 60))
    color = (min(int(30 + r), 100), min(int(80 + r * 1.5), 160), 255, alpha)
    draw.ellipse([size//2 - r, size//2 - r, size//2 + r, size//2 + r], outline=color)

# ☁️ Sleek cloud shell: "Unify"
cloud_path = [
    (18, 32), (22, 26), (28, 24), (34, 26), (40, 30),
    (44, 36), (42, 42), (36, 44), (30, 43), (24, 40)
]
draw.line(cloud_path + [cloud_path[0]], fill=(200, 230, 255, 220), width=5, joint="curve")
draw.line(cloud_path + [cloud_path[0]], fill=(100, 180, 255, 180), width=3, joint="curve")

#  Text: "AUz" – modern monogram
text = "AUz"

# 🔍 Try to load a TrueType font (works on most systems)
font = None
for font_name in ["Arial Black", "arialbd", "DejaVuSans-Bold", "Helvetica", "sans-serif"]:
    try:
        # On Unix-like systems (Linux), fonts may be in standard paths
        if font_name == "DejaVuSans-Bold":
            font = ImageFont.truetype("DejaVuSans-Bold", 32)
        else:
            font = ImageFont.truetype(f"{font_name}.ttf", 32)
        break
    except (IOError, OSError):
        continue

# Fallback: Use default PIL font (limited but safe)
if font is None:
    print("⚠️ TrueType font not found. Using default font.")
    font = ImageFont.load_default()
    text = "AUZ"  # Use uppercase for clarity
    # Manually estimate bbox for default font
    bbox = draw.textbbox((0, 0), text, font=ImageFont.truetype("DejaVuSans-Bold", 32) if "DejaVuSans-Bold" else ImageFont.load_default())
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - 2
else:
    # Safe to use textbbox with TrueType font
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - 2

# 🎨 Neon-blue text with outer glow
for ox in [-2, -1, 1, 2]:
    for oy in [-2, -1, 1, 2]:
        draw.text((x + ox, y + oy), text, font=font, fill=(0, 100, 200, 180))
draw.text((x, y), text, font=font, fill=(130, 200, 255))

# ⚙️ Micro gear pulse
gear_center = (50, 50)
draw.ellipse([gear_center[0]-4, gear_center[1]-4, gear_center[0]+4, gear_center[1]+4], 
             outline=(100, 210, 255, 200), width=2)

for i in range(8):
    angle = math.radians(i * 45)
    x1 = gear_center[0] + 3 * math.cos(angle)
    y1 = gear_center[1] + 3 * math.sin(angle)
    x2 = gear_center[0] + 6 * math.cos(angle)
    y2 = gear_center[1] + 6 * math.sin(angle)
    draw.line((x1, y1, x2, y2), fill=(140, 220, 255, 220), width=1)

# ✨ Sparkle dot above gear
draw.ellipse([52, 42, 54, 44], fill=(180, 240, 255))

# 💾 Save ICO and PNG
img.save("ali-cv-icon.ico", format="ICO", sizes=[(16,16), (24,24), (32,32), (48,48), (64,64)])
img.save("ali-cv-icon.png", format="PNG")  # For preview

print("✅ Elevate. Unify. Shine. 'ali-cv-icon.ico' created — your brand just leveled up.")