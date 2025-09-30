## 2025

實作 website 語音功能

[如果要作一個語音功能](https://cowcera.netlify.app/blog/2025/09/30/auto-speech-recognition)

## 專案概述

這是一個基於 Node.js + Express 的語音控制網站專案，使用 Web Speech API 實作語音辨識功能，支援中英文語音指令控制。

## 技術棧

- **後端**: Node.js + Express
- **前端**: HTML + CSS + JavaScript (原生)
- **語音辨識**: Web Speech API
- **模板引擎**: EJS
- **開發工具**: Nodemon

## 語音功能實作

### 核心架構

專案採用**工廠模式**和**抽象類別**設計語音辨識服務：

1. **抽象類別** (`SpeechRecognitionService`): 定義語音辨識服務的統一介面
2. **具體實作** (`WebSpeechRecognitionService`): 實作 Web Speech API
3. **工廠類別** (`SpeechRecognitionFactory`): 負責建立不同類型的語音辨識服務

### 主要功能

- ✅ **多語言支援**: 中文 (zh-TW) 和英文 (en-US)
- ✅ **語音指令控制**: 透過語音開啟指定網站
- ✅ **即時語音辨識**: 使用瀏覽器原生 Web Speech API
- ✅ **錯誤處理**: 完整的錯誤回調機制
- ✅ **可擴展架構**: 易於加入其他語音辨識服務 (Azure、Google 等)

### 支援的語音指令

**中文指令:**

- "打開 YouTube" → 開啟 YouTube
- "打開 Google" → 開啟 Google

**英文指令:**

- "open youtube" → 開啟 YouTube
- "open google" → 開啟 Google

### 檔案結構

```
├── public/js/speech-recognition.js  # 語音辨識核心邏輯
├── views/index.ejs                 # 前端頁面
├── routes/index.js                 # 路由設定
├── app.js                          # Express 應用程式
└── package.json                    # 專案依賴
```

## 程式碼範例

### 1. 語音辨識服務抽象類別

```javascript
// public/js/speech-recognition.js
class SpeechRecognitionService {
  constructor() {
    if (this.constructor === SpeechRecognitionService) {
      throw new Error("Cannot instantiate abstract class");
    }
  }

  start() {
    throw new Error("Method start() must be implemented");
  }

  stop() {
    throw new Error("Method stop() must be implemented");
  }

  onResult(callback) {
    throw new Error("Method onResult() must be implemented");
  }

  onError(callback) {
    throw new Error("Method onError() must be implemented");
  }

  setLanguage(lang) {
    throw new Error("Method setLanguage() must be implemented");
  }
}
```

### 2. Web Speech API 實作

```javascript
// public/js/speech-recognition.js
class WebSpeechRecognitionService extends SpeechRecognitionService {
  constructor() {
    super();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = "zh-TW";
    this.recognition.interimResults = false;
    this.currentLanguage = "zh-TW";
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    this.recognition.lang = lang;
  }

  onResult(callback) {
    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      callback(transcript, this.currentLanguage);
    };
  }

  onError(callback) {
    this.recognition.onerror = (event) => {
      callback(event);
    };
  }
}
```

### 3. 工廠模式建立服務

```javascript
// public/js/speech-recognition.js
class SpeechRecognitionFactory {
  static createService(type = "web") {
    switch (type) {
      case "web":
        return new WebSpeechRecognitionService();
      // 未來可以加入其他服務的實作
      // case 'azure':
      //   return new AzureSpeechRecognitionService();
      // case 'google':
      //   return new GoogleSpeechRecognitionService();
      default:
        throw new Error(`Unsupported speech recognition service: ${type}`);
    }
  }
}
```

### 4. 前端使用範例

```javascript
// views/index.ejs
// 使用工廠建立語音辨識服務
const speechService = SpeechRecognitionFactory.createService("web");

// 設定結果回調
speechService.onResult((transcript, language) => {
  console.log("transcript", transcript, "language", language);
  document.getElementById("result").innerText = `辨識結果: ${transcript}`;
  handleCommand(transcript, language);
});

// 設定錯誤回調
speechService.onError((event) => {
  console.error("辨識錯誤", event);
});

function startListening() {
  speechService.start();
}

function switchLanguage(lang) {
  speechService.setLanguage(lang);
  // 更新按鈕狀態
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.textContent.toLowerCase() === (lang === "zh-TW" ? "中文" : "english")) {
      btn.classList.add("active");
    }
  });
}
```

### 5. 語音指令處理

```javascript
// views/index.ejs
function handleCommand(command, language) {
  console.log(command, language);
  // 中文指令
  if (language === "zh-TW") {
    if (command.includes("打開YouTube")) {
      window.open("https://www.youtube.com", "_blank");
    } else if (command.includes("打開Google")) {
      window.open("https://www.google.com", "_blank");
    } else {
      alert("無法辨識指令：" + command);
    }
  }
  // 英文指令
  else if (language === "en-US") {
    if (command.toLowerCase().includes("open youtube")) {
      window.open("https://www.youtube.com", "_blank");
    } else if (command.toLowerCase().includes("open google")) {
      window.open("https://www.google.com", "_blank");
    } else {
      alert("Unknown command: " + command);
    }
  }
}
```

### 6. Express 伺服器設定

```javascript
// app.js
var express = require("express");
var path = require("path");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
```

## 快速開始

1. **安裝依賴**

   ```bash
   npm install
   ```

2. **啟動開發伺服器**

   ```bash
   npm start
   ```

3. **開啟瀏覽器**

   ```
   http://localhost:3000
   ```

4. **使用語音功能**
   - 點擊「🎤 開始聽」按鈕
   - 選擇語言 (中文/English)
   - 說出支援的語音指令

## 學習記錄

1. [連接藍牙功能實作](https://github.com/thomas-chu-30/modern-dad-2025/blob/feature/bluetooth/public/index.js)
2. [input type](https://github.com/thomas-chu-30/modern-dad-2025/blob/feature/input-type/views/index.ejs)
3. **語音辨識功能實作** - 使用 Web Speech API 和設計模式建立可擴展的語音控制系統
