const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron')
const {join} = require('path')
const {name} = require('../package.json')
const createWindow = require('./utils/createWindow')

let mainWin

function init() {
  mainWin = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1000,
    height: 700,
    minWidth: 800,
    minHeight: 500,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    },
    icon: join(__dirname, '../public/favicon.ico')
  })
  mainWin.loadFile(join(__dirname, '../public/index.html'))
  // 关闭时触发
  mainWin.on('close', (event) => {
    // 截获 close 默认行为
    event.preventDefault()
    // 点击关闭时触发close事件，我们按照之前的思路在关闭时，隐藏窗口，隐藏任务栏窗口
    mainWin.hide()
    mainWin.setSkipTaskbar(true)
  })
}

app.whenReady().then(() => {
  init()
  // 新建托盘
  const tray = new Tray(join(__dirname, '../public/favicon.ico'))
  // 托盘名称
  tray.setToolTip(name)
  // 托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      click: () => mainWin.show()
    },
    {
      label: '关于我们',
      click: () => createWindow('', {
        name: 'about',
        title: '关于我们',
        readyToShow: true,
        page: '/pages/about.html',
        preload: 'about.js',
        width: 360,
        height: 500,
        minimizable: false,
        maximizable: false,
        resizable: false
      })
    },
    {
      label: '退出',
      click: () => {
        tray.destroy()
        if (process.platform !== 'darwin') {
          app.quit()
        }
      }
    }
  ])
  // 载入托盘菜单
  tray.setContextMenu(contextMenu)
  // 双击触发
  tray.on('double-click', () => {
    // 双击通知区图标实现应用的显示或隐藏
    mainWin.isVisible() ? mainWin.hide() : mainWin.show()
    mainWin.isVisible() ? mainWin.setSkipTaskbar(false) : mainWin.setSkipTaskbar(true)
  })
  if (!app.isPackaged) {
    mainWin.webContents.openDevTools({mode: 'right'})
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    init()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('createWindow', createWindow)

const {createConfirm,onConfirm} = require('./utils/confirmUtil')
ipcMain.handle('createConfirm', createConfirm)
ipcMain.handle('onConfirm', onConfirm)

const {createDialog,onDialogConfirm} = require('./utils/dialogUtil')
ipcMain.handle('createDialog', createDialog)
ipcMain.handle('onDialogConfirm', onDialogConfirm)
