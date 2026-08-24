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

---

### BUỔI 2 
## Nhiệm vụ 1: Quy tắc chọn Flexbox hay Grid (Tiết 1)

| STT | Frame / Section | Tình huống bố cục | Lựa chọn | Class Tailwind dự đoán |
| :-: | :--- | :--- | :-: | :--- |
| **1** | **Header / Navbar** | 1 hàng, kích thước co giãn theo nội dung | `flex` | `flex items-center justify-between gap-4` |
| **2** | **Customer Logos** | Danh sách dài ngắn khác nhau, tự xuống dòng khi thiếu chỗ | `flex flex-wrap` | `flex flex-wrap items-center justify-center gap-x-12 gap-y-6` |
| **3** | **Features Grid** | Lưới đều nhau, thẳng hàng cả dọc lẫn ngang | `grid` | `grid gap-6 sm:grid-cols-2 lg:grid-cols-3` |
| **4** | **Pricing Cards** | Lưới 3 cột, kéo các thẻ cao bằng nhau | `grid` | `grid items-stretch gap-6 lg:grid-cols-3` |
| **5** | **FAQ Section** | Lưới 2 cột tỉ lệ không đều | `grid` | `grid gap-12 lg:grid-cols-[1fr_1.4fr]` |
| **6** | **Footer Links** | Lưới 4 cột thẳng hàng dọc & ngang | `grid` | `grid gap-10 sm:grid-cols-2 lg:grid-cols-4` |

---

### BUỔI 3
## Nhiệm vụ 1: Mobile-First & Layout Optimization

1. **Phương pháp luận Mobile-First & Quy trình Test:**
* Các prefix breakpoint (`sm:`, `md:`, `lg:`) hoạt động theo cơ chế `min-width` ("từ kích thước này trở lên").
* Quy trình kiểm tra liên tục qua 4 mốc màn hình chuẩn: **360px ➔ 768px ➔ 1024px ➔ 1440px**.

2. **Danh sách 4 vị trí tối ưu Layout trên Mobile (360px):**

| STT | Vị trí (Section) | Hiện trạng vỡ / Chưa tối ưu ở 360px | Hướng xử lý chuẩn Mobile-First |
| :---: | :--- | :--- | :--- |
| **1** | **Hero Section** | Nút bấm CTA xếp hàng ngang dễ tràn viền trên màn 360px | Chuyển sang xếp dọc mặc định: `flex-col sm:flex-row` |
| **2** | **Lưới tính năng** | Chưa khai báo cột mặc định rõ ràng cho di động | Đặt mặc định 1 cột: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| **3** | **Bảng so sánh** | Ép bảng nhiều cột hiển thị trên màn nhỏ gây co cụm | Bọc khung cuộn ngang: `overflow-x-auto min-w-[720px]` kèm ghi chú |
| **4** | **Header / Menu** | Danh sách điều hướng chính tràn màn hình di động | Ẩn menu di động: `hidden md:flex`, nhường chỗ cho nút Hamburger |

### 🌙 Nhiệm vụ 3: Thiết Lập Dark Mode Bằng Hệ Thống Token Màu (CSS Variables)
* Biến CSS màu sắc trong `@layer base` cho cả `:root` và `.dark`: `--color-ink`, `--color-muted`, `--color-surface`, `--color-surface-alt`, `--color-line`.
* Tích hợp Tailwind: Cấu hình `darkMode: 'class'` và kết nối các màu utility với `var(--color-...)`.

### 🧩 Nhiệm vụ 4: Component Hóa CSS & Trang Pricing
* Trích xuất Component trong `@layer components`: `.section`, `.btn`, `.btn-primary`, `.card`, `.field-label`, `.field-input`, `.field-error`.
* Trang Bảng giá: Thiết kế bảng so sánh trực quan, có khối `overflow-x-auto min-w-[720px]` hỗ trợ vuốt ngang trên mobile.

---

### BUỔI 4
## JavaScript: DOM & Tương Tác (Kiến Trúc Module Hóa & Chuẩn Accessibility)

### 📋 Checklist 7 Tính Năng Bắt Buộc:
- [x] **1. Menu Mobile:** Có thuộc tính `aria-expanded` & `aria-label`, đóng được bằng 3 cách (phím `ESC` trả tiêu điểm về nút toggle qua `toggle.focus()`, bấm ra ngoài vùng header, tự đóng khi resize lên desktop `min-width: 768px`).
- [x] **2. Navbar khi cuộn:** Đổi trạng thái đổ bóng (`shadow-md`) và viền bằng `IntersectionObserver` theo dõi mốc `#nav-sentinel` (không dùng sự kiện `scroll` để tối ưu hiệu năng). Kèm nút "Lên đầu trang" (`#to-top`) xuất hiện khi cuộn quá 400px.
- [x] **3. Accordion FAQ:** Áp dụng **Event Delegation** (1 event listener duy nhất trên root `#faq`), dùng `e.target.closest("[data-faq-trigger]")`, cơ chế "đóng hết rồi mở một cái", đồng bộ `aria-expanded`, `aria-controls` và `hidden`.
- [x] **4. Công tắc Dark Mode:** Ghi nhớ trạng thái bằng `localStorage`, mặc định theo `prefers-color-scheme`, tích hợp script inline đồng bộ trong `<head>` để triệt tiêu hoàn toàn hiện tượng nháy trắng (FOUC) khi tải trang.
- [x] **5. Công tắc giá Tháng/Năm:** Nút bấm `role="switch"` và `aria-checked`, số tiền đặt trong HTML (`data-monthly` & `data-yearly`), định dạng tiền tệ Việt Nam chuẩn bằng `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`.
- [x] **6. Slider cảm nhận viết tay:** Thuần JavaScript không thư viện, chuyển động dải track `translateX(-${index * 100}%)`, vòng lặp 2 chiều `(next + length) % length`, thêm thuộc tính `inert` cho các slide đang ẩn để tránh lỗi bàn phím Tab, chấm chỉ dẫn (dots) sinh động bằng JS, tự động chạy và tự dừng khi `mouseenter`, `focusin` hoặc `visibilitychange`.
- [x] **7. Hiệu ứng lộ dần khi cuộn (Scroll Reveal):** Dùng `IntersectionObserver`, tự động ngắt theo dõi (`unobserve`) sau khi phần tử xuất hiện, tôn trọng cài đặt người dùng `prefers-reduced-motion: reduce`.

### 🏗️ Cấu Trúc Module Hóa JS (`js/`):
* `js/main.js`: Điểm khởi động duy nhất (`<script type="module" src="./js/main.js"></script>`), chỉ import và gọi các hàm khởi tạo `init...()`.
* `js/nav.js`: Xử lý Menu mobile, Navbar cuộn (`IntersectionObserver`), Nút lên đầu trang (`initToTop`).
* `js/theme.js`: Xử lý công tắc Dark Mode, lưu `localStorage`, đồng bộ icon và ARIA.
* `js/faq.js`: Xử lý Accordion FAQ bằng Event Delegation.
* `js/pricing.js`: Xử lý công tắc giá tháng/năm và `Intl.NumberFormat`.
* `js/slider.js`: Xử lý Slider cảm nhận, thuộc tính `inert` và chấm phân trang tự sinh.
* `js/reveal.js`: Xử lý Scroll Reveal và `prefers-reduced-motion`.
* `js/extra.js`: Xử lý bài tập về nhà tương tác mở rộng.

### 🎁 Bài Tập Về Nhà (Tương Tác Tự Chọn):
* **Tính năng 1 - Sao chép mã ưu đãi nhanh (`data-copy-coupon`):** Giúp người dùng bấm 1 chạm để sao chép mã khuyến mãi `SANVIET2026` vào Clipboard mà không cần bôi đen thủ công, có phản hồi trực quan "Đã chép mã" giúp tăng tỷ lệ chuyển đổi đăng ký.
* **Tính năng 2 - Modal xem Demo trực tiếp (`demo-modal`):** Giúp khách hàng xem nhanh cách hệ thống đặt sân & bật tắt đèn hoạt động ngay trên trang chủ mà không phải chuyển trang, có bẫy tiêu điểm bàn phím và đóng bằng phím ESC.
* **Tính năng 3 - Hiệu ứng đếm số tăng dần (`data-countup`):** Giúp phần số liệu thống kê (100.000+ lượt đặt, 35% tăng trưởng) trở nên sinh động và tạo độ tin cậy trực quan cao hơn khi người dùng cuộn đến.

### 🎓 Trả Lời Câu Hỏi Vấn Đáp Buổi 4:
1. **Event delegation là gì và vì sao cần thiết ở accordion?**
   * *Trả lời:* Event delegation là kỹ thuật tận dụng cơ chế nổi bọt sự kiện (Event Bubbling) để gắn duy nhất 1 Event Listener tại phần tử cha (`#faq`) thay vì gắn vào từng nút con. Kỹ thuật này giúp tiết kiệm bộ nhớ, giảm độ phức tạp khi quản lý sự kiện và xử lý tốt ngay cả khi các phần tử bên trong thay đổi động hoặc khi bấm trúng icon SVG bên trong nút nhờ `e.target.closest()`.
2. **Vì sao script dark mode phải nằm inline trong `<head>` mà không nằm trong `main.js`?**
   * *Trả lời:* File `main.js` được nạp dạng `type="module"` đặt cuối `<body>` nên thực thi sau khi trình duyệt đã phân tích và vẽ xong DOM ban đầu. Nếu đặt dark mode trong `main.js`, trình duyệt sẽ vẽ trang màu sáng trước rồi mới đổi sang tối, gây ra hiện tượng nháy trắng (FOUC - Flash of Unstyled Content). Đặt một đoạn script inline đồng bộ nhỏ trong `<head>` giúp kiểm tra `localStorage` / `prefers-color-scheme` và gắn class `dark` vào thẻ `<html>` ngay trước khi trình duyệt render giao diện.
3. **IntersectionObserver hơn sự kiện `scroll` ở điểm nào?**
   * *Trả lời:* Sự kiện `scroll` kích hoạt liên tục hàng trăm lần mỗi giây khi người dùng cuộn trang, chạy trên main thread gây hiện tượng giật lag (jank). Ngược lại, `IntersectionObserver` được trình duyệt tối ưu hóa ở mức native, chạy bất đồng bộ và chỉ phát tín hiệu khi phần tử mốc thực sự giao cắt (vào hoặc ra khỏi khung nhìn), giúp tiết kiệm tài nguyên CPU và tăng tốc độ khung hình (60fps mượt mà).
4. **Nếu bỏ `inert` khỏi slider thì người dùng bàn phím gặp vấn đề gì?**
   * *Trả lời:* Nếu không có `inert`, các liên kết hoặc nút bấm nằm trong các slide đang ẩn (vô hình ngoài màn hình) vẫn nhận được tiêu điểm khi người dùng nhấn phím `Tab`. Khi đó, khung viền focus sẽ biến mất vào vùng vô hình, khiến người dùng bàn phím và người khiếm thị sử dụng Screen Reader bị mất phương hướng, không biết tiêu điểm đang ở đâu.