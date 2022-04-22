const {BrowserWindow} = require('electron')
const confirmAction = {
  resolve: null,
  reject: null
}

function createConfirm(event, data) {
  const currentWin = BrowserWindow.getFocusedWindow()
  const {title, message, cancelBtn, confirmBtn, cancelText, confirmText} = data
  const qs = require('querystring')
  const params = qs.stringify({title, message, cancelBtn, confirmBtn, cancelText, confirmText})
  const createWindow = require('./createWindow')
  createWindow('', {
    name: 'confirm',
    title,
    page: `/components/confirm.html?${params}`,
    preload: 'confirm.js',
    readyToShow: true,
    width: 450,
    height: 160,
    resizable: false,
    parent: currentWin,
    modal: true,
    minimizable: false,
    maximizable: false
  })
  return new Promise((resolve, reject) => {
    confirmAction.reject = reject
    confirmAction.resolve = resolve
  })
}

function onConfirm(event, data) {
  const {action} = data
  if (action === 'confirm') {
    confirmAction.resolve(data)
  } else {
    confirmAction.reject(data)
  }
}

module.exports = {
  createConfirm,
  onConfirm
}
