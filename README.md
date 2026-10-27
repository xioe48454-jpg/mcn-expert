# 我是 MCN 专家

一个可直接部署到 GitHub Pages 的短视频与账号分析工作台前端。

## 使用方式

1. 打开网站，点击顶部“连接设置”。
2. 在弹窗中填写硅基流动 API Key，以及小红书、抖音 Cookie。
3. 粘贴视频链接或账号主页链接，生成分析任务。

API Key 与 Cookie 保存在当前浏览器的 LocalStorage 中，不会写入本仓库。

## GitHub Pages 部署

仓库上传后，进入 GitHub 的 **Settings → Pages**，在 **Build and deployment** 中选择：

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

保存后，GitHub 会给出公开地址：

`https://xioe48454-jpg.github.io/mcn-expert/`

## 当前范围

此仓库提供可访问的网页和本地凭据导入界面。真实视频读取、Cookie 会话使用、转写和大模型分析需要一个服务端 API；在 GitHub Pages 不能安全存放或直接调用这些密钥。
