
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Log khởi động
console.log("%c『THV』Vũ•rCoinmaster System Initializing...", "color: #2563eb; font-weight: bold; font-size: 12px;");

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Tự động ẩn màn hình loading sau khi React đã nạp xong
    const hideLoading = () => {
      const loader = document.getElementById('loading-screen');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    };

    // Kiểm tra định kỳ xem App đã render chưa để ẩn loader
    const checkInterval = setInterval(() => {
      if (rootElement.innerHTML !== "") {
        hideLoading();
        clearInterval(checkInterval);
        console.log("✅ Application Ready");
      }
    }, 100);

    // Timeout an toàn sau 5s nếu có lỗi nạp
    setTimeout(hideLoading, 5000);

  } catch (err) {
    console.error("Critical Render Error:", err);
    const loader = document.getElementById('loading-screen');
    if (loader) loader.innerHTML = `<div class="p-4 text-center"><p class="text-red-500 font-bold">Lỗi khởi động hệ thống.<br>Vui lòng thử lại.</p></div>`;
  }
}

// Service Worker (Optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.debug('SW silent fail'));
  });
}
