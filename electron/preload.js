const {contextBridge, ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  contextBridge.exposeInMainWorld("openWindow", data => ipcRenderer.send("createWindow", data))
})
