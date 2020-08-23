import base64 from 'base-64';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import "./lib/SpeechSDK/microsoft.cognitiveservices.speech.sdk.bundle";
import { AZURE_SPEECH_KEY } from './secrets';

/* globals SpeechSDK */

Audio.requestPermissionsAsync();
Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: true,
});

const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(AZURE_SPEECH_KEY, "eastus");
speechConfig.speechRecognitionLanguage = "en-US";

let recognizer = null;
export const startListening = async (recognizing, recognized) => {
    const micInput = new MicInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, SpeechSDK.AudioConfig.fromStreamInput(micInput));
    micInput.start();
    recognizer.recognizing = (_, result) => {
        recognizing(result.privResult.privText);
    };
    recognizer.recognized = (_, result) => {
        recognized(result.privResult.privText);
    };

    await recognizer.startContinuousRecognitionAsync();
};

export const stopListening = async () => {
    if (!recognizer) return;
    await recognizer.stopContinuousRecognitionAsync();
    recognizer = null;
};

class MicInput extends SpeechSDK.PullAudioInputStreamCallback {
  bytesRead = 0;
  data = new Uint8Array();
  recording = new Audio.Recording();

  async start() {
    await this.recording.prepareToRecordAsync({
      android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 8000,
        numberOfChannels: 2,
        bitRate: 128000,
      },
      ios: {
        extension: '.wav',
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_LOW,
        sampleRate: 8000,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
    });
    this.recording.setOnRecordingStatusUpdate(async () => {
      let dataBase64 = await FileSystem.readAsStringAsync(this.recording.getURI(), { encoding: FileSystem.EncodingType.Base64 });
      this.data = Uint8Array.from(base64.decode(dataBase64), c => c.charCodeAt(0)).slice(this.bytesRead);
      this.bytesRead += this.data.byteLength;
    });
    await this.recording.startAsync();
  }

  read(dataBuffer) {
    const bytesToRead = dataBuffer.byteLength < 512 ? dataBuffer.byteLength : 512;
    const outBuffer = new Uint8Array(dataBuffer);
    outBuffer.set(this.data.slice(0, bytesToRead));
    this.data = this.data.slice(bytesToRead);
    return bytesToRead;
  }

  close() {
    this.recording.stopAndUnloadAsync();
  }
}