/**
 * js/main.js — Điểm khởi động duy nhất cho toàn bộ các trang trong dự án
 * Tách module theo tính năng, mỗi module tự kiểm tra sự tồn tại của phần tử trước khi thực thi
 */

import { initNav, initHeaderOnScroll, initToTop } from "./nav.js";
import { initTheme } from "./theme.js";
import { initFaq } from "./faq.js";
import { initPricing } from "./pricing.js";
import { initSlider } from "./slider.js";
import { initReveal } from "./reveal.js";
import { initExtra } from "./extra.js";
import { initRecords } from "./records.js";
import { initValidation } from "./validation.js";

// Khởi chạy các widget tương tác
initNav();
initHeaderOnScroll();
initToTop();
initTheme();
initFaq();
initPricing();
initSlider();
initReveal();
initExtra();
initRecords();
initValidation();
