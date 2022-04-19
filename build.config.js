//–all所有平台，–platform=linux指Linux系统，–platform=win32指windows系统，–platform=darwin指mac系统
module.exports = {
  out: 'dist',
  platform: 'win32',
  version: '15.0.0',
  arch: 'x64',
  source: 'source',//安装包存放目录
  icon: 'public/favicon.ico',
  ignore: ['src', 'source', '\.vscode', '\.idea', 'node_modules']
}
