/**
 * js/nav.js — Quản lý Navigation, Mobile Menu, Header khi cuộn và Nút Lên đầu trang
 */

/**
 * Nhiệm vụ 2: Menu Mobile (chuẩn Accessibility ARIA & bàn phím)
 */
export function initNav() {
  const toggle = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const header = document.querySelector("header");

  if (!toggle || !menu) return; // Trang không có mobile menu -> thoát êm

  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    document.body.classList.toggle("overflow-hidden", open);

    // Cập nhật icon hamburger / close
    const iconOpen = toggle.querySelector("[data-menu-icon-open]");
    const iconClose = toggle.querySelector("[data-menu-icon-close]");
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
    }
  }

  // Bắt sự kiện click vào nút toggle
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  // Cách 1: Phím ESC đóng menu và trả tiêu điểm về nút toggle
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Cách 2: Bấm ra ngoài vùng header thì tự đóng
  document.addEventListener("click", (e) => {
    if (
      toggle.getAttribute("aria-expanded") === "true" &&
      header &&
      !header.contains(e.target)
    ) {
      setOpen(false);
    }
  });

  // Cách 3: Khi màn hình phóng to lên desktop (>= 768px) tự đóng menu
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
      setOpen(false);
    }
  });

  // Tự đóng khi click vào liên kết điều hướng
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

/**
 * Nhiệm vụ 2: Navbar phản ứng khi cuộn bằng IntersectionObserver (không dùng scroll event)
 */
export function initHeaderOnScroll() {
  const header = document.querySelector("header");
  const sentinel = document.getElementById("nav-sentinel");

  if (!header || !sentinel) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      const scrolled = !entry.isIntersecting;
      header.classList.toggle("shadow-md", scrolled);
      header.classList.toggle("border-line", scrolled);
    },
    { threshold: [0] }
  );

  observer.observe(sentinel);
}

/**
 * Bài khởi động: Nút Lên đầu trang (To-top button)
 */
export function initToTop() {
  const btn = document.getElementById("to-top");
  if (!btn) return;

  const sentinel = document.getElementById("nav-sentinel");

  if (sentinel) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        btn.classList.toggle("is-shown", !entry.isIntersecting);
      },
      { rootMargin: "400px 0px 0px 0px" }
    );
    observer.observe(sentinel);
  } else {
    window.addEventListener(
      "scroll",
      () => {
        btn.classList.toggle("is-shown", window.scrollY > 400);
      },
      { passive: true }
    );
  }

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
