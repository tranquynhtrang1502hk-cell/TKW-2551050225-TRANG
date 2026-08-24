/**
 * js/pricing.js — Quản lý công tắc giá tháng/năm, định dạng bằng Intl.NumberFormat
 */

export function initPricing() {
  const root =
    document.getElementById("pricing") || document.getElementById("bang-gia");
  const toggle = document.getElementById("billing-toggle");

  if (!root || !toggle) return; // Trang không có bảng giá / công tắc -> thoát êm

  const priceElements = root.querySelectorAll("[data-price]");
  const periodLabels = root.querySelectorAll("[data-period]");

  // Khởi tạo bộ định dạng tiền tệ chuẩn tiếng Việt
  const dong = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

  function updatePrices(isYearly) {
    toggle.setAttribute("aria-checked", String(isYearly));

    const toggleCircle = toggle.querySelector("[data-toggle-circle]");
    if (toggleCircle) {
      toggleCircle.classList.toggle("translate-x-6", isYearly);
      toggleCircle.classList.toggle("translate-x-1", !isYearly);
    }

    priceElements.forEach((el) => {
      const amount = isYearly ? el.dataset.yearly : el.dataset.monthly;
      if (amount !== undefined) {
        el.textContent = dong.format(Number(amount));
      }
    });

    periodLabels.forEach((label) => {
      label.textContent = isYearly ? "/năm (tiết kiệm 20%)" : "/tháng";
    });
  }

  // Khởi tạo giá trị ban đầu theo data-monthly
  updatePrices(toggle.getAttribute("aria-checked") === "true");

  // Sự kiện click
  toggle.addEventListener("click", () => {
    const isYearly = toggle.getAttribute("aria-checked") !== "true";
    updatePrices(isYearly);
  });

  // Hỗ trợ phím Space / Enter
  toggle.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle.click();
    }
  });
}
