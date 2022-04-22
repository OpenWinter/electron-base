const {BrowserWindow} = require('electron')
const {join} = require('path')
/**
 * 创建窗口函数
 * @name 窗口名称
 * @page 页面路径 例：/pages/index.html,/pages/about.html
 * @preload 页面预加载文件，预加载文件请放到electron目录中，例：/preload.js,/about.js
 * 除了以上三个参数外option其他参数与官网一致https://www.electronjs.org/zh/docs/latest/api/browser-window#new-browserwindowoptions
 */
function createWindow(event, data) {
  const {
    name,
    page,
    preload,
    title,
    readyToShow = false,//是否在渲染后再显示页面
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
    modal = false,
  } = data
  const current = BrowserWindow.getAllWindows().find(item => item._name === name)
  if (current) {
    current.show()
  } else {
    const option = {
      title,
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
      modal,
      icon: join(__dirname, '../../public/favicon.ico'),
    }
    //渲染完成后显示
    option.show = !readyToShow
    if (preload) {
      const preloadPath = /\.js$/.test(preload) ? preload : preload + '.js'
      option.webPreferences = {
        preload: join(__dirname, `../${preloadPath}`),
      }
    }
    maxWidth ? option.maxWidth = maxWidth : null
    maxHeight ? option.maxHeight = maxHeight : null
    const window = new BrowserWindow(option)
    if(readyToShow){
      //渲染完成后显示，避免白屏
      window.once('ready-to-show', () => {
        window.show()
      })
    }
    //给window添加一个标记
    window._name = name
    //判断是否是外链
    if(/(^http:\/\/)|(^https:\/\/)/.test(page)){
      window.loadURL(page)
    }else{
      const pagePath = /.*\.html/.test(page) ? page : page + '.html'
      window.loadURL(join(__dirname, `../../public/${pagePath}`))
    }
    return window
  }
}
module.exports = createWindow
