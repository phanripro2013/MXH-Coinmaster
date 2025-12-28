
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("🚀 System Starting...");

// Error Guard
window.addEventListener('error', (event) => {
  console.error("Critical Error:", event.error);
  const root = document.getElementById('root');
  if (root && root.innerHTML === '') {
    root.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; padding:20px; text-align:center;">
        <div style="background:#fee2e2; border:1px solid #ef4444; padding:20px; border-radius:20px; max-width:400px;">
          <h2 style="color:#b91c1c; margin-top:0;">Lỗi Khởi Động</h2>
          <p style="color:#7f1d1d; font-size:14px;">Hệ thống gặp sự cố khi tải dữ liệu. Vui lòng bấm nút bên dưới.</p>
          <button onclick="location.reload()" style="background:#2563eb; color:white; border:none; padding:12px 24px; border-radius:12px; font-weight:bold; cursor:pointer; margin-top:10px;">TẢI LẠI TRANG</button>
        </div>
      </div>
    `;
  }
});

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✅ App Rendered Successfully");
  } catch (err) {
    console.error("Render failed:", err);
  }
}

// Service Worker an toàn
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
