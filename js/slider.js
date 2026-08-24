/**
 * js/slider.js — Quản lý Slider cảm nhận khách hàng viết tay (thuần JS)
 * - Vòng tròn 2 chiều: (next + slides.length) % slides.length
 * - Thuộc tính inert cho slide ẩn (chuẩn tiếp cận bàn phím)
 * - Tự sinh pagination dots bằng JS từ số slide thật
 * - Tự chạy và dừng khi mouseenter, focusin, visibilitychange
 */

export function initSlider() {
  const root =
    document.getElementById("testimonial-slider") ||
    document.querySelector("[data-slider]");

  if (!root) return; // Trang không có slider -> thoát êm

  const track = root.querySelector("[data-slider-track]");
  const slides = root.querySelectorAll("[data-slide]");
  const prevBtn = root.querySelector("[data-slider-prev]");
  const nextBtn = root.querySelector("[data-slider-next]");
  const dotsContainer = root.querySelector("[data-slider-dots]");

  if (!track || slides.length === 0) return;

  let index = 0;
  let timer = null;

  // 1. Sinh chấm chỉ dẫn (dots) bằng JS từ số slide thật (không viết cứng HTML)
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className =
        "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-600";
      dot.setAttribute("aria-label", `Chuyển đến cảm nhận số ${i + 1}`);
      dot.addEventListener("click", () => {
        go(i);
        start();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots(activeIdx) {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll("button");
    dots.forEach((dot, i) => {
      const isActive = i === activeIdx;
      dot.classList.toggle("bg-brand-600", isActive);
      dot.classList.toggle("w-8", isActive);
      dot.classList.toggle("bg-line", !isActive);
      dot.classList.toggle("dark:bg-line-invert", !isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function go(next) {
    index = (next + slides.length) % slides.length; // Vòng tròn cả hai chiều không cần if
    track.style.transform = `translateX(-${index * 100}%)`;

    // inert trên các slide đang ẩn để người dùng bàn phím không Tab vào vùng vô hình
    slides.forEach((s, i) => {
      s.toggleAttribute("inert", i !== index);
    });

    updateDots(index);
  }

  function start() {
    clearInterval(timer);
    timer = setInterval(() => {
      go(index + 1);
    }, 5000);
  }

  function stop() {
    clearInterval(timer);
  }

  // Nút Prev / Next
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      go(index - 1);
      start();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      go(index + 1);
      start();
    });
  }

  // Tự chạy nhưng biết dừng khi người dùng đang xem / tương tác
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop); // Ai đó đang dùng bàn phím
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : start();
  });

  // Khởi động vị trí đầu tiên
  go(0);
  start();
}
