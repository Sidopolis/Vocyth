import WebSpeechVoices from './webSpeechVoices.js';
import { getAllVoices, getVoiceById, voiceEffects } from './voices.js';

class Vocyth {
  constructor(config = {}) {
    this.webSpeech = new WebSpeechVoices();
    this.init();
  }

  async init() {
    await this.webSpeech.init();
  }

  async synthesize(options = {}) {
    try {
      await this.webSpeech.speak(options.text, options.voice, {
        rate: options.speed || 1,
        pitch: options.pitch || 1,
        volume: options.volume || 1
      });
    } catch (error) {
      console.error('Synthesis error:', error);
      throw error;
    }
  }

  getAvailableVoices() {
    return this.webSpeech.getVoices();
  }
}

export default Vocyth;