const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

// 設定 multer 儲存檔案
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = "uploads";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    },
  }),
});

// 設定 AWS
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const transcribeService = new AWS.TranscribeService();

router.post("/api/transcribe", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an audio file" });
    }

    const filePath = req.file.path;
    const jobName = `transcription-${uuidv4()}`;
    const fileExtension = path.extname(filePath).toLowerCase();

    // 上傳檔案到 S3
    const s3 = new AWS.S3();
    const s3Params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `audio/${jobName}${fileExtension}`,
      Body: fs.createReadStream(filePath),
    };

    await s3.upload(s3Params).promise();

    // 開始轉錄任務
    const transcribeParams = {
      TranscriptionJobName: jobName,
      LanguageCode: "en-US",
      Media: {
        MediaFileUri: `s3://${process.env.AWS_S3_BUCKET}/audio/${jobName}${fileExtension}`,
      },
      OutputBucketName: process.env.AWS_S3_BUCKET,
    };

    await transcribeService.startTranscriptionJob(transcribeParams).promise();

    // 等待轉錄完成
    let jobStatus = "IN_PROGRESS";
    while (jobStatus === "IN_PROGRESS") {
      const status = await transcribeService.getTranscriptionJob({ TranscriptionJobName: jobName }).promise();
      jobStatus = status.TranscriptionJob.TranscriptionJobStatus;

      if (jobStatus === "FAILED") {
        throw new Error("Transcription failed");
      }

      if (jobStatus === "COMPLETED") {
        // 從 S3 讀取結果
        const result = await s3
          .getObject({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `${jobName}.json`,
          })
          .promise();

        const transcription = JSON.parse(result.Body.toString());

        // 清理檔案
        fs.unlinkSync(filePath);
        await s3
          .deleteObject({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `audio/${jobName}${fileExtension}`,
          })
          .promise();
        await s3
          .deleteObject({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `${jobName}.json`,
          })
          .promise();

        return res.json({
          transcription: transcription.results.transcripts[0].transcript,
        });
      }

      // 等待 5 秒再檢查
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  } catch (error) {
    console.error("Transcription error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
