const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('scrcpyAPI', {
    runCommand: (args) => ipcRenderer.send('run-scrcpy', args),
    stopCommand: () => ipcRenderer.send('stop-scrcpy'),
    getDevices: () => ipcRenderer.invoke('get-devices'),
    onLog: (callback) => ipcRenderer.on('terminal-log', (event, log) => callback(log)),
    onSessionStatus: (callback) => ipcRenderer.on('session-status', (event, running) => callback(running)),
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
    openExternal: (url) => ipcRenderer.send('open-external', url),
    runAdb: (args) => ipcRenderer.invoke('run-adb', args)
});
