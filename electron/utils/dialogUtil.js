const {BrowserWindow} = require('electron')
const confirmAction = {
  resolve: null,
  reject: null
}

function createDialog(event, data) {
  const currentWin = BrowserWindow.getFocusedWindow()
  const {
    title,
    page,
    preload,
    cancelBtn,
    confirmBtn,
    cancelText,
    confirmText,
    width = 700,
    height = 500
  } = data
  const qs = require('querystring')
  const params = qs.stringify({ cancelBtn, confirmBtn, cancelText, confirmText})
  const createWindow = require('./createWindow')
  createWindow('', {
    name: 'dialog',
    title,
    page: page + '?' + params,
    preload,
    readyToShow: true,
    width,
    height,
    parent: currentWin,
    modal: true,
  })
  return new Promise((resolve, reject) => {
    confirmAction.reject = reject
    confirmAction.resolve = resolve
  })
}

function onDialogConfirm(event, data) {
  const {action} = data
  if (action === 'confirm') {
    confirmAction.resolve(data)
  } else {
    confirmAction.reject(data)
  }
}

module.exports = {
  createDialog,
  onDialogConfirm
}
