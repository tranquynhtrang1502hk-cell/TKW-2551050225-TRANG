/**
 * js/reveal.js — Hiệu ứng lộ dần khi cuộn (Scroll Reveal) bằng IntersectionObserver
 * - Tôn trọng người dùng: prefers-reduced-motion: reduce
 * - Tự động unobserve sau khi phần tử đã xuất hiện
 */

export function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (items.length === 0) return; // Không có phần tử cần reveal -> thoát êm

  // Kiểm tra cài đặt giảm chuyển động của hệ điều hành
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible")); // Hiện luôn, không animate
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // Ngắt theo dõi sau khi đã hiện để tối ưu hiệu năng
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  items.forEach((el) => {
    el.classList.add("reveal-item");
    observer.observe(el);
  });
}
