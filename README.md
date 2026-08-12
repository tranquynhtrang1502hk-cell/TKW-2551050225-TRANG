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
| **6** | **Footer Links** | Lưới 4 cột thẳng hàng dọc & ngang | `grid` | `grid gap-10 sm:grid-cols-2 lg:grid-cols-4` |

---
