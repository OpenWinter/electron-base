const {name,version} = require('../package.json')
const {contextBridge, ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('name').textContent = name
  document.getElementById('version').textContent = version
})
