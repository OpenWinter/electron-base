<p align="center">
  <img width="150" src="https://img.uouzen.cn/2022-04-19/1650370670159RNW.png">
</p>

### 简介
electron-base是一个electron的基础开发框架，本项目主要在页面配置及打包上进行了基础的集成，
开发者可以更便捷的开始一个electron项目，帮助你快速搭建一个基于electron的桌面应用，
如果你还在寻找electron的开发方案，希望本项目都能帮助到你。

### 开发
```
# 克隆项目
git clone https://github.com/OpenWinter/electron-base.git

# 安装依赖
npm install

# 没有外网环境的请通过设置淘宝镜像解决下载问题，安装可能会失败，请删除node_module目录后重试几次
npm config set registry https://registry.npm.taobao.org
# 查看是否更改成功
npm config get registry

# 启动服务，启动失败多数情况是因为electron包下载失败或者下载不完全，请删除node_module目录后重新安装
npm run dev

#快发环境打开控制台调试
ctrl + shift + i
```

### 打包发布
#### 下载安装包
访问如下链接，下载electron安装包，放到项目的[source]文件夹中，[下载完成后请勿重命名] <br />
[windows64安装包下载](https://registry.npmmirror.com/-/binary/electron/15.0.0/electron-v15.0.0-win32-x64.zip) <br />
[苹果x64安装包下载](https://registry.npmmirror.com/-/binary/electron/15.0.0/electron-v15.0.0-darwin-x64.zip) <br />
[苹果arm64安装包下载](https://registry.npmmirror.com/-/binary/electron/15.0.0/electron-v15.0.0-darwin-arm64.zip) <br />

[镜像地址](https://registry.npmmirror.com/binary.html?path=electron/15.0.0/)

#### 打包命令
```
npm run build
```

### 预览
<p>
<img width="900px" src="https://img.uouzen.cn/2022-04-19/1650370897519HDw.jpg" />
</p>
