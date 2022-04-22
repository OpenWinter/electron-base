const {contextBridge,ipcRenderer} = require('electron')
const api = {
  openWindow: data => ipcRenderer.send('createWindow', data),
  $confirm: data => ipcRenderer.invoke('createConfirm', data),
  onConfirm: data => ipcRenderer.invoke('onConfirm', data),
  $dialog: data => ipcRenderer.invoke('createDialog', data),
  onDialogConfirm: data => ipcRenderer.invoke('onDialogConfirm', data),
  $message: message => {
    const dom = document.createElement('div')
    dom.setAttribute('class', 'message-box')
    dom.setAttribute('data-message', '')
    dom.textContent = message
    document.body.append(dom)
    setTimeout(() => {
      document.body.removeChild(dom)
    }, 2000)
  },
  $loading: {
    open() {
      const dom = document.createElement('div')
      dom.setAttribute('class', 'loading-box')
      dom.setAttribute('data-loading', '')
      dom.innerHTML = '<i class="el-icon-loading"></i>'
      document.body.append(dom)
    },
    close() {
      const list = document.getElementsByClassName('loading-box')
      list.length > 0 ? document.body.removeChild(list[0]) : null
    }
  },
}

function installApi(apiList){
  const map = {}
  apiList.forEach(item => map[item] = api[item])
  contextBridge.exposeInMainWorld('electronAPI', map)
}

module.exports = installApi
