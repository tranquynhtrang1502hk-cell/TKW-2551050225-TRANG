/**
 * js/transaction.js — Module xử lý Trang Giao Dịch Mới (Đặt sân & Thanh toán SânViệt)
 * - Tự động tính tiền theo loại sân và số giờ chơi
 * - Tạo mã giao dịch duy nhất
 * - Lưu đồng bộ vào localStorage (dùng chung với records.html)
 * - Hiển thị hóa đơn xác nhận giao dịch & lịch sử giao dịch gần đây
 */

import { showToast } from "./records.js";

const STORAGE_KEY = "sanviet_badminton_records_v2";

// Bảng giá niêm yết theo loại sân / dịch vụ
const PRICE_TABLE = {
  "Sân Đôi VIP": 180000,
  "Sân Tiêu Chuẩn": 130000,
  "Sân Đơn": 100000,
  "Gói Tháng Cố Định": 150000,
  "Thuê Vợt & Cầu": 70000,
};

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function initTransaction() {
  const form = document.getElementById("transaction-form");
  if (!form) return; // Không phải trang transaction.html -> thoát êm

  const categorySelect = document.getElementById("tx-category");
  const hoursInput = document.getElementById("tx-hours");
  const courtSelect = document.getElementById("tx-court");
  const dateInput = document.getElementById("tx-date");
  const paymentRadios = document.querySelectorAll("input[name='payment-method']");
  const qrSection = document.getElementById("tx-qr-section");

  // Các thẻ hiển thị tóm tắt chi phí
  const unitPriceEl = document.getElementById("summary-unit-price");
  const hoursEl = document.getElementById("summary-hours");
  const totalAmountEl = document.getElementById("summary-total-amount");
  const qrAmountEl = document.getElementById("qr-amount");

  // Modal hóa đơn
  const receiptModal = document.getElementById("receipt-modal");
  const closeReceiptBtn = document.getElementById("close-receipt-modal");
  const printReceiptBtn = document.getElementById("print-receipt-btn");

  // Mặc định ngày hôm nay
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }

  // Hàm tính toán tổng tiền
  function calculateTotal() {
    const category = categorySelect?.value || "Sân Đôi VIP";
    const hours = Math.max(1, Number(hoursInput?.value) || 1);
    const unitPrice = PRICE_TABLE[category] || 130000;
    const total = unitPrice * hours;

    if (unitPriceEl) unitPriceEl.textContent = `${currencyFormatter.format(unitPrice)} / giờ`;
    if (hoursEl) hoursEl.textContent = `${hours} giờ`;
    if (totalAmountEl) totalAmountEl.textContent = currencyFormatter.format(total);
    if (qrAmountEl) qrAmountEl.textContent = currencyFormatter.format(total);

    return { category, hours, unitPrice, total };
  }

  // Lắng nghe thay đổi để tự động tính tiền
  if (categorySelect) categorySelect.addEventListener("change", calculateTotal);
  if (hoursInput) hoursInput.addEventListener("input", calculateTotal);

  // Hiển thị/ẩn mã QR khi chọn phương thức thanh toán
  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const isQR = e.target.value === "vietqr" || e.target.value === "momo";
      if (qrSection) {
        qrSection.classList.toggle("hidden", !isQR);
      }
    });
  });

  // Tính tiền lần đầu khi tải trang
  calculateTotal();

  // Render bảng lịch sử giao dịch gần đây trong trang
  function renderRecentTransactions() {
    const tbody = document.getElementById("recent-tx-tbody");
    if (!tbody) return;

    let records = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) records = JSON.parse(raw);
    } catch (e) {
      console.warn("Lỗi đọc localStorage:", e);
    }

    if (!Array.isArray(records) || records.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-muted">Chưa có giao dịch nào được tạo.</td></tr>`;
      return;
    }

    // Lấy 6 giao dịch mới nhất
    const recent = records.slice(0, 6);
    tbody.innerHTML = recent
      .map(
        (r, idx) => `
        <tr class="hover:bg-surface-alt/70 transition-colors border-b border-line">
          <td class="p-3.5 text-xs font-mono font-bold text-brand-600">${r.id}</td>
          <td class="p-3.5 font-semibold text-ink">${r.trader}</td>
          <td class="p-3.5 text-sm">${r.category}</td>
          <td class="p-3.5 text-right font-mono text-sm">${r.weight} giờ</td>
          <td class="p-3.5 text-right font-mono font-bold text-emerald-600 text-sm">${currencyFormatter.format(
            r.amount
          )}</td>
          <td class="p-3.5 text-center text-xs text-muted">${r.date}</td>
        </tr>
      `
      )
      .join("");
  }

  renderRecentTransactions();

  // Xử lý nộp form tạo giao dịch mới
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const customerName = document.getElementById("tx-name")?.value.trim();
    const customerPhone = document.getElementById("tx-phone")?.value.trim();
    const court = courtSelect?.value;
    const date = dateInput?.value;
    const note = document.getElementById("tx-note")?.value.trim() || "Không có";
    const paymentMethod = document.querySelector("input[name='payment-method']:checked")?.value || "vietqr";

    if (!customerName || !customerPhone || !court || !date) {
      showToast("Vui lòng điền đầy đủ các thông tin bắt buộc.", "error");
      return;
    }

    const { category, hours, total } = calculateTotal();

    // Sinh mã giao dịch duy nhất
    const txId = `GD-${new Date().toISOString().slice(2, 7).replace("-", "")}-${Math.floor(
      100 + Math.random() * 900
    )}`;

    const newRecord = {
      id: txId,
      trader: `${customerName} (${customerPhone})`,
      category: category,
      status: "da-chot", // Mặc định là đã cọc / đã tạo giao dịch
      weight: hours,
      amount: total,
      date: date,
      court: court,
      note: note,
      paymentMethod: paymentMethod,
    };

    // Lưu vào localStorage
    let records = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) records = JSON.parse(raw);
    } catch (e) {}

    records.unshift(newRecord);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn("Lỗi lưu localStorage:", e);
    }

    // Hiển thị hóa đơn xác nhận (Receipt Modal)
    if (receiptModal) {
      document.getElementById("receipt-id").textContent = txId;
      document.getElementById("receipt-customer").textContent = customerName;
      document.getElementById("receipt-phone").textContent = customerPhone;
      document.getElementById("receipt-category").textContent = `${category} - ${court}`;
      document.getElementById("receipt-time").textContent = `${hours} giờ (Ngày ${date})`;
      document.getElementById("receipt-total").textContent = currencyFormatter.format(total);
      document.getElementById("receipt-payment").textContent =
        paymentMethod === "vietqr" ? "Chuyển khoản VietQR" : paymentMethod === "momo" ? "Ví MoMo" : "Tiền mặt tại quầy";

      receiptModal.classList.remove("hidden");
    }

    showToast(`Tạo giao dịch ${txId} thành công!`, "success");
    form.reset();
    calculateTotal();
    renderRecentTransactions();
  });

  // Đóng modal hóa đơn
  if (closeReceiptBtn) {
    closeReceiptBtn.addEventListener("click", () => {
      receiptModal.classList.add("hidden");
    });
  }

  if (printReceiptBtn) {
    printReceiptBtn.addEventListener("click", () => {
      window.print();
    });
  }
}
