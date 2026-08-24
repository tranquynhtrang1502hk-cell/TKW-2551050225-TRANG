/**
 * js/records.js — Module quản lý dữ liệu động Buổi 5
 * - Mô hình State -> Render -> DOM
 * - 4 Trạng thái: Loading (Khung xương), Có dữ liệu, Rỗng, Lỗi
 * - Tìm kiếm Debounce, Lọc đa tiêu chí, Sắp xếp bằng bảng tra
 * - Dựng DOM an toàn qua <template> và textContent (Chống XSS)
 * - Lưu trữ localStorage và Khôi phục dữ liệu mẫu
 */

const STORAGE_KEY = "sanviet_records_data_v1";

// 1. State duy nhất của ứng dụng
const state = {
  records: [],
  query: "",
  category: "all",
  status: "all",
  sort: "date-desc",
  loading: true,
  error: null,
};

// 2. Bảng tra sắp xếp (khóa trùng đúng value của <option>)
const sorters = {
  "date-desc": (a, b) => b.date.localeCompare(a.date),
  "date-asc": (a, b) => a.date.localeCompare(b.date),
  "amount-desc": (a, b) => b.amount - a.amount,
  "amount-asc": (a, b) => a.amount - b.amount,
  "weight-desc": (a, b) => b.weight - a.weight,
  "weight-asc": (a, b) => a.weight - b.weight,
};

// 3. Bộ định dạng tiền tệ và số lượng
const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("vi-VN");

// 4. Bảng tra nhãn và class trạng thái
const statusConfig = {
  "da-chot": {
    label: "Đã chốt",
    class: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  },
  "dang-giao": {
    label: "Đang giao",
    class: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  },
  "hoan-tat": {
    label: "Hoàn tất",
    class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  },
  "da-huy": {
    label: "Đã hủy",
    class: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
  },
};

// 5. Hàm lọc và sắp xếp thuần (pure function) nhận state -> trả về mảng
export function visibleRecords() {
  const q = state.query.trim().toLowerCase();
  return state.records
    .filter((r) => state.category === "all" || r.category === state.category)
    .filter((r) => state.status === "all" || r.status === state.status)
    .filter(
      (r) =>
        !q ||
        r.trader.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    )
    .sort(sorters[state.sort] || sorters["date-desc"]);
}

// 6. Hàm Debounce cho ô tìm kiếm
function debounce(fn, delay = 300) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}

// 7. Hàm lưu trữ localStorage
function saveRecordsToStorage(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.warn("Không thể lưu localStorage:", e);
  }
}

// 8. Tải dữ liệu mẫu từ JSON hoặc localStorage
async function fetchRecordsData() {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.warn("Cache lỗi, tải lại từ file:", e);
    }
  }

  const res = await fetch("./data/records.json");
  if (!res.ok) {
    throw new Error(`Máy chủ trả về mã lỗi ${res.status}`);
  }
  const data = await res.json();
  saveRecordsToStorage(data);
  return data;
}

// 9. Dựng 1 dòng bảng an toàn qua <template> và textContent (Chống XSS)
function buildRow(record, index) {
  const template = document.getElementById("row-template");
  if (!template) {
    const tr = document.createElement("tr");
    tr.textContent = record.trader;
    return tr;
  }

  const clone = template.content.firstElementChild.cloneNode(true);

  // Điền dữ liệu an toàn bằng textContent
  const sttEl = clone.querySelector("[data-cell='stt']");
  const idEl = clone.querySelector("[data-cell='id']");
  const traderEl = clone.querySelector("[data-cell='trader']");
  const categoryEl = clone.querySelector("[data-cell='category']");
  const weightEl = clone.querySelector("[data-cell='weight']");
  const amountEl = clone.querySelector("[data-cell='amount']");
  const dateEl = clone.querySelector("[data-cell='date']");
  const statusBadge = clone.querySelector("[data-cell='status']");
  const deleteBtn = clone.querySelector("[data-action='delete']");

  if (sttEl) sttEl.textContent = String(index + 1);
  if (idEl) idEl.textContent = record.id;
  if (traderEl) traderEl.textContent = record.trader;
  if (categoryEl) categoryEl.textContent = record.category;
  if (weightEl) weightEl.textContent = `${numberFormatter.format(record.weight)} kg`;
  if (amountEl) amountEl.textContent = currencyFormatter.format(record.amount);
  if (dateEl) dateEl.textContent = record.date;

  if (statusBadge) {
    const conf = statusConfig[record.status] || {
      label: record.status,
      class: "bg-slate-100 text-slate-700",
    };
    statusBadge.textContent = conf.label;
    statusBadge.className = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${conf.class}`;
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Bạn có chắc chắn muốn xóa đơn "${record.id}" của ${record.trader}?`)) {
        state.records = state.records.filter((r) => r.id !== record.id);
        saveRecordsToStorage(state.records);
        render();
        showToast(`Đã xóa đơn ${record.id} thành công!`, "info");
      }
    });
  }

  return clone;
}

// 10. Cập nhật các khối giao diện theo 4 trạng thái
function render() {
  const root = document.getElementById("records-app");
  if (!root) return;

  const skeletonEl = document.getElementById("records-skeleton");
  const errorEl = document.getElementById("records-error");
  const emptyEl = document.getElementById("records-empty");
  const tableContainerEl = document.getElementById("records-table-container");
  const tbody = document.getElementById("records-tbody");
  const errorMsgEl = document.getElementById("records-error-message");

  const statCount = document.getElementById("stat-total-count");
  const statWeight = document.getElementById("stat-total-weight");
  const statAmount = document.getElementById("stat-total-amount");

  // Trạng thái 1: Đang tải dữ liệu (Loading)
  if (state.loading) {
    if (skeletonEl) skeletonEl.classList.remove("hidden");
    if (errorEl) errorEl.classList.add("hidden");
    if (emptyEl) emptyEl.classList.add("hidden");
    if (tableContainerEl) tableContainerEl.classList.add("hidden");
    return;
  }

  if (skeletonEl) skeletonEl.classList.add("hidden");

  // Trạng thái 2: Lỗi tải dữ liệu (Error)
  if (state.error) {
    if (errorEl) errorEl.classList.remove("hidden");
    if (emptyEl) emptyEl.classList.add("hidden");
    if (tableContainerEl) tableContainerEl.classList.add("hidden");
    if (errorMsgEl) errorMsgEl.textContent = state.error;
    return;
  }

  if (errorEl) errorEl.classList.add("hidden");

  const list = visibleRecords();

  // Cập nhật thống kê tóm tắt
  const totalWeight = list.reduce((sum, r) => sum + (Number(r.weight) || 0), 0);
  const totalAmount = list.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

  if (statCount) statCount.textContent = `${list.length} / ${state.records.length}`;
  if (statWeight) statWeight.textContent = `${numberFormatter.format(totalWeight)} kg`;
  if (statAmount) statAmount.textContent = currencyFormatter.format(totalAmount);

  // Trạng thái 3: Danh sách rỗng (Empty)
  if (list.length === 0) {
    if (emptyEl) emptyEl.classList.remove("hidden");
    if (tableContainerEl) tableContainerEl.classList.add("hidden");
    return;
  }

  // Trạng thái 4: Có dữ liệu (Data populated)
  if (emptyEl) emptyEl.classList.add("hidden");
  if (tableContainerEl) tableContainerEl.classList.remove("hidden");

  // Vẽ lại toàn bộ trong 1 lần chạm DOM bằng replaceChildren
  if (tbody) {
    tbody.replaceChildren(...list.map((r, i) => buildRow(r, i)));
  }
}

// 11. Toast thông báo
export function showToast(message, type = "success") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  const bgClass =
    type === "error"
      ? "bg-rose-600 text-white"
      : type === "info"
      ? "bg-slate-800 text-white"
      : "bg-emerald-600 text-white";

  toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold transform transition-all duration-300 translate-y-4 opacity-0 ${bgClass}`;
  toast.setAttribute("role", "alert");
  toast.innerHTML = `<span>${type === "error" ? "⚠️" : type === "info" ? "ℹ️" : "✅"}</span> <span>${message}</span>`;

  toastContainer.appendChild(toast);

  // Animation vào
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  });

  // Tự biến mất sau 3.5s
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 12. Khởi tạo toàn bộ tương tác của trang records.html
export async function initRecords() {
  const root = document.getElementById("records-app");
  if (!root) return; // Trang không phải records.html -> thoát êm

  const searchInput = document.getElementById("record-search");
  const categoryFilter = document.getElementById("record-category");
  const statusFilter = document.getElementById("record-status");
  const sortSelect = document.getElementById("record-sort");
  const resetBtn = document.getElementById("record-reset-data");
  const retryBtn = document.getElementById("records-retry-btn");
  const addModal = document.getElementById("add-record-modal");
  const openModalBtn = document.getElementById("open-add-record-modal");
  const closeModalBtn = document.getElementById("close-add-record-modal");
  const addForm = document.getElementById("add-record-form");

  // Sự kiện tìm kiếm có Debounce 300ms
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce((e) => {
        state.query = e.target.value;
        render();
      }, 300)
    );
  }

  // Sự kiện lọc danh mục
  if (categoryFilter) {
    categoryFilter.addEventListener("change", (e) => {
      state.category = e.target.value;
      render();
    });
  }

  // Sự kiện lọc trạng thái
  if (statusFilter) {
    statusFilter.addEventListener("change", (e) => {
      state.status = e.target.value;
      render();
    });
  }

  // Sự kiện sắp xếp
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      render();
    });
  }

  // Khôi phục dữ liệu mẫu
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      if (confirm("Khôi phục toàn bộ dữ liệu mẫu gốc từ records.json?")) {
        try {
          state.loading = true;
          render();
          localStorage.removeItem(STORAGE_KEY);
          const freshData = await fetchRecordsData();
          state.records = freshData;
          state.error = null;
          showToast("Đã khôi phục dữ liệu mẫu thành công!");
        } catch (err) {
          state.error = `Lỗi khôi phục: ${err.message}`;
        } finally {
          state.loading = false;
          render();
        }
      }
    });
  }

  // Thử lại khi gặp lỗi
  if (retryBtn) {
    retryBtn.addEventListener("click", async () => {
      state.loading = true;
      state.error = null;
      render();
      try {
        state.records = await fetchRecordsData();
      } catch (err) {
        state.error = `Không tải được dữ liệu: ${err.message}`;
      } finally {
        state.loading = false;
        render();
      }
    });
  }

  // Modal thêm bản ghi mới
  function toggleAddModal(show) {
    if (!addModal) return;
    addModal.classList.toggle("hidden", !show);
    addModal.setAttribute("aria-hidden", String(!show));
    document.body.classList.toggle("overflow-hidden", show);
    if (show && addForm) {
      addForm.reset();
      const firstInput = addForm.querySelector("input");
      if (firstInput) firstInput.focus();
    }
  }

  if (openModalBtn) openModalBtn.addEventListener("click", () => toggleAddModal(true));
  if (closeModalBtn) closeModalBtn.addEventListener("click", () => toggleAddModal(false));

  if (addModal) {
    addModal.addEventListener("click", (e) => {
      if (e.target === addModal) toggleAddModal(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !addModal.classList.contains("hidden")) {
        toggleAddModal(false);
      }
    });
  }

  // Form thêm bản ghi mới
  if (addForm) {
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const trader = document.getElementById("new-trader")?.value.trim();
      const category = document.getElementById("new-category")?.value;
      const status = document.getElementById("new-status")?.value;
      const weight = Number(document.getElementById("new-weight")?.value);
      const amount = Number(document.getElementById("new-amount")?.value);
      const date = document.getElementById("new-date")?.value;

      if (!trader || !category || !status || !weight || !amount || !date) {
        alert("Vui lòng điền đầy đủ tất cả các trường thông tin.");
        return;
      }

      // Tạo mã đơn ngẫu nhiên
      const newId = `PC-${new Date().toISOString().slice(2, 7).replace("-", "")}-${Math.floor(
        100 + Math.random() * 900
      )}`;

      const newRecord = {
        id: newId,
        trader,
        category,
        status,
        weight,
        amount,
        date,
      };

      state.records.unshift(newRecord);
      saveRecordsToStorage(state.records);
      toggleAddModal(false);
      render();
      showToast(`Đã thêm thành công đơn hàng ${newId}!`);
    });
  }

  // Nạp dữ liệu ban đầu
  render(); // Vẽ khung xương trước
  try {
    state.records = await fetchRecordsData();
  } catch (err) {
    state.error = `Không tải được dữ liệu: ${err.message}`;
  } finally {
    state.loading = false;
    render();
  }
}
