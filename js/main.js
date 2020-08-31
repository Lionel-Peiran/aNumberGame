var electron = require('electron')

var app = electron.app //引用
var BrowserWindow = electron.BrowserWindow//窗口引用

var mainWindow = null //声明要打开的主窗口

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: { nodeIntegration: true }
    });
    mainWindow.loadFile('index.html');//加载页面
    mainWindow.on('closed', () => {
        mainWindow = null
    })
})

