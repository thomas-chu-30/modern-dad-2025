![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnG5tImVe_afLcbk2bsOjbWJ81LciQ_WJAWA&s)

# 向量存儲服務 (Vector Store Service)

這是一個使用 Express.js 建立的向量存儲服務，整合了 Qdrant 向量數據庫和 OpenAI 的嵌入模型。

## 功能特點

- 整合 Qdrant 向量數據庫
- 使用 OpenAI 的 text-embedding-3-small 模型生成文本嵌入
- 支持文檔的向量化存儲和檢索
- 提供簡單的 API 接口

## 技術棧

- Node.js
- Express.js
- Qdrant
- OpenAI API

## 安裝

```bash
npm install
```

## 環境變量

請確保設置以下環境變量：

- QDRANT_URL: Qdrant 服務器地址
- QDRANT_API_KEY: Qdrant API 密鑰
- OPENAI_API_KEY: OpenAI API 密鑰

## API 端點

### 測試連接

```http
GET /test-connection
```

返回：

```json
{
  "success": true,
  "message": "Hello World"
}
```

### 上傳文檔

```http
POST /test-connection
```

請求體：

```json
{
  "qdrantUrl": "your-qdrant-url",
  "qdrantApiKey": "your-qdrant-api-key",
  "openAiApiKey": "your-openai-api-key"
}
```

返回：

```json
{
  "success": true,
  "message": "文件已成功上傳！"
}
```

## 使用說明

1. 確保已安裝所有依賴
2. 設置必要的環境變量
3. 啟動服務器
4. 使用 API 端點進行文檔上傳和檢索

## 注意事項

- 請確保妥善保管 API 密鑰
- 建議在生產環境中使用 HTTPS
- 注意 API 調用限制和成本控制
