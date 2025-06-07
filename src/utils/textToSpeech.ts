
export class TextToSpeechService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
  }

  private loadVoices() {
    this.voices = this.synth.getVoices();
    
    // Prefer English voices
    const englishVoices = this.voices.filter(voice => 
      voice.lang.startsWith('en')
    );
    
    // Try to find a nice voice
    this.selectedVoice = englishVoices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.name.includes('Alex') ||
      voice.name.includes('Samantha')
    ) || englishVoices[0] || this.voices[0] || null;
  }

  speak(text: string, options?: { rate?: number; pitch?: number; volume?: number }) {
    if (!this.synth) return;

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    
    utterance.rate = options?.rate || 0.9;
    utterance.pitch = options?.pitch || 1;
    utterance.volume = options?.volume || 1;

    this.synth.speak(utterance);
  }

  getAvailableVoices() {
    return this.voices.filter(voice => voice.lang.startsWith('en'));
  }

  setVoice(voiceName: string) {
    const voice = this.voices.find(v => v.name === voiceName);
    if (voice) {
      this.selectedVoice = voice;
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const ttsService = new TextToSpeechService();
