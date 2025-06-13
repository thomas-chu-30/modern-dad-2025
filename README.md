# Modern Dad 2025 - 錄音功能網站

這是一個基於 Node.js 和 Express.js 開發的錄音功能網站，提供簡單易用的錄音和音頻管理功能。

## 功能特點

- 即時錄音功能
- 音頻檔案管理
- 錄音播放和下載
- 響應式設計，支援多種設備

## 技術棧

- Node.js - JavaScript 運行環境
- Express.js - Web 應用框架
- EJS - 模板引擎
- Nodemon - 開發環境自動重啟
- Web Audio API - 音頻處理

## 系統需求

- Node.js 14.0 或更高版本
- npm 6.0 或更高版本
- 現代瀏覽器（支援 Web Audio API）

## 安裝說明

1. 確保已安裝 Node.js
2. 克隆專案

```bash
git clone https://github.com/thomas-chu-30/modern-dad-2025.git
```

3. 進入專案目錄

```bash
cd modern-dad-2025
```

4. 安裝依賴

```bash
npm install
```

5. 啟動專案

```bash
npm start
```

6. 在瀏覽器中訪問 `http://localhost:3000`

## 專案結構

```
modern-dad-2025/
├── bin/            # 應用程式啟動腳本
├── public/         # 靜態資源文件
│   ├── css/       # 樣式文件
│   ├── js/        # 客戶端 JavaScript
│   └── audio/     # 音頻文件存儲
├── routes/         # 路由處理
├── views/          # EJS 模板文件
├── app.js          # 應用程式主文件
└── package.json    # 專案配置和依賴
```

## 開發指南

### 本地開發

1. 安裝開發依賴

```bash
npm install --save-dev nodemon
```

2. 啟動開發服務器

```bash
npm run dev
```

### 生產環境部署

1. 設置環境變量

```bash
export NODE_ENV=production
```

2. 啟動服務

```bash
npm start
```

## 貢獻指南

1. Fork 本專案
2. 創建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟一個 Pull Request

## 授權

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 文件

## 聯絡方式

如有任何問題或建議，請開啟 Issue 或 Pull Request。
