### BUỔI 1
## NHIỆM VỤ 1 (ĐIỀN BẢNG TỪ LINK FIGMS CÓ SẴN):

| Vai trò | Giá trị đọc trong Figma | Tên token của tôi | Class Tailwind |
| :--- | :--- | :--- | :--- |
| **Màu thương hiệu chính** | `#7E22CE` | `--color-brand-600` | `bg-brand-600` |
| **Màu nhấn** | `#F59E0B` | `--color-accent-500` | `text-accent-500` |
| **Chữ chính** | `#111827` | `--color-ink` | `text-ink` |
| **Chữ phụ** | `#6B7280` | `--color-muted` | `text-muted` |
| **Nền trang** | `#FFFFFF` | `--color-surface` | `bg-surface` |
| **Viền** | `#E5E7EB` | `--color-line` | `border-line` |
| **Phông tiêu đề** | `Inter, sans-serif` | `--font-display` | `font-display` |
| **Phông nội dung** | `Inter, sans-serif` | `--font-body` | `font-body` |
| **H1 / H2 / H3** | `48px / 36px / 20px` | — | `text-5xl / text-4xl / text-xl` |
| **Padding dọc section** | `96px` | — | `py-24` |
| **Bo góc thẻ** | `14px` | `--radius-card` | `rounded-card` |

### BUỔI 2 
## Nhiệm vụ 1: Quy tắc chọn Flexbox hay Grid (Tiết 1)

| STT | Frame / Section | Tình huống bố cục | Lựa chọn | Class Tailwind dự đoán |
| :-: | :--- | :--- | :-: | :--- |
| **1** | **Header / Navbar** | 1 hàng, kích thước co giãn theo nội dung | `flex` | `flex items-center justify-between gap-4` |
| **2** | **Customer Logos** | Danh sách dài ngắn khác nhau, tự xuống dòng khi thiếu chỗ | `flex flex-wrap` | `flex flex-wrap items-center justify-center gap-x-12 gap-y-6` |
| **3** | **Features Grid** | Lưới đều nhau, thẳng hàng cả dọc lẫn ngang | `grid` | `grid gap-6 sm:grid-cols-2 lg:grid-cols-3` |
| **4** | **Pricing Cards** | Lưới 3 cột, kéo các thẻ cao bằng nhau | `grid` | `grid items-stretch gap-6 lg:grid-cols-3` |
| **5** | **FAQ Section** | Lưới 2 cột tỉ lệ không đều | `grid` | `grid gap-12 lg:grid-cols-[1fr_1.4fr]` |
| **6** | **Footer Links** | Lưới 4 cột thẳng hàng dọc & ngang | `grid` | `grid gap-10 sm:grid-cols-2 lg:grid-cols-4` | .

### BUỔI 3
## NHiệm vụ 1 : 
1. Phương pháp luận Mobile-First & Quy trình Test
* **Đọc class Tailwind:** Các prefix breakpoint (`sm:`, `md:`, `lg:`) hoạt động theo cơ chế `min-width` ("từ kích thước này trở lên")[cite: 1]. 
  * Ví dụ: `<h1 class="text-4xl sm:text-5xl lg:text-6xl">` được hiểu là: Mặc định (Mobile < 640px) xài `text-4xl`; từ `sm` (≥ 640px) xài `text-5xl`; từ `lg` (≥ 1024px) xài `text-6xl`[cite: 1].
* **Quy trình kiểm tra (DevTools):** Kiểm tra liên tục qua 4 mốc màn hình chuẩn: **360px ➔ 768px ➔ 1024px ➔ 1440px**[cite: 1].
2. Danh sách 4 vị trí vỡ/chưa tối ưu Layout trên Mobile (360px)

| STT | Vị trí (Section) | Hiện trạng vỡ / Chưa tối ưu ở 360px | Hướng xử lý chuẩn Mobile-First |
| :---: | :--- | :--- | :--- |
| **1** | **Hero Section** | Nút bấm CTA xếp hàng ngang dễ gây tràn viền hoặc vỡ chữ trên màn 360px[cite: 1]. | Chuyển sang xếp dọc mặc định, nâng lên hàng ngang ở màn lớn hơn: `flex-col sm:flex-row`[cite: 1]. |
| **2** | **Lưới tính năng** | Chưa khai báo cột mặc định rõ ràng cho màn hình di động[cite: 1]. | Đặt mặc định 1 cột cho mobile, nâng dần theo màn hình: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`[cite: 1]. |
| **3** | **Bảng so sánh** | Ép bảng nhiều cột hiển thị trên màn 360px làm chữ bị co cụm, vỡ dòng mất thẩm mỹ[cite: 1]. | Bọc khung cuộn ngang `overflow-x-auto min-w-[720px]` kèm dòng thông báo: *" Vuốt ngang để xem hết bảng"*[cite: 1]. |
| **4** | **Header / Menu** | Danh sách điều hướng chính hiển thị dạng hàng ngang tràn màn hình di động[cite: 1]. | Ẩn danh sách menu ở màn hình nhỏ: `hidden md:flex`, nhường chỗ cho nút Hamburger[cite: 1]. |

### 🌙 Nhiệm vụ 3: Thiết Lập Dark Mode Bằng Hệ Thống Token Màu (CSS Variables)

* **Thiết lập Token CSS:** Khai báo danh sách biến CSS màu sắc trong `@layer base` cho cả 2 trạng thái `:root` (Light) và `.dark` (Dark)[cite: 1].
* **Bảng màu Token chuẩn hóa:**
  * `--color-ink`: Màu văn bản chính[cite: 1].
  * `--color-muted`: Màu văn bản phụ/ghi chú[cite: 1].
  * `--color-surface`: Màu nền trang chính[cite: 1].
  * `--color-surface-alt`: Màu nền của Section/Card phụ[cite: 1].
  * `--color-line`: Màu đường kẻ viền/phân cách[cite: 1].
* **Tối ưu trải nghiệm (UX):** Sử dụng dải màu Slate/Navy tối (`#0f172a`, `#1e293b`) thay cho màu đen tuyền `#000000` để tránh gây mỏi mắt cho người dùng[cite: 1].
* **Tích hợp Tailwind:** Cấu hình `darkMode: 'class'` và kết nối các màu utility (`bg-surface`, `text-ink`, `border-line`) với `var(--color-...)`[cite: 1].


### 🧩 Nhiệm vụ 4: Component Hóa CSS & Trang Pricing

* **Trích xuất Component (`@layer components`):** Tạo các class tái sử dụng như `.section`, `.btn`, `.btn-primary`, `.card`, `.field-label`, `.field-input`, `.field-error` giúp HTML gọn gàng hơn.
* **Trang Bảng giá (`pricing.html`):** Thiết kế bảng so sánh trực quan, có khối `overflow-x-auto min-w-[720px]` hỗ trợ vuốt ngang trên thiết bị di động kèm dòng nhắc nhở cho người dùng mobile[cite: 1].