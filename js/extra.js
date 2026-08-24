/**
 * js/extra.js — Các tính năng tương tác tự chọn (Bài tập về nhà Buổi 4)
 * 1. Sao chép mã ưu đãi giảm giá vào Clipboard kèm phản hồi trực quan
 * 2. Hiệu ứng số chạy tự động (CountUp) khi cuộn tới mục số liệu thống kê
 * 3. Modal xem Demo nhanh với chuẩn tiếp cận ARIA và phím ESC
 */

export function initExtra() {
  initCouponCopy();
  initCountUp();
  initDemoModal();
}

/**
 * 1. Sao chép mã khuyến mãi với Clipboard API
 */
function initCouponCopy() {
  const btn = document.querySelector("[data-copy-coupon]");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const code = btn.dataset.copyCoupon || "SANVIET2026";
    try {
      await navigator.clipboard.writeText(code);
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span>✅ Đã chép mã: ${code}</span>`;
      btn.classList.add("bg-emerald-700", "text-white");

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove("bg-emerald-700", "text-white");
      }, 2500);
    } catch (err) {
      console.warn("Không thể sao chép tự động:", err);
    }
  });
}

/**
 * 2. Hiệu ứng đếm số khi cuộn tới (CountUp Animation)
 */
function initCountUp() {
  const statElements = document.querySelectorAll("[data-countup]");
  if (statElements.length === 0) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return; // Người dùng giảm chuyển động -> giữ nguyên số tĩnh
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.countup, 10);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          const duration = 1500;
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing out quadratic
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(easeProgress * target);

            // Định dạng phân tách hàng nghìn
            el.textContent = `${prefix}${current.toLocaleString("vi-VN")}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = `${prefix}${target.toLocaleString("vi-VN")}${suffix}`;
            }
          }

          requestAnimationFrame(updateCount);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  statElements.forEach((el) => observer.observe(el));
}

/**
 * 3. Modal xem Demo nhanh (Accessible Modal)
 */
function initDemoModal() {
  const openBtns = document.querySelectorAll("[data-modal-open='demo-modal']");
  const modal = document.getElementById("demo-modal");
  if (!modal || openBtns.length === 0) return;

  const closeBtn = modal.querySelector("[data-modal-close]");
  let lastActiveElement = null;

  function openModal() {
    lastActiveElement = document.activeElement;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");
    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus();
    }
  }

  openBtns.forEach((btn) => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Đóng khi click ngoài backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Đóng bằng phím ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}
