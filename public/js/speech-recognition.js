// 定義語音辨識服務的介面
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

// Web Speech API 的實作
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

// 語音辨識服務工廠
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
