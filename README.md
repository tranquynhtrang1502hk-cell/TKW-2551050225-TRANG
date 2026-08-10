### BUỔI 1(NHIỆM VỤ 1) (ĐIỀN BẢNG TỪ LINK FIGMS CÓ SẴN):

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

##  Buổi 2: Hệ thống Layout (Flexbox & Grid)
### Nhiệm vụ 1: Bảng chọn Flexbox vs Grid & Quy tắc Layout

| Thành phần / Frame Figma | Chọn Flex hay Grid? | Class Tailwind đề xuất | Lý do lựa chọn |
| :--- | :--- | :--- | :--- |
| **Navbar & Submenu** | Flex | `flex items-center justify-between` | Xếp 1 hàng, kích thước co giãn theo nội dung |
| **Dải Logo đối tác** | Flex (wrap) | `flex flex-wrap items-center justify-center` | Nội dung dài ngắn khác nhau, tự xuống dòng mượt mà |
| **Lưới tính năng (Features)** | Grid | `grid sm:grid-cols-2 lg:grid-cols-3` | Các thẻ đều nhau, cần thẳng hàng cả hàng lẫn cột |
| **Khối Số liệu (Stats)** | Grid | `grid grid-cols-2 lg:grid-cols-4` | Chia cột đều đặn cho các con số |
| **Bảng giá (Pricing)** | Grid | `grid lg:grid-cols-3 items-stretch` | Các thẻ giá song song và cần ép cao bằng nhau |
| **FAQ** | Grid | `grid lg:grid-cols-[1fr_1.4fr]` | Bố cục lưới 2 cột tỷ lệ tùy chỉnh |

**Quy tắc Layout áp dụng:**
- **Container chung:** `mx-auto w-full max-w-6xl px-5`
- **Khoảng cách:** Luôn dùng `gap-*` trên container cha, tuyệt đối không đặt `margin` đệm giữa các phần tử con.
- **Vertical Spacing:** Đồng nhất `py-20` (hoặc `py-24`, `py-28`) cho toàn bộ các section.
