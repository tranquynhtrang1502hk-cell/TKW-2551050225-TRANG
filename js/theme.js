/**
 * js/theme.js — Quản lý công tắc Dark / Light Mode
 */

export function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return; // Trang không có nút theme -> thoát êm

  function updateThemeState() {
    const isDark = document.documentElement.classList.contains("dark");
    toggle.setAttribute(
      "aria-label",
      isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"
    );
    toggle.setAttribute("aria-pressed", String(isDark));
  }

  // Khởi tạo trạng thái ARIA ban đầu
  updateThemeState();

  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeState();
  });
}
