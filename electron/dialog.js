const {contextBridge, ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  contextBridge.exposeInMainWorld('electronAPI', {
    onDialogConfirm: (data) => ipcRenderer.invoke('onDialogConfirm', data),
  })
})
