const {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron')
const path = require('path')
const {name} = require('../package.json')
let mainWin
let tray

function init() {
  mainWin = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1000,
    height: 700,
    minWidth: 800,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/favicon.ico')
  })
  mainWin.loadFile(path.join(__dirname, '../public/index.html'))
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
  tray = new Tray(path.join(__dirname, '../public/favicon.ico'))
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
        page: '/about.html',
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
  /*if (process.env.NODE_ENV === 'development') {
    mainWin.webContents.openDevTools({mode: 'right'})
  }*/
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

function createWindow(event, data) {
  const {
    name,
    page,
    preload,
    width = 650,
    minWidth,
    height = 600,
    minHeight,
    maxWidth,
    maxHeight,
    x,
    y,
    resizable = true,
    minimizable = true,
    maximizable = true,
    closable = true,
    autoHideMenuBar = true,
    frame = true,
    parent,
    model = false,
  } = data
  const current = BrowserWindow.getAllWindows().find(item => item._name === name);
  if (current) {
    current.show()
  } else {
    const option = {
      width,
      minWidth,
      height,
      minHeight,
      x,
      y,
      frame,
      resizable,
      minimizable,
      maximizable,
      closable,
      autoHideMenuBar,
      center: true,
      parent,
      model,
      icon: path.join(__dirname, '../public/favicon.ico'),
    }
    if (preload) {
      const preloadPath = /\.js$/.test(preload) ? preload : preload + '.js'
      option.webPreferences = {
        preload: path.join(__dirname, preloadPath),
      }
    }
    maxWidth ? option.maxWidth = maxWidth : null
    maxHeight ? option.maxHeight = maxHeight : null
    let window = new BrowserWindow(option)
    //给window添加一个唯一标记
    window._name = name
    const pagePath = /\.html$/.test(page) ? page : page + '.html'
    window.loadFile(path.join(__dirname, `../public/pages/${pagePath}`))
  }
}

ipcMain.on("createWindow", createWindow)
