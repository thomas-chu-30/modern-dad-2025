var express = require("express");
var router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const multer = require("multer");
const upload = multer();
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
/* GET home page. */
router.post("/audio-understanding", upload.single("file"), async function (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const result = await processAudio(req.file, "請描述這段音檔的內容，並且只回答你聽到的內容，不要有其他文字");
  result.replace(/[\n\r]/g, "");
  res.status(200).json({ result });
});

// 讀取語音檔並轉成 base64
function readAudioAsBase64(audio) {
  return audio.buffer.toString("base64");
}

async function processAudio(audio, prompt) {
  const audioBase64 = readAudioAsBase64(audio);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
  const audioPart = {
    inlineData: {
      mimeType: "audio/wav",
      data: audioBase64,
    },
  };
  const textPart = { text: prompt };

  const maxRetries = 3;
  let retryCount = 0;
  let lastError = null;

  while (retryCount < maxRetries) {
    try {
      const result = await model.generateContent({
        contents: { parts: [audioPart, textPart] },
        generationConfig: { temperature: 0.3 },
      });

      const response = result.response;
      const text = response.text() ?? "無法取得內容";
      console.log("Gemini 理解結果：\n", text);
      return text;
    } catch (err) {
      lastError = err;
      if (err.status === 429) {
        retryCount++;
        if (retryCount < maxRetries) {
          const retryDelay = 31 * 1000; // 31 seconds
          console.log(`配額限制，等待 ${retryDelay / 1000} 秒後重試... (第 ${retryCount} 次重試)`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          continue;
        }
      }
      console.error("API 錯誤：", err);
      throw new Error("處理音訊時發生錯誤，可能是因為 API 配額限制或網路問題。請稍後再試。");
    }
  }
}

module.exports = router;
