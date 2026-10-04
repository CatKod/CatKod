# 🧭 TỔNG HỢP & KẾ HOẠCH RE-BRAND GITHUB THEO HƯỚNG EMBEDDED – IoT

> Ngày lập: 04/10/2026 · **Cập nhật v2** (sau khi quét thêm `D:\Robot`, `D:\Charger`, `D:\Esp32_Project`, `D:\Esp32`)
> Tài khoản: **CatKod** (Hoàng Kim Vĩnh) — HUST, SV 20235876
> Phạm vi: 15 public repo GitHub + 31 thư mục `D:\GitHub` + 4 nhóm dự án lớn ngoài `D:\GitHub`
> **File này là tài liệu tạm để bạn đọc & trả lời. Xong việc sẽ xoá.**

---

## 📌 PHẦN 0 — TÓM TẮT NHANH (đọc 30 giây)

| Hạng mục | Tình trạng hiện tại | Hướng cần đổi |
|---|---|---|
| **Profile bio** | "AI, data analysis, software engineering" — **không hề nhắc embedded/IoT** | Viết lại theo hướng Embedded/IoT + AIoT |
| **Profile README** | Còn placeholder `Project Name 1/2/3`, link LinkedIn/Twitter **giả**, badge thiếu C/Embedded | Viết lại thật, showcase 3 project IoT |
| **Repo mạnh nhất về IoT** | `SmartHome` (STM32H7 + ESP32-S3 + MQTT + TouchGFX), `Yootek-IOT-intern` (ESP32 + NestJS + MQTT), `Smart_Power_Outlet` (ESP32/ESP8266 + PIO + Flutter) | Đẩy lên top, thêm README chuẩn, topics, banner |
| **Repo AIoT** | `AIoT-Face_And_Order` (ESP32-CAM + OpenCV), `Sun-Car-Damage-AI-Assessment` (YOLOv11n + STM32 + ESP32) | Tách/gộp lại cho gọn, thêm demo video |
| **Repo nhiễm loạn** | `Ninja-Adventure`, `Code-Off-CatKod`, `House_price`, `OOP.Lab...`, `HandWriting_detection`, `NegaPremium-ChessEngine` (159 MB!) | **Archive / Private** hết |
| **Repo local chưa có trên GitHub** | `CapDienMayBay`, `Realtime_analsyn`, `AutoSub-Local-AI`, `DMST_3D` | Cân nhắc public hay giữ private |
| **Repo trùng/chồng ý tưởng** | `Smart_Power_Outlet`, `SmartHome`, `Yootek-IOT-intern` đều là "ESP32 + backend + app" | Cần thống nhất thư viện dùng chung (điểm cộng lớn nhất) |

---

## 🚨 ĐỀ-XUẤT MỚI (v2) — SAU KHI QUÉT `D:\Robot`, `D:\Charger`, `D:\Esp32*`

> **Mình vừa phát hiện 3 nhóm dự án lớn ở ngoài `D:\GitHub` — và đây mới là phần mạnh nhất của bạn.**

| Phát hiện | Mức độ ấn tượng |
|---|---|
| 🔥 **`D:\Charger\Sac_Link`** — firmware trạm sạc EV **chạy thật ở APES Lab**: STM32H723, CAN 2.0B 29-bit qua MCP2515, MISRA C:2012, unit test, **11 task × 6 bước**, 312 hạng mục kế hoạch, báo cáo test kèm ảnh logic analyzer | **Cấp độ công nghiệp** — đây là thứ mạnh nhất bạn từng làm |
| 🔥 **D:\Charger\NVC-CM-DC-FW (2 súng)** — firmware sạc DC 2 súng: OCPP, GBT27930, DLT645, **7 chip Ethernet WIZnet**, RFID, IMD, SECC, bootloader, USB Host + FATFS | **Sản phẩm thương mại** |
| 🔥 **`D:\Esp32_Project\Demo_AI`** — Edge AI trên ESP32-P4: nhận dạng lệnh **tiếng Việt tự nhiên**, 48 mẫu / 10 lớp, <10 KB, inference <1 ms, điều khiển 5 relay | **TinyML thật, không cần cloud** |
| 🔥 **`D:\Esp32_Project\mipi_dsi`** — ESP32-P4 + màn MIPI-DSI + LVGL + ST7701 + ILI9881C + PCA9536 | **GUI nhúng sâu** |
| ⚠️ **`D:\Robot`** — bộ điều khiển cánh tay robot 6 trục: C# + OpenTK 3D + OpenCV TemplateMatching + **camera công nghiệp Hikrobot** + CH341 USB-serial | **Cần xác nhận: đây code của bạn hay phần mềm có sẵn?** |

### 🔄 Đánh giá lại định hướng (rất quan trọng)

Bạn **KHÔNG phải** là một sinh viên làm bài IoT. Bạn đang làm **firmware công nghiệp thật** ở lab:
- CAN bus, FDCAN, SPI-to-CAN, MISRA C, state machine, non-blocking FSM, soft-timer, unit test trên PC, test bench với logic analyzer/oscilloscope, OCPP, GB/T, bootloader, USB Host, FATFS, điện tử công suất.

**Vì vậy profile KHÔNG NÊN tự xưng là "Embedded/IoT Engineer" theo kiểu hobby.** Nên tự xưng là:
> **Embedded Firmware Engineer** — STM32H7, CAN, MISRA C, state machine, power electronics

Câu trả lời cho **A1** nên cân nhắc lại dựa trên phát hiện này. Chi tiết ở **PHẦN 3B**.

**Kết luận nhanh (v2):** Bạn có **2 dự án ở cấp độ "ứng tuyển được ngay"** (Sac_Link, NVC 2 súng) nhưng chúng **chưa có một chút nào trên GitHub**. Ưu tiên số 1 hôm nay nên là: **đưa Sac_Link lên GitHub bằng một repo showcase an toàn** (xem E8/E9).

---

---

## 📌 PHẦN 1 — PROFILE HIỆN TẠI (GITHUB)

```
name:     Hoàng Kim Vĩnh
bio:      👋 Hi, I'm a student with a strong interest in AI, data analysis, and software engineering.
          🔍 I focus on applying machine learning and computer vision.
location: Hà Nội
public_repos: 15 | followers: 1 | following: 1
created:  2021-11-26
```

### Vấn đề cần sửa

- ❌ **Bio không có chữ "Embedded", "IoT", "STM32", "ESP32"** — người recruiter lọc theo keyword sẽ không thấy bạn.
- ❌ Bio nghiêng về **AI/computer vision thuần**, phản lại chiến lược mới.
- ⚠️ Thiếu: trường (HUST), chức danh (Embedded/IoT Engineer), link portfolio, tech keyword.
- ⚠️ Profile chỉ có 1 follower — cần "social proof".

### Profile README (`CatKod` repo → https://catkod.github.io)

Các vấn đề đã phát hiện:

| Vấn đề | Chi tiết |
|---|---|
| 🔴 **Placeholder còn sót** | `### 🌟 [Project Name 1](https://github.com/CatKod/project1)` và `Project Name 2`, `Project Name 3` |
| 🔴 **Link giả** | `linkedin.com/in/your-profile`, `twitter.com/your-handle`, `instagram.com/your-handle` |
| 🔴 **Stack badges sai/thiếu** | Chỉ có Python/Java/C++/HTML/CSS/Flask/FastAPI/PostgreSQL — **thiếu C, C++, Embedded, STM32, ESP32, PlatformIO, Arduino, MQTT, FreeRTOS, Node.js, TypeScript, Dart/Flutter** |
| ⚠️ **"Current Goals" sai hướng** | Đang ghi "Working on: A personal project" — chung chung |
| ⚠️ **Untracked file** | `Picture/Robot_Control.png` (chưa commit) — có thể là ảnh minh hoạ robot |
| ✅ **Có sẵn** | Stats badges, streak, trophies, activity graph, profile views counter |

---

## 📌 PHẦN 2 — BẢNG 15 PUBLIC REPO TRÊN GITHUB

| # | Repo | Lang | Ngôn ngữ | Chủ đề | IoT/Embedded? | Đánh giá |
|---|---|---|---|---|---|---|
| 1 | **SmartHome** | C | EN | STM32H7 + ESP32-S3, RFID, servo, cảm biến, MQTT, TouchGFX | ⭐⭐⭐⭐⭐ | **FLAGSHIP #1** |
| 2 | **Yootek-IOT-intern** | TypeScript | — | SmartGarden: ESP32-IDF + NestJS + PostgreSQL + Prisma + MQTT + WebSocket | ⭐⭐⭐⭐⭐ | **FLAGSHIP #2** (thực tập doanh nghiệp) |
| 3 | **Smart_Power_Outlet** | C++ | — | Ổ cắm thông minh: ESP32-IDF + ESP8266 + PlatformIO + Flutter + PCB | ⭐⭐⭐⭐ | **FLAGSHIP #3** (có cả phần cứng) |
| 4 | **Sun-Car-Damage-AI-Assessment** | C | EN | YOLOv11n + STM32 + ESP32 bridge + Streamlit | ⭐⭐⭐⭐ | **AIoT — rất ấn tượng khi ứng tuyển AIoT** |
| 5 | **AIoT-Face_And_Order** | C | EN | ESP32-CAM + Flask + OpenCV Haar Cascade | ⭐⭐⭐⭐ | AIoT, nhưng **còn thô** (không README chuẩn, IP hardcode) |
| 6 | **Attendance_Check** | TypeScript | EN | Next.js + Electron kiosk + Expo + Supabase (đọc MAC/IP) | ⭐⭐⭐ | Hệ thống thật đang chạy, **nhưng là software** |
| 7 | **SmartSlide_JP** | JavaScript | — | Máy chiếu thông minh / điều khiển trình chiếu | ⭐⭐⭐ | IoT-adjacent |
| 8 | **Network_Programming** | C | — | Bài tập lập trình mạng (Week 1, 2) | ⭐ | Bài tập lớp — **archive** |
| 9 | **NegaPremium-ChessEngine** | C++ | — | Chess engine | ⭐ | **159 MB — cần archive, kéo tổng dung lượng profile** |
| 10 | **SSA** | Python | — | Chưa rõ nội dung (4 MB) | ❓ | Cần bạn xác nhận |
| 11 | **House_price** | HTML | — | Dự báo giá nhà (ML) | ⭐ | Repo local trỏ remote `My_AI_Project` ≠ tên repo → **cần check** |
| 12 | **HandWriting_detection** | Python | — | CNN nhận dạng chữ viết tay | ⭐⭐ | Bài lab, không phải IoT |
| 13 | **Ninja-Adventure** | Java | — | Game học Java (fork từ bài mẫu) | ❌ | **Archive** |
| 14 | **Code-Off-CatKod** | Python | — | Gộp bài tập: AI/Java/Python/C/SQL | ❌ | **Archive** |
| 15 | **CatKod** | — | EN | Profile README | — | Cần viết lại |

**Tổng dung lượng public: ~ 340 MB** — trong đó `NegaPremium-ChessEngine` chiếm ~155 MB và `Ninja-Adventure` ~89 MB, `Sun-Car` ~76 MB. Archive 2 repo đầu sẽ giảm ~70%.

---

## 📌 PHẦN 3 — CHI TIẾT CÁC REPO EMBEDDED / IoT (ĐỌC KỸ ĐÃ)

### 🥇 3.1 SmartHome — ⭐ ĐỐI TƯỢNG FLAGSHIP

**Nội dung thực tế (đã đọc README):**
- Vi điều khiển trung tâm: **STM32H7** (CubeIDE, có cả project **TouchGFX** cho GUI, và project STM32F4 legacy)
- Cầu nối Wi-Fi: **ESP32-S3** (ESP-IDF, `SmartHome/ESP32/esp32s3`)
- Giao tiếp giữa 2 chip: **UART** (đã có `docs/uart_protocol.md`)
- Lớp trên: **MQTT broker + Web Dashboard** (`backend/`)
- Tính năng: RFID + PIN, khóa cửa servo SG90, PIR + cảm biến âm thanh, DHT11, quang trở, nhiệt trở, cảm biến mưa, LED qua **74HC595** (shift register), cửa sổ tự động mở/đóng
- Nguyên tắc thiết kế tốt: *"Web/MQTT không điều khiển phần cứng trực tiếp. Mọi lệnh đều phải được STM32H7 kiểm tra trước khi thực hiện."* → đây là **điểm cộng lớn về an toàn**, nên nhấn mạnh.

**Điểm mạnh:** Đúng chuẩn kiến trúc IoT 2 tầng (edge + cloud), có tài liệu protocol, có GUI nhúng.
**Cần làm:** Thêm ảnh phần cứng, sơ đồ khối, GIF hoạt động, video demo, "How to build", BOM, phần hướng dẫn flash.

### 🥇 3.2 Yootek-IOT-intern — ⭐ THỰC TẬP DOANH NGHIỆP (vàng)

**Nội dung:**
- `SmartGarden/SmartGarden_ESP` — firmware **ESP32 (ESP-IDF)**, publish cảm biến nhiệt độ/độ ẩm qua **MQTT**, subscribe lệnh bật/tắt đèn LED (đỏ/vàng/xanh) + ACK
- `SmartGarden/smart-garden-app` — backend **NestJS + PostgreSQL + Prisma + MQTT + WebSocket (Socket.IO) + Swagger**
- `my_app/` — NestJS riêng: auth JWT, Passport, **role-based (admin/user)**, CRUD Garden/Vegetable, quản lý giá & doanh thu, bảo mảo `soldQuantity <= importedQuantity`
- `ESP32_SendData` — thêm 1 project ESP32 nữa
- Có **`BAO_CAO_THUC_TAP.md`** — báo cáo thực tập 13 mục rất đầy đủ (schema DB, API, bảo mật, firmware, kiểm thử)

**Điểm mạnh:** Đây là bằng chứng **biết làm việc thật ở doanh nghiệp**, có báo cáo chuyên nghiệp. Recruiter rất thích.
**Cần làm:** Viết README ở cấp repo (hiện **repo không có README**), ghi rõ vai trò của bạn, ảnh dashboard, export Swagger.

### 🥇 3.3 Smart_Power_Outlet — ⭐ CÓ PHẦN CỨNG THẬT

**Nội dung:**
- `Smart_Power_Outlet_ESP/` — **ESP-IDF (C)**: `main.c`, `wifi_prov.c` (Wi-Fi provisioning), `secrets.h`
- `Smart_power_outlet_PIO/` — bản **PlatformIO** (đa target)
- `hardware/smart_outlet` — **thiết kế PCB** + `hardware/tools`
- `smart_power_outlet_app/` — app **Flutter** đa nền tảng + `DOCUMENTATION.md`
- Commit gần nhất: *"add tương thích với esp wroom32 và esp8266"* → đã biết làm **multi-target**
- **Cảnh báo phát hiện:** có file `secrets.h` trong thư mục — kiểm tra `.gitignore` để chắc không lộ mật khẩu Wi-Fi

**Điểm mạnh:** Full-stack từ PCB → firmware → app. Rất hiếm ở sinh viên.
**Cần làm:** Ảnh board thật, schematic, ảnh app, video relay bật/tắt.

### 🥈 3.4 Sun-Car-Damage-AI-Assessment — AIoT (78 MB)

**Nội dung:**
- **YOLOv11n** (Ultralytics) + PyTorch: object detection, instance segmentation, severity estimation
- Có **RL_STM32_CAR** + `ESP32_Car_Damage_Bridge.ino` → phát hiện trực tiếp từ **ESP32-CAM**, UART sang **STM32**
- `flask_damage_server.py`, Streamlit demo, `yolo_dataset`, `runs/`, `results/`, `evaluation/`
- Có `check_stm32_compilation.bat`, nhiều script debug UART

**Điểm mạnh:** Kết hợp AI + embedded 2 chip. Đúng hướng **AIoT/Edge AI** — xu hướng đang hot.
**Rủi ro:** Nặng (78 MB) do chứa dataset + `runs/` + kết quả. Nên dọn (giữ code + 1 video demo, bỏ weight/checkpoint khỏi git).
**Cần làm:** Dọn repo, tách phần Edge-AI, thêm bảng kết quả (mAP/IoU) vào README.

### 🥈 3.5 AIoT-Face_And_Order — AIoT (5.8 MB)

**Nội dung:** ESP32-CAM chụp ảnh mỗi 2s → HTTP POST lên Flask server → OpenCV Haar Cascade nhận diện khuôn mặt real-time → web stream.
**Vấn đề cần xử lý:**
- 🔴 README **hardcode IP** `http://192.168.1.28:5000` → dễ bị xem là "đồ án chưa hoàn thiện"
- 🔴 Hardcode `ssid`/`password` trong `.ino`
- ⚠️ Tên repo lệch nội dung (có "Order" nhưng README chỉ nói Face Detection)
- ⚠️ Chưa có detection thật trên ESP32, mọi tính toán để server

**Cơ hội nâng cấp rất lớn:** Nếu bạn chuyển sang chạy **face detection on-chip (ESP32-S3 có vector instructions)** hoặc dùng **TinyML (TFLite Micro / Edge Impulse)**, repo này sẽ từ "bài lab" thành "Edge AI demo" — cực hợp hướng.

### 🥉 3.6 Realtime_analsyn — CHƯA CÓ TRÊN GITHUB (public)

**Nội dung:** `GetData_PIO` (PlatformIO, **Arduino framework**, `PubSubClient` → MQTT) + `realtime_app` (**Flutter**) + ESP32-P4 với **ESP32-C6 làm Wi-Fi co-processor qua ESP-Hosted** (cấu hình rất chi tiết trong `platformio.ini`).
**Đánh giá:** Kỹ thuật tốt (multi-target, board abstraction, co-processor) nhưng chưa rõ ứng dụng là gì. Cần bạn mô tả.

### 🥉 3.7 CapDienMayBay — CHƯA CÓ TRÊN GITHUB (public)

**Nội dung:** HMI cấp điện máy bay (208VAC/115VAC/37VAC/28VDC) — **FastAPI** + state machine kiểu PLC + **driver Modbus/PLC** + driver ESP32, frontend **React + Vite**, có `api_spec.md`, `state_machine.md`, Postman collection.
**Đánh giá:** Hệ thống **điều khiển công nghiệp** — nghe rất ấn tượng, nhưng cần biết bạn có thực sự làm phần driver phần cứng không.

### 3.8 Attendance_Check — Software, nhưng là hệ thống "thật"

- Next.js 14 web-admin + **Electron kiosk** (đọc MAC/IP để điểm danh) + **Expo** mobile + **Supabase**
- Đang chạy thật: `https://apes-attendance.vercel.app`
- APES Lab, Học viện Công nghệ Bưu chính Viễn thông
- ⚠️ **Không thuộc hướng embedded** — nhưng chứng minh khả năng làm sản phẩm thật + full-stack
- ⚠️ Lưu ý: có `.env` trong thư mục, cần chắc `.gitignore` chặn

---

# 🏆 PHẦN 3B — 3 DỰ ÁN LỚN MỚI PHÁT HIỆN (chi tiết)

> Đây là phần **quan trọng nhất** của tài liệu. Mình đã đọc kỹ tài liệu, source và cấu trúc thư mục của cả 3.

---

## 🔥 3B.1 — SAC_LINK: HỆ SẠC EV "LINH HOẠT" (dự án chính, đang làm)

**Vị trí:** `D:\Charger\Sac_Link` (335 MB) | **Vi điều khiển:** STM32H723XG | **Deadline:** 30/11/2026

### Bản chất dự án
Hệ thống sạc DC nhiều súng, xếp **vòng kín (ring)**: S1..SN, giữa 2 súng liền kề có 1 **Contactor Link**. Khi 1 xe cần nhiều công suất hơn mức 1 PM, hệ **tự động huy động/thu hồi công suất** từ các súng đang rảnh.

- Tối đa **16 tủ** × 2 kênh = **32 súng**
- **CAN 2.0B extended 29-bit**, 125 kbps, qua **SPI-to-CAN MCP2515**
- Phát triển trên nền firmware sạc 2 súng (`NVC-CM-DC-FW`)

### Kiến trúc phân lớp (rất chuẩn — đây là điểm mạnh lớn nhất)

Tài liệu `phan_lop.md` quy định **4 tầng, cấm gọi ngược chiều**:

| Tầng | Thư mục | Nội dung |
|---|---|---|
| **Application** | `App/` | `link_app.c/h` — Station FSM, điều phối toàn cục |
| **Middleware/Service** | `Middleware/Service/` | `link_frame`, `cab_addr`, `ch_table`, `sys_table`, `cmd_timeout` |
| **Middleware/FSM** | `Middleware/FSM/` | `power_borrow`, `power_reclaim`, `link_fault` |
| **Middleware/Control** | `Middleware/Control/` | `local_ctrl` |
| **Driver/BSP** | `Driver/` | `spican`, `canspi`, `mcp2515`, `fdcan_bus`, `soft_timer`, `local_hw` |
| **Config** | `Config/` | `link_config.h` |

Quy tắc: **Driver không chứa FSM, không biết giao thức, không gọi Middleware.** Chỉ App mới được điều phối toàn cục.

### 11 Task — mỗi task 6 bước (code → test ngữ pháp → unit test PC → test bench → báo cáo → bàn giao)

| Task | Module | Nội dung kỹ thuật |
|---|---|---|
| 1 | `spican.c/h` | Driver SPI→CAN MCP2515, tính CNF1/2/3 cho 125 kbps, ISR chỉ đọc frame ra buffer, tự phục hồi bus-off |
| 2 | `cab_addr.c/h` | Địa chỉ tủ + số kênh, check dải 1–16 |
| 3 | `link_frame.c/h` | **Encode/decode CAN ID 29-bit 6 trường** (Prio/Cmd/TargetType/TargetID/Dest/Src), 5 loại bản tin, bit-shift có `#define SHIFT/MASK` |
| 4 | `ch_table.c/h` | Bảng định tuyến kênh toàn cục, dựng từ broadcast, `ready` flag |
| 5 | `sys_table.c/h` | Bảng trạng thái toàn hệ (súng/PM/contactor/áp/dòng), `last_seen_ms`, **chống giữ giá trị cũ** |
| 6 | `cmd_timeout.c/h` | Timeout lệnh, TIMEOUT_ID 0–127, cấp phát vòng |
| 7 | `local_ctrl.c/h` | Điều khiển PM + contactor tại tủ, **ramp dòng về 0 trước khi mở K**, phát hiện **dính tiếp điểm** |
| 8 | `power_borrow.c/h` | **Thuật toán huy động công suất** — quét vòng ring bằng modulo, `prev()/next()`, tìm súng rảnh 2 hướng |
| 9 | `power_reclaim.c/h` | **Thuật toán thu hồi** — sự kiện xe mới ưu tiên cao, thu hồi từ biên vào trong |
| 10 | `link_fault.c/h` | Lỗi dính tiếp điểm, bản tin **Priority 000** thắng arbitration, tự phục hồi |
| 11 | `link_app.c/h` | FSM `INIT → DISCOVERY → RUN → SAFE`, non-blocking |

### Những chi tiết kỹ thuật ấn tượng (nên khoe trong profile)

✅ **Quy tắc "1 biến chỉ có 1 task được ghi"** — quy tắc ownership dữ liệu, ai đọc/ai ghi được ghi rõ trong bảng tài liệu
✅ **Non-blocking tuyệt đối** — cấm `HAL_Delay`, dùng `Tim_1ms[]` soft-timer; DoD kiểm bằng `grep`
✅ **MISRA C:2012** — đã dựng pipeline cppcheck + addon Python, script `run_misra.ps1`, kết quả baseline **151 findings** với phân tích rule cụ thể (17.3, 8.4, 10.4, 15.5...)
✅ **Unit test trên PC** — mock HAL GPIO/SPI/tick, `make test`
✅ **Test bench thật** — ảnh chụp **logic analyzer** đo chu kỳ broadcast ~100 ms, đo dòng bằng oscilloscope
✅ **Fault injection** — dính tiếp điểm, rút cáp CAN, rút nguồn, mất SPI, cảm biến dòng không về 0
✅ **Soak test 24 h**, đo tải bus (≤ 20%), đo jitter
✅ **Tính lại khung thời gian CAN** khi đổi 250 → 125 kbps (bảng tính toán trong tài liệu)
✅ **Báo cáo test tự động** — `gen_report.py` sinh `.docx` từ `UnitTest_Summary.txt` + `MISRA_Report.txt`
✅ **Tài liệu vẽ bằng drawio** — biểu đồ trình tự, lưu đồ huy động/thu hồi, sơ đồ chuyển trạng thái
✅ **Dự án có `.git`** (trong `NVC-CM-DC-FW`) → bạn đã quen làm việc nhóm với Git

### Kỹ năng thể hiện được
`STM32H7` · `FDCAN` · `CAN 2.0B` · `SPI-to-CAN (MCP2515)` · `MISRA C:2012` · `cppcheck` · **State Machine** · non-blocking + soft-timer · unit test trên PC · **OCPP** · **GB/T 27930** · **DLT-645** · Bootloader · **USB Host** · **FATFS** · Driver/BSP · Kiến trúc phân lớp · Quản lý dự án (Gantt, ngày công, phân vai)

---

## 🔥 3B.2 — NVC-CM-DC-FW: FIRMWARE SẠC 2 SÚNG (nền tảng)

**Vị trí:** `D:\Charger\NVC-CM-DC-FW - V1.00 - 2gun` (109 MB) | **Đã có `.git`**

### Thư mục ứng dụng (Device layer) — nhìn thấy rõ đây là sản phẩm thương mại

| Thư mục | Phần cứng / chức năng |
|---|---|
| `Device/Ethernet/` | Driver cho **7 chip WIZnet**: W5100, W5100S, W5200, W5300, W5500, W6100, W6300 |
| `Device/Ocpp` | **OCPP 1.6 / 2.0.6** (giao thức quản lý trạm sạc) |
| `Device/SECC` | Giao tiếp với **SECC-A/B** phía xe (GB/T) |
| `Device/Meter` | Công tơ DC (**DLT-645**) |
| `Device/IMD` | Thiết bị giám sát cách điện (Insulation Monitoring Device) |
| `Device/RFID` | Đầu đọc thẻ RFID |
| `Device/HMI` | Màn hình RS232 |
| `Device/PowerModule` | Khối công suất |
| `Device/IO` | Board IO (DO/DI) |
| `Device/Measure` | Đo nhiệt độ (PT1000) |
| `Device/LogData` | Ghi log |

### Tài liệu giao thức kèm theo (rất đáng chú ý)
- `GBT27930 Interface_V1.57` — **tiêu chuẩn Trung Quốc** về giao tiếp sạc DC
- `DLT645-2007` — chuẩn đọc công tơ điện
- `Module Communication Protocol V1.50`
- `IMD V5.1`
- `Tai_lieu_state_machine_gun.md` — **tài liệu state machine súng sạc**

### Các bài học nhỏ đã làm (phần "bootloader, SD card, USB, CAN" bạn nhắc)

| Thư mục | Bài học |
|---|---|
| `Charger Bootloader with USB` | Lập trình **bootloader**, nạp FW qua USB |
| `Charger SD Card on USB` | **SD card + USB**: đọc/ghi file qua USB |
| `Charger Read and Write on USB` | Đọc/ghi USB |
| `Charger USB` / `Charger2 USB` | USB host/device |
| `Charger Bootloader with Ethenet Client` | Bootloader **qua Ethernet** (client) |
| `Charger Bootloader with Ethenet Sever` | Bootloader **qua Ethernet** (server) |
| `TestCan_SPI_interupt` | **CAN + SPI + ngắt (interrupt)** |
| `Test Mesure Temperature PCB ADC-T-PCB` | Đo nhiệt độ PCB bằng ADC |
| `Algorithm-Simulation` | Mô phỏng thuật toán |
| `AppTest` | Test ứng dụng |
| `Sac_Link/Car_Simulate` | **Mô phỏng xe điện** (STM32H723, có `vehicle_sim.c`, `LinkFrame.c`) |
| `Sac_Link/MISRA` | Pipeline kiểm tra MISRA C |
| `To_Docx` | Script Node.js **chuyển Markdown → docx** (tự động hoá tài liệu) |
| `app.js` | File JS lớn (84 KB) ở root — có thể là tool gộp tài liệu |

**Kỹ năng thể hiện được:** `Bootloader/IAP` · `USB Host` · `SD card + FATFS` · `Ethernet + WIZnet` · `OCPP` · `GB/T 27930` · `DLT-645` · `RS232/RS485` · `Rituals of SEI`

---

## 🔥 3B.3 — ESP32: EDGE AI + GIAO THIẾP + GUI NHÚNG

**Vị trí:** `D:\Esp32_Project` (học tập) và `D:\Esp32` (tài liệu + board)

### 3B.3.1 `Demo_AI` — Edge AI nhận dạng lệnh tiếng Việt ⭐

**Đây là repo ESP32 đáng khoe nhất của bạn.**

| Hạng mục | Chi tiết |
|---|---|
| **Vi điều khiển** | **ESP32-P4** |
| **Bài toán** | Nhận dạng lệnh **tiếng Việt tự nhiên** qua UART → điều khiển thiết bị |
| **Dataset** | 48 mẫu câu lệnh, **10 lớp** (bật/tắt đèn phòng khách, hành lang, phòng ăn, quạt 2 phòng) |
| **Thuật toán** | Rule-based classifier (13 keyword), **không cần TensorFlow** |
| **Kết quả** | **100% accuracy** trên tập train, **< 10 KB code**, **inference < 1 ms** |
| **Thiết bị** | 5 relay/SSR qua GPIO (đèn PK, đèn HL, đèn PA, quạt PK, quạt PA) |
| **Giao tiếp** | UART 115200, TX=GPIO43, RX=GPIO44, protocol ASCII |
| **Cây thư mục** | `TrainningAI/` (data.csv, decision_tree_model.c/pkl) + `test MCP/main/` (main.c, **edge_ai_classifier.h**) |

**Vì sao đây là AIoT thật, không phải đồ án:**
- Model **chạy hoàn toàn trên vi điều khiển**, không cần cloud/server
- Có **pipeline đầy đủ**: dataset CSV → train → xuất model C → nhúng vào firmware
- 100% accuracy trên tập train, kèm bảng accuracy **theo từng lớp**
- Tài liệu README viết cẩn thận: dataset, GPIO pinout, protocol, cách mở rộng thêm thiết bị, debug

**Điểm cần lưu ý:** "100% accuracy trên tập train" là điều **có thật nhưng không đáng khoe** như con số. Nếu muốn nâng cấp (mình có thể giúp): thêm tập kiểm chứng riêng (test set), thêm câu lệnh nhiễu, dùng decision tree thật thay vì rule, hoặc chuyển sang TensorFlow Lite Micro.

### 3B.3.2 `mipi_dsi` — GUI nhúng chuyên nghiệp

- **ESP32-P4** + màn hình **MIPI-DSI**
- Component: `esp_lcd_ek79007`, `esp_lcd_ili9881c`, `esp_lcd_st7701`, `lvgl__lvgl`, `esp_io_expander_pca9536`
- → Bạn đã tự dựng **driver LCD hiển thị + LVGL trên MCU** — kỹ năng rất hiếm ở sinh viên

### 3B.3.3 Các project ESP32 khác

| Thư mục | Nội dung |
|---|---|
| `C6_Flasher` | Firmware flash cho ESP32-C6 (C6 làm Wi-Fi co-processor) |
| `ESP_WROOM_32` | Project ESP32-WROOM-32 cơ bản, có `espressif__mqtt` |
| `Sample_project_esp32p4` | Project mẫu ESP32-P4 |
| `slave` | `main/common` + esp-qa ping/wifi cmd |
| `test_tft_screen` | Test màn hình TFT |
| `esp-dev-kits` | Clone repo chính thức Espressif (để đọc ví dụ) |

### 3B.3.4 `D:\Esp32` — tài liệu & board

| Thư mục | Nội dung |
|---|---|
| `JC-ESP32P4-M3-DEV` | Tài liệu **board thật** (chinese): 1-Demo, 2-Specification, 3-Structure_Diagram, 4-Driver-IC-Data-Sheet, 5-Schematic, 6-User_Manual, 7-Molding-Tool, 8-Burn operation |
| `JC-ESP32P4-M3-LIB` | Thư viện tự viết: `I2C_LED16x2_ESP32P4.c/h` |
| `esp-hosted-master` / `esp-hosted-mcu` | **ESP-Hosted** (MCU chính dùng Wi-Fi của ESP32-C6) |
| `esp-at-master` | ESP-AT (AT command firmware) |
| `mqtt_server` | Server MQTT (PlatformIO) |
| `Sơ đồ chính Esp32-P4` | Sơ đồ chân |
| `esp_idf_cheatsheet.pdf` | Cheatsheet ESP-IDF |
| `esp8266` | Project ESP8266 |

> **Thói quen tốt:** Bạn giữ cả **tài liệu kỹ thuật, sơ đồ, datasheet, code mẫu chính thức** của mọi board mình làm. Đây chính là tinh thần của một kỹ sư embedded thật. Có thể **biến thành một repo "hardware notes"** trên GitHub (đây là ý tưởng ở câu B5).

---

## ⚠️ 3B.4 — DỰ ÁN CÁNH TAY ROBOT 6 TRỤC

**Vị trí:** `D:\Robot` (375 MB) | **Ảnh:** `Picture/Robot_Control.png`

### Những gì mình tìm thấy

| Hạng mục | Chi tiết |
|---|---|
| **Phần mềm** | `机械臂控制器V3.1.exe` (C#) — bản build `RoboticControl_CV v10.0dev` |
| **3D rendering** | **OpenTK 3.1** (OpenGL cho .NET) + `OpenTK.GLControl` |
| **Computer Vision** | **OpenCV 4.6** + `TemplateMatching.lib` → **Template Matching** (nhận dạng vị trí/ký hiệu) |
| **Camera công nghiệp** | **Hikrobot MVS** (MvCameraControl, MvDSS, MvFGProducer) — camera GigE/USB3 Vision |
| **Giao tiếp serial** | **CH341** (USB → UART/RS232) — driver `CH341SER` |
| **Mô hình 3D** | File `.stl`: `ArrowX/Y/Z.stl` (mũi tên trục XYZ) |
| **Cấu hình robot** | `Robot1.xml` … `Robot5.xml` (nhiều robot/cánh tay) + `GlobalSetting.xml`, `buttonConfig.xml` |
| **Cấu hình SDK camera** | `CommonParameters.ini` (Hikrobot), `custom.ini` |
| **Tài liệu** | `Thuc-Hanh-Lap-Trinh-CNC.pdf` (thực hành lập trình CNC), `User manual (A5).pdf` |
| **Ảnh chụp màn hình** | `screen.jpg`, `Template.jpg` |

### ❓ CẦN BẠN XÁC NHẬN (câu A8)

- Đây là **code bạn viết** hay **phần mềm có sẵn của nhà sản xuất / thầy giáo**?
- Bạn có **viết phần điều khiển cánh tay** (firmware STM32 điều khiển 6 trục, nghịch đảo động cơ) không? Nếu có, phần đó ở đâu?
- `error.txt` ghi lỗi `OpenTK Version=3.1.0.0` không khớp → **bạn có định sửa không?** Đây là cơ hội tốt để bạn làm **bản fork hoạt động được** và đưa lên GitHub.
- Bạn dùng **Template Matching** để làm gì: định vị robot, nhận dạng vật thể, hay calibration?

### 💡 Nếu bạn thực sự làm dự án này
Đây là một **project cực kỳ giá trị** vì nó kết hợp:
`Embedded (6 DOF) + Computer Vision (OpenCV Template Matching) + Camera công nghiệp (GigE/USB3 Vision) + 3D (OpenTK) + Giao tiếp serial (CH341)`

→ **Đây là mảnh "robotics" mà rất nhiều công ty ô tô, tự động hoá, nghiên cứu đang cần.** Nếu bạn có firmware 6 DOF thì đây là repo #1 để khoe.

---

## 📊 BẢNG TỔNG HỢP TẤT CẢ DỰ ÁN ĐÃ BIẾT (v2)

| # | Dự án | Nguồn | Vi điều khiển | Giao thức chính | Mức độ |
|---|---|---|---|---|---|
| 1 | **Sac_Link** (trạm sạc link) | `D:\Charger` | STM32H723 | CAN 2.0B 29-bit, SPI/MCP2515, MISRA | ⭐⭐⭐⭐⭐ |
| 2 | **NVC-CM-DC-FW** (sạc 2 súng) | `D:\Charger` | STM32 (H7) | OCPP, GB/T 27930, DLT-645, Ethernet, USB, SD | ⭐⭐⭐⭐⭐ |
| 3 | **Car_Simulate** (mô phỏng xe) | `D:\Charger` | STM32H723 | CAN, mô phỏng xe điện | ⭐⭐⭐⭐ |
| 4 | **Robot arm 6 DOF** | `D:\Robot` | ? | USB-serial CH341, OpenCV, OpenTK | ⭐⭐⭐⭐ (?) |
| 5 | **SmartHome** | `D:\GitHub` | STM32H7 + ESP32-S3 | UART, MQTT, TouchGFX | ⭐⭐⭐⭐⭐ |
| 6 | **Demo_AI** (Edge AI tiếng Việt) | `D:\Esp32_Project` | ESP32-P4 | UART, GPIO | ⭐⭐⭐⭐⭐ |
| 7 | **mipi_dsi** (GUI nhúng) | `D:\Esp32_Project` | ESP32-P4 | MIPI-DSI, LVGL | ⭐⭐⭐⭐ |
| 8 | **Yootek SmartGarden** | `D:\GitHub` | ESP32 | MQTT, WebSocket, JWT | ⭐⭐⭐⭐ |
| 9 | **Smart_Power_Outlet** | `D:\GitHub` | ESP32 / ESP8266 | Wi-Fi provisioning, MQTT, Flutter | ⭐⭐⭐⭐ |
| 10 | **Sun-Car-Damage-AI** | `D:\GitHub` | STM32 + ESP32-CAM | UART, YOLOv11n | ⭐⭐⭐⭐ |
| 11 | **Realtime_analsyn** | `D:\GitHub` | ESP32-P4 + C6 | MQTT, ESP-Hosted, Flutter | ⭐⭐⭐ |
| 12 | **CapDienMayBay** (HMI) | `D:\GitHub` | ? (Modbus/PLC/ESP32) | Modbus, REST | ⭐⭐⭐ |
| 13 | **AIoT-Face_And_Order** | `D:\GitHub` | ESP32-CAM | HTTP POST, OpenCV | ⭐⭐⭐ |
| 14 | **Attendance_Check** | `D:\GitHub` | — (MAC/IP) | Electron kiosk, Supabase | ⭐⭐⭐ |
| 15 | **SmartSlide_JP** | `D:\GitHub` | ? | — | ⭐⭐ |

---

| Repo cục bộ | Remote hiện tại | Đề xuất |
|---|---|---|
| `Ninja-Adventure` (89 MB) | CatKod/Ninja-Adventure | **Archive** (repo mẫu của thầy) |
| `NegaPremium-ChessEngine` (155 MB) | public | **Archive** — chiếm 46% dung lượng profile |
| `Code-Off-CatKod` | CatKod | **Archive** — gộp hết bài tập |
| `HandWriting_detection` | CatKod | **Archive** hoặc **Private** |
| `House_price` | `CatKod/My_AI_Project` ⚠️ **không khớp tên repo** | Kiểm tra & gộp |
| `Network_Programming` | CatKod | **Archive** |
| `OOP.Lab.20242...` | CatKod | **Archive** (bài OOP) |
| `SSA` (4 MB) | CatKod | **Bạn xác nhận nội dung** |
| `Code-Off-CatKod` chứa `LearningJava`, `LearningPython`, `SomeC` | — | Bỏ |
| `DMST`, `DMST_3D`, `KTPM`, `shallow-water-master` | **chưa git init** | Cân nhắc tạo repo hoặc bỏ |
| `2025.2-166155-16` | `ShibaCoder2005` (người khác) | Không phải của bạn |
| `Figma-Context-MCP`, `Windows-MCP`, `chrome-devtools-mcp`, `Full-Duplex-Cell-Free-mMIMO` | clone của repo khác | **Không push lên profile của bạn** |
| `KyThuatPhanMem`, `Ordering_System` | `Datt106` (người khác) | Bạn làm nhóm → hỏi có muốn vào không |

### Repo local chưa có trên GitHub public
`AutoSub-Local-AI` (AI tự động phụ đề video — Whisper?), `CapDienMayBay`, `Realtime_analsyn` → có thể đang **Private** hoặc **chưa push**. Cần xác nhận.

---

## 📌 PHẦN 5 — ĐỀ XUẤT "THƯƯỜNG HIỆU MỚI" CHO PROFILE

### 5.1 Bio mới (3 dòng, tối đuất từ khóa) — **PHIÊN BẢN A: Embedded (khuyến nghị)**

```
Embedded Firmware Engineer — STM32H7 · CAN/FDCAN · MISRA C · State Machine · Power Electronics
Building industrial EV-charging firmware at APES Lab (HUST) | IoT & Edge AI side-projects
```

### 5.1b Bio — PHIÊN BẢN B: Nếu muốn thiên về IoT/AIoT

```
Embedded & IoT Engineer — STM32 · ESP32 · ESP-IDF · MQTT · FreeRTOS
Edge AI on microcontrollers | Industrial firmware: EV charging, Smart Home, Robotics
```

### 5.1c Bio — PHIÊN BẢN C: Song ngữ (ngắn gọn, an toàn)

```
Embedded Firmware Engineer | STM32H7 · CAN · MISRA C · State Machine
IoT & Edge AI: ESP32 · MQTT · TinyML | HUST · 20235876
```

### 5.2 Profile README mới — bố cục đề xuất

```
1. Header: avatar/banner + tên + 1 câu định vị
2. About: 2-3 câu — ai bạn là, bạn build gì, bạn đang học gì
3. Tech badges: nhóm theo 4 nhóm
     Embedded: C, C++, STM32, ESP32, ESP-IDF, Arduino, PlatformIO, FreeRTOS, HAL, TouchGFX
     IoT/Backend: MQTT, Node.js, TypeScript, NestJS, FastAPI, WebSocket, PostgreSQL, Redis
     AI/Edge: Python, PyTorch, YOLOv11, OpenCV, TinyML
     Tools: Git, Docker, VS Code, KiCad, Figma
4. ⭐ Featured Projects (chỉ 3, không để placeholder):
     ① SmartHome            — STM32H7 + ESP32-S3, RFID, MQTT, TouchGFX
     ② Yootek SmartGarden   — IoT internship: ESP32 + NestJS + PostgreSQL + MQTT
     ③ Smart Power Outlet   — PCB → ESP-IDF firmware → Flutter app
5. Stats / Streak / Trophies / Activity graph
6. "Currently" — đang build gì
7. Contact — link thật
8. Footer quote
```

### 5.3 Topics nên gắn cho mỗi repo
`embedded`, `iot`, `stm32`, `stm32h7`, `esp32`, `esp32-p4`, `esp-idf`, `platformio`, `freertos`, `can-bus`, `fdcan`, `canopen`, `misra-c`, `cppcheck`, `state-machine`, `firmware`, `bare-metal`, `c`, `cpp`, `arduino`, `mqtt`, `aiot`, `edge-ai`, `tinyml`, `bootloader`, `usb-host`, `fatfs`, `ocpp`, `raspberry-pi`, `opencv`, `robotics`, `nestjs`, `fastapi`, `flutter`

### 5.4 Repo "hub" để gom tái sử dụng (chiến lược dài hạn)

Đây là **ý tưởng quan trọng nhất** để bạn trông như một kỹ sư có hệ thống, không phải người làm bài rời rạc:

> Tạo repo `embedded-iot-toolkit` hoặc `iot-common-lib` chứa:
> - Driver đọc cảm biến DHT11 / PIR / RFID-RC522 / 74HC595 (đã viết ở SmartHome)
> - Lớp MQTT wrapper + reconnect + Last-Will
> - UART protocol frame dùng chung giữa STM32 ⇄ ESP32 (đã có ở `docs/uart_protocol.md`)
> - Driver Wi-Fi provisioning (đã có ở `wifi_prov.c`)
> - Driver relay / servo / stepper / LED
> - Kiến trúc tham chiếu: Edge (STM32) ⇄ Connectivity (ESP32) ⇄ Cloud (MQTT) ⇄ App
>
> Khi đó 4–5 repo firmware của bạn đều `#include` từ cùng 1 thư viện → câu chuyện "tôi xây hệ sinh thái, không phải làm bài thi". Đây chính là điều nhà tuyển dụng embedded tìm kiếm.

### 5.5 ⭐ ĐỀ XUẤT MỚI: Showcase Sac_Link (quan trọng nhất — xem E8/E9)

Bạn **không nên** push toàn bộ `Sac_Link` (chứa tài liệu nội bộ lab, ảnh chụp màn hình nội bộ, kế hoạch phân công người). Thay vào đó nên làm **một repo showcase sạch**:

**Tên gợi ý:** `ev-charger-link-firmware` hoặc `stm32-can-power-sharing`

**Nội dung repo (chỉ phần bạn tự viết):**
```
├── README.md                 # Giải thích bài toán + kiến trúc + kết quả
├── docs/
│   ├── architecture.md       # 4 tầng, quy tắc gọi, sơ đồ
│   ├── can-protocol.md       # Bảng CAN ID 29-bit 6 trường, 5 loại bản tin
│   ├── state-machine.md      # INIT → DISCOVERY → RUN → SAFE
│   └── algorithms.md         # power_borrow / power_reclaim (pseudo-code + lý do)
├── src/
│   ├── Driver/               # spican, canspi, mcp2515, fdcan_bus, soft_timer
│   ├── Middleware/
│   │   ├── Service/          # link_frame, cab_addr, ch_table, sys_table, cmd_timeout
│   │   ├── FSM/              # power_borrow, power_reclaim, link_fault
│   │   └── Control/          # local_ctrl
│   ├── App/                  # link_app
│   └── Config/               # link_config.h
├── test/                     # Unit test (Unity + mock HAL)
├── tools/misra/              # run_misra.ps1 + cppcheck addon
└── docs/images/              # Sơ đồ drawio PNG, ảnh logic analyzer (đã che thông tin nhạy cảm)
```

**Câu chuyện kể trong README (rất thuyết phục):**
> "Trạm sạc DC nhiều súng xếp vòng kín. Khi một xe cần nhiều công suất hơn một power module, firmware tự động huy động công suất từ các súng đang rảnh qua mạng CAN, rồi thu hồi khi xe đầy hoặc có xe mới quẹt thẻ. Tôi phụ trách 11 module từ driver SPI-to-CAN đến thuật toán phân bổ công suất, với kiểm chứng MISRA C:2012 và unit test trên PC."

**Cần kiểm tra trước khi push (quan trọng — mình sẽ hỗ trợ):**
- [ ] Có thông tin nội bộ lab / tên công ty / số điện thoại / kế hoạch phân công nhân sự không?
- [ ] Tài liệu có ghi rõ "bảo mật" / "nội bộ" không? (`Tong_quan.md` có bảng phân công người thật → **cần bỏ**)
- [ ] Có thông tin khách hàng / mã hợp đồng / số serial thiết bị không?

---

---

## 📌 PHẦN 6 — CÂU HỎI CẦN BẠN TRẢ LỜI

> **Cách trả lời:** Ghi số thứ tự + câu trả lời ngay dưới câu hỏi, hoặc đánh dấu `Đã chọn: ...` ở phần lựa chọn. Trả lời chi tiết càng tốt — mình sẽ căn cứ vào đó để viết lại README/bio/profile.

### 📋 NHÓM A — ĐỊNH HƯỚNG (quan trọng nhất)

**A1. Bạn muốn profile định vị chính là gì?** (chọn 1, hoặc viết tự do)

> ⚠️ **Lưu ý quan trọng (v2):** Sau khi quét `D:\Charger`, mình thấy bạn đang làm **firmware công nghiệp thật** (CAN, MISRA, OCPP, state machine, boot/test bench) — đây là hướng **Embedded Firmware**, mạnh hơn hẳn hướng "IoT hobby". Hãy cân nhắc kỹ.

- [✓] **A1.0** ⭐ **Embedded Firmware Engineer** (mới — khuyến nghị vì khớp nhất với Sac_Link/NVC)
      STM32 · CAN/FDCAN · MISRA · state machine · điện tử công suất
- [ ] **A1.1** Embedded Engineer (cứng, driver, RTOS, timing) — ưu tiên C, STM32, FreeRTOS
- [ ] **A1.2** IoT Engineer (full-stack thiết bị + cloud + app) — ưu tiên MQTT, backend, dashboard
- [ ] **A1.3** AIoT / Edge AI Engineer — ưu tiên YOLO trên MCU, TinyML, ESP32-CAM
- [ ] **A1.4** AI Engineer nhưng có làm IoT (giữ hướng AI, dùng project IoT làm bằng chứng)
- [ ] **A1.5** Robotics Engineer (nếu dự án cánh tay robot là của bạn thật — xem A8)
- [ ] **A1.6** Khác — mô tả: _______________________________________

**A1b. Bạn có muốn giữ cả chữ "AI/Edge AI" trong profile không?**
*(Vì bạn có cả `Demo_AI` Edge AI trên ESP32-P4 và `Sun-Car` YOLO — đây là điểm cộng lớn)*

- [✓] A1b.1 **Có, đây là điểm mạnh đáng khoe** — Edge AI là xu hướng hot, giữ lại
- [ ] A1b.2 Nhấn nhẹ ở dự án, không đưa lên bio
- [ ] A1b.3 Không, tập trung 100% firmware
- [ ] A1b.4 Tùy — mình sẽ chỉ khi bạn xác nhận hướng ở A1

**A2. Bạn đang ở giai đoạn nào, muốn profile nhắm tới việc làm nào?** (chọn nhiều)

- [ ] A2.1 Thực tập sinh (intern) Embedded/IoT
- [✓] A2.2 Full-time Embedded/IoT
- [ ] A2.3 Thực tập chuyên ngành (đang làm năm 3-4)
- [ ] A2.4 Học kỳ/thi kỹ năng, chưa cần việc
- [ ] A2.5 Làm freelance project
- [✓] A2.6 Khác: Tôi đang là sinh viên năm 4 trường CNTT đại học bách khoa hà nội, hướng tới làm full time tại nhật, đã có chứng chỉ JLPT N3

**A3. Kỹ năng embedded/IoT thật sự của bạn ở mức nào?** (chọn đúng hết cái bạn làm được)

- [✓] A3.1 Viết firmware **bare-metal** (không framework), cấu hình clock/GPIO/UART/I2C/SPI/PWM bằng tay
- [✓] A3.2 **STM32Cube HAL** / STM32CubeMX
- [✓] A3.3 **FreeRTOS** (task, queue, semaphore, mutex, priority)
- [✓] A3.4 **ESP-IDF** (component, task FreeRTOS, esp_timer, driver)
- [✓] A3.5 **Arduino** / PlatformIO
- [✓] A3.6 **TouchGFX** hoặc GUI nhúng khác #thêm cả eez studio cho esp32
- [✓] A3.7 **MQTT** (broker, topic design, QoS, retain, LWT)
- [✓] A3.8 **Wi-Fi provisioning** (SoftAP/ESP32 provisioning)
- [✓] A3.9 **UART/RS485/Modbus** giữa 2 vi điều khiển
- [✓] A3.10 **Thiết kế PCB** (EasyEDA)
- [✓] A3.11 **Dùng mạng chuẩn** (TCP/IP socket, HTTP client)
- [✓] A3.12 **Cảm biến**: DHT, PIR, RFID-RC522, LDR, nhiệt trở, cảm biến mưa, IMU, 74HC595, stepper
- [✓] A3.13 **TinyML / chạy model AI trên MCU** (TensorFlow Lite Micro, Edge Impulse)
- [✓] A3.14 **Debug phần cứng**: #không có oscilloscope#, logic analyzer, serial monitor, gdb/调试 OpenOCD
- [ ] A3.15 Mô phỏng/test: Wokwi, Proteus, SimulIDE, QEMU, Docker build firmware

**A3b. Tick thêm những kỹ năng bạn vừa lộ ra trong `D:\Charger` / `D:\Esp32` (rất quan trọng):**

- [✓] A3b.1 **`CAN bus`** (CAN 2.0A/2.0B, 29-bit ID, bit timing, arbitration, bus-off recovery)
- [✓] A3b.2 **`FDCAN`** (bộ điều khiển CAN mới của STM32H7)
- [✓] A3b.3 **`SPI-to-CAN`** (MCP2515 / SPI + ngắt)
- [✓] A3b.4 **`MISRA C:2012`** + `cppcheck` (kiểm tra tuân thủ coding standard)
- [✓] A3b.5 **State Machine phân tầng** (INIT/DISCOVERY/RUN/SAFE, GUN FSM, Station FSM)
- [✓] A3b.6 **Non-blocking firmware** (soft-timer `Tim_1ms[]`, cấm `HAL_Delay`)
- [✓] A3b.7 **Unit test firmware trên PC** (Unity/Ceedling + mock HAL, gcov coverage)
- [✓] A3b.8 **Test bench & fault injection** (logic analyzer, #không có oscilloscope#, ép lỗi dính tiếp điểm, rút cáp)
- [✓] A3b.9 **Bootloader / IAP** (nạp FW qua USB, Ethernet, SD card)
- [✓] A3b.10 **USB Host + FATFS** (đọc/ghi file, thẻ nhớ)
- [ ] A3b.11 **`OCPP`** (giao thức quản lý trạm sạc)
- [ ] A3b.12 **`GB/T 27930`** (chuẩn giao tiếp sạc DC Trung Quốc)
- [ ] A3b.13 **`DLT-645`** (chuẩn đọc công tơ điện) + RS485
- [✓] A3b.14 **Ethernet controller WIZnet** (W5100/W5500/W6100/W6300)
- [✓] A3b.15 **Điện tử công suất**: contactor, power module, ramp dòng/áp, đồng bộ áp
- [✓] A3b.16 **An toàn**: phát hiện dính tiếp điểm, fault priority, đóng cắt tuần tự
- [✓] A3b.17 **Kiến trúc phân lớp** (App → Middleware → Driver → Hardware, cấm gọi ngược)
- [ ] A3b.18 **Quản lý dự án**: lập Gantt, ước lượng ngày công, phân công, milestone, risk
- [✓] A3b.19 **Tự động hoá tài liệu**: Markdown → docx (Node.js), sinh báo cáo test bằng Python
- [✓] A3b.20 **GUI nhúng**: LVGL, MIPI-DSI, TouchGFX, ST7701/ILI9881C
- [✓] A3b.21 **TinyML / Edge AI trên MCU** (rule-based, decision tree, sẽ học TFLite Micro)
- [✓] A3b.22 **Computer Vision** (OpenCV: Haar Cascade, Template Matching)
- [ ] A3b.23 **Camera công nghiệp** (Hikrobot GigE Vision / USB3 Vision)
- [✓] A3b.24 **ROS / Robotics** (nếu có ở dự án robot — xem A8)
- [✓] A3b.25 **Điện tử & PCB** (EasyEDA Pro, thiết kế board, schematic, datasheet)
- [✓] A3b.26 **Mô phỏng xe điện / EV simulator** (dùng cho test trạm sạc)
- [ ] A3b.27 **Tiếng Anh kỹ thuật** — viết tài liệu/chuẩn bằng tiếng Anh

**A3c. Trong những kỹ năng trên, cái nào bạn tự tin nhất khi phỏng vấn?** (top 5)

```
1. A3b.15
2. A3b.1 -> A3b.3, A3b.6, A3b.10, A3b.14 (tôi cảm thấy tất cả những cái này đều chỉ là protocol và bắt buộc phải hiểu kỹ thì dự án mới chạy được nên tôi xếp chung 1 dòng)
3. A3b.20 (vì tôi là trường CNTT, theo chương trình học chính thức thì tôi được ưu tiên về các thứ liên quan trực tiếp đến trải nghiệm người dùng, còn tại lab thì tôi học nhiều về phần cứng và lập trình giao thức, cảm biến công nghiệp)
4. A3b.21 (vì tôi trước đó học trong năm 2, tôi có học rất nhiều về AI, ML, DL. Tôi còn có 6 chứng chỉ AI trên cousera nên phần này tôi cũng hiểu khá rõ)
5. A3b.5, A3b.7 (tôi cảm thấy đây là điều hiển nhiên và bắt buộc khi lập trình để dự án không bị loạn, có lẽ đây là do môn lập trình OOP và ITSS đã dạy ở trên trường)
```

**A4. Bạn muốn mạnh lên thêm mảng nào trong 3–6 tháng tới?** (chọn ≤ 4, mình sẽ gợi ý roadmap)

- [✓] A4.1 Driver & RTOS sâu hơn (DMA, interrupt, priority, timing)
- [ ] A4.2 Linux embedded / Yocto / Buildroot / Zephyr
- [✓] A4.3 Edge AI / TinyML (đẩy AIoT-Face_And_Order lên ESP32-S3)
- [ ] A4.4 Backend & cloud (MQTT broker, time-series DB, Docker, deploy)
- [ ] A4.5 Mobile app (Flutter) để hoàn thiện sản phẩm
- [✓] A4.6 Điện tử & PCB nâng cao (mạch 4 lớp, nguồn switching, EMC)
- [ ] A4.7 Tiếng Anh kỹ thuật (viết README/docs tiếng Anh)
- [ ] A4.8 Hoàn thiện hồ sơ phần cứng (circuit, BOM, schematic)

### 📋 NHÓM A5 — NHÓM A MỞ RỘNG (v2) — TRẢ LỜI SAU KHI ĐỌC PHẦN 3B

**A5. Với `Sac_Link` — mức độ tham gia thực tế của bạn là gì?**

- [✓] A5.1 **Tôi là người viết chính** phần Link (driver + middleware + thuật toán) → được nêu tên thoải mái
- [ ] A5.2 **Tôi là 1 trong nhiều người**, cụ thể tôi phụ trách: _______________________
- [ ] A5.3 **Tôi đang mới bắt đầu**, phần chính do người khác làm → nêu ở mức "đang phát triển"
- [ ] A5.4 **Đây là dự án nhóm ở lab**, tôi đóng góp: _______________________
- [ ] A5.5 Không muốn nói chi tiết vì là dự án nội bộ công ty/lab → chỉ nói chung

**A6. `Sac_Link` / `NVC` có được phép đưa lên GitHub công khai không?**

- [ ] A6.1 ✅ **Được, tự do** (đã hỏi lab/thầy) → mình sẽ giúp tạo repo showcase
- [ ] A6.2 ⚠️ **Được nhưng phải che thông tin nội bộ** → mình sẽ giúp lọc tài liệu, xoá ảnh nhạy cảm
- [✓] A6.3 ❌ **Không, dự án của công ty/lab, không được public** → chỉ giữ ở dạng mô tả trong profile, không có code
- [ ] A6.4 ❓ **Chưa hỏi** → cần bạn hỏi lab trước, tạm hoãn
- [ ] A6.5 Trả lời riêng cho từng dự án:
  - `Sac_Link`: _______________________
  - `NVC-CM-DC-FW`: _______________________
  - `Car_Simulate`: _______________________

**A7. Repo `NVC-CM-DC-FW` đã có `.git` — remote ở đâu? Có phải repo công ty không?**

```
Trả lời: đây là repo của công ty Hải Anh, được ủy thác từ trung quốc
(Nếu là repo nội bộ công ty → KHÔNG BAO GIỜ push lên tài khoản cá nhân)
```

**A8. Về dự án cánh tay robot 6 trục (`D:\Robot`) — làm rõ giúp mình:**

- [✓] A8.1 **Đây là phần mềm có sẵn** (của nhà sản xuất / thầy giáo) → mình chỉ dùng để học, không đưa lên GitHub, #tuy nhiên tôi vẫn phải viết các mã code điều khiển theo hãng. có lẽ nó giống điều khiển PLC#
- [ ] A8.2 **Tôi có sửa/tùy biến nó** → mô tả đã làm gì: ______________________________________
- [ ] A8.3 **Tôi viết firmware điều khiển 6 trục** (STM32, điều khiển động cơ, IK/FK, PID) → **firmware ở đâu?**
- [ ] A8.4 **Có phần robot arm tự viết** (C#/Python điều khiển, OpenCV, 3D) → **source ở đâu?**
- [ ] A8.5 **Tôi mới sử dụng, chưa làm gì** → bỏ qua
- [ ] A8.6 Mô tả tự do: _______________________________________

> **Gợi ý:** Nếu A8.3 hoặc A8.4 đúng, đây là repo **rất đáng khoe** vì kết hợp embedded + robotics + computer vision + camera công nghiệp — đúng thứ mà ngành ô tô/tự động hoá cần. Mình sẽ giúp làm repo showcase.

**A9. Nhìn lại danh sách trên — dự án nào bạn muốn dùng làm "3 flagship" trên profile?**

*(Gợi ý mở rộng v2 — chọn 3, có thể kết hợp cả STM32 lẫn ESP32)*

| | Dự án | Vì sao mở rộng |
|---|---|---|
| ✓ | `Sac_Link` | Firmware công nghiệp, CAN, MISRA, state machine |
| ✓ | `SmartHome` | STM32H7 + ESP32-S3 + TouchGFX + MQTT, đầy đủ edge→cloud |
| ☐ | `Demo_AI` (Edge AI) | ESP32-P4, TinyML, tiếng Việt, chạy on-chip |
| ✓ | `Smart Power Outlet` | PCB → firmware → app, full-stack |
| ☐ | `Yootek SmartGarden` | Thực tập doanh nghiệp, MQTT + backend + app |
| ☐ | `Robot arm 6 DOF` | Robotics + CV + camera công nghiệp |
| ☐ | `mipi_dsi` (GUI nhúng) | LVGL + MIPI-DSI trên ESP32-P4, kỹ năng hiếm |
| ✓ | `Sun-Car-Damage-AI` | YOLOv11n + STM32 + ESP32-CAM = Edge AI |
| ☐ | Khác: ______________________________________ |

Giải thích: SmartHome là đồ án môn học cuối kỳ và nhóm tôi được tròn 10 điểm
Smart Power Outlet là đồ án tốt nghiệp của tôi
Sun-Car-Damage-AI là dự án mà tôi xây dựng để apply học bổng *SUN, đã qua được vòng project nhưng bị trượt vòng phỏng vấn tiếng nhật
Sac_link tôi hơi cân nhắc do không được public, bạn cứ xem xét thêm vào thôi

---

### 📋 NHÓM B — NỘI DUNG PROFILE

**B1. Bố cục Profile README bạn muốn thế nào?**

- [✓] B1.1 **Tiếng Anh 100%** (tiếp cận cơ hội quốc tế)
- [ ] B1.2 **Tiếng Việt 100%** (bạn/giảng viên/đồng nghiệp đọc)
- [ ] B1.3 **Song ngữ** — mỗi mục có 2 phiên bản (tốn công hơn nhưng cover nhiều đối tượng)
- [ ] B1.4 Viết tối giản, không badge rối, chỉ text + ảnh

**B2. Muốn showcase bao nhiêu project ở phần Featured?**

- [ ] B2.1 Chỉ **3 project mạnh nhất** (SmartHome, Yootek SmartGarden, Smart Power Outlet)
- [✓] B2.2 **3 project + 1 mục "Embedded/IoT khác"** dạng bảng nhỏ
- [ ] B2.3 Tất cả (~8 project), dạng lưới
- [ ] B2.4 Theo chủ đề: "Dự án trọng tâm" (chi tiết) + "Sản phẩm khác" (bảng ngắn)

**B3. Có muốn làm nổi bật phần AIoT không?** (Sun-Car YOLOv11n+STM32+ESP32, AIoT Face ESP32-CAM)

- [✓] B3.1 **Có, đây là điểm khác biệt** — đưa lên top 3
- [ ] B3.2 Có nhưng để ở mục phụ
- [ ] B3.3 Không, tập trung 100% embedded/IoT
- [ ] B3.4 Chỉ giữ 1 dự án AIoT, dự án kia dọn/archive

**B4. Bạn có muốn dựng repo "toolkit" dùng chung không?** (chiến lược 5.4)

- [✓] B4.1 **Có, rất muốn** — mình giúp tách & thiết kế
- [ ] B4.2 Có nhưng làm sau, giờ tập trung dọn profile
- [ ] B4.3 Không, giữ mỗi repo độc lập cho dễ hiểu
- [ ] B4.4 Tôi chưa hiểu ý tưởng, giải thích kỹ hơn

**B5. Có muốn đưa "sổ tay phần cứng" của bạn lên GitHub không?** *(ý tưởng mới — 5.5)*

> Bạn có `D:\Esp32\JC-ESP32P4-M3-DEV` (schematic, datasheet, user manual, structure diagram), `Sơ đồ chân Esp32-P4`, `esp_idf_cheatsheet.pdf`, board ESP32-P4 DevKit, EasyEDA Pro... Đây là tài liệu **rất có giá trị** cho người khác.

- [✓] B5.1 **Có, muốn làm repo `embedded-notes`** — tổng hợp sơ đồ chân, cheat sheet, hướng dẫn wiring
- [ ] B5.2 Có, nhưng chỉ làm sau
- [ ] B5.3 Không, để private cho mình dùng
- [ ] B5.4 Không quan tâm

**B6. `Demo_AI` (Edge AI) — bạn muốn mình giúp nâng cấp không?** *(vì "100% accuracy trên tập train" chưa đủ thuyết phục)*

Mình có thể giúp:
- Tách **test set** riêng, báo cáo accuracy trên tập chưa train → con số thuyết phục hơn nhiều
- Thêm câu lệnh nhiễu / sai chính tả → chứng minh robustness
- Chuyển từ rule-based sang **decision tree thật** (đã có `decision_tree_model.c` nhưng chưa dùng) hoặc TFLite Micro
- Viết README chuẩn + hướng dẫn flash

- [ ] B6.1 **Có, muốn nâng cấp** → coi đây là 1 dự án flagship
- [ ] B6.2 Có, nhưng để sau khi dựng profile xong
- [✓] B6.3 Không, giữ nguyên bản gốc
- [ ] B6.4 Chỉ giúp viết README, không sửa code


### 📋 NHÓM C — DỌN DẸP REPO

**C1. Xử lý các repo không đúng hướng?** (chọn hành động áp dụng cho nhóm: Ninja-Adventure, NegaPremium-ChessEngine, Code-Off-CatKod, Network_Programming, HandWriting_detection, OOP.Lab, House_price)

- [ ] C1.1 **Archive** (ẩn khỏi trang chủ nhưng vẫn giữ, vẫn link được)
- [ ] C1.2 **Private** (giữ riêng tư, không ai thấy)
- [ ] C1.3 **Xoá hẳn**
- [✓] C1.4 **Giữ nguyên public** (tôi không muốn ẩn bài học)
- [ ] C1.5 Xử lý từng repo một (mình sẽ ghi rõ trong file)

Giải thích: Hầu hết từ năm 1 đến đầu năm 4 hiện tại, tôi hầu như đều là team leader nên toàn bộ dự án đều thuộc github của tôi, về phần này tôi không muốn ẩn đi, bạn có thể viết điều này thành 1 điểm cộng được không

**C2. Repo nào là dự án "đồ án" nên giữ làm bằng chứng học tập?**
*(Ghi rõ tên repo, mình sẽ giữ và trang trí lại thay vì xoá)*

```
Trả lời: Smart Power Outlet
```

**C3. Có dự án nào đang làm dở / không tự hào, KHÔNG muốn ai thấy?**

```
Trả lời: AI_face_and_Order, CapDienMayBay
```

**C4. Repo local chưa có trên GitHub — bạn muốn xử lý sao?** (chọn nhiều)

| Repo | Gợi ý |
|---|---|
| `AutoSub-Local-AI` | AI tự động phụ đề — ❓ |
| `CapDienMayBay` | HMI cấp điện máy bay (FastAPI+Modbus+ESP32) — ⭐⭐⭐⭐ |
| `Realtime_analsyn` | ESP32-P4 + C6 co-processor + Flutter — ⭐⭐⭐ |
| `DMST`, `DMST_3D`, `KTPM`, `shallow-water-master` | chưa git init — ❓ |
| `KyThuatPhanMem`, `Ordering_System` (remote `Datt106`) | dự án nhóm — ❓ |

- [ ] Public tất cả
- [ ] Public: ______________________ ; Private: ______________________
- [✓] Bỏ / không push: ______________________

**C5. Repo `House_price` trên GitHub nhưng local trỏ remote `My_AI_Project` — chuyện gì xảy ra?**

- [✓] C5.1 Đã đổi tên repo trên GitHub (bạn muốn giữ tên nào?)
- [ ] C5.2 Clone bị nhầm/nhầm thư mục
- [ ] C5.3 Không quan tâm, xử lý sau
- [ ] C5.4 Khác: ______________________

**C6. `SSA` (4 MB) là dự án gì?** (repo này mình không đọc được nội dung)

```
Trả lời: Đây là bài tập trên lớp nghiên cứu về thuật toán SSA, bạn có thể xóa luôn repo này cũng được, nó hoàn toàn không liên quan đén hướng của tôi
```

**C7. Bạn có muốn `Picture/Robot_Control.png` (file chưa commit trong `CatKod.github.io`) dùng làm gì?**

- [ ] C7.1 Làm avatar / banner cho profile
- [✓] C7.2 Ảnh minh hoạ cho project Robot Control (Vì tôi không có repo nên có lẽ dùng ảnh minh họa để nhà tuyển dụng hiểu về những gì tôi đã làm tôi đã thêm ảnh này)
- [ ] C7.3 Xoá, không cần
- [ ] C7.4 Mục đích khác: ______________________

### 📋 NHÓM D — HỒ SƠ & LIÊN HỆ

**D1. Link mạng xã hội thật của bạn là gì?** (hiện README đang để placeholder `your-profile`, `your-handle`)

- LinkedIn: https://www.linkedin.com/in/kim-v%C4%A9nh-ho%C3%A0ng-9a306935a/?isSelfProfile=true
- Facebook: https://web.facebook.com/HoangKiVinh
- GitHub: https://github.com/CatKod
- Portfolio/website riêng: Sau phần này tôi muốn bạn dựng cho tôi 1 website luôn
- Email (xác nhận): kimvinhh6@gmail.com (hiện `kimvinhh6@gmail.com` — đúng chưa?)
- (khác): ____________________

**D2. Có chứng chỉ / giải / khoá học / award nào liên quan không?**

- [✓] D2.1 Chứng chỉ (Arduino, ESP32, Embedded, Coursera, freeCodeCamp…) — ghi rõ tên: bạn có thể dùng Window mcp để kiểm tra trong linkedin của tôi, tôi đã bật sẵn web trong Cốc Cốc rồi rồi
- [ ] D2.2 Giải thưởng / olympiad / cuộc thi (RoboCode, Sinh viên 5 tốt, hackathon…)
- [ ] D2.3 Không có, bỏ qua phần này

**D3. Bạn có muốn tạo hồ sơ dự án (Project Sheet / Portfolio PDF) không?** — dùng cho CV và phỏng vấn

- [✓] D3.1 **Có, rất muốn** — mình soạn cho 3 project flagship
- [ ] D3.2 Có, nhưng để sau
- [ ] D3.3 Không cần

**D4. Có mẫu profile / repo tham khảo nào bạn thấy hay không?** (link hoặc mô tả)

```
Trả lời: không
```

### 📋 NHÓM E — ƯU TIÊN & THỜI GIAN

**E1. Bạn muốn mình ưu tiên làm gì trước?** (chọn thứ tự ưu tiên, tối đa 3)

- [✓] E1.1 Viết lại **profile bio** (nhanh, hiệu quả nhất)
- [✓] E1.2 Viết lại **profile README** (catkod.github.io) — thay placeholder
- [ ] E1.3 **Dọn/archive** các repo không đúng hướng + giảm dung lượng
- [ ] E1.4 Viết **README + topics + mô tả** cho 3 repo flagship
- [✓] E1.5 Làm **repo toolkit dùng chung** (chiến lược dài hạn)
- [ ] E1.6 Lên **roadmap học embedded/IoT** 3-6 tháng
- [ ] E1.7 Soạn **hồ sơ dự án** cho CV

**E2. Mức độ "chày" bạn muốn mình làm trong lần này?**

- [ ] E2.1 **Sửa tối thiểu, giữ nhanh** (chỉ bio + README profile + archive repo)
- [ ] E2.2 **Sửa tầm trung** (thêm README/topics cho 3 flagship)
- [✓] E2.3 **Làm triện để gọn**, kể cả tách code repo và viết tài liệu

**E3. Bạn muốn mình được phép ghi trực tiếp lên GitHub không, hay chỉ soạn file cho bạn tự push?**

- [ ] E3.1 **Chỉ soạn file / câu lệnh**, mình tự kiểm tra rồi push (an toàn nhất)
- [ ] E3.2 Cho phép tạo file trong repo local (`D:\GitHub\...`), mình tự push
- [✓] E3.3 Cho phép tôi đổi luôn trên GitHub qua API/token
- [ ] E3.4 Chưa quyết, mình sẽ nói khi nào cần

**E4. Có mốc thời gian nào cần kịp không?** (ví dụ: hết học kỳ, phỏng vấn tuần sau, nộp CV tháng này)

```
Trả lời: không
```

**E5. ⭐ VỀ `D:\Charger\Sac_Link` — mức độ hành động bạn muốn?**

Đây là dự án mạnh nhất của bạn nhưng **không nên push thẳng lên GitHub cá nhân** vì có tài liệu nội bộ lab.

- [ ] E5.1 **Tạo repo showcase sạch** (chỉ code bạn viết + tài liệu đã lọc) — mình sẽ chuẩn bị từng file
- [✓] E5.2 Chỉ viết README + kiến trúc trong profile, **không push code**
- [ ] E5.3 Để sau, giờ ưu tiên dọn profile GitHub hiện tại
- [ ] E5.4 Chưa quyết, cần hỏi lab trước (A6)

**E6. ⭐ Repo showcase nào trong số này bạn muốn tạo ngay hôm nay?** (chọn nhiều)

Mỗi mục mình sẽ chuẩn bị: README chuẩn, topics, description, cấu trúc thư mục, `.gitignore`, ảnh minh hoạ.

| | Repo mới đề xuất | Nội dung |
|---|---|---|
| ☐ | `ev-charger-link-firmware` | Driver CAN + middleware + thuật toán huy động/thu hồi công suất |
| ☐ | `stm32-can-driver-collection` | MCP2515, FDCAN, soft-timer, CAN frame codec — tách thành thư viện |
| ☐ | `esp32-edge-ai-voice-command` | `Demo_AI` nâng cấp: dataset, model, firmware, test |
| ☐ | `esp32-mipi-dsi-lvgl-demo` | GUI nhúng LVGL trên ESP32-P4 |
| ☐ | `robot-arm-6dof-control` | (chỉ nếu A8.3/A8.4 xác nhận là của bạn) |
| ☐ | `embedded-notes` | Sổ tay phần cứng, cheat sheet, sơ đồ chân (B5) |
| ✓ | `embedded-iot-toolkit` | Thư viện dùng chung (B4) |

**E7. Những thư mục lớn này có nên đưa lên GitHub không?** (chọn, hoặc ghi rõ)

| Thư mục | Dung lượng | Gợi ý |
|---|---|---|
| `D:\Charger\Sac_Link` | 335 MB | ❌ Không push nguyên cả — lọc + tạo repo mới |
| `D:\Charger\NVC-CM-DC-FW` | 110 MB | ❌ Có `.git` sẵn — kiểm tra remote trước (A7) |
| `D:\Charger` (các bài test nhỏ) | ~1 GB | ❌ Giữ local, chỉ trích tài liệu |
| `D:\Robot` | 375 MB | ❌ Có DLL + EXE + license → không push |
| `D:\Esp32_Project` | — | ⚠️ Có `esp-dev-kits` (clone repo khác) → loại bỏ khi push |
| `D:\Esp32` | — | ⚠️ Có `esp-at-master`, `esp-hosted-master` (clone) → chỉ lấy tài liệu |

```
Trả lời riêng nếu có ý kiến khác: Không
```

**E8. Có ai/bạn cần giữ bí mật trong những tài liệu này không?**

Mình thấy trong `Tong_quan.md` có **bảng phân công nhân sự** (tên vai trò, ngày công, tải %), và có thể còn tên người/thầy. Ngoài ra `Sac_Link_Tai_Lieu_Phat_Trien.docx`, `Báo Cáo/*.docx` có thể chứa thông tin lab.

- [✓] E8.1 **Có** — cần loại bỏ mọi tên/chi tiết nội bộ trước khi chia sẻ
- [ ] E8.2 **Không lo** — tài liệu không nhạy cảm
- [ ] E8.3 **Đã hỏi lab, được phép** — nhưng vẫn nên bỏ phần phân công người cho chuyên nghiệp
- [ ] E8.4 Không chắc → mình sẽ quét tìm tên/số điện thoại/email để bạn duyệt

**E9. Bạn muốn mình làm gì trong lượt này?** (chọn đúng những gì cần, mình sẽ bắt đầu luôn)

- [✓] E9.1 Viết **bio mới** (3 phiên bản, bạn chọn)
- [✓] E9.2 Viết **profile README** hoàn chỉnh, sẵn để copy/paste vào `CatKod` repo
- [ ] E9.3 Lên **danh sách flagship + mô tả ngắn** cho từng project (tiếng Anh)
- [ ] E9.4 Tạo **cấu trúc repo showcase** cho `Sac_Link` (chỉ tạo file local, chưa push)
- [ ] E9.5 Tạo **README + topics** cho `Demo_AI` / `mipi_dsi` / các repo ESP32
- [ ] E9.6 Soạn **kế hoạch dọn repo** (archive/private, .gitignore, xoá file nhạy cảm)
- [ ] E9.7 Viết **hồ sơ dự án (Project Sheet)** cho CV — 3 dự án flagship
- [ ] E9.8 Soạn **roadmap học 3–6 tháng** dựa trên điểm yếu đã tìm ra
- [ ] E9.9 Viết **bài viết LinkedIn/kych Đăng 1 dự án** (để bạn đăng Facebook/Linkedin)
- [ ] E9.10 Chưa cần gì thêm, mình tự viết trước rồi xem


---

## 📌 PHẦN 7 — NHỮNG PHÁT HIỆN KỸ THUẬT / RỦI RO ĐÃ THẤY

> Các mục này mình phát hiện khi đọc code, **nên sửa luôn** cho chuyên nghiệp:

| # | Vấn đề | Vị trí | Mức độ |
|---|---|---|---|
| 1 | **Hardcode IP server** `192.168.1.28:5000` | `AIoT-Face_And_Order` README + `.ino` | 🔴 Cao — trông như đồ án sơ cấp |
| 2 | **Hardcode Wi-Fi ssid/password** trong source | `AIoT-Face_And_Order/arduino/*.ino` | 🔴 Cao — lộ thông tin, không professional |
| 3 | Có thể lộ secret | `Smart_Power_Outlet_ESP/main/secrets.h` | 🔴 Kiểm tra `.gitignore` ngay |
| 4 | File `.env` trong thư mục | `Attendance_Check`, `SmartHome/backend`, `Yootek/my_app` | 🔴 Phải chắc `.gitignore` chặn |
| 5 | Crash log lọt vào repo | `SmartHome/hs_err_pid21712.log`, `replay_pid21712.log` | 🟡 Xoá + ignore `*.log`, `hs_err*`, `replay*` |
| 6 | Build output lọt vào git | `build/`, `node_modules/`, `.dart_tool/`, `.pio/`, `dist/` | 🟡 Cần `.gitignore` chuẩn |
| 7 | Repo quá nặng | `NegaPremium` 155MB, `Ninja` 89MB, `Sun-Car` 78MB | 🟡 Archive + dọn dataset/checkpoint |
| 8 | Tên repo không khớp nội dung | `AIoT-Face_And_Order` (không có "Order") | 🟡 Cân nhắc đổi tên |
| 9 | `SSA` không rõ nội dung | repo public | 🟡 Cần bạn xác nhận |
| 10 | Remote không khớp tên repo | `House_price` → `My_AI_Project` | 🟡 Cần check |
| 11 | README profile còn placeholder + link giả | `CatKod` repo | 🔴 Ảnh hưởng lớn nhất tới ấn tượng |
| 12 | Commit message lộ ký tự thừa | nhiều repo: `/fix`, `/add tương thích...`, `.` | 🟡 Nên dùng Conventional Commits |

---

## 📌 PHẦN 8 — NHÁNH HOẠT ĐỘNG ĐỀ XUẤT

Gửi lời chào tạm thời ở đây, bạn trả lời ngay trong file này. Sau khi có câu trả lời, mình sẽ viết bản profile hoàn chỉnh, dọn repo, viết README/topics cho từng project, rồi bàn tiếp roadmap.

**Sau khi bạn trả lời, mình sẽ làm theo thứ tự này (bạn có thể đổi):**

### Ưu tiên cao (làm ngay, tác động lớn nhất)
1. **Chốt định hướng** từ A1, A5, A6, A9 → quyết định toàn bộ tone profile
2. **Viết lại bio** (chọn 1 trong 3 phiên bản ở 5.1)
3. **Viết lại profile README** hoàn chỉnh — thay placeholder, thay link giả, thêm badge Embedded
4. **Dựng 3 flagship** — mô tả tiếng Anh + topics + ảnh

### Ưu tiên trung bình
5. **Tạo repo showcase** cho các dự án mới (`Sac_Link`, `Demo_AI`, `mipi_dsi`) — chỉ tạo file local trước
6. **Dọn repo cũ**: archive/private theo C1, xoá file nhạy cảm, `.gitignore` chuẩn
7. **Sửa lỗi kỹ thuật** trong Phần 7 (hardcode IP, ssid trong source, `secrets.h`...)

### Ưu tiên sau
8. **Hồ sơ dự án** cho CV (nếu D3.1)
9. **Roadmap 3–6 tháng** dựa trên câu A4 + điểm yếu đã phát hiện
10. Bài LinkedIn/đăng dự án (E9.9)

---

## 💡 GÓP Ý THẲNG TỪ MÌNH (đọc sau khi trả lời)

Bạn đang **under-sell** mình rất nhiều. Xét theo những gì mình vừa đọc:

1. **Bạn đang làm việc ở mức mà nhiều kỹ sư 2–3 năm kinh nghiệm chưa chạm tới** — MISRA pipeline, fault injection, soak test, kiến trúc 4 tầng, CAN 29-bit, OCPP. Đây không phải đồ án sinh viên.

2. **Nhưng trên GitHub, người xem chỉ thấy** 15 repo lẫn lộn, bio ghi "AI, data analysis", README có `Project Name 1`. **Ấn tượng bạn tạo ra không tương xứng với khả năng thật.** Đây là điều đáng tiếc nhất.

3. **Ưu tiên thực tế:** Thay vì làm thêm project mới, hãy **đóng gói những gì đã có**. Một repo `ev-charger-link-firmware` viết README chuẩn + ảnh logic analyzer + bảng MISRA còn giá trị hơn 5 project demo mới.

4. **Nếu bạn không thể public code Sac_Link**, hãy viết một bài blog/Medium kể lại thuật toán huy động công suất trên vòng kín — đó là nội dung **rất ít người viết được**, và nó chứng minh trình độ của bạn.

5. **Cân nhắc LinkedIn** nghiêm túc. Với hồ sơ như bạn, LinkedIn Việt Nam có giá trị tuyển dụng cao hơn GitHub nhiều.

---

<div align="center">

**Hết tài liệu tạm. Bạn cứ sửa trực tiếp các ô trả lời phía trên nhé!**
**Ưu tiên đọc: A1, A5, A6, A8, A9, E5, E6, E9**

</div>
