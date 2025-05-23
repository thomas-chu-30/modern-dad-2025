const express = require("express");
const router = express.Router();
const { QdrantClient } = require("@qdrant/js-client-rest");
const { OpenAI } = require("openai");

// 創建 Qdrant 客戶端
const createQdrantClient = (url, apiKey) => {
  return new QdrantClient({ url, apiKey });
};

// 創建 OpenAI 客戶端
const createOpenAIClient = (apiKey) => {
  return new OpenAI({ apiKey });
};

router.get("/test-connection", async (req, res) => {
  res.send({
    success: true,
    message: "Hello World",
  });
});

// 測試連接並上傳文檔
router.post("/test-connection", async (req, res) => {
  try {
    const { qdrantUrl, qdrantApiKey, openAiApiKey } = req.body;

    // 初始化客戶端
    const qdrant = createQdrantClient(qdrantUrl, qdrantApiKey);
    const openai = createOpenAIClient(openAiApiKey);

    // 示例文檔
    const documents = [
      { id: 3, text: "這是第三個測試文檔" },
      { id: 4, text: "這是第四個測試文檔" },
    ];

    // 生成嵌入向量
    const texts = documents.map((doc) => doc.text);
    const embeddings = await Promise.all(
      texts.map(async (text) => {
        const response = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: text,
        });
        return response.data[0].embedding;
      })
    );

    console.log("openai embeddings =>", embeddings);

    // 創建集合（如果不存在）
    const collectionName = "my_documents";
    try {
      await qdrant.createCollection(collectionName, {
        vectors: {
          size: embeddings[0].length,
          distance: "Cosine",
        },
      });
    } catch (error) {
      if (!error.message.includes("already exists")) {
        throw error;
      }
    }

    // 上傳文檔
    await qdrant.upsert(collectionName, {
      points: documents.map((doc, i) => ({
        id: doc.id,
        vector: embeddings[i],
        payload: { text: doc.text },
      })),
    });

    res.json({ success: true, message: "文件已成功上傳！" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
