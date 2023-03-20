import { $ } from "./helper.js";

const loader = $('#loader');

// Error state
export function showError() {
    const errorDiv = $('#error');
    errorDiv.classList.add('active');
  }