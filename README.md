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

---

### BUỔI 5
## Dữ Liệu, Kiểm Tra Dữ Liệu, Hoàn Thiện & Phát Hành

### 📋 Checklist Hoàn Thành Buổi 5:
- [x] **Trang thứ tư (`records.html`):** Đọc và hiển thị dữ liệu động từ `data/records.json` (30 bản ghi mẫu) thông qua `fetch + async/await`.
- [x] **Đủ 4 trạng thái giao diện:**
  1. `loading`: Hiển thị khung xương skeleton khi đang nạp dữ liệu.
  2. `có dữ liệu`: Hiển thị danh sách bảng kèm số liệu thống kê sản lượng và doanh thu.
  3. `rỗng`: Hiển thị thông báo thân thiện khi không tìm thấy kết quả khớp bộ lọc.
  4. `lỗi`: Bắt lỗi `!res.ok` và hiển thị thông báo lỗi kèm nút "Thử tải lại".
- [x] **Mô hình State ➔ Render ➔ DOM:** Thao tác người dùng chỉ sửa `state` rồi gọi `render()` duy nhất 1 lần, không sửa DOM lắt nhắt.
- [x] **Tìm kiếm, Lọc và Sắp xếp kết hợp:** Lọc đa điều kiện (`category` + `status` + `query` + `sort`) đồng thời bằng hàm thuần `visibleRecords()`.
- [x] **Debounce cho ô tìm kiếm:** Tối ưu hóa 300ms giảm tải vẽ lại liên tục khi người dùng gõ phím.
- [x] **Thêm / Xóa bản ghi & localStorage:** Tự động đồng bộ vào `localStorage`, dữ liệu giữ nguyên khi F5 / refresh trang, có nút "Khôi phục dữ liệu mẫu".
- [x] **Dựng dòng an toàn chống XSS:** Sử dụng `<template id="row-template">` kết hợp `textContent`, thay thế DOM 1 lần bằng `tbody.replaceChildren()`.
- [x] **Kiểm tra dữ liệu Form (`contact.html`):** Sử dụng Constraint Validation API (`novalidate`), thông báo lỗi Tiếng Việt rõ ràng kèm hướng dẫn sửa, gắn `aria-invalid="true"`, tự động đưa tiêu điểm về ô sai đầu tiên (`firstInvalid.focus()`), hiển thị Toast thông báo khi gửi thành công.
- [x] **Rà soát chất lượng & Accessibility:** Đảm bảo điều hướng bàn phím `:focus-visible`, độ tương phản màu chuẩn >= 4.5:1, ảnh có `width/height` và `loading="lazy"`, Console sạch không có lỗi 404.

### 🌟 3 Điều Tôi Sẽ Làm Lại Nếu Có Thêm Thời Gian:
1. **Xây dựng Backend RESTful API & Database Thực Tế:** Hiện tại dữ liệu đang lưu cục bộ ở `localStorage` của trình duyệt client. Nếu có thêm thời gian, tôi sẽ xây dựng Backend API với Node.js/Express và cơ sở dữ liệu PostgreSQL/MongoDB để hỗ trợ xác thực tài khoản (Authentication/JWT), phân quyền quản lý và đồng bộ dữ liệu đa thiết bị theo thời gian thực.
2. **Bổ Sung Tính Năng Phân Trang (Pagination) & Bộ Lọc Nâng Cao:** Khi số lượng đơn hàng tăng từ 30 lên hàng nghìn bản ghi, tôi sẽ bổ sung phân trang (10/20/50 dòng mỗi trang) và bộ lọc theo khoảng ngày (Date Range Picker), lọc theo khoảng giá để tối ưu hóa hiệu năng render DOM và trải nghiệm tra cứu của người dùng.
3. **Tích Hợp Biểu Đồ Trực Quan Hóa Doanh Thu (Dashboard Charts):** Xây dựng biểu đồ cột/đường (bằng Chart.js hoặc SVG thuần) hiển thị xu hướng tăng trưởng sản lượng và doanh thu theo tuần/tháng, giúp chủ cụm sân và thương lái có cái nhìn trực quan, nhanh chóng đưa ra quyết định kinh doanh.

### 🎓 Trả Lời 5 Câu Hỏi Vấn Đáp Cuối Kỳ:
1. **Vẽ lại mô hình `state ➔ render ➔ DOM` và giải thích vì sao nó cần thiết?**
   * *Mô hình:*
     ```text
     state ───► render() ───► DOM
       ▲                        │
       └──── sự kiện người dùng ┘
     ```
   * *Giải thích:* Mô hình này tạo ra **Single Source of Truth (Nguồn chân lý duy nhất)** cho toàn bộ ứng dụng. Mọi tương tác của người dùng (gõ tìm kiếm, chọn lọc danh mục, bấm sắp xếp, thêm/xóa) chỉ thay đổi duy nhất đối tượng `state`, sau đó hàm `render()` sẽ dựa vào `state` hiện tại để tính toán và cập nhật lại DOM một lần. Nhờ vậy, code không bị phân tán, các bộ lọc không bao giờ triệt tiêu lẫn nhau và rất dễ kiểm thử, bảo trì.

2. **Vì sao không được nối chuỗi dữ liệu người dùng vào `innerHTML`?**
   * *Trả lời:* Dữ liệu do người dùng nhập có thể chứa mã HTML hoặc mã JavaScript độc hại (ví dụ: `<img src=x onerror="alert(document.cookie)">`). Nếu nối chuỗi trực tiếp vào `innerHTML`, trình duyệt sẽ thông dịch chuỗi đó thành mã thực thi, dẫn đến lỗ hổng bảo mật nghiêm trọng là **XSS (Cross-Site Scripting)**. Sử dụng `<template>` kết hợp `textContent` coi mọi dữ liệu đầu vào là văn bản thuần (plain text) an toàn 100%.

3. **`debounce` giải quyết vấn đề gì? Nếu bỏ đi thì hỏng ở đâu?**
   * *Trả lời:* `debounce` trì hoãn việc thực thi hàm cho đến khi người dùng ngừng thao tác trong một khoảng thời gian nhất định (ví dụ 300ms). Khi người dùng gõ từ khóa "Nguyễn", sự kiện `input` bắn ra liên tục 6 lần. Nếu không có `debounce`, hàm lọc và vẽ lại DOM sẽ phải chạy 6 lần liên tiếp. Với tập dữ liệu lớn hàng nghìn dòng, việc này gây nghẽn luồng xử lý chính (Main Thread), làm giao diện bị khựng, đơ giật và giảm thời lượng pin của thiết bị.

4. **`novalidate` tắt cái gì và không tắt cái gì?**
   * *Trả lời:* Thuộc tính `novalidate` trên thẻ `<form>` **chỉ tắt bong bóng thông báo lỗi mặc định bằng tiếng Anh** của trình duyệt (vốn không thể tùy biến giao diện CSS). Nó **không hề tắt** cơ chế kiểm tra hợp lệ của HTML5; các phương thức và thuộc tính như `form.checkValidity()`, `field.validity` (`valueMissing`, `typeMismatch`, `patternMismatch`, v.v.) vẫn hoạt động đầy đủ để chúng ta viết thông báo lỗi tiếng Việt tùy biến.

5. **Ba điều bạn sẽ làm lại nếu có thêm thời gian là gì, và vì sao?**
   * *Trả lời:* 
     1. Xây dựng Backend API RESTful với CSDL thực để dữ liệu được bảo mật và đồng bộ máy chủ thay vì chỉ ở `localStorage`.
     2. Bổ sung phân trang (Pagination) và lọc nâng cao theo khoảng ngày/giá tiền để sẵn sàng cho quy mô dữ liệu lớn.
     3. Tích hợp biểu đồ thống kê trực quan (Charts Dashboard) giúp người dùng nắm bắt xu hướng doanh thu và sản lượng nhanh hơn.