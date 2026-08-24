/**
 * js/validation.js — Kiểm tra dữ liệu Form bằng Constraint Validation API (Tiết 3)
 * - Tắt bong bóng mặc định qua novalidate
 * - Thông báo lỗi Tiếng Việt kèm hướng dẫn sửa
 * - Đánh dấu aria-invalid, đưa tiêu điểm về ô sai đầu tiên
 * - Toast thông báo khi gửi thành công
 */

import { showToast } from "./records.js";

function messageFor(field) {
  const v = field.validity;
  if (v.valueMissing) {
    return "Vui lòng điền mục này.";
  }
  if (v.typeMismatch) {
    if (field.type === "email") {
      return "Email chưa đúng định dạng. Ví dụ: chuvua@gmail.com";
    }
    if (field.type === "url") {
      return "Đường dẫn website chưa đúng định dạng. Ví dụ: https://sanviet.vn";
    }
    return "Định dạng dữ liệu chưa chính xác.";
  }
  if (v.patternMismatch) {
    if (field.type === "tel" || field.name === "phone") {
      return "Số điện thoại phải gồm 10 chữ số, bắt đầu bằng số 0. Ví dụ: 0912345678";
    }
    return "Dữ liệu không khớp định dạng yêu cầu.";
  }
  if (v.tooShort) {
    return `Vui lòng nhập tối thiểu ${field.minLength} ký tự (hiện tại có ${field.value.length} ký tự).`;
  }
  if (v.tooLong) {
    return `Vui lòng không nhập quá ${field.maxLength} ký tự.`;
  }
  if (v.rangeUnderflow) {
    return `Giá trị tối thiểu cho phép là ${field.min}.`;
  }
  if (v.rangeOverflow) {
    return `Giá trị tối đa cho phép là ${field.max}.`;
  }
  if (v.customError) {
    return field.validationMessage;
  }
  return field.validationMessage || "Dữ liệu nhập vào chưa hợp lệ.";
}

export function initValidation() {
  const forms = document.querySelectorAll("form[data-validate]");
  if (forms.length === 0) return; // Không có form cần validate -> thoát êm

  forms.forEach((form) => {
    // 1. Tắt bong bóng mặc định bằng tiếng Anh của trình duyệt
    form.setAttribute("novalidate", "");

    const fields = form.querySelectorAll("input, select, textarea");

    // Xử lý xóa lỗi tức thì khi người dùng gõ sửa lại
    fields.forEach((field) => {
      field.addEventListener("input", () => {
        if (field.validity.valid) {
          field.removeAttribute("aria-invalid");
          const errorBox = field.parentElement?.querySelector("[data-error-for]");
          if (errorBox) {
            errorBox.textContent = "";
          }
        }
      });
    });

    // Bắt sự kiện submit form
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let firstInvalid = null;
      let hasError = false;

      fields.forEach((field) => {
        const errorBox = field.parentElement?.querySelector("[data-error-for]");

        if (!field.checkValidity()) {
          hasError = true;
          const msg = messageFor(field);

          // Đánh dấu aria-invalid cho trình đọc màn hình
          field.setAttribute("aria-invalid", "true");

          // Hiện thông báo lỗi tiếng Việt cho người nhìn thấy
          if (errorBox) {
            errorBox.textContent = msg;
          }

          if (!firstInvalid) {
            firstInvalid = field;
          }
        } else {
          field.removeAttribute("aria-invalid");
          if (errorBox) {
            errorBox.textContent = "";
          }
        }
      });

      // Nếu có lỗi -> đưa tiêu điểm về ô sai đầu tiên
      if (hasError && firstInvalid) {
        firstInvalid.focus();
        showToast("Vui lòng kiểm tra lại các trường thông tin có lỗi màu đỏ.", "error");
        return;
      }

      // Nếu hợp lệ 100% -> Thực hiện gửi thành công
      const successMsg = form.dataset.successMessage || "Đã gửi thông tin thành công!";
      showToast(successMsg, "success");
      form.reset();

      // Xóa toàn bộ trạng thái lỗi
      fields.forEach((field) => {
        field.removeAttribute("aria-invalid");
        const errorBox = field.parentElement?.querySelector("[data-error-for]");
        if (errorBox) errorBox.textContent = "";
      });
    });
  });
}
