
import React, { useState } from 'react';

const PHP_CODE = `<?php
/**
 * Simple PHP API for 『Spin』Vũ•rCoinmaster
 * Place this in /api/get_spin_links.php
 */
header('Content-Type: application/json');

// Configuration for ProFreeHost MySQL
$host = "sqlxxx.profreehost.com";
$user = "unaux_xxxxxx";
$pass = "password";
$dbname = "unaux_xxxxxx_spindb";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Fetch spin links
    $stmt = $pdo->query("SELECT id, title, url, DATE_FORMAT(created_at, '%Y-%m-%d') as date FROM spin_links ORDER BY created_at DESC LIMIT 20");
    $links = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "status" => "success",
        "data" => $links
    ]);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>`;

const KOTLIN_CODE = `// Kotlin Implementation snippet for Overlay Button
// In your Service class:

class OverlayService : Service() {
    private lateinit var windowManager: WindowManager
    private lateinit var floatingView: View

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        floatingView = LayoutInflater.from(this).inflate(R.layout.layout_floating_widget, null)

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) 
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY 
            else 
                WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        )

        params.gravity = Gravity.TOP or Gravity.START
        params.x = 0
        params.y = 100

        windowManager.addView(floatingView, params)
        
        // Setup Dragging
        floatingView.setOnTouchListener(object : View.OnTouchListener {
            private var lastX = 0
            private var lastY = 0
            private var paramX = 0
            private var paramY = 0

            override fun onTouch(v: View, event: MotionEvent): Boolean {
                when (event.action) {
                    MotionEvent.ACTION_DOWN -> {
                        lastX = event.rawX.toInt()
                        lastY = event.rawY.toInt()
                        paramX = params.x
                        paramY = params.y
                    }
                    MotionEvent.ACTION_MOVE -> {
                        val dx = event.rawX.toInt() - lastX
                        val dy = event.rawY.toInt() - lastY
                        params.x = paramX + dx
                        params.y = paramY + dy
                        windowManager.updateViewLayout(floatingView, params)
                    }
                }
                return true
            }
        })
        
        return START_STICKY
    }
}`;

const DeveloperResources: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'php' | 'kotlin'>('php');

  return (
    <div className="p-6">
      <button onClick={onBack} className="mb-6 flex items-center text-blue-500 font-semibold">
        <span className="mr-2">←</span> Quay lại
      </button>
      <h1 className="text-2xl font-bold mb-4">Tài nguyên lập trình</h1>
      <p className="text-gray-500 mb-6">Mã nguồn tham khảo cho Backend và Android Overlay logic.</p>

      <div className="flex mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl">
        <button 
          onClick={() => setActiveTab('php')}
          className={`flex-1 py-3 rounded-xl font-bold transition ${activeTab === 'php' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500'}`}
        >
          Backend (PHP)
        </button>
        <button 
          onClick={() => setActiveTab('kotlin')}
          className={`flex-1 py-3 rounded-xl font-bold transition ${activeTab === 'kotlin' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500'}`}
        >
          Android (Kotlin)
        </button>
      </div>

      <div className="bg-gray-900 text-green-400 p-6 rounded-3xl overflow-x-auto font-mono text-sm leading-relaxed shadow-inner">
        <pre>{activeTab === 'php' ? PHP_CODE : KOTLIN_CODE}</pre>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-100 dark:border-yellow-700">
        <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">Lưu ý khi deploy lên ProFreeHost:</h4>
        <ul className="text-sm text-yellow-700 dark:text-yellow-500 list-disc ml-5 space-y-1">
          <li>Sử dụng htdocs folder để chứa các file PHP.</li>
          <li>Tạo Database và User trong Control Panel trước.</li>
          <li>Đảm bảo CORS được cấu hình nếu gọi từ App Android.</li>
        </ul>
      </div>
    </div>
  );
};

export default DeveloperResources;
