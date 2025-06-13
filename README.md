![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6P5vUa1FgthDcuYUInL04EhY885iM5OCBA&s)

# 語音理解 API

這是一個使用 Google Gemini AI 的語音理解 API 服務，可以將上傳的音訊檔案轉換為文字描述。

## 功能特點

- 支援音訊檔案上傳（WAV 格式）
- 使用 Google Gemini 1.5 Pro 模型進行語音理解
- 自動重試機制處理 API 配額限制
- 簡潔的 RESTful API 介面

## 技術需求

- Node.js
- Express.js
- Google Gemini AI API
- Multer（檔案上傳處理）

## 環境設定

1. 安裝依賴套件：

```bash
npm install express @google/generative-ai dotenv multer
```

2. 建立 `.env` 檔案並設定以下環境變數：

```
GOOGLE_API_KEY=你的_Google_API_金鑰
```

## API 使用說明

### 語音理解 API

**端點：** `POST /audio-understanding`

**請求格式：**

- Content-Type: multipart/form-data
- 參數：
  - file: 音訊檔案（WAV 格式）

**回應格式：**

```json
{
  "result": "音訊內容的文字描述"
}
```

**錯誤回應：**

```json
{
  "error": "錯誤訊息"
}
```

## 錯誤處理

- API 具有自動重試機制，最多重試 3 次
- 遇到配額限制時會等待 31 秒後重試
- 所有錯誤都會回傳適當的錯誤訊息

## 注意事項

- 目前僅支援 WAV 格式的音訊檔案
- 需要有效的 Google Gemini API 金鑰
- API 有配額限制，請注意使用頻率

## 授權

MIT License
