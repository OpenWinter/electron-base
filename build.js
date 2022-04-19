const {exec} = require('child_process')
const {join} = require('path')
const {opendirSync} = require('fs')
const {name} = require('./package.json')
const {out, platform, arch, source, icon, ignore, version} = require('./build.config')

const log = console.log

async function check() {
  //检查安装包
  const dir = opendirSync(join(__dirname, source))
  for await (const dirent of dir) {
    if (/^electron-v.*.zip$/.test(dirent.name)) {
      //找到安装包目录
      return true
    }
  }
}

async function build() {
  if (!await check()) {
    console.debug('\x1B[31m%s\x1B[39m', '请下载安装包至source目录')
    console.log('\x1B[31m%s\x1B[39m', '[windows64安装包下载](https://registry.npmmirror.com/-/binary/electron/15.0.0/electron-v15.0.0-win32-x64.zip)')
    return
  }
//electron-packager . app --out=./dist --platform=win32 --arch=x64 --overwrite --electron-zip-dir=./source --icon=./static/favicon.ico --ignore=node_modules --ignore=source --ignore=src
  let _ignore = ignore.map(item => `--ignore=${item}`)
  const args = [
    name,//打包后文件夹名称
    `--out=${join(out)}`,
    `--platform=${platform}`,
    `--arch=${arch}`,
    `--electron-version ${version}`,
    '--overwrite',
    `--electron-zip-dir=${join(source)}`,//手动指定electron打包基础文件的位置
    `--icon=${join(icon)}`,
    ..._ignore
  ]
  const command = `electron-packager . ${args.join(' ')}`
  const electronProcess = exec(command)
  electronProcess.stdout.on('data', log)
  electronProcess.stderr.on('data', log)
  electronProcess.on('close', () => {
    console.log('打包完成')
  })
}

build()
