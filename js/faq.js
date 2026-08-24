/**
 * js/faq.js — Quản lý Accordion FAQ (Dùng Event Delegation, 1 listener duy nhất, mở 1 mục)
 */

export function initFaq() {
  const root = document.getElementById("faq");
  if (!root) return; // Trang này không có FAQ -> thoát êm

  const triggers = root.querySelectorAll("[data-faq-trigger]");

  function setOpen(trigger, open) {
    trigger.setAttribute("aria-expanded", String(open));
    const panelId = trigger.getAttribute("aria-controls");
    const panel = panelId
      ? document.getElementById(panelId)
      : trigger.nextElementSibling;
    const icon = trigger.querySelector("[data-faq-icon]");

    if (panel) {
      panel.hidden = !open;
      panel.classList.toggle("hidden", !open);
    }
    if (icon) {
      icon.classList.toggle("rotate-180", open);
    }
  }

  // Khởi tạo trạng thái ban đầu: đóng toàn bộ hoặc mở mục đã có sẵn aria-expanded="true"
  triggers.forEach((t) => {
    const isInitiallyOpen = t.getAttribute("aria-expanded") === "true";
    setOpen(t, isInitiallyOpen);
  });

  // Event Delegation: 1 listener duy nhất gắn vào root
  root.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;

    const willOpen = trigger.getAttribute("aria-expanded") !== "true";
    triggers.forEach((t) => setOpen(t, false)); // Đóng hết
    if (willOpen) setOpen(trigger, true); // Rồi mở đúng cái vừa bấm
  });
}
