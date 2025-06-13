# Bluetooth Battery Level Monitor

這是一個使用 Web Bluetooth API 來監控藍牙裝置電池電量的網頁應用程式。

## 功能特點

- 使用 Web Bluetooth API 連接藍牙裝置
- 簡潔的使用者介面
- 即時顯示連接狀態和錯誤訊息

## 技術需求

- 支援 Web Bluetooth API 的瀏覽器（如 Chrome、Edge 等）
- Node.js 環境
- 藍牙裝置

## 安裝步驟

1. 克隆專案

```bash
git clone [repository-url]
cd [project-directory]
```

2. 安裝依賴

```bash
npm install
```

3. 啟動應用程式

```bash
npm start
```

## 使用方式

1. 開啟瀏覽器訪問應用程式
2. 點擊「Connect Bluetooth Device」按鈕
3. 在瀏覽器的藍牙裝置選擇視窗中選擇要連接的裝置
4. 等待連接完成，狀態會顯示在頁面上

## 注意事項

- 請確保您的瀏覽器支援 Web Bluetooth API
- 使用時需要允許瀏覽器存取藍牙功能
- 建議使用 HTTPS 或 localhost 環境運行，因為 Web Bluetooth API 需要安全上下文

## 開發環境

- Node.js
- Express.js
- EJS 模板引擎

## 授權

MIT License
