# Đặc tả kỹ thuật — Portfolio Website

**Dự án:** Website profile cho Hoàng Kim Vĉnh (CatKod)
**Repo:** `CatKod/CatKod` · **URL:** `https://catkod.github.io/CatKod/`
**Ngày:** 05/10/2026 · **Trạng thái:** Đặc tả — chờ duyệt
**Stack đã chốt:** Next.js (App Router) · TypeScript · static export → GitHub Pages

---

## 1. Bối cảnh

### 1.1 Hiện trạng

Repo hiện chứa **một trang tĩnh đơn giản**: `index.html` (~380 dòng) + `assets/style.css` (~463 dòng) + `README.md` (profile README hiển thị trên github.com/CatKod).

Nội dung đã rất tốt. Vấn đề không nằm ở nội dung mà ở **khả năng mở rộng**:
- Không có cấu trúc dữ liệu — mọi thứ hardcode trong HTML, sửa nội dung phải sửa markup
- Không có type safety, không có component tái sử dụng
- Không có cơ chế lazy-load, code-splitting, hay tối ưu ảnh
- Không thể thêm tương tác phức tạp (visualizer, filter, dark/light toggle) mà không viết lại

### 1.2 Quyết định đã chốt

| Hạng mục | Quyết định | Lý do |
|---|---|---|
| Framework | **Next.js App Router** | Người dùng chọn. Cho phép thêm tương tác 3D/interactive sau này mà không phải đổi nền tảng. |
| Nơi chứa | **Giữ nguyên `CatKod/CatKod`** | Người dùng chọn. Repo này vừa là profile README vừa là Pages source — không xung đột. |
| Hạ tầng | **GitHub Pages** (đang bật) | Không tốn phí, không cần tài khoản Vercel. |
| Ngôn ngữ nội dung | **100% tiếng Anh** | Đã chốt ở B1.1. |

### 1.3 Đánh giá trung thực về quyết định này

Ghi lại rõ để không tự lừa mình sau này:

> Trang hiện tại là **brochure tĩnh thuần** — 0 dependency, ~30KB, tải nhanh. Next.js App Router thêm vào **~85–110KB JavaScript gzipped** ở mức tối thiểu (React runtime + router), chưa kể Three.js nếu thêm 3D.

Việc này **chấp nhận được** vì:
1. Nội dung sẽ tiếp tục phát triển (thêm project, thêm visualizer, có thể có dark/light toggle, đa ngôn ngữ sau này)
2. Zero-JS có giới hạn cứng khi muốn tương tác
3. Với recruiter, tốc độ vẫn OK nếu ta kiểm soát chặt (xem §9)

**Điều kiện để quyết định này đúng:** phải giữ được performance budget ở §9. Nếu Lighthouse mobile < 85, phải cân nhắc lại.

---

## 2. Mục tiêu & đối tượng

### 2.1 Ba nhóm người đọc, theo thứ tự ưu tiên

| # | Đối tượng | Cần gì | Quyết định trong ~30s |
|---|---|---|---|
| 1 | **Recruiter tuyển Embedded tại Nhật** | Có phải ứng viên firmware không, có kinh nghiệm thật không, có thể giao tiếp tiếng Nhật không | Họ không đọc code. Họ đọc **tiêu đề + 3 con số + tên công ty/thiết bị** |
| 2 | **Hiring manager / tech lead** | Chiều sâu kỹ thuật: CAN, MISRA, state machine, kiểm thử | Họ sẽ đọc kỹ phần **Industrial (NDA)** và **toolkit** |
| 3 | **Cộng đồng (HUST, EEZ Studio, DIY)** | Cách làm, có thể học theo không | Họ sẽ vào repo, không vào website |

### 2.2 Mục tiêu định lượng

| Mục tiêu | Chỉ số | Mốc |
|---|---|---|
| Nhà tuyển dụng hiểu đúng chuyên môn trong 10 giây đầu | Số lần phải quay lại GitHub để xem lại profile | 0 |
| Truy cập được từ thiết bị di động | Lighthouse mobile Performance | ≥ 90 |
| Liên hệ được | Số lượt click vào email/LinkedIn | đo bằng analytics |
| Nội dung lọc được từ Google | Trang xuất hiện với từ khóa `STM32 CAN MISRA` | có |

> **Lưu ý:** nếu dùng analytics thì chọn bản **cookie-less, không thu thập PII** (Umami / Cloudflare Web Analytics). Không dùng GA vì site nhắm thị trường Nhật, có thể phát sinh cảnh báo cookie.

---

## 3. Thông điệp & định vị

### 3.1 Lời định vị (positioning statement)

> **Embedded Firmware Engineer** làm việc trên **firmware công nghiệp thật** — trạm sạc DC nhanh thương mại, CAN bus, MISRA C, state machine không blocking — đồng thời làm **sản phẩm IoT trọn vẹn** từ PCB đến app, và có **nền tảng AI chính thức** để đưa mô hình chạy ngay trên MCU.

### 3.2 Ba điểm bán hàng (kể theo thứ tự trên trang)

| # | Điểm bán | Bằng chứng | Vì sao thuyết phục |
|---|---|---|---|
| 1 | **Firmware công nghiệp ở quy mô thật** | 32 súng sạc, 16 tủ, CAN 2.0B 29-bit, 11 module | Rất ít ứng viên sinh viên có thể chứng minh tầm này. Đây là lý do tuyển dụng Nhật chú ý |
| 2 | **Kỷ luật tiêu chuẩn, có kiểm chứng** | MISRA C:2012 pipeline, 89 unit test chạy CI trên 2 compiler | Biến "tôi nói là chuẩn" thành "đây là bằng chứng". Repo `embedded-iot-toolkit` là bằng chứng công khai duy nhất, vì code công nghiệp bị NDA |
| 3 | **Có thể làm hết chuỗi** | PCB EasyEDA → firmware ESP-IDF → backend NestJS → app Flutter | Chứng minh không phải người chỉ giỏi một tầng |

### 3.3 Điểm móc Nhật

**JLPT N3** là lợi thế cạnh tranh thật — đa số ứng viên Việt ứng tuyển Nhật không có. Đưa lên hero, không chôn ở footer. Vị trí đặt cạnh CTA liên hệ để tạo lý do liên hệ.

### 3.4 Điều KHÔNG được nói

| Không nói | Vì sao |
|---|---|
| "100% accuracy" cho classifier tiếng Việt | Đó là trên **tập train**, không phải test set. Recruiter kỹ sẽ hỏi và bạn mất điểm |
| "AI Engineer" làm tiêu đề chính | Lợi thế cạnh tranh của bạn là CAN/MISRA, không phải AI |
| "Commercial" / "thương mại" nếu chưa có giấy phép public | Đã chọn A6.3 — chỉ mô tả phạm vi kỹ thuật, không push code |
| Chứng chỉ Coursera như thành tựu trọng tâm | Chỉ giải thích *tại sao* làm được Edge AI, không phải bằng chứng chính |
| So sánh với người khác | Không có giá trị, chỉ tốn chỗ |

---

## 4. Kiến trúc kỹ thuật

### 4.1 Cấu trúc thư mục

```
CatKod/
├── .github/workflows/deploy.yml   # build + deploy Pages
├── public/
│   ├── Picture/Robot_Control.png  # ảnh robot (dùng ở §6.4)
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx             # metadata, fonts, header/footer
│   │   ├── page.tsx               # compose các section
│   │   ├── globals.css            # token thiết kế + base
│   │   └── opengraph-image.tsx    # OG image động (optional, §11)
│   ├── components/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── Hero.tsx
│   │   ├── StatBar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── IndustrialSection.tsx
│   │   ├── SkillMatrix.tsx
│   │   ├── CertList.tsx
│   │   ├── ContactGrid.tsx
│   │   └── RingVisualizer.tsx     # xem §6.3 — CAN 2.0B
│   ├── content/
│   │   ├── site.ts                # metadata, liên hệ
│   │   ├── projects.ts            # dữ liệu 6 project
│   │   ├── skills.ts              # nhóm kỹ năng
│   │   └── certifications.ts      # bảng chứng chỉ
│   └── lib/
│       └── seo.ts
├── next.config.mjs
├── tailwind.config.ts             # xem ghi chú §5.4
├── package.json
├── tsconfig.json
└── README.md                      # GIỮ NGUYÊN — profile README
```

> **Quy tắc quan trọng:** `README.md` ở gốc là profile README hiển thị trên github.com/CatKod. **Không được xóa hay thay thế.** Website build từ `src/`, output ra `out/`.

### 4.2 `next.config.mjs` — bắt buộc cho GitHub Pages

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages chỉ phục vụ file tĩnh
  output: 'export',

  // Repo tên `CatKod` → site nằm ở /CatKod/
  basePath: '/CatKod',
  assetPrefix: '/CatKod',

  images: { unoptimized: true },   // không có image server

  trailingSlash: true,             // tương thích static host
};

export default nextConfig;
```

**Ràng buộc của `output: 'export'`** — những thứ *không được* dùng:
| ❌ Không dùng | Lý do |
|---|---|
| Server Actions | cần runtime Node |
| Route Handler (`app/api/*`) | cần server |
| ISR / `revalidate` | cần server |
| `next/image` optimization | cần image server → đã tắt bằng `unoptimized` |
| Middleware | cần Edge runtime |
| `cookies()` / `headers()` | động |

**Hệ quả:** mọi section phải là **Server Component tĩnh**. Tương tác client chỉ dùng `"use client"` cho những phần thực sự cần (§6.3).

### 4.3 Deploy — GitHub Actions

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push: { branches: [main] }
permissions:
  contents: read
  pages: write
  id-token: write
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run build          # sinh out/
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Cấu hình Settings → Pages:** Source = **GitHub Actions**

> So với cách đẩy nhánh `gh-pages`: workflow sạch hơn, không cần commit build artifact vào git, cache npm được. Chọn cách này.

### 4.4 Ràng buộc môi trường bản thân

| Hạng mục | Giá trị |
|---|---|
| Node | ≥ 20 (khuyến nghị 22 LTS) |
| Next.js | 15.x ổn định |
| TypeScript | 5.x, `strict: true` |
| Lint | `eslint-config-next` |
| Prettier | có, để diff sạch |

---

## 5. Hệ thống thiết kế

### 5.1 Nguyên tắc

Kế thừa trực tiếp từ `assets/style.css` hiện có — **đừng phát minh lại**. Palette tối, một màu nhấn, typography rõ ràng. Hệ thống đó đã đúng.

### 5.2 Token màu

```css
--bg:         #0d1117;   /* nền */
--bg-soft:    #161b22;   /* nền lõm: code, tag, nút phụ */
--bg-card:    #1c2230;   /* nền card */
--border:     #2b3441;   /* viền */
--text:       #e6edf3;   /* chữ chính    — contrast ~14:1 ✓ AAA */
--text-dim:   #9aa7b4;   /* chữ phụ     — contrast ~7:1  ✓ AAA */
--text-mute:  #6e7b8a;   /* chữ phụ 2   — contrast ~4.6:1 ✓ AA  */
--accent:     #4a9eff;   /* nhấn chính   — contrast ~6.4:1 ✓ AA  */
--green:      #3fb950;   /* trạng thái tốt */
--amber:      #d29922;   /* cảnh báo / NDA */
```

**Kiểm tra bắt buộc:** mọi tổ hợp text/background phải ≥ 4.5:1 (AA). `text-mute` ở mức ranh giới — chỉ dùng cho text ≥ 14px, không dùng cho text nhỏ quan trọng.

### 5.3 Typography

| Vai trò | Font | Cỡ | Ghi chú |
|---|---|---|---|
| Tiêu đề lớn | Inter 700 | `clamp(2.1rem, 6vw, 3.4rem)` | gradient text, `letter-spacing: -0.6px` |
| Section title | Inter 600 | 1.55rem | |
| Card title | Inter 600 | 0.95rem | màu accent |
| Nội dung | Inter 400 | 1rem, `line-height: 1.7` | `max-width: 68ch` |
| Nhãn / eyebrow | JetBrains Mono 400 | 0.82rem | `text-transform: uppercase`, `letter-spacing: 0.4px` |
| Số liệu | JetBrains Mono 500 | 1.9rem | màu accent |
| Tech tag | JetBrains Mono 400 | 0.76rem | pill, nền `--bg-soft` |

**Dùng `next/font/google`** để tự host Inter + JetBrains Mono → không có request ra `fonts.gstatic.com`, không rò rỉ IP, tốt cho GDPR.

### 5.4 Spacing & layout

- Container: `max-width: 1080px`, padding ngang 24px (16px trên mobile)
- Section: `padding: 60px 24px`, viền trên 1px `--border`
- Grid: `repeat(auto-fit, minmax(300px, 1fr))`, gap 18px
- Card radius: 10px, padding 24px
- Breakpoint: **768px** (tablet), **480px** (mobile) — chỉ cần 2

### 5.5 Ghi chú về Tailwind

Trang hiện tại dùng CSS thuần, đọc dễ, không cần build step. Với Next.js:

| Lựa chọn | Đánh giá |
|---|---|
| **Tailwind CSS 4** | Nhanh, quen thuộc, nhưng phải viết lại toàn bộ class — mất thời gian không cần thiết |
| **CSS Modules + token** ✅ | Giữ nguyên `style.css` hiện có làm `globals.css`, tách phần mới ra `*.module.css`. Ít việc hơn, giữ được nhất quán |

**Khuyến nghị: CSS Modules.** Lý do: hệ thống CSS hiện có đã hoàn chỉnh và đẹp, chuyển sang Tailwind là viết lại 463 dòng để được kết quả giống nhau.

---

## 6. Cấu trúc nội dung (IA) & đặc tả từng section

Thứ tự dưới đây là **có chủ đích**, không phải thứ tự thời gian:

```
┌─────────────────────────────────────────────┐
│ HEADER (sticky)                              │  brand + nav
├─────────────────────────────────────────────┤
│ 1. HERO                                     │  định vị + JLPT + CTA
│ 2. STAT BAR (4 con số)                       │  bằng chứng nhanh
├─────────────────────────────────────────────┤
│ 3. SELECTED WORK (3 project công khai)        │  flagship, có link repo
│ 4. INDUSTRIAL EXPERIENCE (NDA)               │  ★ hook mạnh nhất
├─────────────────────────────────────────────┤
│ 5. SKILLS (ma trận 6 nhóm)                   │  từ khóa cho ATS/recruiter
│ 6. CERTIFICATIONS                            │  uy tín
├─────────────────────────────────────────────┤
│ 7. ABOUT                                     │  bối cảnh con người
│ 8. CONTACT                                   │  hành động
└─────────────────────────────────────────────┘
      FOOTER
```

**Vì sao Industrial lên trước Skills/About:** đó là bằng chứng khác biệt nhất. Đặt nó sâu trong trang = lãng phí. Recruiter Embedded Nhật tìm đúng thứ này.

---

### 6.1 Header

| Thuộc tính | Yêu cầu |
|---|---|
| Vị trí | Sticky top, nền `rgba(13,17,23,0.85)`, `backdrop-filter: blur(12px)` |
| Chiều cao | 60px |
| Brand | `KV.` — JetBrains Mono, chữ `.` màu accent |
| Nav | About · Skills · Work · Certifications · Contact |
| Mobile | ẩn nav, hiện nút hamburger (Client Component nhỏ) |
| A11y | `<nav aria-label="Main">`, skip-link "Skip to content" ở trên cùng |

---

### 6.2 Hero

**Mục đích:** trong 10 giây, người đọc phải hiểu bạn là ai và làm được gì.

```
┌──────────────────────────────────────────────────────────┐
│  HOÀNG KIM VĨNH · HUST 20235876            ← eyebrow mono │
│                                                          │
│  Embedded Firmware Engineer                ← H1 gradient  │
│                                                          │
│  I write production firmware for industrial DC           │
│  fast-charging stations — CAN bus, MISRA C                │
│  compliance, non-blocking state machines on STM32H7 —    │
│  and build complete IoT products from PCB to app.         │
│                                                          │
│  [STM32H7] [CAN / FDCAN] [MISRA C:2012] [State Machines]  │
│  [ESP32 / ESP-IDF] [Edge AI on MCU] [JLPT N3]             │
│                                                          │
│  [See my work]  [Toolkit]  [GitHub]  [Linkedin]           │
└──────────────────────────────────────────────────────────┘
```

| Yêu cầu | Chi tiết |
|---|---|
| Eyebrow | Mono, uppercase, `--text-mute`. **Thêm JLPT N3 vào đây hoặc tagline** — không để ở footer |
| H1 | Gradient `135deg #ffffff 20% → #8ab4e8 100%` |
| Lede | `--text-dim`, `max-width: 62ch`, 1.1rem |
| Tagline | 7 pill. **Thêm `JLPT N3`** vào list (hiện tại 6) |
| CTA | 1 primary (`See my work`) + 3 phụ |
| Thứ tự CTA | primary dẫn đầu; `LinkedIn` đặt cuối vì là hành động chuyển đổi |

---

### 6.3 Stat Bar — 4 con số

Giữ nguyên số liệu hiện có (đã xác minh từ tài liệu dự án):

| Số | Nhãn | Nguồn xác minh |
|---|---|---|
| **32** | charging guns per power-sharing network | 16 tủ × 2 kênh |
| **11** | firmware modules — SPI-to-CAN → power algorithms | danh sách task Sac_Link |
| **89** | host unit tests passing under `-Werror` | CI `embedded-iot-toolkit` |
| **10/10** | capstone grade as team lead | SmartHome |

Yêu cầu: `grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))`, card nền `--bg-card`, số font mono màu accent.

---

### 6.4 Selected Work — 3 project công khai

**Chỉ 3 project**, mỗi project phải trả lời trong 5 giây: *làm gì, với cái gì, kết quả ra sao.*

#### ① SmartHome
- **Tiêu đề:** SmartHome
- **Badge:** `University capstone · 10/10`
- **Sub:** `STM32H7 + ESP32-S3 · TouchGFX · RFID · MQTT`
- **Mô tả:** Kiến trúc 2 tầng, MCU thời gian thực không phụ thuộc cloud để an toàn.
- **Callout (điểm cộng):** *"MQTT and the dashboard can never drive hardware directly. Every command is validated by the STM32H7 before an actuator moves."*
- **Tech:** STM32H7 · ESP32-S3 · ESP-IDF · TouchGFX · FreeRTOS · MQTT · RFID RC522 · 74HC595 · PIR · DHT11
- **Link:** `github.com/CatKod/SmartHome`

#### ② Smart Power Outlet
- **Badge:** `Graduation capstone · solo`
- **Sub:** `EasyEDA PCB · ESP-IDF firmware · Flutter app`
- **Mô tả:** Sản phẩm IoT trọn vẹn — PCB EasyEDA Pro, firmware ESP-IDF có Wi-Fi provisioning (không hardcode credential), bản PlatformIO cho cả ESP32 và ESP8266, app Flutter đa nền tảng.
- **Tech:** ESP32 · ESP8266 · ESP-IDF · PlatformIO · Wi-Fi provisioning · EasyEDA Pro · Flutter · Dart
- **Link:** `github.com/CatKod/Smart_Power_Outlet`

#### ③ Sun-Car Damage AI Assessment
- **Badge:** `SUN scholarship project`
- **Sub:** `YOLOv11n · ESP32-CAM → STM32 bridge · Edge AI`
- **Mô tả:** YOLOv11n cho detection + instance segmentation + severity; ESP32-CAM chụp frame, stream kết quả sang STM32 qua UART.
- **Tech:** YOLOv11n · PyTorch · Ultralytics · ESP32-CAM · STM32 · UART · Flask · Streamlit
- **Link:** `github.com/CatKod/Sun-Car-Damage-AI-Assessment`

#### ④ embedded-iot-toolkit — đưa lên đầu danh sách
- **Badge:** `Open source · MIT · 89 tests`
- **Sub:** `Portable C99 · zero dependencies`
- **Mô tả:** Thư viện C99 thuần: non-blocking timer bank, framed serial protocol an toàn ISR có checksum + tự resync, CAN 2.0B 29-bit codec kèm bit-timing solver, sensor decoder báo *staleness* thay vì trả giá trị cũ.
- **Vì sao lên đầu:** đây là **bằng chứng công khai duy nhất** cho kỷ luật MISRA, vì code công nghiệp bị NDA. Recruiter không đọc code NDA — repo này là thứ họ kiểm tra được.
- **Link:** `github.com/CatKod/embedded-iot-toolkit`

#### Các project còn lại — bảng nhỏ
| Project | Thể hiện |
|---|---|
| Yootek-IOT-intern | Thực tập doanh nghiệp — ESP32/ESP-IDF + NestJS + PostgreSQL + MQTT + JWT/RBAC |
| AIoT-Face_And_Order | ESP32-CAM → HTTP → OpenCV face detection |
| Attendance_Check | Hệ thống chạy thật tại APES Lab — Next.js + Electron kiosk + Expo + Supabase |
| SmartSlide_JP | Hệ thống điều khiển máy chiếu thông minh |

---

### 6.5 ★ Industrial Experience (NDA) — section quan trọng nhất

Đây là phần **khác biệt**. Thiết kế nó nổi bật: nền card viền `--amber`, badge `NDA · code not public`.

#### 6.5.1 Nội dung DC Fast-Charging Station — Link Firmware

**Sub:** `STM32H723 · CAN 2.0B ring network · MISRA C:2012`

**Mở đầu (2 câu):**
> A multi-gun DC charging network wired as a closed ring. When one EV demands more power than a single power module can deliver, the firmware autonomously borrows capacity from idle guns and reclaims it when the vehicle finishes or a new one arrives.

**7 điểm kỹ thuật** (mỗi điểm 1 bullet, phải có số cụ thể):

| # | Tiêu đề | Nội dung |
|---|---|---|
| 1 | **4-layer architecture** | App → Middleware (Service / FSM / Control) → Driver → HAL, upward-only calls enforced. Driver không chứa state machine, không biết giao thức trên. |
| 2 | **SPI-to-CAN driver stack** | MCP2515, tính bit-timing cho 125 kbit/s, buffer frame ở mức ISR, tự phục hồi bus-off |
| 3 | **CAN frame codec** | 29-bit ID đóng gói từ 6 field có tên, định nghĩa shift/mask tường minh, validate khoảng mọi field |
| 4 | **Distributed power algorithms** | Duyệt vòng ring bằng modulo, tìm súng rảnh 2 chiều, thu hồi theo ưu tiên sự kiện, đóng cắt contactor an toàn (ramp dòng về 0 **trước** khi mở) |
| 5 | **Station state machine** | `INIT → DISCOVERY → RUN → SAFE`, non-blocking tuyệt đối, không `HAL_Delay()` |
| 6 | **Single-writer ownership** | Mỗi biến chia sẻ có đúng một task ghi → loại bỏ data race theo cấu trúc |
| 7 | **Quality pipeline** | cppcheck + MISRA addon, unit test trên PC với HAL giả lập, fault injection (dính tiếp điểm, rút CAN, hỏng cảm biến dòng), kiểm chứng logic analyser, soak test 24h |

**Tech tags:** STM32H723 · FDCAN · CAN 2.0B 29-bit · MCP2515 over SPI · MISRA C:2012 · cppcheck · Unity · bootloader / IAP · USB Host · FATFS · OCPP · GB/T 27930 · DLT-645 · WIZnet Ethernet

#### 6.5.2 Nội dung Two-gun DC Charger Firmware

**Sub:** `STM32 · OCPP · GB/T 27930 · DLT-645`

- Driver cho **7 chip Ethernet WIZnet**: W5100 / W5100S / W5200 / W5300 / W5500 / W6100 / W6300
- **OCPP** quản lý charge point · **GB/T 27930** giao tiếp phía xe · **DLT-645** đo năng lượng DC
- **Bootloader / IAP** qua USB và Ethernet · **USB Host** + **FATFS** xuất log · RFID · giám sát cách điện IMD · đo nhiệt PT1000

#### 6.5.3 Visualizer vòng chia sẻ công suất — xem §6.5.4

#### 6.5.4 Ring Visualizer (quyết định cần chốt)

**Ý tưởng:** một sơ đồ tương tác mô phỏng vòng 16 tủ / 32 súng. Bấm vào một súng → hoạt động động thể hiện thuật toán: súng đó cần thêm công suất → tìm súng rảnh hai chiều → ramp dòng → chuyển tải → trả lại khi đầy.

**Vì sao đáng làm:** đây là thuật toán khó nhất của bạn. Cho xem thấy nó chạy = chứng minh bạn hiểu nó, không chỉ khai đã viết. Recruiter/tech lead đọc xong sẽ có câu hỏi phỏng vấn **tốt** — đúng thứ bạn muốn.

**Về việc dùng 3D thật (Three.js/WebGL):**

| Lựa chọn | Bundle | Rủi ro | Đánh giá |
|---|---|---|---|
| **Canvas 2D / SVG animation** ✅ | ~5–10 KB | rất thấp | Đủ để truyền đạt thuật toán. Chạy mọi thiết bị. Accessible. |
| Three.js / React Three Fiber | +150–250 KB | cao | Tốn bundle cho một sơ đồ topology 2 chiều. Bạn sẽ phải ghi đè rằng "3D ở đây không cần thiết". |

**Khuyến nghị: Canvas 2D / SVG.** Lý do: nội dung cần truyền đạt là *quan hệ* giữa các node và dòng công suất — bản đồ phẳng làm việc đó tốt hơn 3D, rẻ hơn nhiều, và không hy sinh gì.

Skill `3d-web-experience` cảnh báo đúng anti-pattern: *"3D for 3D's sake — ask: would an image work?"* Với sơ đồ ring topology, câu trả lời là **có, 2D làm tốt hơn**.

**Ràng buộc bắt buộc nếu làm visualizer:**
- Client Component riêng biệt (`"use client"`), **lazy-load bằng `next/dynamic`** → không chặn LCP
- Tôn trọng `prefers-reduced-motion` → hiển thị trạng thái tĩnh
- Có nút Play/Pause
- Không tự động chạy vô hạn khi section chưa vào viewport (`IntersectionObserver`)
- Có fallback tĩnh (ảnh hoặc SVG) cho JS bị tắt

#### 6.5.5 6-Axis Robotic Arm — phần tử trung thực

**Badge:** `Vendor platform · motion programs by me`

> The control software for a 6-axis industrial arm is provided by the manufacturer, so the software itself isn't mine — **but I write the motion control programs** that drive all six axes, in the vendor's PLC-style control language, on top of an OpenCV template-matching vision pipeline fed by an industrial GigE camera.

Kèm `<img src="/Picture/Robot_Control.png" alt="6-axis robotic arm control interface" width={820} />` trong `<details>` để thu gọn mặc định.

**Quy tắc bắt buộc:** luôn nói rõ phần mềm là của hãng, phần bạn làm là motion program. Không bao giờ để người đọc hiểu nhầm bạn viết phần mềm đó — mất uy tín khi phỏng vấn hỏi sâu là lộ ngay.

---

### 6.6 Skills — 6 nhóm

Dùng lại nội dung hiện có, tinh gọn. Grid 3 cột desktop / 1 cột mobile.

| Nhóm | Nội dung |
|---|---|
| **Firmware & Embedded** | STM32H7 / STM32F4 · STM32Cube HAL · bare-metal · CAN 2.0B 29-bit · FDCAN · SPI-to-CAN MCP2515 · MISRA C:2012 · cppcheck · state machine · non-blocking + soft timer · FreeRTOS · ESP-IDF · PlatformIO · bootloader / IAP · USB Host · FATFS |
| **Protocols & Connectivity** | OCPP · GB/T 27930 · DLT-645 · MQTT (topic, QoS, retain, LWT) · UART / RS485 / Modbus · WIZnet Ethernet (W5100 → W6300) · Wi-Fi provisioning · ASCII framed protocol có checksum + resync |
| **Hardware & Power** | EasyEDA Pro · contactor, power module, ramp dòng/áp · DHT, PIR, RFID RC522, LDR, NTC, rain, 74HC595, PT1000 · IMD · tuần tự đóng cắt an toàn · logic analyser · fault injection |
| **Embedded GUI** | TouchGFX (STM32H7) · LVGL (ESP32-P4) · MIPI-DSI: ST7701, ILI9881C · I/O expander PCA9536 · thiết kế layout & screen-state |
| **Edge AI & Software** | YOLOv11n · PyTorch · inference trên MCU (decision tree, rule) · OpenCV · Python · FastAPI · Flask · TypeScript · NestJS · PostgreSQL · Prisma · WebSocket · Flutter · React |
| **Quality & Process** | Unit test firmware trên PC với HAL giả lập · cưỡng chế kiến trúc 4 tầng · single-writer ownership · test bench, soak test, đo tải bus · sinh báo cáo tự động (Python, Node.js) · Markdown → docx |

---

### 6.7 Certifications

| Nhóm | Khóa | Ghi chú |
|---|---|---|
| **Machine Learning Specialization** | Supervised ML: Regression & Classification · Advanced Learning Algorithms · Unsupervised Learning, Recommender Systems & RL · ML Capstone | DeepLearning.AI × Stanford · Apr–May 2025 |
| **Deep Learning Specialization** | Neural Networks and Deep Learning | DeepLearning.AI · Jul 2025 |
| **Language** | **JLPT N3** — Japanese Language Proficiency Test | Đưa lên cao, kèm link `jlpt.jp` |

Cân nhắc thêm link verify Coursera cho từng khóa (đã có sẵn 5 link trong `README.md` — tái sử dụng).

**Cách trình bày:** 2 cột `<time>` + tên khóa. Nhóm theo specialization, không liệt kê phẳng.

---

### 6.8 About

3 đoạn, `max-width: 68ch`. Nội dung giữ nguyên từ bản hiện tại (đã viết tốt):
1. Sinh viên CNTT năm cuối HUST · firmware ở APES Lab · trạm sạc DC thương mại · code NDA
2. Nền AI có hệ thống: ML Specialization (DeepLearning.AI × Stanford) + DL Specialization → chạy model on-device
3. Dẫn dắt mọi team project từ năm nhất · giữ sổ tay phần cứng cá nhân

**Bổ sung 1 câu về leadership** (nếu chưa có ở trang web, hiện đang chỉ có ở README):
> Since my first year at HUST, I've led or co-led every team project I've been part of.

---

### 6.9 Contact

- **Đoạn dẫn:** *"I'm targeting full-time Embedded / IoT roles, ideally in Japan. If you're hiring and think this fits, I'd glad to talk."*
- **Grid 4 card:**

| Nhãn | Giá trị | href |
|---|---|---|
| Email | kimvinhh6@gmail.com | `mailto:kimvinhh6@gmail.com` |
| GitHub | github.com/CatKod | `https://github.com/CatKod` |
| LinkedIn | Hoàng Kim Vĩnh | profile URL (URL-encode đúng) |
| Facebook | HoangKiVinh | `https://web.facebook.com/HoangKiVinh` |

**Bổ sung nên có:** link tải CV dạng PDF (xem §7).

---

## 7. Tài liệu cần tạo

| Tài liệu | Vị trí | Mục đích |
|---|---|---|
| **CV 1 trang (PDF)** | `public/cv.pdf` + link tải ở hero & contact | Recruiter Nhật gần như luôn hỏi CV. Không có = mất cơ hội |
| **Project sheet** | `public/project-sheets/` | Mô tả chi tiết 3 flagship, dùng khi phỏng vấn sâu |
| **OG image** | `opengraph-image.tsx` | Ảnh hiện khi share link lên LinkedIn/X |

**Nội dung CV phải khớp 100% với website** — cùng số liệu, cùng thứ tự ưu tiên. Lệch nhau gây nghi ngờ.

---

## 8. Responsive & Accessibility

### 8.1 Breakpoint

| | Mobile (<768px) | Tablet (768–1024px) | Desktop (>1024px) |
|---|---|---|---|
| Nav | hamburger | đầy đủ | đầy đủ |
| Hero H1 | clamp tự co | clamp | clamp |
| Stat bar | 2 cột | 4 cột | 4 cột |
| Skill grid | 1 cột | 2 cột | 3 cột |
| Project card | 1 cột | 1 cột | 1 cột (dùng 2 cột grid nội bộ) |
| Ring visualizer | ẩn frame trên cùng, chỉ hiện kết quả | đầy đủ | đầy đủ |

**Test thực tế trên:** iPhone SE (375px) · iPad (768px) · laptop 1440px. Không chỉ dựa vào DevTools.

### 8.2 Accessibility — WCAG 2.1 AA

| Yêu cầu | Cách làm |
|---|---|
| Ngữ cảnh accessibility | `<html lang="en">`, `<main>`, `<nav>`, `<section aria-labelledby>` |
| Skip link | "Skip to content" — ẩn cho đến khi focus |
| Focus visible | `:focus-visible` với outline accent, **không bỏ outline** |
| Tương phản | ≥ 4.5:1 mọi text (§5.2) |
| Keyboard | mọi interactive element điều focus được, tab order hợp lý |
| Motion | `@media (prefers-reduced-motion: reduce)` → tắt animation, gradient, transition |
| Ảnh | `alt` mô tả đúng nội dung; ảnh robot có `alt` cụ thể |
| Icon | `aria-hidden` nếu trang trí |
| Tương phản focus | focus ring 3:1 trên nền |
| Zoom | dùng được ở 200% không tràn ngang |

### 8.3 Ngôn ngữ

100% tiếng Anh ở toàn site, kể tả tên hiệu (`HUST 20235876`, `đồ án tốt nghiệp` → **"graduation capstone"**). Tên riêng giữ dấu: `Hoàng Kim Vĩnh`.

---

## 9. Performance budget

| Chỉ số | Mục tiêu | Cách đo |
|---|---|---|
| Lighthouse Performance (mobile) | **≥ 90** | Lighthouse CI |
| LCP | < 2.0s | Lighthouse |
| CLS | < 0.05 | Lighthouse |
| INP | < 200ms | Lighthouse |
| JS ban đầu (gzipped) | < 110 KB | bundle analyzer |
| Tổng trọng lượng trang | < 400 KB | DevTools |
| Ảnh `Robot_Control.png` | < 200 KB | kiểm tra |

**Kỹ thuật bắt buộc:**
- `next/font` tự host font, không request ra ngoài
- `next/dynamic` + `ssr: false` cho visualizer và bất kỳ thứ nặng nào
- `loading="lazy"` + `decoding="async"` cho mọi ảnh ngoài viewport đầu tiên
- **Không** dùng `next/image` (đã tắt optimizer) — dùng `<img>` với `width`/`height` cụ thể để tránh CLS
- Không animation nào chạy ở 60fps liên tục khi ngoài viewport

**Cổng chặn CI:** build fail nếu JS > 130 KB gzipped. Đặt số ngưỡng có ý nghĩa, không đặt quá cao rồi bỏ qua.

---

## 10. SEO & chia sẻ

| Thẻ | Nội dung |
|---|---|
| `<title>` | `Hoàng Kim Vĩnh — Embedded Firmware Engineer` |
| `description` | STM32H7 · CAN 2.0B · MISRA C:2012 · State Machines. Industrial EV-charging firmware at APES Lab, HUST. JLPT N3. |
| `og:title` / `og:description` | như trên |
| `og:type` | `website` |
| `og:image` | 1200×630, tạo bằng `opengraph-image.tsx` |
| `twitter:card` | `summary_large_image` |
| `canonical` | `https://catkod.github.io/CatKod/` |
| `robots` | `index, follow` |
| `sitemap` | không cần — 1 trang |

**JSON-LD `Person`** — thêm ở `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Hoàng Kim Vĩnh",
  "jobTitle": "Embedded Firmware Engineer",
  "url": "https://catkod.github.io/CatKod/",
  "sameAs": ["https://github.com/CatKod", "https://www.linkedin.com/in/..."],
  "knowsAbout": ["Embedded Systems", "STM32", "CAN bus", "MISRA C", "ESP32", "MQTT", "Edge AI"],
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "Hanoi University of Science and Technology" }
}
```

---

## 11. Việc cần làm

| # | Hạng mục | Ưu tiên | Ghi chú |
|---|---|---|---|
| 1 | Khởi tạo Next.js + TS + ESLint trong `CatKod/CatKod` | P0 | Giữ nguyên `README.md` |
| 2 | `next.config.mjs` với `output: 'export'`, `basePath` | P0 | Sai `basePath` = 404 toàn site |
| 3 | Chuyển `style.css` → `globals.css` + token | P0 | Không viết lại |
| 4 | Tạo `content/*.ts` — tách nội dung khỏi markup | P0 | Sửa nội dung không đụng component |
| 5 | Dựng 8 section theo §6 | P0 | |
| 6 | Workflow `.github/workflows/deploy.yml` | P0 | |
| 7 | Tích hợp có thể đặt sau | P1 | |
| 8 | Ring Visualizer (Canvas 2D) | P1 | Lazy-load, reduced-motion |
| 9 | Tạo `cv.pdf` | P1 | **Cần bạn cung cấp CV hiện có** |
| 10 | `opengraph-image.tsx` | P2 | |
| 11 | Audit Lighthouse + sửa tới ≥ 90 | P1 | Chặn trước khi deploy |
| 12 | Test responsive thật (iPhone/iPad) | P1 | |
| 13 | Tối ưu ảnh robot | P1 | |

---

## 12. Tiêu chí nghiệm thu

Dự án coi là hoàn thành khi **tất cả** điều sau đúng:

- [ ] `npm run build` thành công, sinh `out/` với `index.html` hợp lệ
- [ ] `https://catkod.github.io/CatKod/` mở được, **không 404, không lỗi asset**
- [ ] Mọi asset load từ `/CatKod/...` (không có path tuyệt đối `/...` gốc)
- [ ] Lighthouse mobile Performance **≥ 90**
- [ ] CLS < 0.05
- [ ] Tất cả text đạt tương phản AA
- [ ] Điều hướng bằng bàn phím hoạt động, focus visible rõ
- [ ] `prefers-reduced-motion` tắt được animation
- [ ] Hiển thị đúng ở 375px / 768px / 1440px, không tràn ngang
- [ ] `README.md` vẫn hiển thị đúng trên github.com/CatKod
- [ ] **Không có** thông tin NDA: tên người, số điện thoại, tên khách hàng, mã hợp đồng, số serial thiết bị, bảng phân công nhân sự
- [ ] Không có placeholder (`your-profile`, `your-handle`, `Project Name 1`)
- [ ] Số liệu khớp 100% với `README.md` và CV
- [ ] Ảnh robot có `alt` mô tả đúng
- [ ] Không console error khi mở trang

---

## 13. Rủi ro đã biết

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| **`basePath` sai → 404 toàn site** | Cao | Kiểm tra `out/index.html` và link tương đối; test trước khi deploy |
| **Rò rỉ thông tin NDA** | Cao | Review checklist §12 trước mỗi lần deploy. Nội dung section 6.5 do tôi soạn từ tài liệu nội bộ — **bạn phải xác nhận không có chi tiết nào nhạy cảm** |
| Bundle tăng do chuyển sang Next.js | Trung bình | Budget §9 + cổng chặn CI |
| Ảnh robot quá nặng | Thấp | Nén, kiểm tra kích thước |
| Recruiter Nhật không đọc tiếng Anh kỹ thuật | Thấp | Đã có JLPT N3; cân nhắc thêm mô tả ngắn bằng Nhật cho bio, không bắt buộc |
| Nội dung lệch với CV | Trung bình | Sinh cả hai từ cùng một nguồn `content/*.ts` |

---

## 14. Câu hỏi cần bạn quyết

1. **Ring Visualizer** — có làm không? Nếu có, chọn Canvas 2D (khuyến nghị) hay Three.js thật? có, three.js
2. **CV** — bạn có CV sẵn không? Nếu có, đưa vào đây để tôi khớp nội dung. Nếu chưa, tôi soạn từ `content/*.ts`. tôi muốn bạn thiết kế luôn cho tôi 1 CV luôn
3. **Có thêm repo showcase nào không?** Hiện chỉ `embedded-iot-toolkit` là repo mới. `mipi_dsi` và `Demo_AI` chưa public — có muốn đưa lên? không
4. **Analytics** — có bật không? Nếu có, chọn Umami (cookie-less) hay Cloudflare Web Analytics? cái này tôi không rõ
5. **GitHub Pages hay chuyển Vercel?** Tôi khuyến nghị giữ Pages vì repo đã bật, miễn phí, và site này hoàn toàn tĩnh. GitHub Pages

---

<div align="center">

**Đặc tả xong.** Chờ duyệt §14 rồi bắt đầu build.

</div>
