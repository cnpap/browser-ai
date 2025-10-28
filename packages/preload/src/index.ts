import {sha256sum} from './nodeCrypto.js';
import {versions} from './versions.js';
import {ipcRenderer} from 'electron';

// Expose platform to renderer for platform-specific UI tweaks
const platform = process.platform;

function send(channel: string, message: string) {
  return ipcRenderer.invoke(channel, message);
}

function onFullScreenChanged(callback: (isFullScreen: boolean) => void) {
  ipcRenderer.on('window:fullscreen-changed', (_event, isFullScreen: boolean) => {
    callback(isFullScreen);
  });
}

export {sha256sum, versions, send, platform, onFullScreenChanged};
