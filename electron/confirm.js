const {contextBridge, ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {

  contextBridge.exposeInMainWorld('electronAPI', {
    onConfirm: (data) => ipcRenderer.invoke('onConfirm', data),
  })
})
