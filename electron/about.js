const {name,version} = require('../package.json')
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('name').textContent = name
  document.getElementById('version').textContent = version
})
