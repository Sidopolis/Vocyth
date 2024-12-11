class WebSpeechVoices {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
  }

  async init() {
    // Wait for voices to be loaded
    if (this.synth.getVoices().length === 0) {
      await new Promise(resolve => {
        this.synth.addEventListener('voiceschanged', () => {
          this.voices = this.synth.getVoices();
          resolve();
        });
      });
    } else {
      this.voices = this.synth.getVoices();
    }
  }

  speak(text, voiceName = null, options = {}) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voiceName) {
      const voice = this.voices.find(v => v.name === voiceName);
      if (voice) utterance.voice = voice;
    }

    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    return new Promise((resolve, reject) => {
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
      this.synth.speak(utterance);
    });
  }

  getVoices() {
    return this.voices.map(voice => ({
      name: voice.name,
      lang: voice.lang,
      default: voice.default,
      local: voice.localService,
      voiceURI: voice.voiceURI
    }));
  }

  cancel() {
    this.synth.cancel();
  }
}

export default WebSpeechVoices; 